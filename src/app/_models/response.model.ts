import { User } from "./user.model";

export class Response {
  success: boolean;
  msg: string;
  user: User;
  followers: [];
  following: [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
