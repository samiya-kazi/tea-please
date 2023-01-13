import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import { ConfirmOrderFormComponent } from './components/confirm-order-form/confirm-order-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { HomeComponent } from './pages/home/home.component';
import { KitchenComponent } from './pages/kitchen/kitchen.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'kitchen', component: KitchenComponent },
  { path: 'order', component: HomeComponent, children: [
    { path: '', component: AddItemFormComponent },
    { path: 'cart', component: ConfirmOrderFormComponent },
    { path: 'log', component: OrderListComponent },
  ]},
  { path: '**', redirectTo: '/order'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
