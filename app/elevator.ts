/**
 * Created by Jerry on 2017-01-27.
 */
export class elevator{
  id: number;
  position: number;
  // idle, loading, running
  state: string;
  cd: number;
  innerCalls: number[] = [];
  outerCallsUp: number[] = [];
  outerCallsDown: number[] = [];
  heading: number = 1;
  direction: string = "up";
  innerButton: string[] = [];
  inService: boolean = true;
  Load: number = 0;
  capacity: number = 12;

  constructor(id: number) {
    this.id = id;
    this.position = 430;
    this.state = "idle";
    this.cd = 80;
    // 0 means basement
    for (var i = 0; i < 19; i++) {
      this.innerButton[i] = "normal";
    }
  }

  public inc() {
    this.position--;
  }
}
