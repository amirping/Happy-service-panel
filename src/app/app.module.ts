import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute, RouterLinkActive, CanActivate } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { NopageComponent } from './nopage/nopage.component';
import { OptionsComponent } from './options/options.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AvatarModule } from 'ngx-avatar';
import { FullLogComponent } from './full-log/full-log.component';
import { ActivityComponent } from './activity/activity.component';
import { SettingsComponent } from './settings/settings.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthServiceService } from './services/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthguardGuard } from './services/authguard.guard';
import { UserService } from './services/user.service';
import { OrdersComponent, OrderItemInfoComponent } from './orders/orders.component';
import { RtSocketService } from './services/rt-socket.service';
import { OrderService } from './services/order.service';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationService } from './services/reservation.service';
import { CdkTableModule } from '@angular/cdk/table';
const routes: Routes = [
  {
    path: 'main', component: MainComponent, canActivate: [AuthguardGuard], children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'full_log', component: FullLogComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NopageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    NopageComponent,
    AnalyticsComponent,
    OptionsComponent,
    FullLogComponent,
    ActivityComponent,
    SettingsComponent,
    OrdersComponent,
    OrderItemInfoComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    AvatarModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  entryComponents: [OrderItemInfoComponent],
  providers: [AuthServiceService, AuthguardGuard, UserService, RtSocketService, OrderService, ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
