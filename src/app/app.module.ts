import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {GaugeModule} from 'angular-gauge'
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {SearchBarComponent} from './search-bar/search-bar.component';
import {HomeComponent} from './home/home.component';
import {HttpHeadersInterceptor} from "./interceptors/http-headers.interceptor";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import { DetailsComponent } from './details/details.component';
import {GameTabsComponent} from './game-tabs/game-tabs.component';
import {MatIconModule} from "@angular/material/icon";
import {FooterComponent} from './footer/footer.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {InterceptorService} from "./services/interceptor.service";
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    DetailsComponent,
    GameTabsComponent,
    FooterComponent,
    MainNavComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        GaugeModule.forRoot(),
        MatFormFieldModule,
        MatSelectModule,
        MatTabsModule,
        MatIconModule,
        InfiniteScrollModule,
        MatDividerModule,
        MatProgressBarModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule

    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : HttpHeadersInterceptor,
      multi :true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass : HttpErrorInterceptor,
      multi : true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass : InterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
