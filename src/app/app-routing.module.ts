import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {StoresListComponent} from "./stores/stores-list/stores-list.component";
import {LoginComponent} from "./auth/login/login.component";
import {StoreCreateComponent} from "./stores/store-create/store-create.component";
import { AuthGuard } from './auth/auth.guard';

let routes: Routes;
routes = [
  {path: '', component: UserComponent},
  {path: 'create', component: StoreCreateComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: StoresListComponent, canActivate: [AuthGuard]},
  {path: 'edit/:storeId', component: StoreCreateComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
