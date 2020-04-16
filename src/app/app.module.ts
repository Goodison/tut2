import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { LottieAnimationViewModule } from "lottie-angular2";
import { AppComponent } from './app.component';
import { ServersComponent } from './servers/servers.component';
import { FeatherModule } from 'angular-feather';
import { Moon, Bell, BarChart, Wifi, AlertCircle, Power } from 'angular-feather/icons';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { HttpClientModule } from '@angular/common/http';

// Select some icons (use an object, not an array)
const icons = {
  Moon,
  Bell,
  BarChart,
  Wifi,
  AlertCircle,
  Power
};

@NgModule({
  declarations: [
    AppComponent,
    ServersComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LottieAnimationViewModule.forRoot(),
    FeatherModule.pick(icons)

  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
