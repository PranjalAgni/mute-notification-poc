import { isPast } from "date-fns";
import { getRepository, In } from "typeorm";
import { Status } from "../entities/Status";
import { User } from "../entities/User";

export const checkAndMarkStatusAsActive = async (): Promise<void> => {
  const users: User[] = await getRepository(User)
    .createQueryBuilder("user")
    .select(["user.expiryTime", "user.userId"])
    .where("user.expiryTime IS NOT NULL")
    .getMany();

  const userIdArray: number[] = [];

  users.map((user) => {
    const elapsedStatus = isPast(new Date(user.expiryTime));

    if (elapsedStatus) {
      console.log(`${user.expiryTime} is elapsed ${elapsedStatus}`);
      userIdArray.push(user.userId);
    }
  });

  if (userIdArray.length) {
    const activeStatus = await getRepository(Status)
      .createQueryBuilder("status")
      .where("status.status = :status", { status: "active" })
      .getOneOrFail();

    await getRepository(User)
      .createQueryBuilder("user")
      .update(User)
      .set({
        expiryTime: null,
        status: activeStatus
      })
      .where({
        userId: In(userIdArray)
      })
      .execute();
  }
};
