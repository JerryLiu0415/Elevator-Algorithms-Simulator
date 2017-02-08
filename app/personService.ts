/**
 * Created by Jerry on 2017-01-31.
 */
import {Person} from './person'
export class personService{
  public signal(rate: number):boolean {
    var rand:number = Math.floor(Math.random() * rate) + 1;
    //var rand1:number = parseInt((Math.random() * rate).toString(), 10);
    if (rand == 1) {
      return true;
    }
    return false;
  }

  public randomInsert(stoch: number[]): number {
    var psum: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    psum[0] = stoch[0];
    for (var i = 1; i < stoch.length; i++) {
      psum[i] = psum[i-1]+(stoch[i]);
    }
    var rand:number = Math.floor(Math.random() * 100);

    if (0 <= rand && rand < psum[0]) {
      //console.log("V" + rand);
      return 0;
    }
    for (var i = 1; i < psum.length; i++) {
      if (psum[i-1] < rand && rand < psum[i]) {
        //console.log("A" + i);
        return i;
      }
    }
    return 12;
  }

}
