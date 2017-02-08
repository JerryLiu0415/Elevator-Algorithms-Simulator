/**
 * Created by Jerry on 2017-01-27.
 */
import { Component } from '@angular/core';
import {sharedService} from "./sharedService"

@Component({
  selector: 'Control',
  template: `
<div class="boarder">
<h2>{{name}}</h2>
<label></label>
</div>`,
  styles: [`
    .boarder {
      width:89%;
      margin:auto;
      margin-top:10px;
      padding:10px;
      border: 5px double #999; 
    }
  `]
})
export class controlComponent  {
  pos: number;
  name = "Training";
  constructor(
    private _sharedService: sharedService) { }

  ngOnInit() {
    this.pos = this._sharedService.pos;
  }
}
