import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from '../node_modules/angular2-chartjs';


// Components
import { AppComponent }  from './app.component';
import { SettingComponent }  from './settingComponent';
import { animationComponent }  from './animationComponent';
import { controlComponent }  from './controlComponent';
import { statComponent} from './statComponent';
import {elevatorService} from "./elevatorService";
import {coordinatorService} from "./coordinatorService";
import {personService} from "./personService";


@NgModule({
  imports:      [ BrowserModule, ChartModule ],
  declarations: [ AppComponent, SettingComponent, animationComponent, controlComponent, statComponent],
  bootstrap:    [ AppComponent ],
  providers:    [elevatorService, coordinatorService, personService]
})
export class AppModule {}
