import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterComponent } from './character/character.component';
import { IconComponent } from './icon/icon.component';
import { MessagesComponent } from './messages/messages.component';
import { PlayerComponent } from './player/player.component';
import { WeaponComponent } from './weapon/weapon.component';
import { FruitComponent } from './fruit/fruit.component';
import { SupportComponent } from './support/support.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    IconComponent,
    MessagesComponent,
    PlayerComponent,
    WeaponComponent,
    FruitComponent,
    SupportComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
