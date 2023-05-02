import { UserCollection } from "../../Firebase/Collection/user";
import { UserType } from "../../Firebase/Type/user";

export const makeUser = async (user: UserType) => {
  const data = await UserCollection.readUser(user);

  if (data.empty) {
    UserCollection.createUser(user);
  } else {
    const doc = data.docs[0];
    UserCollection.updateUser(doc.id, user);
  }
};
