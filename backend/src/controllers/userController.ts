import { Request, Response} from "express"
import { buildFailMessage, buildSuccessMessage } from "../utils/helper";
import { UserModel, buildUser } from "../models/userModel";
import { AppError } from "../utils/appError";

const createUser = async (req: Request, res: Response) => {
    try {
        
        const { name } = req.body;
        if(!name) throw new AppError("invalid req body", 400)

        let user = await UserModel.findOne({ name});

        if(user) throw new AppError("user already exists", 400)

        user = await buildUser({
            name,
            points:100,
            rewards:0
        }).save()

        const { data, statusCode } = buildSuccessMessage(user);
        res.status(statusCode).json(data);

    } catch (error) {

        const { data, statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}

const getUsers = async (req: Request, res: Response) => {

    try {

        const { page = 0 , size = 10 } = req.query;
        let users = await UserModel.find()
        const { data, statusCode } = buildSuccessMessage(users);
        res.status(statusCode).json(data);

    } catch (error) {

        const { data, statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}

const getUserById = async (req: Request, res: Response) => {

    try {

        const { id  } = req.params;
        let user = await UserModel.findById(id);
        if(!user) throw new AppError("user not found", 403);
        const { data, statusCode } = buildSuccessMessage(user);
        res.status(statusCode).json(data);

    } catch (error) {

        const { data, statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}

const updateUser = async (req: Request, res: Response) => {

    try {

        const { name } = req.body;
        const { id } = req.params;
        let user = await UserModel.findByIdAndUpdate(id, { name })
        const { data, statusCode } = buildSuccessMessage(user);
        res.status(statusCode).json(data);

    } catch (error) {

        const { data, statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}

export default {
    createUser,
    getUsers,
    getUserById,
    updateUser
}