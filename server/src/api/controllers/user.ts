import { NextFunction, Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { Status } from "../../entities/Status";
import { User } from "../../entities/User";
import { getTimestamp } from "../../utils/date";

const userRouter = Router();

userRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = await getRepository(Status)
        .createQueryBuilder("status")
        .where("status.status = :status", { status: req.body.status })
        .getOneOrFail();

      const user = new User();
      user.status = status;
      if (status.status === "active") user.expiryTime = null;
      else user.expiryTime = new Date(getTimestamp(req.body.expiryTime));
      await user.save();
      return res.json(user);
    } catch (ex) {
      return next(ex);
    }
  }
);

userRouter.post(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getRepository(User)
        .createQueryBuilder("user")
        .where("user.userId = :userId", { userId: req.params?.id })
        .getOneOrFail();

      const status = await getRepository(Status)
        .createQueryBuilder("status")
        .where("status.status = :status", { status: req.body.status })
        .getOneOrFail();

      user.status = status;
      if (status.status === "active") user.expiryTime = null;
      else user.expiryTime = new Date(getTimestamp(req.body.expiryTime));
      await user.save();
      return res.json(user);
    } catch (ex) {
      return next(ex);
    }
  }
);

userRouter.get(
  "/status/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getRepository(User)
        .createQueryBuilder("user")
        .where("user.userId = :userId", { userId: req.params?.id })
        .getOneOrFail();

      const status = await getRepository(Status)
        .createQueryBuilder("status")
        .where("status.statusId = :statusId", { statusId: user.status })
        .getOneOrFail();

      return res.json(status);
    } catch (ex) {
      return next(ex);
    }
  }
);

export default userRouter;
