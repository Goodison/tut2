// import { Post } from "./post.model";

export class User {
  name: string;
  avatar: string;
  wallpaper: string;
  email: string;
  password: string;
//   posts: Post[];
  following: string[] = [];
  followers: string[] = [];
  username: string;
  _id: string;
  id: string;
  blurAgeRestrictedContent: boolean;
  showAgeRestrictedContent: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
