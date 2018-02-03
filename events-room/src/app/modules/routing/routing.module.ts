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
import { VerifyJwtService } from '../../services/verify-jwt.service';
import { LoungeReservationComponent } from '../../components/lounge-reservation/lounge-reservation.component';
import { ReservationsViewerComponent } from '../../components/reservations-viewer/reservations-viewer.component';
import { AgmCoreModule } from '@agm/core/core.module';
import { MyDatePickerModule } from 'mydatepicker';
//DatePicker
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
    path: "register",
    component: RegisterComponent
  },
  {
    path: "registered-user",
    component: RegisteredUserComponent,
    canActivate: [VerifyJwtService],
    children: [
      {
        path: "eventRoomViewer",
        component: EventRoomViewerComponent
      },
      {
        path: "loungeReservation",
        component: LoungeReservationComponent
      },
      {
        path: "reservationsViewer",
        component: ReservationsViewerComponent
      },
    ]
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
    RecaptchaModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvdm1fYge8bF93jTOmaPYaSUdVbnVZam0'
    }),
    MyDatePickerModule
  ],
  declarations: [
    HomeComponent,
    EventRoomViewerComponent,
    RegisterComponent,
    FooterComponent,
    MapComponent,
    RegisteredUserComponent,
    LoginComponent,
    LoungeReservationComponent,
    ReservationsViewerComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es', // Para setear el idioma
    },
    VerifyJwtService
  ],
})
export class RoutingModule { }
