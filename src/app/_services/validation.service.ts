import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidationService {
  constructor() { }

  validateRegister(user) {
    if (
      user.username == undefined ||
      user.email == undefined ||
      user.password == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }
  validatePost(post) {
    if (
      post.age_restriction == undefined ||
      post.userId == undefined ||
      post.username == undefined ||
      post.title == undefined ||
      post.story == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateUsername(username) {
    const re = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
    return re.test(String(username));
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(String(password));
  }
  validateAvatar(avatar) {
    const re = /\.(gif|jpg|jpeg|tiff|png)$/i;
    return re.test(String(avatar));
  }
}
