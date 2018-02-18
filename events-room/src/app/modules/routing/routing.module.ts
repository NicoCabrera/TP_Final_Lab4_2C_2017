import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../../components/home/home.component';
import { EventRoomViewerComponent } from '../../components/event-room-viewer/event-room-viewer.component';
import { RegisterComponent } from '../../components/register/register.component';
import { FooterComponent } from '../../components/footer/footer.component';
//Map
import { NguiMapModule} from '@ngui/map';

//Captcha
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
//Charts
import { ChartsModule } from 'ng2-charts';
//Pipes
import { LocationPipe } from '../../pipes/location.pipe';
import { RolPipe } from '../../pipes/rol.pipe';

import { RegisteredUserComponent } from '../../components/registered-user/registered-user.component';
import { LoginComponent } from '../../components/login/login.component';
import { VerifyJwtService } from '../../services/verify-jwt.service';
import { LoungeReservationComponent } from '../../components/lounge-reservation/lounge-reservation.component';
import { ReservationsViewerComponent } from '../../components/reservations-viewer/reservations-viewer.component';
import { MyDatePickerModule } from 'mydatepicker';
import { GuestListEditorComponent } from '../../components/guest-list-editor/guest-list-editor.component';
import { HomeHeaderComponent } from '../../components/home-header/home-header.component';
import { UnregisteredEventRoomViewerComponent } from '../../components/unregistered-event-room-viewer/unregistered-event-room-viewer.component';
import { AttendantComponent } from '../../components/attendant/attendant.component';
import { CancelationComponent } from '../../components/cancelation/cancelation.component';
import { ChangeReservationDateComponent } from '../../components/change-reservation-date/change-reservation-date.component';
import { ChangeDateComponent } from '../../components/change-date/change-date.component';
import { GuestListViewerComponent } from '../../components/guest-list-viewer/guest-list-viewer.component';
import { GuestListDetailViewerComponent } from '../../components/guest-list-detail-viewer/guest-list-detail-viewer.component';
import { QuizComponent } from '../../components/quiz/quiz.component';
import { ChartsComponent } from '../../components/charts/charts.component';
import { AdminUsersComponent } from '../../components/admin-users/admin-users.component';
import { AdminUsersRegisterComponent } from '../../components/admin-users-register/admin-users-register.component';
import { AdminUsersDeleteComponent } from '../../components/admin-users-delete/admin-users-delete.component';
import { AdminUsersUpdateComponent } from '../../components/admin-users-update/admin-users-update.component';
import { AdminUsersUpdateDetailComponent } from '../../components/admin-users-update-detail/admin-users-update-detail.component';
import { ChartsQuizComponent } from '../../components/charts-quiz/charts-quiz.component';
import { AuthModule } from '../auth/auth.module';

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
    path: "unregistered-room-viewer",
    component: UnregisteredEventRoomViewerComponent
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
      {
        path: "guestListEditor",
        component: GuestListEditorComponent
      },
      {
        path: "attendant",
        component: AttendantComponent
      },
      {
        path: "cancelation",
        component: CancelationComponent
      },
      {
        path: "change-reservation-date",
        component: ChangeReservationDateComponent
      },
      {
        path: "change-date",
        component: ChangeDateComponent
      },
      {
        path: "guest-list-viewer",
        component: GuestListViewerComponent
      },
      {
        path: "guest-list-detail-viewer",
        component: GuestListDetailViewerComponent
      },
      {
        path: "admin-users",
        component: AdminUsersComponent
      },
      {
        path: "charts",
        component: ChartsComponent
      },
      {
        path: "quiz",
        component: QuizComponent
      },
      {
        path: "update-user",
        component: AdminUsersUpdateDetailComponent
      },
      {
        path: "chart-quiz",
        component: ChartsQuizComponent
      }
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
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAvdm1fYge8bF93jTOmaPYaSUdVbnVZam0'}),
    MyDatePickerModule,
    ChartsModule,
    AuthModule
  ],
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    EventRoomViewerComponent,
    RegisterComponent,
    FooterComponent,
    RegisteredUserComponent,
    LoginComponent,
    LoungeReservationComponent,
    ReservationsViewerComponent,
    GuestListEditorComponent,
    UnregisteredEventRoomViewerComponent,
    AttendantComponent,
    CancelationComponent,
    ChangeReservationDateComponent,
    ChangeDateComponent,
    GuestListViewerComponent,
    GuestListDetailViewerComponent,
    QuizComponent,
    ChartsComponent,
    AdminUsersComponent,
    AdminUsersRegisterComponent,
    AdminUsersDeleteComponent,
    LocationPipe,
    RolPipe,
    AdminUsersUpdateComponent,
    AdminUsersUpdateDetailComponent,
    ChartsQuizComponent
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
