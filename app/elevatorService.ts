/**
 * Created by Jerry on 2017-01-27.
 */
import {elevator} from './elevator';
import {sharedService} from "./sharedService";

export class elevatorService {


  public nextState(e: elevator, ss: sharedService) : number {
    var state:string = e.state;
    switch (state) {
      case "idle":
        if (e.position == 90) {
        e.direction = "down";
        }
        if (e.position == 470) {
          e.direction = "up";
        }
        // If the elevator is called, exit idle state to either loading or running state.
        if (e.innerCalls.length != 0 || e.outerCallsDown.length != 0 || e.outerCallsUp.length != 0) {
          e.heading = this.findHeading(e);
          if (this.outCall(e)) {
            e.cd = 50;
            e.state = "loading";
            return -1;
          }
          e.state = "running";
          return -1;
        }
        break;
      case "running":
        e.heading = this.findHeading(e);
        if (this.findPos(e.heading) == e.position) {
          e.cd = 50;
          e.state = "loading";
          return -1;
        }
        else if (this.findPos(e.heading) > e.position) {
          e.position++;
          return -1;
        }
        else if (this.findPos(e.heading) < e.position) {
          e.position--;
          return -1;
        }
        break;
      case "loading":
        if (e.cd <= 0) {
          e.cd = 0;
          if (e.innerCalls.length == 0 && e.outerCallsDown.length == 0 && e.outerCallsUp.length == 0) {
            e.state = "idle";
            return -1;
          }
          else {
            e.heading = this.findHeading(e);
            e.state = "running";
            return -1;
          }
        }
        e.cd--;
        var oldHeading:number = e.heading;
        var innerInd:number = e.innerCalls.indexOf(oldHeading);
        var outerDownInd:number = e.outerCallsDown.indexOf(oldHeading);
        var outerUpInd:number = e.outerCallsUp.indexOf(oldHeading);
        if (innerInd != -1) {
          e.innerCalls.splice(innerInd, 1);
          ss.IB[e.id][oldHeading] = "normal";
        }
        if (outerDownInd != -1 && e.direction == "down") {
          e.outerCallsDown.splice(outerDownInd, 1);
          ss.ODBS[oldHeading] = "normal";
        }
        if (outerUpInd != -1 && e.direction == "up") {
          e.outerCallsUp.splice(outerUpInd, 1);
          ss.OUBS[oldHeading] = "normal";
        }

        for (var p of ss.people) {
          if ((e.position == this.findPos(p.src) && !p.serviced)) {
            if(e.innerCalls.length == 0 && e.outerCallsDown.length == 0 && e.outerCallsUp.length == 0) {
              p.serviced = true;
              p.at = e.id;
              e.cd += 10;
              e.Load++;
              ss.IB[e.id][p.dst] = "selected";
              if (e.innerCalls.indexOf(p.dst) == -1) {
                e.innerCalls.push(p.dst);
                ss.IB[e.id][p.dst] = "selected";
              }
              return p.dst;
            }
            else if (e.direction == "up" && p.dst>p.src) {
              p.serviced = true;
              p.at = e.id;
              e.cd += 10;
              e.Load++;
              if (e.innerCalls.indexOf(p.dst) == -1) {
                e.innerCalls.push(p.dst);
                ss.IB[e.id][p.dst] = "selected";
              }
              return p.dst;
            }
            else if (e.direction == "down" && p.dst<p.src) {
              p.serviced = true;
              p.at = e.id;
              e.cd += 10;
              e.Load++;
              if (e.innerCalls.indexOf(p.dst) == -1) {
                e.innerCalls.push(p.dst);
                ss.IB[e.id][p.dst] = "selected";
              }
              return p.dst;
            }
          }
          else if (e.position == this.findPos(p.dst) && e.id == p.at) {
            var ind:number = ss.people.indexOf(p);
            e.cd += 10;
            e.Load--;
            if (ss.IB[e.id][p.dst] == "selected") {
              ss.IB[e.id][p.dst] = "normal";
            }
            // Stat update
            ss.statUpdate(p);
            ss.people.splice(ind,1);

          }
        }

        break;
      case "OutOfService":
        break;
      default:
        break;
    }
    return -1;
  }

  public findPos(floor: number): number {
    return -20*floor+450;
  }

  public outCall(e: elevator) : boolean {
    for (var c of e.outerCallsUp) {
      if (this.findPos(c) == e.position) {return true;}

    }
    for (var c of e.outerCallsDown) {
      if (this.findPos(c) == e.position) {return true;}
    }
    return false;
  }

  public findHeading(e: elevator): number {
    var dir: string = e.direction;
    var visibleCalls: number[] = [];

    // If direction is up
    if (dir == "up") {
      // Select calls (distinct) of priority1
      for (var c of e.innerCalls) {
        if (this.findPos(c) <= e.position) {
          visibleCalls.push(c);
        }
      }
      for (var c of e.outerCallsUp) {
        if (this.findPos(c) <= e.position && visibleCalls.indexOf(c) == -1) {
          visibleCalls.push(c);
        }
      }
      // Find the lowest floor going up first
      if (visibleCalls.length != 0) {
        var minFloor: number = 20;
        for (var c of visibleCalls) {
          if (c < minFloor) {
            minFloor = c;
          }
        }
        return minFloor;
      }

      // No call of first priority, consider secondary priority calls
      if (visibleCalls.length == 0) {
        // Find the highest floor going down
        var maxFloor: number = -2;
        for (var c of e.outerCallsDown) {
          if (this.findPos(c) < e.position) {
            visibleCalls.push(c);
          }
        }
        if (visibleCalls.length != 0) {
          for (var c of visibleCalls) {
            if (c > maxFloor) {
              maxFloor = c;
            }
          }
          return maxFloor;
        }
        // No calls above, reverse direction
        else {
          e.direction = "down";
          return this.findHeading(e);
        }
      }
    }

    // Moving direction is down
    else {
      // Select calls (distinct) of priority1
      for (var c of e.innerCalls) {
        if (this.findPos(c) >= e.position) {
          visibleCalls.push(c);
        }
      }
      for (var c of e.outerCallsDown) {
        if (this.findPos(c) >= e.position && visibleCalls.indexOf(c) == -1) {
          visibleCalls.push(c);
        }
      }
      // Find the highest floor going down first
      if (visibleCalls.length != 0) {
        var maxFloor: number = -2;
        for (var c of visibleCalls) {
          if (c > maxFloor) {
            maxFloor = c;
          }
        }
        return maxFloor;
      }

      // No call of first priority, consider secondary priority calls
      if (visibleCalls.length == 0) {
        // Find the lowest floor going up
        var minFloor: number = 20;
        for (var c of e.outerCallsUp) {
          if (this.findPos(c) > e.position) {
            visibleCalls.push(c);
          }
        }
        if (visibleCalls.length != 0) {
          for (var c of visibleCalls) {
            if (c < minFloor) {
              minFloor = c;
            }
          }
          return minFloor;
        }
        // No calls above, reverse direction
        else {
          e.direction = "up";
          return this.findHeading(e);
        }
      }
    }
  }

  public findDir(e: elevator, ): string {
    return "";

  }
}
