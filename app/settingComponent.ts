/**
 * Created by Jerry on 2017-01-27.
 */
import {Component, OnInit} from '@angular/core';
import {sharedService} from "./sharedService"


@Component({
  selector: 'Setting',
  template: `<div class="boarder">
             <h2>{{name}}</h2>
             <form>
                <fieldset>
                <legend>Algorithms</legend>
                <div>
             <label title="Select the type of coordinaotr who assigns calls">Global Coordinator :</label>
             <select #t (change)="callType(t.value,'C')">
               <option value='ConvenientFirst'>ConvenientFirst</option>
               <option value='RandomAssign'>RandomAssign</option>
               <option value='UpperLowerRegion'>UpperLowerRegion</option>
               <option value='LeastCalledFirst'>LeastCalledFirst</option>
             </select>
              </div>
             
             
             <div>
             <label>Default Idle Floor: </label>
             <select #x (change)="callType(x.value,'LC')">
               <option value="none">None(Traditional)</option>
               <option value="1">G</option>
               <option value="18">18</option>
               <option value="12">12</option>
             </select>
             </div>
               </fieldset>
               </form>
 
 
             <fieldset>
                <legend>Distribution</legend>
             <div>
             <label>FloorDistribution:</label>
             <button id="hide" class="btn"  (click)="hideChart()">{{sh}}</button>
             </div>
             
             <div [attr.class]="this.hide">
             <div>
             <label>B:</label>
             <select #a (change)="updateR(a.value, 0)" id="kk">
               <option *ngFor="let o of currentRange0" [attr.value]=o>{{o}}</option>
             </select>
             <label>G:</label>
             <select #b (change)="updateR(b.value, 1)">
               <option *ngFor="let o of currentRange1" [attr.value]=o>{{o}}</option>
             </select>
             <label>2:</label>
             <select #c (change)="updateR(c.value, 2)">
               <option *ngFor="let o of currentRange2" [attr.value]=o>{{o}}</option>
             </select>
             <label>3:</label>
             <select #d (change)="updateR(d.value, 3)">
               <option *ngFor="let o of currentRange3" [attr.value]=o>{{o}}</option>
             </select>
             <label>4:</label>
             <select #e (change)="updateR(e.value, 4)">
               <option *ngFor="let o of currentRange4" [attr.value]=o>{{o}}</option>
             </select>
             <label>5:</label>
             <select #f (change)="updateR(f.value, 5)">
               <option *ngFor="let o of currentRange5" [attr.value]=o>{{o}}</option>
             </select>
             <label>6:</label>
             <select #g (change)="updateR(g.value, 6)">
               <option *ngFor="let o of currentRange6" [attr.value]=o>{{o}}</option>
             </select>
             <label>7:</label>
             <select #h (change)="updateR(h.value, 7)">
               <option *ngFor="let o of currentRange7" [attr.value]=o>{{o}}</option>
             </select>
             <label>8:</label>
             <select #i (change)="updateR(i.value, 8)">
               <option *ngFor="let o of currentRange8" [attr.value]=o>{{o}}</option>
             </select>
             <label>9:</label>
             <select #j (change)="updateR(j.value, 9)">
               <option *ngFor="let o of currentRange9" [attr.value]=o>{{o}}</option>
             </select>
             </div>
             
             <div>
             <label>10:</label>
             <select #k (change)="updateR(k.value, 10)">
               <option *ngFor="let o of currentRange10" [attr.value]=o>{{o}}</option>
             </select>
             <label>11:</label>
             <select #l (change)="updateR(l.value, 11)">
               <option *ngFor="let o of currentRange11" [attr.value]=o>{{o}}</option>
             </select>
             <label>12:</label>
             <select #m (change)="updateR(m.value, 12)">
               <option *ngFor="let o of currentRange12" [attr.value]=o>{{o}}</option>
             </select>
             <label>13:</label>
             <select #n (change)="updateR(n.value, 13)">
               <option *ngFor="let o of currentRange13" [attr.value]=o>{{o}}</option>
             </select>
             <label>14:</label>
             <select #o (change)="updateR(o.value, 14)">
               <option *ngFor="let o of currentRange14" [attr.value]=o>{{o}}</option>
             </select>
             <label>15:</label>
             <select #p (change)="updateR(p.value, 15)">
               <option *ngFor="let o of currentRange15" [attr.value]=o>{{o}}</option>
             </select>
             <label>16:</label>
             <select #q (change)="updateR(q.value, 16)">
               <option *ngFor="let o of currentRange16" [attr.value]=o>{{o}}</option>
             </select>
             <label>17:</label>
             <select #r (change)="updateR(r.value, 17)">
               <option *ngFor="let o of currentRange17" [attr.value]=o>{{o}}</option>
             </select>
             <label>18:</label>
             <select #s (change)="updateR(s.value, 18)">
               <option *ngFor="let o of currentRange18" [attr.value]=o>{{o}}</option>
             </select>
             </div>
             <div>
             <chart [type]="type" [data]="data" [options]="options"></chart>
            
             </div>
             </div>
             
           
             <label>InsertionRate:</label>
             <select #z (change)="callType(z.value, 'R')">
               <option value=3>every 0.3sec(SuperBusy)</option>
               <option value=5>every 0.5sec(SuperBusy)</option>
               <option value=20>every sec(Busy)</option>
               <option value=40>every 2sec</option>
               <option value=60>every 3sec</option>
               <option value=80>every 4sec</option>
               <option value=100>every 5sec(Normal)</option>
               <option value=200>every 10sec</option>
               <option value=400>every 20sec</option>
               <option value=4000>every 200sec(MidNight)</option>     
             </select>
             </fieldset>

             </div>          
             `,
  styles: [`
    .boarder {
      width:89%;
      margin:auto;
      margin-top:10px;
      padding:10px;
      border: 5px double #999;
    }
    .hidden {
      display: none;
    }
    
    .btn {
      border-radius: 8px;
      outline: none;
      color: #fff;
      background-color: #3e3bfc;
    }
    

  `]
})
export class SettingComponent implements OnInit{
  k: boolean = false;
  name = 'Settings';
  spacing = "         ";
  hide: string = "N";
  sh: string = "Hide";
  // List contains option indices
  floorOpt: number[] = [];
  // List contains option values
  optValue: number[] = [];
  // Array of length equal to the current possible points left
  currentRange0: number[] = [];
  currentRange1: number[] = [];
  currentRange2: number[] = [];
  currentRange3: number[] = [];
  currentRange4: number[] = [];
  currentRange5: number[] = [];
  currentRange6: number[] = [];
  currentRange7: number[] = [];
  currentRange8: number[] = [];
  currentRange9: number[] = [];
  currentRange10: number[] = [];
  currentRange11: number[] = [];
  currentRange12: number[] = [];
  currentRange13: number[] = [];
  currentRange14: number[] = [];
  currentRange15: number[] = [];
  currentRange16: number[] = [];
  currentRange17: number[] = [];
  currentRange18: number[] = [];

  ngOnInit() {
    for (var i = 0; i < 100; i++) {
      this.currentRange0.push(i);
      this.currentRange1.push(i);
      this.currentRange2.push(i);
      this.currentRange3.push(i);
      this.currentRange4.push(i);
      this.currentRange5.push(i);
      this.currentRange6.push(i);
      this.currentRange7.push(i);
      this.currentRange8.push(i);
      this.currentRange9.push(i);
      this.currentRange10.push(i);
      this.currentRange11.push(i);
      this.currentRange12.push(i);
      this.currentRange13.push(i);
      this.currentRange14.push(i);
      this.currentRange15.push(i);
      this.currentRange16.push(i);
      this.currentRange17.push(i);
      this.currentRange18.push(i);
    }
    for (var i = 0; i < 19; i++) {
      this.floorOpt.push(i);
    }
    for (var i = 0; i < 19; i++) {
      this.optValue.push(0);
    }
  }


  type = 'bar';
  data = {
    labels: ["B", "G", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
    datasets: [
      {
        label: "FloorTasksDistribution",
        data: this._sharedService.dist
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };


  constructor(
    private _sharedService: sharedService) { }

  incSpd(i: number) {
    this._sharedService.eSpeeds[i] += 0.5;
  }

  decSpd(i: number) {
    this._sharedService.eSpeeds[i] -= 0.5;
  }

  callType(val:any, field:string) {
    if (field == "C") {
      this._sharedService.currentCoordinator = val;
      console.log(val);
    }
    else if (field == "R") {
      this._sharedService.rate = val;
    }
    else if (field == "LC") {
      this._sharedService.defaultIdleFloor = val;
    }
  }

  hideChart() {
    if (this.hide != "hidden") {
      this.hide = "hidden";
      this.sh = "Expand";
    }
    else {
      this.hide = "N";
      this.sh = "Hide";
    }
  }

  // The ith selection option get updated
  updateR(val:any, ind: number) {
    this.optValue[ind] = parseInt(val);
    var sum:number = 0;
    for (var i = 0; i < 19; i++) {
      sum = sum + this.optValue[i];
    }
    var remain:number = 100 - sum;
    this.currentRange0 = [];
    this.currentRange1 = [];
    this.currentRange2 = [];
    this.currentRange3 = [];
    this.currentRange4 = [];
    this.currentRange5 = [];
    this.currentRange6 = [];
    this.currentRange7 = [];
    this.currentRange8 = [];
    this.currentRange9 = [];
    this.currentRange10 = [];
    this.currentRange11 = [];
    this.currentRange12 = [];
    this.currentRange13 = [];
    this.currentRange14 = [];
    this.currentRange15 = [];
    this.currentRange16 = [];
    this.currentRange17 = [];
    this.currentRange18 = [];

    for (var i = 0; i < remain; i++) {
      this.currentRange0.push(i);
      this.currentRange1.push(i);
      this.currentRange2.push(i);
      this.currentRange3.push(i);
      this.currentRange4.push(i);
      this.currentRange5.push(i);
      this.currentRange6.push(i);
      this.currentRange7.push(i);
      this.currentRange8.push(i);
      this.currentRange9.push(i);
      this.currentRange10.push(i);
      this.currentRange11.push(i);
      this.currentRange12.push(i);
      this.currentRange13.push(i);
      this.currentRange14.push(i);
      this.currentRange15.push(i);
      this.currentRange16.push(i);
      this.currentRange17.push(i);
      this.currentRange18.push(i);
    }

    if (this.optValue[0] > this.currentRange0.length-1) {this.currentRange0.push(this.optValue[0]);}
    if (this.optValue[1] > this.currentRange0.length-1) {this.currentRange1.push(this.optValue[1]);}
    if (this.optValue[2] > this.currentRange0.length-1) {this.currentRange2.push(this.optValue[2]);}
    if (this.optValue[3] > this.currentRange0.length-1) {this.currentRange3.push(this.optValue[3]);}
    if (this.optValue[4] > this.currentRange0.length-1) {this.currentRange4.push(this.optValue[4]);}
    if (this.optValue[5] > this.currentRange0.length-1) {this.currentRange5.push(this.optValue[5]);}
    if (this.optValue[6] > this.currentRange0.length-1) {this.currentRange6.push(this.optValue[6]);}
    if (this.optValue[7] > this.currentRange0.length-1) {this.currentRange7.push(this.optValue[7]);}
    if (this.optValue[8] > this.currentRange0.length-1) {this.currentRange8.push(this.optValue[8]);}
    if (this.optValue[9] > this.currentRange0.length-1) {this.currentRange9.push(this.optValue[9]);}
    if (this.optValue[10] > this.currentRange0.length-1) {this.currentRange10.push(this.optValue[10]);}
    if (this.optValue[11] > this.currentRange0.length-1) {this.currentRange11.push(this.optValue[11]);}
    if (this.optValue[12] > this.currentRange0.length-1) {this.currentRange12.push(this.optValue[12]);}
    if (this.optValue[13] > this.currentRange0.length-1) {this.currentRange13.push(this.optValue[13]);}
    if (this.optValue[14] > this.currentRange0.length-1) {this.currentRange14.push(this.optValue[14]);}
    if (this.optValue[15] > this.currentRange0.length-1) {this.currentRange15.push(this.optValue[15]);}
    if (this.optValue[16] > this.currentRange0.length-1) {this.currentRange16.push(this.optValue[16]);}
    if (this.optValue[17] > this.currentRange0.length-1) {this.currentRange17.push(this.optValue[17]);}
    if (this.optValue[18] > this.currentRange0.length-1) {this.currentRange18.push(this.optValue[18]);}
    this._sharedService.dist = this.optValue;

    this.data = {
      labels: ["B", "G", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
      datasets: [
        {
          label: "Waiting",
          data: this.optValue
        }
      ]
    };

  }

  checkDisb() :number {
    return 20;
  }



}
