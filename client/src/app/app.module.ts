import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { KitchenComponent } from './pages/kitchen/kitchen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { ApiInceptorService } from './services/api-inceptor.service';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import { ConfirmOrderFormComponent } from './components/confirm-order-form/confirm-order-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    KitchenComponent,
    NavBarComponent,
    HomeComponent,
    OrderCardComponent,
    AddItemFormComponent,
    ConfirmOrderFormComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
