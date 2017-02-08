/**
 * Created by Jerry on 2017-01-30.
 */
import {elevator} from './elevator';
import {Person} from './person';
export class coordinatorService {
  public selectElevator(elevators: elevator[], alg: string, p: Person): number {
    var numInService: number = 0;
    var indices: number[] = [];
    for (var i = 0; i < elevators.length; i++) {
      if (elevators[i].inService) {
        numInService++;
        indices.push(i);
      }
    }

    // No elevators to coordinate
    if (numInService == 0) {
      return 0;
    }
    // Only one elevator, no need to coordinate
    else if (numInService == 1) {
      return elevators[indices[0]].id;
    }

    else {
      switch (alg) {
        // Using worst case distance as score to find the most suitable elevator
        case "ConvenientFirst":
          var scrores: number[] = [100, 100, 100];
          var ppos:number = -20 * p.src + 450;
          for (var i = 0; i < 3; i++) {
              // Person is waiting above
              if (ppos <= elevators[i].position) {
                //DOWN-DOWN
                if (elevators[i].direction == "down" && p.dst < p.src) {
                  scrores[i] = 2*(450-90) - (elevators[i].position-ppos);
                }
                // DOWN-UP
                else if (elevators[i].direction == "down" && p.dst > p.src) {
                  scrores[i] = (450-elevators[i].position)*2 + (elevators[i].position-ppos);
                }
                // UP-UP
                else if (elevators[i].direction == "up" && p.dst > p.src) {
                  scrores[i] = elevators[i].position-ppos;
                }
                // UP-DOWN
                else {
                  scrores[i] = ((elevators[i].position - 90) * 2) - (elevators[i].position - ppos);
                }
              }
              else {
                //DOWN-DOWN
                if (elevators[i].direction == "down" && p.dst < p.src) {
                  scrores[i] = -elevators[i].position+ppos;
                }
                // DOWN-UP
                else if (elevators[i].direction == "down" && p.dst > p.src) {
                  scrores[i] = (450-elevators[i].position)*2 - (-elevators[i].position+ppos);
                }
                // UP-UP
                else if (elevators[i].direction == "up" && p.dst > p.src) {
                  scrores[i] = 2*(450-90) - (-elevators[i].position+ppos);
                }
                // UP-DOWN
                else {
                  scrores[i] = (elevators[i].position-90)*2 + (-elevators[i].position+ppos);
                }
              }
          }

         for (var i = 0; i < 3; i++) {
           if (!elevators[i].inService ||
             elevators[i].Load >= (elevators[i].capacity + elevators[i].outerCallsDown.length)) {
             scrores[i] = 1000;
           }
         }

          var min: number = 1000;
          for (var s of scrores) {
              if (s < min) {
                min = s;
              }
          }
          return scrores.indexOf(min);
        case "RandomAssign":
          return Math.floor(Math.random() * 3);
        case "UpperLowerRegion":
          if (p.src > 10) {
            return Math.floor(Math.random() * 2);
          }
          else {
            return 2;
          }
        case "LeastCalledFirst":
          var sc:number[] = [0,0,0];
          sc[0] = elevators[0].innerCalls.length + elevators[0].outerCallsDown.length+
              elevators[0].outerCallsUp.length;
          sc[1] = elevators[1].innerCalls.length + elevators[1].outerCallsDown.length+
            elevators[1].outerCallsUp.length;
          sc[2] = elevators[2].innerCalls.length + elevators[2].outerCallsDown.length+
            elevators[2].outerCallsUp.length;
          var min = 50;
          for (var i = 0; i < elevators.length; i++) {
            if (sc[i] < min) {
              min = sc[i];
            }
          }
          return sc.indexOf(min);
        case "U":
          var sc:number[] = [0,0,0];
          sc[0] = elevators[0].innerCalls.length + elevators[0].outerCallsDown.length+
            elevators[0].outerCallsUp.length;
          sc[1] = elevators[1].innerCalls.length + elevators[1].outerCallsDown.length+
            elevators[1].outerCallsUp.length;
          sc[2] = elevators[2].innerCalls.length + elevators[2].outerCallsDown.length+
            elevators[2].outerCallsUp.length;
          var min = 50;
          for (var i = 0; i < elevators.length; i++) {
            if (sc[i] < min) {
              min = sc[i];
            }
          }
          return sc.indexOf(min);
        default:
          return 2;
      }
    }
  }
}
