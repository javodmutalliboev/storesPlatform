import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {StoreCreateComponent} from "./stores/store-create/store-create.component";
import {UserComponent} from "./user/user.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoginComponent} from "./auth/login/login.component";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatPaginatorModule} from '@angular/material/paginator';
import {StoresListComponent} from "./stores/stores-list/stores-list.component";
import { AuthInterceptor } from './auth/auth-interceptor';
import {ErrorInterceptor} from "./error-interceptor";
import {MatDialogModule} from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StoreCreateComponent,
    UserComponent,
    LoginComponent,
    StoresListComponent,
    ErrorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [Title, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
