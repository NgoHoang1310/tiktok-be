import uploadFile from '../utils/uploadFile';
import mongoose from 'mongoose';
// import { db } from '../firebase/config';
import Video from '../models/Video';
import Follow from '../models/Follow';
import Reaction from '../models/Reaction';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';

const handleUploadVideo = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            const response = await uploadFile(`videos`, payload);
            if (!response) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Upload Failed!');
            }
            data = await Video.create({ ...payload, filePath: response[0], thumbPath: response[1] });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetVideos = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            const options = {
                page: payload.page || 1,
                limit: payload.limit || 3,
                customLabels: {
                    meta: 'paginator',
                },
                sort: {
                    [payload.sort || 'createdAt']: payload.order || 'desc',
                },
            };

            const filter = {
                _destroy: false,
                viewable: 'public',
            };

            const pipeline = [
                {
                    $match: filter,
                },
                {
                    $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userInfo' },
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $project: {
                        'userInfo.password': 0,
                    },
                },
            ];
            data = await Video.aggregatePaginate(Video.aggregate(pipeline), options);
            resolve({ data: data.docs, pagination: data.paginator });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetVideosProfile = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            const options = {
                page: payload.page || 1,
                limit: payload.limit || 3,
                customLabels: {
                    meta: 'paginator',
                },
                sort: {
                    [payload.sort || 'createdAt']: payload.order || 'desc',
                },
            };
            const filter = { _destroy: false };
            if (payload.type) {
                const reactions = await Reaction.find({
                    userId: payload.userId,
                    reactableType: 'Video',
                    reactionType: payload.type,
                });
                const videoIds = reactions.map((reaction) => reaction.reactableId);
                filter._id = { $in: videoIds };
            } else {
                filter.userId = new mongoose.Types.ObjectId(payload.userId);
            }

            if (payload.viewable) filter.viewable = payload.viewable;
            const pipeline = [
                {
                    $match: filter,
                },
                {
                    $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userInfo' },
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $lookup: {
                        from: 'reactions',
                        let: { videoId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$userId', new mongoose.Types.ObjectId(payload.userId)] },
                                            { $eq: ['$reactableId', '$$videoId'] },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'reactionInfo',
                    },
                },
                {
                    $addFields: {
                        isLiked: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: '$reactionInfo',
                                            as: 'reaction',
                                            cond: { $eq: ['$$reaction.reactionType', 'like'] },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                        isFavourited: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: '$reactionInfo',
                                            as: 'reaction',
                                            cond: { $eq: ['$$reaction.reactionType', 'favourite'] },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $project: {
                        'userInfo.password': 0,
                        reactionInfo: 0,
                    },
                },
            ];
            data = await Video.aggregatePaginate(Video.aggregate(pipeline), options);
            resolve({ data: data.docs, pagination: data.paginator });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetVideosForyou = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            const options = {
                page: payload.page || 1,
                limit: payload.limit || 3,
                customLabels: {
                    meta: 'paginator',
                },
                sort: {
                    [payload.sort || 'createdAt']: payload.order || 'desc',
                },
            };

            const filter = { _destroy: false, viewable: 'public' };

            const pipeline = [
                {
                    $match: filter,
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userInfo',
                    },
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $lookup: {
                        from: 'follows',
                        let: { videoOwnerId: '$userId' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$followerId', new mongoose.Types.ObjectId(payload.userId)] },
                                            { $eq: ['$followingId', '$$videoOwnerId'] },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'followInfo',
                    },
                },
                {
                    $lookup: {
                        from: 'reactions',
                        let: { videoId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$userId', new mongoose.Types.ObjectId(payload.userId)] },
                                            { $eq: ['$reactableId', '$$videoId'] },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'reactionInfo',
                    },
                },
                {
                    $addFields: {
                        'userInfo.isFollowing': {
                            $cond: { if: { $gt: [{ $size: '$followInfo' }, 0] }, then: true, else: false },
                        },
                        isLiked: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: '$reactionInfo',
                                            as: 'reaction',
                                            cond: { $eq: ['$$reaction.reactionType', 'like'] },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                        isFavourited: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: '$reactionInfo',
                                            as: 'reaction',
                                            cond: { $eq: ['$$reaction.reactionType', 'favourite'] },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $project: {
                        'userInfo.password': 0,
                        followInfo: 0,
                        reactionInfo: 0,
                    },
                },
            ];
            data = await Video.aggregatePaginate(Video.aggregate(pipeline), options);
            resolve({ data: data.docs, pagination: data.paginator });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetFollowingVideos = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            const options = {
                page: payload.page || 1,
                limit: payload.limit || 3,
                customLabels: {
                    meta: 'paginator',
                },
                sort: {
                    [payload.sort || 'createdAt']: payload.order || 'desc',
                },
            };
            const followingUsers = await Follow.find({ followerId: payload.userId });
            const followingIds = followingUsers.map((follow) => follow.followingId);

            const filter = { _destroy: false, userId: { $in: followingIds }, viewable: 'public' };

            const pipeline = [
                { $match: filter },
                {
                    $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userInfo' },
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $lookup: {
                        from: 'reactions',
                        let: { videoId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$userId', new mongoose.Types.ObjectId(payload.userId)] },
                                            { $eq: ['$reactableId', '$$videoId'] },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'reactionInfo',
                    },
                },
                {
                    $addFields: {
                        isLiked: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: '$reactionInfo',
                                            as: 'reaction',
                                            cond: { $eq: ['$$reaction.reactionType', 'like'] },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                        isFavourited: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: '$reactionInfo',
                                            as: 'reaction',
                                            cond: { $eq: ['$$reaction.reactionType', 'favourite'] },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $project: {
                        'userInfo.password': 0,
                        reactionInfo: 0,
                    },
                },
            ];
            data = await Video.aggregatePaginate(Video.aggregate(pipeline), options);
            resolve({ data: data.docs, pagination: data.paginator });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetDiscoverVideos = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            const options = {
                page: payload.page || 1,
                limit: payload.limit || 3,
                customLabels: {
                    meta: 'paginator',
                },
                sort: {
                    [payload.sort || 'createdAt']: payload.order || 'desc',
                },
            };

            const filter = {
                _destroy: false,
                viewable: 'public',
            };
            if (payload.category) {
                const keyword = JSON.parse(payload.category)
                    .map((item, index) => {
                        if (index !== JSON.parse(payload.category).length - 1) return item + '|';
                        return item;
                    })
                    .join('');
                filter.hashtags = { $regex: keyword, $options: 'i' };
            }
            const pipeline = [
                {
                    $match: filter,
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userInfo',
                    },
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $lookup: {
                        from: 'follows',
                        let: { videoOwnerId: '$userId' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$followerId', new mongoose.Types.ObjectId(payload.userId)] },
                                            { $eq: ['$followingId', '$$videoOwnerId'] },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'followInfo',
                    },
                },
                {
                    $lookup: {
                        from: 'reactions',
                        let: { videoId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$userId', new mongoose.Types.ObjectId(payload.userId)] },
                                            { $eq: ['$reactableId', '$$videoId'] },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'reactionInfo',
                    },
                },
                {
                    $addFields: {
                        'userInfo.isFollowing': {
                            $cond: { if: { $gt: [{ $size: '$followInfo' }, 0] }, then: true, else: false },
                        },
                        isLiked: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: '$reactionInfo',
                                            as: 'reaction',
                                            cond: { $eq: ['$$reaction.reactionType', 'like'] },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                        isFavourited: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: '$reactionInfo',
                                            as: 'reaction',
                                            cond: { $eq: ['$$reaction.reactionType', 'favourite'] },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $project: {
                        'userInfo.password': 0,
                        followInfo: 0,
                        reactionInfo: 0,
                    },
                },
            ];
            data = await Video.aggregatePaginate(Video.aggregate(pipeline), options);
            resolve({ data: data.docs, pagination: data.paginator });
        } catch (error) {
            reject(error);
        }
    });
};

const handleCountingView = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await Video.findByIdAndUpdate({ _id: payload.id }, { $inc: { viewsCount: 1 } }, { new: true });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export {
    handleUploadVideo,
    handleGetVideos,
    handleGetVideosProfile,
    handleGetVideosForyou,
    handleGetFollowingVideos,
    handleCountingView,
    handleGetDiscoverVideos,
};
