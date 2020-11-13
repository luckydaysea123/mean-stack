import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { EquipmentComponent } from './component/equipment/equipment.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EquipmentActionComponent } from './component/equipment/action/action.component';
import { UserComponent } from './component/user/user.component';
import { ActionComponent } from './component/user/action/action.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './component/error/error.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { AuthComponent } from './service/auth/auth.component';
import { AuthInterceptor } from './auth.interceptor';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [
    AppComponent,
    EquipmentComponent,
    LoginComponent,
    RegisterComponent,
    EquipmentActionComponent,
    UserComponent,
    ActionComponent,
    ErrorComponent,
    NavigationComponent,
    AuthComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
