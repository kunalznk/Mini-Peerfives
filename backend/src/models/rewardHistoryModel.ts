import { HydratedDocument, Schema, model } from 'mongoose';

interface IRewardHistory {
  timestamp: Date;
  points: number;
  givenBy: string; 
  givenTo: string;
}

const rewardHistorySchema: Schema = new Schema({
  timestamp: { type: Date, required: true },
  points: { type: Number, required: true },
  givenBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  givenTo: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const RewardHistoryModel = model<IRewardHistory>('rewardhistories', rewardHistorySchema);

export const buildRewardHistory = (rewardHistory: IRewardHistory): HydratedDocument<IRewardHistory> => {
    return new RewardHistoryModel(rewardHistory);
}