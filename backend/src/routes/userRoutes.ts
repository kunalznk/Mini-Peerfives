import { Router} from "express"
import userController from "../controllers/userController";

const userRoutes = Router();

userRoutes.post("/", userController.createUser);
userRoutes.get("/:id", userController.getUserById);
userRoutes.get("/", userController.getUsers);
userRoutes.patch("/:id", userController.updateUser);

export default userRoutes;