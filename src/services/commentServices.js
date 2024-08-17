import Comment from '../models/Comment';
import mongoose from 'mongoose';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';

const handleGetCommentsVideo = (payload) => {
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

            let filter = {
                _destroy: false,
                videoId: new mongoose.Types.ObjectId(payload.videoId),
                parentId: null,
            };

            let project = {
                videoId: 1,
                userId: 1,
                parentId: 1,
                content: 1,
                repliesCount: 1,
                likesCount: 1,
                'commentator.tiktokID': 1,
                'commentator.avatar': 1,
                'commentator.tick': 1,
                'commentator._id': 1,
                updatedAt: 1,
                createdAt: 1,
            };

            let pipeline = [
                {
                    $match: filter,
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'commentator',
                    },
                },
                {
                    $unwind: '$commentator',
                },

                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'parentId',
                        as: 'replies',
                    },
                },

                {
                    $addFields: {
                        repliesCount: { $size: '$replies' },
                    },
                },

                {
                    $project: project,
                },
            ];

            if (payload.userId) {
                pipeline = [
                    ...pipeline,
                    {
                        $lookup: {
                            from: 'reactions',
                            let: { commentId: '$_id' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: ['$userId', new mongoose.Types.ObjectId(payload.userId)],
                                                },
                                                { $eq: ['$reactableId', '$$commentId'] },
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
                        },
                    },
                    {
                        $project: {
                            ...project,
                            isLiked: 1,
                        },
                    },
                ];
            }

            if (payload.parentId) {
                filter.parentId = new mongoose.Types.ObjectId(payload.parentId);
            }
            data = await Comment.aggregatePaginate(Comment.aggregate(pipeline), options);
            resolve({ data: data.docs, pagination: data.paginator });
        } catch (error) {
            reject(error);
        }
    });
};

const handlePostCommentVideo = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            await Comment.create(payload);
            data = await handleGetCommentsVideo({ ...payload, limit: 1 });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export { handleGetCommentsVideo, handlePostCommentVideo };
