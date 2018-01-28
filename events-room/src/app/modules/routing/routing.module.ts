import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../../components/home/home.component';
import { EventRoomViewerComponent } from '../../components/event-room-viewer/event-room-viewer.component';
import { RegisterComponent } from '../../components/register/register.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MapComponent } from '../../components/map/map.component';
//Captcha
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RegisteredUserComponent } from '../../components/registered-user/registered-user.component';
import { LoginComponent } from '../../components/login/login.component';
const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  { 
    path: "eventRoomViewer",
    component: EventRoomViewerComponent
  },
  { 
    path: "register",
    component: RegisterComponent
  },
  { 
    path: "registered-user",
    component: RegisteredUserComponent
  },
  { 
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    RecaptchaModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    EventRoomViewerComponent,
    RegisterComponent,
    FooterComponent,
    MapComponent,
    RegisteredUserComponent,
    LoginComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es', // Para setear el idioma
    },
  ],
})
export class RoutingModule { }
