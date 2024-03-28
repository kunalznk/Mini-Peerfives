import { Request, Response } from "express";
import { buildFailMessage, buildSuccessMessage } from "../utils/helper";
import { UserModel } from "../models/userModel";
import { RewardHistoryModel, buildRewardHistory } from "../models/rewardHistoryModel";
import mongoose, { startSession } from "mongoose";
import { AppError } from "../utils/appError";

const createReward = async (req: Request, res: Response) => {
    const session = await startSession();
    session.startTransaction();
    try {
        const { userId, reward, receiverId } = req.body;

        if (!userId || !(0 < reward && reward <= 100)) throw new AppError("Invalid request", 400);

        const [user, receiver] = await Promise.all([
            UserModel.findById(userId).session(session),
            UserModel.findById(receiverId).session(session)
        ]);


        if (!user || !receiver) throw new AppError("Invalid request", 400);

        if (user.points < reward) throw new AppError("Insufficient rewards", 400);

          await Promise.all([
            UserModel.findByIdAndUpdate(userId, { $inc: { points: -reward } }, { session }),
            UserModel.findByIdAndUpdate(receiverId, { $inc: { rewards: reward } }, { session }),
            buildRewardHistory({
                givenBy: userId,
                givenTo: receiverId,
                points: reward,
                timestamp: new Date()
            }).save({ session })
        ]);

        await session.commitTransaction();
        session.endSession();

        const { data, statusCode } = buildSuccessMessage([]);
        res.status(statusCode).json(data);

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log("err", error)

        const { data, statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}

const getRewardHistoryByUserId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const rewardHistory = await RewardHistoryModel.aggregate([
            {
                $match: { givenTo: new mongoose.Types.ObjectId (id) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "givenBy",
                    foreignField: "_id",
                    as: "givenByUser"
                }
            }
        ]);

        const { data, statusCode } = buildSuccessMessage(rewardHistory);
        res.status(statusCode).json(data);

    } catch (error) {
        const { data, statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}

const getPointsHistoryByUserId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const pointsHistory = await RewardHistoryModel.aggregate([
            {
                $match: { givenBy: new mongoose.Types.ObjectId (id) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "givenTo",
                    foreignField: "_id",
                    as: "givenToUser"
                }
            }
        ]);

        const { data, statusCode } = buildSuccessMessage(pointsHistory);
        res.status(statusCode).json(data);

    } catch (error) {
        const { data, statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
};

export default {
    createReward,
    getRewardHistoryByUserId,
    getPointsHistoryByUserId
}