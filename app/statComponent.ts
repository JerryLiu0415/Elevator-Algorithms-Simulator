/**
 * Created by Jerry on 2017-01-27.
 */
import {Component, OnInit} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {sharedService} from "./sharedService"
import {Observable} from 'rxjs/Rx';
//var fs = require('fs');



@Component({
  selector: 'stat',
  template: `<div class="boarder"> 
             <h2>Statistics</h2>
             
             <fieldset>
             <legend>DatasetHandling</legend>
            
       
             <button id="hide" class="btn"  (click)="hideChart(0)">Save dataset</button>
             <button id="hide" class="btng"  (click)="clearDataset()">Clear dataset</button>
             </fieldset>
             
             <fieldset>
             <legend>Waiting Distribution</legend>
             <label>General Waiting Histogram</label>
             <div [attr.class]="hide[0]">
             <chart [type]="type" [data]="data" [options]="options"></chart>
             </div>
             
             <div>
             <label>Relative Waiting Histogram</label>
             <button id="hide" class="btn"  (click)="hideChart(1)">{{bt[1]}}</button>
             </div>
             <div [attr.class]="hide[1]">
             <chart [type]="type" [data]="data2" [options]="options"></chart>
             </div>
             </fieldset>
             
             <fieldset>
             <legend>Elevaotr useage</legend>
             <div>
             <label>Useage between elevators</label>
             </div>
             <div [attr.class]="hide[0]">
             <chart [type]="type3" [data]="data3" [options]="options"></chart>
             </div>
             </fieldset>
             
             
        
             </div>`,
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
     .btng {
      border-radius: 8px;
      outline: none;
      color: #fff;
      background-color: #fc0d00;
    }
  `]
})
export class statComponent implements OnInit{
  constructor (private _sharedService: sharedService){}
  ngOnInit() {
    // Timer that updates the world
    let timer = Observable.timer(0, 5000);
    timer.subscribe(t => this.change());

  }
  bt: string[] = ["Hide", "Hide"];
  hide: string[] = ["N", "N"];
  type = 'bar';
  type3 = 'pie';
  data = {
  labels: ["0s-10s", "10s-20s", "20s-30s", "30s-40s", "40s-50s", "50s-60s", "60s-70s", "70s<"],
  datasets: [
    {
      label: "Waiting (s/trip)",
      data: [0,0,0,0,0,0]
    }
    ]
  };

  data2 = {
    labels: ["1s-1.5s", "1.5s-2s", "2s-2.5s", "2.5s-3s", "3s-3.5s", "3.5s-4s", "4s-4.5s", "4.5s-5s", "5s-5.5s", "5.5<"],
    datasets: [
      {
        label: "Relative Waiting (s/floor)",
        data: [0,0,0,0,0,0,0,0,0,0]
      }
    ]
  };

  data3 = {
    labels: ["left", "middle", "right"],
    datasets: [
      {
        label: "Elevator useage",
        data: [0,0,0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ]
      }
    ]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  change() {
    this.data = {
      labels: ["0s-10s", "10s-20s", "20s-30s", "30s-40s", "40s-50s", "50s-60s", "60s-70s", "70s-80s", "80<"],
      datasets: [
        {
          label: "Waiting (s/trip)",
          data:
            [ this._sharedService.statHist[0].length
            , this._sharedService.statHist[1].length
            , this._sharedService.statHist[2].length
            , this._sharedService.statHist[3].length
            , this._sharedService.statHist[4].length
            , this._sharedService.statHist[5].length
            , this._sharedService.statHist[6].length
            , this._sharedService.statHist[7].length
            , this._sharedService.statHist[8].length],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 0, 0, 0.2)'
          ]
        }
      ]
    }
    this.data2 = {
      labels: ["1s-2s", "2s-3s", "3s-4s", "4s-5s", "5s-6s", "6s-7s", "7s-8s", "8s<"],
      datasets: [
        {
          label: "RelativeWaiting (s/floor)",
          data: [ this._sharedService.relaHist[0].length
            , this._sharedService.relaHist[1].length
            , this._sharedService.relaHist[2].length
            , this._sharedService.relaHist[3].length
            , this._sharedService.relaHist[4].length
            , this._sharedService.relaHist[5].length
            , this._sharedService.relaHist[6].length
            , this._sharedService.relaHist[7].length]
        }
      ]
    };

    this.data3 = {
      labels: ["left", "middle", "right"],
      datasets: [
        {
          label: "Elevator useage",
          data: [this._sharedService.eUseage[0].length,this._sharedService.eUseage[1].length,
            this._sharedService.eUseage[2].length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ]
        }
      ]
    };

  }

  hideChart(ind: number) {
    if (this.hide[ind] == "N") {
      this.hide[ind] = "hidden";
      this.bt[ind] = "Expand";
    }
    else {
      this.hide[ind] = "N";
      this.bt[ind] = "Hide";
    }
  }
  saveDataset() {
    this._sharedService.relaHist = [[],[],[],[],[],[],[],[]];
    this._sharedService.statHist = [[],[],[],[],[],[],[],[],[]];
    this._sharedService.dataSet["servicedPeople"] = [];
  }

  clearDataset() {
    this._sharedService.relaHist = [[],[],[],[],[],[],[],[]];
    this._sharedService.statHist = [[],[],[],[],[],[],[],[],[]];
    this._sharedService.dataSet["servicedPeople"] = [];
    alert("All data removed");
  }




}
