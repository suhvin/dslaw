import { UserType } from "../Type/user";
import { dbService } from "../myBase";

export class UserCollection {
  static createUser = async (user: UserType) => {
    return await dbService.collection("user").add(user);
  };

  static readUser = async (user: UserType) => {
    const data = await dbService
      .collection("user")
      .where("name", "==", user.name)
      .where("univ", "==", user.univ)
      .where("pw", "==", user.pw)
      .get();
    return data;
  };

  static updateUser = async (id: string, user: UserType) => {
    return await dbService.collection("user").doc(id).update(user);
  };
}
