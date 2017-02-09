/**
 * Created by Jerry on 2017-01-27.
 */
import {Injectable} from '@angular/core';
import {elevator} from './elevator';
import {Person} from './person'

@Injectable()
export class sharedService {

  // Stat
  statHist: number[][] = [[],[],[],[],[],[],[],[],[]];
  relaHist: number[][] = [[],[],[],[],[],[],[],[]];
  dataSet: any = {
    "globalAlg" : this.currentCoordinator,
    "servicedPeople": []
  };
  eUseage: number[][] = [[],[],[]];



  // Clock
  clockRate: number = 50;
  globals: number = 0;
  globalmin: number = 0;
  globalhr: number = 0;

  // Default settings
  start: boolean = true;
  eSpeeds: number[] = [0.5, 0.5, 0.5];
  pos: number = 430;

  rate:number = 40;
  dist:number[] = [2,20,1,2,0,2,2,3,5,5,5,5,5,5,5,3,10,10,10];

  elevators: elevator[] = [new elevator(0), new elevator(1), new elevator(2)];
  people: Person[] = [];
  currentCoordinator: string = "ConvenientFirst";
  currentLocalCoordinator: string = "scan";
  defaultIdleFloor: string = "none";
  OUBS: string[] =
    [ "normal", "normal",
      "normal", "normal", "normal", "normal", "normal",
      "normal", "normal", "normal", "normal", "normal",
      "normal", "normal", "normal", "normal", "normal",
      "normal", "normal"];

  ODBS: string[] =
    [ "normal", "normal",
      "normal", "normal", "normal", "normal", "normal",
      "normal", "normal", "normal", "normal", "normal",
      "normal", "normal", "normal", "normal", "normal",
      "normal", "normal"];

  IB: string[][] =
    [[ "normal", "normal",
      "normal", "normal", "normal", "normal", "normal",
      "normal", "normal", "normal", "normal", "normal",
      "normal", "normal", "normal", "normal", "normal",
      "normal", "normal"],
      [ "normal", "normal",
        "normal", "normal", "normal", "normal", "normal",
        "normal", "normal", "normal", "normal", "normal",
        "normal", "normal", "normal", "normal", "normal",
        "normal", "normal"],
      [ "normal", "normal",
        "normal", "normal", "normal", "normal", "normal",
        "normal", "normal", "normal", "normal", "normal",
        "normal", "normal", "normal", "normal", "normal",
        "normal", "normal"]];

  public statUpdate(p: Person) {
    // Updating dataset
    this.dataSet["globalAlg"] = this.currentCoordinator;
    this.dataSet["servicedPeople"].push(p);
    // Updating histogram
    for (var i = 0; i < 9; i++) {
      if (i==8 && p.wait >= 1600) {
        this.statHist[8].push(p.wait);
        break;
      }
      if (i*200 <= p.wait && p.wait < (i+1)*200) {
        this.statHist[i].push(p.wait);
      }
    }
    // Updating relative histogram
    var rela:number = (p.wait/20)/(Math.abs(p.src-p.dst));
    for (var i = 0; i < 8; i++) {
      if (i==7 && rela >= 8) {
        this.relaHist[7].push(rela);
        break;
      }
      if (i+1 <= rela && rela < i+2) {
        this.relaHist[i].push(rela);
      }
    }

    // Updating elevator useage
    for (var i = 0; i < 3; i++) {
      if (p.at == i){
        this.eUseage[i].push(0);
      }
    }

  }


}
