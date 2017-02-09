/**
 * Created by Jerry on 2017-01-27.
 */
import {elevator} from './elevator';
import {sharedService} from "./sharedService";

export class elevatorService {

  public nextState(e: elevator, ss: sharedService) : number {
    var state:string = e.state;
    switch (state) {
      // - Idle state stands for the all cases when the current elevator
      //   has not assigned any calls. Elevators escape from idle state
      //   when its to do list is no longer empty.
      // - If the elevator idles on the top or bottom floor, its direction
      //   should automatically changed.
      // - If default idle floor presents, and elevator is not staying
      //   at its default floor it should heading to its idle floor now.
      // - If the idle state is terminated due to a call just outside the
      //   elevator, it should goes into loading state before running.
      // - If the idle state is terminated due to a call at different floor
      //   the elevator switches to running state directly
      // - Before the elevator is ready to go, it asks local coordinator
      //   the next heading floor
      case "idle":
        // Top/Bot floor reached
        if (e.position == 90 && e.direction == "up") {
          this.reverseDir(e);
        }
        if (e.position == 470 && e.direction == "down") {
          this.reverseDir(e);
        }
        // Check if default floor is specified
        if (ss.defaultIdleFloor != "none") {
          switch (ss.defaultIdleFloor) {
            case "1":
              if (e.position != this.findPos(1)) {
                e.innerCalls.push(1);
              }
              break;
            case "18":
              if (e.position != this.findPos(18)) {
                e.innerCalls.push(18);
              }
              break;
            case "12":
              if (e.position != this.findPos(12)) {
                e.innerCalls.push(12);
              }
              break;
            default:
              break;
          }
        }
        // If the elevator is called, exit idle state to either loading or running state.
        if (e.innerCalls.length != 0 || e.outerCallsDown.length != 0 || e.outerCallsUp.length != 0) {
          // Asking for heading before go
          e.heading = this.findHeading(e, ss.currentLocalCoordinator);
          // If neighbour call exists, enter loading state
          if (this.neighbourCall(e)) {
            e.cd = 50;
            e.state = "loading";
            return -1;
          }
          e.state = "running";
          return -1;
        }
        break;

      // - Running state stands for the cases the elevator is moving,
      //   no picking up or loading people isn't allowed until it goes
      //   into loading state.
      // - If elevator hasn't reach its goal floor, moving towards that
      //   that direction
      // - If elevator reaches its heading floor, set cd and enters loading state
      case "running":
        e.heading = this.findHeading(e, ss.currentLocalCoordinator);
        // Heading floor reached
        var epos:number = this.findPos(e.heading);
        if (epos == e.position) {
          e.cd = 50;
          e.state = "loading";
          return -1;
        }
        else if (epos > e.position) {
          // Acceleration effect
          // if ((epos-e.position) < 20) {
          //   e.position += 0.5;
          //   return -1;
          // }
          e.position++;
          return -1;
        }
        else if (epos < e.position) {
          // Acceleration effect
          // if ((-epos+e.position) < 20) {
          //   e.position -= 0.5;
          //   return -1;
          // }
          e.position--;
          return -1;
        }
        break;

      // - Loading state stands for the cases the elevator is waiting for people,
      //   decrement cd on each cycle and terminates when cd is non-positive
      // - Remove calls done properly based on moving direction
      // - People/stat update
      case "loading":
        if (e.cd <= 0) {
          e.cd = 0;
          if (e.innerCalls.length == 0 && e.outerCallsDown.length == 0 && e.outerCallsUp.length == 0) {
            e.state = "idle";
            return -1;
          }
          else {
            e.heading = this.findHeading(e, ss.currentLocalCoordinator);
            e.state = "running";
            return -1;
          }
        }
        // Dec cd
        e.cd--;
        // Getting indices of calls that matching current floor
        var oldHeading:number = e.heading;
        var innerInd:number = e.innerCalls.indexOf(oldHeading);
        var outerDownInd:number = e.outerCallsDown.indexOf(oldHeading);
        var outerUpInd:number = e.outerCallsUp.indexOf(oldHeading);
        // Inner matching calls must be removed
        if (innerInd != -1) {
          e.innerCalls.splice(innerInd, 1);
          ss.IB[e.id][oldHeading] = "normal";
        }
        // Outer down matching calls must be removed if elevator is moving down
        if (outerDownInd != -1 && e.direction == "down") {
          e.outerCallsDown.splice(outerDownInd, 1);
          ss.ODBS[oldHeading] = "normal";
        }
        // Outer up matching calls must be removed if elevator is moving up
        if (outerUpInd != -1 && e.direction == "up") {
          e.outerCallsUp.splice(outerUpInd, 1);
          ss.OUBS[oldHeading] = "normal";
        }
        // Checking for pickup/release people
        for (var p of ss.people) {
          // If elevator position matches someone's src and he is not serviced
          if ((e.position == this.findPos(p.src) && !p.serviced)) {
            // If elevator is going no where, picking everybody up.
            if(e.innerCalls.length == 0 && e.outerCallsDown.length == 0 && e.outerCallsUp.length == 0) {
              p.serviced = true;
              p.at = e.id;
              e.cd += 10;
              e.Load++;
              ss.IB[e.id][p.dst] = "selected";
              // People push inner buttons according to their dst
              if (e.innerCalls.indexOf(p.dst) == -1) {
                e.innerCalls.push(p.dst);
                ss.IB[e.id][p.dst] = "selected";
              }
              return p.dst;
            }
            // If elevator is moving up and people is going up
            else if (e.direction == "up" && p.dst>p.src) {
              p.serviced = true;
              p.at = e.id;
              e.cd += 10;
              e.Load++;
              // People push inner buttons according to their dst
              if (e.innerCalls.indexOf(p.dst) == -1) {
                e.innerCalls.push(p.dst);
                ss.IB[e.id][p.dst] = "selected";
              }
              return p.dst;
            }
            // If elevator is moving down and people is goind down
            else if (e.direction == "down" && p.dst<p.src) {
              p.serviced = true;
              p.at = e.id;
              e.cd += 10;
              e.Load++;
              // People push inner buttons according to their dst
              if (e.innerCalls.indexOf(p.dst) == -1) {
                e.innerCalls.push(p.dst);
                ss.IB[e.id][p.dst] = "selected";
              }
              return p.dst;
            }
          }
          // Elevator position matches someone's dst who is already serviced
          // That person must be inside the current elevator, (p.at). Release
          else if (e.position == this.findPos(p.dst) && e.id == p.at && p.serviced) {
            // Tracking his index for removal
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

      // If out-of-service, return silently
      case "OutOfService":
        break;
      default:
        break;
    }
    return -1;
  }

  // Return position base on floor number
  public findPos(floor: number): number {
    return -20*floor+450;
  }

  // Return true if the calls is at the same floor
  public neighbourCall(e: elevator) : boolean {
    for (var c of e.outerCallsUp) {
      if (this.findPos(c) == e.position) {return true;}

    }
    for (var c of e.outerCallsDown) {
      if (this.findPos(c) == e.position) {return true;}
    }
    return false;
  }

  // Local algorithms goes here
  //
  //
  //
  public findHeading(e: elevator, type: string): number {
    switch (type) {
      // Scan gives calls that matches current moving direction a higher priority
      // Traditional and most efficient local algorithm
      case "scan":
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
              return this.findHeading(e, "scan");
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
              return this.findHeading(e, "scan");
            }
          }
        }
        break;
      // Blind to the moing directions, serves in fifo manner
      case "fifo":
        break;
      default:
        break;
    }
  }

  // Reverse current direction
  public reverseDir(e: elevator) {
    if (e.direction == "up") {
      e.direction = "down";
      return;
    }
    else {
      e.direction = "up";
      return;
    }
  }
}
