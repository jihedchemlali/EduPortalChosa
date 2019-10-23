import { AgePipe } from './age.pipe';
import {NgZone} from "@angular/core";

class NgZoneMock {
  runOutsideAngular (fn: Function) {
    return fn();
  }
  run(fn: Function) {
    return fn();
  }
};


describe('AgePipe', () => {
  it('create an instance', () => {
    const pipe = new AgePipe(null, new NgZoneMock() as NgZone);

    expect(pipe).toBeTruthy();
  });
});
