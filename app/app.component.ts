import { Component } from '@angular/core';
import {sharedService} from "./sharedService"
import {controlComponent} from "./controlComponent"
import {animationComponent} from "./animationComponent"
import {SettingComponent} from "./settingComponent"

@Component({
  selector: 'my-app',
  template: `<h3>{{name}}</h3>
             <Setting></Setting>
             <Animation></Animation>
             <Control></Control>
             <stat></stat>`,
  providers: [sharedService],
  //directives: [controlComponent, animationComponent, SettingComponent]
})
export class AppComponent  { name:string = "Elevator system and algorithms simulator"; }
