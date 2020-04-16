import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../_models/user.model";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Response } from "../_models/response.model";
import { environment } from '../../environments/environment';

const helper = new JwtHelperService();

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: User;
  // private apiUrl = "http://localhost:3000/api/v1/";
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    console.log(headers);
    return this.http.get<User[]>(this.apiUrl + "users", { headers: headers });
  }

  getUserByUsername(username) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.get<Response>(`${this.apiUrl}users/${username}`, {
      headers: headers
    });
  }

  registerUser(user) {
    let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append("Accept", "application/json");
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "users", user, {
      headers: headers
    });
  }
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post(this.apiUrl + "auth", user, {
      headers: headers
    });
  }
  getProfile(username) {
    this.loadToken();
    let headers = new HttpHeaders().set("Authorization", this.authToken);
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    console.log(headers);
    return this.http.get(`${this.apiUrl}users/${username}`, {
      headers: headers
    });
  }

  updateAgeRestriction(showAgeRestrictedContent) {
    let headers = new HttpHeaders();
    let user = JSON.parse(localStorage.getItem("user"));
    let updateProps = {
      id: user.id,
      showAgeRestrictedContent: showAgeRestrictedContent
    };
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http.put(this.apiUrl + "users", updateProps, {
      headers: headers
    });
  }
  deleteProfile(id) {
    // console.log(this.apiUrl + 'users/profile/delete/' + id)
    let headers = new HttpHeaders();
    this.loadToken();
    // console.log(this.authToken);
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    console.log(headers);
    return this.http.delete(this.apiUrl + "users/profile/" + id, {
      headers: headers
    });
  }
  storeUserData(token, user) {
    console.log(token);
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }
  loggedIn() {
    return !helper.isTokenExpired(localStorage.getItem("id_token"));
  }
  logout() {
    localStorage.clear();
    this.authToken = null;
    this.user = null;
  }
}
