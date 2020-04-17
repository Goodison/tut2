import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { trigger, style, animate, transition } from "@angular/animations";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("500ms", style({ opacity: 0 }))
      ])
    ]),
    trigger("formEnterAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms 500ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("500ms", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  data: any;
  usernameConfirmed = false;
  lookingForUser = false;
  showNoSuchUserMsg = false;
  showWelcomeMsg = false;
  showForm = true;
  private anim: any;
  public noSuchUserConfig: Object;

  constructor(private authService: AuthService, private router: Router) {
    this.noSuchUserConfig = {
      path: "../../../../assets/1055-world-locations.json",
      autoplay: true,
      loop: false
    };
  }

  ngOnInit() { }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    console.log(user);
    this.authService.authenticateUser(user).subscribe(data => {
      this.data = data;
      if (this.data.success) {
        this.authService.storeUserData(this.data.token, this.data.user);
        this.startLoggedInAnimation();
        console.log(this.data.user);
      } else if (this.data.msg == "no such user") {
        this.startUserNotFoundAnimation();
      } else {
        console.log("wrong password");
      }
    });
  }

  onShowForm() {
    this.showForm = true;
  }
  // ANIMATION TIMERS
  startLoggedInAnimation() {
    this.showForm = false;
    this.lookingForUser = true;
    setTimeout(() => {
      this.showWelcomeMsg = true;
    }, 800);
    setTimeout(() => {
      this.router.navigate([""]);
      console.log(this.usernameConfirmed);
    }, 2400);
  }
  startUserNotFoundAnimation() {
    this.showForm = false;
    this.lookingForUser = true;
    setTimeout(() => {
      this.showNoSuchUserMsg = true;
    }, 800);
    setTimeout(() => {
      this.lookingForUser = false;
      this.showNoSuchUserMsg = false;
      this.showForm = true;
      console.log(this.usernameConfirmed);
    }, 2400);
  }
}
