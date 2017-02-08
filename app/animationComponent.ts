/**
 * Created by Jerry on 2017-01-27.
 */
import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import { NgFor } from '@angular/common';
import {Observable} from 'rxjs/Rx';
import {sharedService} from "./sharedService"
import {elevator} from './elevator';
import {elevatorService} from './elevatorService';
import {coordinatorService} from './coordinatorService';
import {Person} from './person'
import {personService} from "./personService";



@Component({
  selector: 'Animation',
  template: `<div class="boarder"><h2>{{name}}</h2>
             <svg width="430" height="500" class="boarder">
             <text  x="0" y="0" font-family="Verdana" font-size="10">
                {{this._sharedService.globalhr.toString() + ":" + this._sharedService.globalmin.toString()
                + ":" + this._sharedService.globals.toString()}}
             </text>
             <line *ngFor="let f of floors"
                  [attr.y1]="f"
                  [attr.y2]="f"
                  x1="50"
                  x2="225"
                  style="stroke:rgb(99,99,99);stroke-width:2"
             />
             <rect *ngFor="let e of elevators"
                  [attr.y]="this._sharedService.elevators[(e-50)/20].position" 
                  [attr.x]="e" rx="3" ry="3" width="20" height="20"
                  style="stroke:rgb(198, 197, 192);stroke-width:2"
             />
             <line *ngFor="let e of elevatorsRope"
                  [attr.y2]="this._sharedService.elevators[(e-54)/20].position" [attr.x2]="e" [attr.x1]="e" y1="90" 
                  style="stroke:rgb(198, 197, 192);stroke-width:1"
             />
             <line *ngFor="let e of elevatorsRope2"
                  [attr.y2]="this._sharedService.elevators[(e-66)/20].position" [attr.x2]="e" [attr.x1]="e" y1="90" 
                  style="stroke:rgb(198, 197, 192);stroke-width:1"
             />
             
             
             <text  x="241" y="81" font-family="Verdana" font-size="10" rotate="180">
                V
             </text>
             <text  x="254" y="88" font-family="Verdana" font-size="10">
                V
             </text>
             <rect *ngFor="let b of btsUp" x="230" [attr.y]="b" rx="3" ry="3"  width="15" height="15" 
             (click)="clcBtnU((b-450)/-20)" [attr.class]="this._sharedService.OUBS[(b-450)/-20]"/>
             <rect *ngFor="let b of btsDown" x="250" [attr.y]="b" rx="3" ry="3"  width="15" height="15"
             (click)="clcBtnD((b-450)/-20)" [attr.class]="this._sharedService.ODBS[(b-450)/-20]"/>
                
             <line x1="30" y1="450" x2="440" y2="450"
                style="stroke:rgb(99,99,99);stroke-width:4"/>
             
             <line x1="50" y1="90" x2="50" y2="450"
                style="stroke:rgb(99,99,99);stroke-width:5"/>
             
             <line x1="400" y1="90" x2="400" y2="450"
                style="stroke:rgb(99,99,99);stroke-width:5"/>
               
             <line x1="50" y1="90" x2="225" y2="30"
                style="stroke:rgb(99,99,99);stroke-width:5"/>
             <line x1="225" y1="30" x2="400" y2="90"
                style="stroke:rgb(99,99,99);stroke-width:5"/>
             <text x="450" y="40" font-family="Verdana" font-size="15">
                {{"Pos:  " + this._sharedService.elevators[0].position}}
             </text>
             <text x="450" y="60" font-family="Verdana" font-size="15">
                {{ "Dir:  " +this._sharedService.elevators[0].direction}}
             </text>
             <text x="450" y="80" font-family="Verdana" font-size="15">
                {{"Head:  " + this._sharedService.elevators[0].heading}}
             </text>
             <text x="450" y="100" font-family="Verdana" font-size="15">
                {{"State:  " + this._sharedService.elevators[0].state}}
             </text>
             <text x="450" y="120" font-family="Verdana" font-size="15">
                {{"CD:  " + this._sharedService.elevators[0].cd}}
             </text>
             
              <text x="450" y="140" font-family="Verdana" font-size="15">
                {{"IN:  " + this._sharedService.elevators[0].innerCalls}}
             </text>
              <text x="450" y="160" font-family="Verdana" font-size="15">
                {{"OU:  " + this._sharedService.elevators[0].outerCallsUp}}
             </text>
             <text x="450" y="180" font-family="Verdana" font-size="15" text="df">
                {{"OD:  " + this._sharedService.elevators[0].outerCallsDown}}
             </text>
              <text x="450" y="200" font-family="Verdana" font-size="15" text="df">
                {{"Load:  " + this._sharedService.elevators[0].Load}}
             </text>
             <text *ngFor="let i of innerBt1" [attr.x]="450+correction(i)" 
             [attr.y]="i+15" font-family="Verdana" font-size="15" text="df">
                {{transCol1(i)}}
             </text>
             <text *ngFor="let i of innerBt2" [attr.x]="475+correction(i)" 
             [attr.y]="i+15" font-family="Verdana" font-size="15" text="df">
                {{transCol2(i)}}
             </text>
             <text *ngFor="let i of innerBt2" [attr.x]="500+correction(i)" 
             [attr.y]="i+15" font-family="Verdana" font-size="15" text="df">
                {{transCol3(i)}}
             </text>
             <rect *ngFor="let i of innerBt1" x="450" [attr.y]="i" rx="3" ry="3"  width="20" height="20" 
             [attr.class] = "this._sharedService.IB[0][transTotal(transCol1(i))]" (click)="clcBtnIn(transCol1(i),0)" />
             <rect *ngFor="let i of innerBt2" x="475" [attr.y]="i" rx="3" ry="3"  width="20" height="20" 
             [attr.class] = "this._sharedService.IB[0][transTotal(transCol2(i))]" (click)="clcBtnIn(transCol2(i),0)"/>
             <rect *ngFor="let i of innerBt2" x="500" [attr.y]="i" rx="3" ry="3"  width="20" height="20" 
             [attr.class] = "this._sharedService.IB[0][transTotal(transCol3(i))]" (click)="clcBtnIn(transCol3(i),0)"/>
             
             
             <text x="600" y="40" font-family="Verdana" font-size="15">
                {{"Pos:  " + this._sharedService.elevators[1].position}}
             </text>
             <text x="600" y="60" font-family="Verdana" font-size="15">
                {{ "Dir:  " +this._sharedService.elevators[1].direction}}
             </text>
             <text x="600" y="80" font-family="Verdana" font-size="15">
                {{"Head:  " + this._sharedService.elevators[1].heading}}
             </text>
             <text x="600" y="100" font-family="Verdana" font-size="15">
                {{"State:  " + this._sharedService.elevators[1].state}}
             </text>
             <text x="600" y="120" font-family="Verdana" font-size="15">
                {{"CD:  " + this._sharedService.elevators[1].cd}}
             </text>
             
              <text x="600" y="140" font-family="Verdana" font-size="15">
                {{"IN:  " + this._sharedService.elevators[1].innerCalls}}
             </text>
              <text x="600" y="160" font-family="Verdana" font-size="15">
                {{"OU:  " + this._sharedService.elevators[1].outerCallsUp}}
             </text>
             <text x="600" y="180" font-family="Verdana" font-size="15" text="df">
                {{"OD:  " + this._sharedService.elevators[1].outerCallsDown}}
             </text>
              <text x="600" y="200" font-family="Verdana" font-size="15" text="df">
                {{"Load:  " + this._sharedService.elevators[1].Load}}
             </text>
             <text *ngFor="let i of innerBt1" [attr.x]="600+correction(i)" 
             [attr.y]="i+15" font-family="Verdana" font-size="15" text="df">
                {{transCol1(i)}}
             </text>
             <text *ngFor="let i of innerBt2" [attr.x]="625+correction(i)" 
             [attr.y]="i+15" font-family="Verdana" font-size="15" text="df">
                {{transCol2(i)}}
             </text>
             <text *ngFor="let i of innerBt2" [attr.x]="650+correction(i)" 
             [attr.y]="i+15" font-family="Verdana" font-size="15" text="df">
                {{transCol3(i)}}
             </text>
             <rect *ngFor="let i of innerBt1" x="600" [attr.y]="i" rx="3" ry="3"  width="20" height="20" 
             [attr.class] = "this._sharedService.IB[1][transTotal(transCol1(i))]" (click)="clcBtnIn(transCol1(i),1)" />
             <rect *ngFor="let i of innerBt2" x="625" [attr.y]="i" rx="3" ry="3"  width="20" height="20" 
             [attr.class] = "this._sharedService.IB[1][transTotal(transCol2(i))]" (click)="clcBtnIn(transCol2(i),1)"/>
             <rect *ngFor="let i of innerBt2" x="650" [attr.y]="i" rx="3" ry="3"  width="20" height="20" 
             [attr.class] = "this._sharedService.IB[1][transTotal(transCol3(i))]" (click)="clcBtnIn(transCol3(i),1)"/>
             
             <text x="750" y="40" font-family="Verdana" font-size="15">
                {{"Pos:  " + this._sharedService.elevators[2].position}}
             </text>
             <text x="750" y="60" font-family="Verdana" font-size="15">
                {{ "Dir:  " +this._sharedService.elevators[2].direction}}
             </text>
             <text x="750" y="80" font-family="Verdana" font-size="15">
                {{"Head:  " + this._sharedService.elevators[2].heading}}
             </text>
             <text x="750" y="100" font-family="Verdana" font-size="15">
                {{"State:  " + this._sharedService.elevators[2].state}}
             </text>
             <text x="750" y="120" font-family="Verdana" font-size="15">
                {{"CD:  " + this._sharedService.elevators[2].cd}}
             </text>
             
              <text x="750" y="140" font-family="Verdana" font-size="15">
                {{"IN:  " + this._sharedService.elevators[2].innerCalls}}
             </text>
              <text x="750" y="160" font-family="Verdana" font-size="15">
                {{"OU:  " + this._sharedService.elevators[2].outerCallsUp}}
             </text>
             <text x="750" y="180" font-family="Verdana" font-size="15" text="df">
                {{"OD:  " + this._sharedService.elevators[2].outerCallsDown}}
             </text>
              <text x="750" y="200" font-family="Verdana" font-size="15" text="df">
                {{"Load:  " + this._sharedService.elevators[2].Load}}
             </text>
             <text *ngFor="let i of innerBt1" [attr.x]="750+correction(i)" 
             [attr.y]="i+15" font-family="Verdana" font-size="15" text="df">
                {{transCol1(i)}}
             </text>
             <text *ngFor="let i of innerBt2" [attr.x]="775+correction(i)" 
             [attr.y]="i+15" font-family="Verdana" font-size="15" text="df">
                {{transCol2(i)}}
             </text>
             <text *ngFor="let i of innerBt2" [attr.x]="800+correction(i)" 
             [attr.y]="i+15" font-family="Verdana" font-size="15" text="df">
                {{transCol3(i)}}
             </text>
             <rect *ngFor="let i of innerBt1" x="750" [attr.y]="i" rx="3" ry="3"  width="20" height="20" 
             [attr.class] = "this._sharedService.IB[2][transTotal(transCol1(i))]" (click)="clcBtnIn(transCol1(i),2)" />
             <rect *ngFor="let i of innerBt2" x="775" [attr.y]="i" rx="3" ry="3"  width="20" height="20" 
             [attr.class] = "this._sharedService.IB[2][transTotal(transCol2(i))]" (click)="clcBtnIn(transCol2(i),2)"/>
             <rect *ngFor="let i of innerBt2" x="800" [attr.y]="i" rx="3" ry="3"  width="20" height="20" 
             [attr.class] = "this._sharedService.IB[2][transTotal(transCol3(i))]" (click)="clcBtnIn(transCol3(i),2)"/>
             
             <text x="477" y="415">
             Power
             </text>
             <rect x="475" y="400" rx="5" ry="5"  width="45" height="20" 
             [attr.class] = "inService[0]" (click)="clcService(0)" />
             <text x="627" y="415">
             Power
             </text>
             <rect x="625" y="400" rx="5" ry="5"  width="45" height="20" 
             [attr.class] = "inService[1]" (click)="clcService(1)" />
             <text x="777" y="415">
             Power
             </text>
             <rect x="775" y="400" rx="5" ry="5"  width="45" height="20" 
             [attr.class] = "inService[2]" (click)="clcService(2)" />
             </svg>
                
             </div>`,
  styles: [`
    .boarder {
      width:89%;
      margin:auto;
      margin-top:10px;
      padding:10px;
      border: 5px double #999;
      
    }
    .normal {
      fill:#ffffff;
      stroke:black;
      stroke-width:1;
      opacity:0.5
    }
    .selected {
      fill:#ffe900;
      stroke:#000000;
      stroke-width:1;
      opacity:0.5
    }
    .normalF {
      fill:#00ff0c;
      stroke:black;
      stroke-width:1;
      opacity:0.5
    }
    .selectedF {
      fill:#ff0008;
      stroke:#000000;
      stroke-width:1;
      opacity:0.5
    }
    rect.normal:hover, rect.normal:active {
      fill: #ddfaff ;
     
    }
    
  `]
})
export class animationComponent implements OnInit {
  floors: string[] =
    ["90", "110",
    "130", "150", "170", "190", "210",
    "230", "250", "270", "290", "310",
    "330", "350", "370", "390", "410",
    "330", "350", "370", "390", "410",
    "430", "450", "470"];
  btsUp: string[] =
    ["110",
      "130", "150", "170", "190", "210",
      "230", "250", "270", "290", "310",
      "330", "350", "370", "390", "410",
      "330", "350", "370", "390", "410",
      "430", "450"];
  btsDown: string[] =
    ["90", "110",
      "130", "150", "170", "190", "210",
      "230", "250", "270", "290", "310",
      "330", "350", "370", "390", "410",
      "330", "350", "370", "390", "410",
      "430"];
  txts: string[] =
     ["90", "110",
      "130", "150", "170", "190", "210",
      "230", "250", "270", "290", "310",
      "330", "350", "370", "390", "410",
      "330", "350", "370", "390", "410",
      "430", "450"];
  innerBt1: number[] =
    [250, 275, 300, 325, 350, 375, 400];
  innerBt2: number[] =
    [250, 275, 300, 325, 350, 375];
  elevators: string[] =
    ["50", "70", "90"];
  elevatorsRope: string[] =
    ["54", "74", "94"];
  elevatorsRope2: string[] =
    ["66", "86", "106"];
  inService: string[] =
    ["normalF", "normalF", "normalF"];


  name = 'Animation';
  pos:number;

  constructor(
    private _sharedService: sharedService,
    private es: elevatorService,
    private cs: coordinatorService,
    private ps: personService) { }

  ngOnInit() {
    this.pos = this._sharedService.pos;
    // Timer that updates the world
    let timer = Observable.timer(0, 25);
    timer.subscribe(t => this.update());

  }

  // Called
  update() {
    this._sharedService.globals++;
    if (this._sharedService.globals == 60) {
      this._sharedService.globals = 0;
      this._sharedService.globalmin++;
    }
    if (this._sharedService.globalmin == 60) {
      this._sharedService.globalmin = 0;
      this._sharedService.globalhr++;
    }
    if (this._sharedService.globalhr == 24) {
      this._sharedService.globalmin = 0;
      this._sharedService.globalhr = 0;
      this._sharedService.globalmin = 0;
    }
    if (this.ps.signal(this._sharedService.rate)) {
      var src:number = this.ps.randomInsert(this._sharedService.dist);
      var dst:number = 1;
      while (src == dst) {
        dst = this.ps.randomInsert(this._sharedService.dist)
      }
      var p:Person = new Person(src, dst);
      this._sharedService.people.push(p);
      if(p.src < p.dst) {
        this.clcBtnU(p.src);
      }
      else {
        this.clcBtnD(p.src);
      }
    }

    for (let e of this._sharedService.elevators) {
      if (e.inService) {
        var signal:number = this.es.nextState(e, this._sharedService);
      }
    }
    for (let p of this._sharedService.people) {
      p.wait++;
    }
  }

  clcBtnU(ind: number) {
    var selectedInd: number =
      this.cs.selectElevator(this._sharedService.elevators, this._sharedService.currentCoordinator, new Person(ind,ind+1));
    if (this._sharedService.OUBS[ind] == "normal") {
      this._sharedService.OUBS[ind] = "selected";
      this._sharedService.elevators[selectedInd].outerCallsUp.push(ind);
    }
    return;
  }
  clcBtnD(ind: number) {
    var selectedInd: number =
      this.cs.selectElevator(this._sharedService.elevators, this._sharedService.currentCoordinator, new Person(ind,ind-1));
    if (this._sharedService.ODBS[ind] == "normal") {
      this._sharedService.ODBS[ind] = "selected";
      this._sharedService.elevators[selectedInd].outerCallsDown.push(ind);
    }
    return;
  }
  clcBtnIn(ind: string, eid: number) {
      var indAsInt:number = this.transTotal(ind);
      if (this._sharedService.IB[eid][indAsInt] == "normal") {
        this._sharedService.IB[eid][indAsInt] = "selected";
        this._sharedService.elevators[eid].innerCalls.push(indAsInt);
      }
      return;
  }
  clcService(ind: number) {
    this._sharedService.elevators[ind].inService = !this._sharedService.elevators[ind].inService;
    if (this._sharedService.elevators[ind].inService) {
      this.inService[ind] = "normalF";
      this._sharedService.elevators[ind].state = "idle";

    }
    else {
      this.inService[ind] = "selectedF";
      this._sharedService.elevators[ind].state = "OutOfService";
      this._sharedService.elevators[ind].cd = 0;
    }

  }




  correction(n: number): number {
    if (n >= 325) {return 5;}
    return 0;
  }
  transTotal(s: string): number {
    var res = -1;
    if (s == "B") {return 0;}
    if (s == "G") {return 1;}
    if (s == "18") {return 18;}
    if (s == "17") {return 17;}
    if (s == "16") {return 16;}
    if (s == "15") {return 15;}
    if (s == "14") {return 14;}
    if (s == "13") {return 13;}
    if (s == "12") {return 12;}
    if (s == "11") {return 11;}
    if (s == "10") {return 10;}
    if (s == "9") {return 9;}
    if (s == "8") {return 8;}
    if (s == "7") {return 7;}
    if (s == "6") {return 6;}
    if (s == "5") {return 5;}
    if (s == "4") {return 4;}
    if (s == "3") {return 3;}
    if (s == "2") {return 2;}
    else return -1;
  }
  transCol1(n: number): string {
    switch (n) {
      case 250:
        return "18";
      case 275:
        return "15";
      case 300:
        return "12";
      case 325:
        return "9";
      case 350:
        return "6";
      case 375:
        return "3";
      default:
        return "B";
    }
  }

  transCol2(n: number): string {
    switch (n) {
      case 250:
        return "17";
      case 275:
        return "14";
      case 300:
        return "11";
      case 325:
        return "8";
      case 350:
        return "5";
      case 375:
        return "2";
      default:
        return "";
    }
  }

  transCol3(n: number): string {
    switch (n) {
      case 250:
        return "16";
      case 275:
        return "13";
      case 300:
        return "10";
      case 325:
        return "7";
      case 350:
        return "4";
      case 375:
        return "G";
      default:
        return "";
    }
  }

}
