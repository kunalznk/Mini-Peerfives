import { Router} from "express"
import rewardHistoryController from "../controllers/rewardHistoryController";

const rewardRoutes = Router();

rewardRoutes.post("/", rewardHistoryController.createReward);
rewardRoutes.get("/:id/rewards", rewardHistoryController.getRewardHistoryByUserId);
rewardRoutes.get("/:id/points", rewardHistoryController.getPointsHistoryByUserId);
rewardRoutes.delete("/:id/reward", rewardHistoryController.deleteReward);


export default rewardRoutes;