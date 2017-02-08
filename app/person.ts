/**
 * Created by Jerry on 2017-01-30.
 */
export class Person{
  src: number;
  dst: number;
  wait: number;
  called: boolean;
  serviced: boolean;
  at: number;

  constructor(src:number, dst:number) {
    this.dst = dst;
    this.src = src;
    this.wait = 0;
    this.serviced = false;
    this.called = false;
    this.at = 3;
  }
}
