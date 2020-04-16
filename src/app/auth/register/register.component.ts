import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { AuthService } from "src/app/_services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { trigger, style, animate, transition } from "@angular/animations";
import { ValidationService } from "src/app/_services/validation.service";
import { User } from "src/app/_models/user.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms ease-in-out", style({ opacity: 1 }))
      ])
      // transition(":leave", [
      //   style({ transform: "translateX(0)", opacity: 1 }),
      //   animate("500ms", style({ transform: "translateX(100%)", opacity: 0 }))
      // ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  avatar: File = null;
  user: User;
  placeholderImg;
  username: string;
  email: string;
  password: string;
  url: string;
  data: any;
  isEmailValid: boolean;
  isUsernameValid: boolean;
  isPasswordValid: boolean;
  private referrer;

  // Get the HTML Elements to add validation classes to them
  @ViewChild("inputPassword", { read: ElementRef }) inputPassword: ElementRef;
  @ViewChild("inputEmail", { read: ElementRef }) inputEmail: ElementRef;
  @ViewChild("inputUsername", { read: ElementRef }) inputUsername: ElementRef;

  constructor(
    private validationService: ValidationService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.referrer = this.route.snapshot.queryParams;
    console.log(this.referrer);
    // const routeParams = this.activeRoute.snapshot.params;
    // this.route.snapshot.queryParams.subscribe(params => {
    //   this.referrer = params;
    //   console.log(this.referrer);
    // });
  }

  onFileSelected(event) {
    this.avatar = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

  removeInvalidClass(event) {
    let type = event.target.type;
    switch (type) {
      case "text":
        this.inputUsername.nativeElement.classList.remove("invalid");
        break;
      case "email":
        this.inputEmail.nativeElement.classList.remove("invalid");
        break;
      case "password":
        this.inputPassword.nativeElement.classList.remove("invalid");
        break;
      default:
      // code block
    }
    console.log(event.target.type);
  }

  onUsernameEntered() {
    // Validate username
    if (!this.validationService.validateUsername(this.username)) {
      this.inputUsername.nativeElement.classList.add("invalid");
      this.isUsernameValid = false;
      window.alert(
        "Username must be at least 6 characters long and cannot contain spaces or special characters."
      );
      console.log("Invalid username");
    } else {
      this.inputUsername.nativeElement.classList.remove("invalid");
      this.isUsernameValid = true;
    }
  }

  onEmailEntered() {
    // Validate email
    if (!this.validationService.validateEmail(this.email)) {
      this.inputEmail.nativeElement.classList.add("invalid");
      this.isEmailValid = false;
      console.log("Invalid email");
    } else {
      this.inputEmail.nativeElement.classList.remove("invalid");
      this.isEmailValid = true;
    }
  }

  onPasswordEntered() {
    // Validate password
    if (!this.validationService.validatePassword(this.password)) {
      this.inputPassword.nativeElement.classList.add("invalid");
      this.isPasswordValid = false;
      window.alert(
        "password must contain: 1 lowercase, 1 uppercase, 1 special character and must be at least 8 characters long"
      );
      console.log("Invalid password");
    } else {
      this.inputPassword.nativeElement.classList.remove("invalid");
      this.isPasswordValid = true;
    }
  }

  onRegisterSubmit() {
    // same format as multipart/form-data
    const fd = new FormData();

    const user = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    const referrer = {
      referrer: this.referrer
    };

    // Required fields
    if (!this.validationService.validateRegister(user)) {
      console.log("Fill in all fields");
      return false;
    }
    // Validation email
    if (!this.validationService.validateEmail(user.email)) {
      console.log("Invalid email");
      return false;
    }
    // Validation password
    if (!this.validationService.validatePassword(user.password)) {
      console.log("Invalidpassword");
      return false;
    }
    // Validation avatar
    if (this.avatar !== null) {
      if (!this.validationService.validateAvatar(this.avatar.name)) {
        window.alert("Profile image must be a valid image");
        console.log("Invalid file");
        return false;
      }
      // Append avatar to FormData
      fd.append("photo", this.avatar, this.avatar.name);
    }

    fd.append("user", JSON.stringify(user));
    fd.append("referrer", JSON.stringify(referrer));

    //Register user
    this.authService.registerUser(fd).subscribe(data => {
      this.data = data;
      if (this.data.success) {
        this.authService.authenticateUser(user);
        this.router.navigate(["/"]);
      } else {
        this.router.navigate(["/register"]);
      }
    });
  }
}
