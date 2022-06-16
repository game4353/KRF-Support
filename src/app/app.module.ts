import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './router-strategy';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterComponent } from './character/character.component';
import { IconComponent } from './icon/icon.component';
import { MessagesComponent } from './messages/messages.component';
import { PlayerComponent } from './player/player.component';
import { FruitComponent } from './fruit/fruit.component';
import { SupportComponent } from './support/support.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    IconComponent,
    MessagesComponent,
    PlayerComponent,
    FruitComponent,
    SupportComponent,
    LoadingComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }, 
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
