import { Component, VERSION } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <button (click)="randomNumber()">random</button><br />
    <button (click)="findBigPrime()">hard calculations</button><br />
    <button (click)="findBigPrimeWorker()">
      same hard calculations with Worker</button
    ><br />
    {{ output1 }}<br />
    {{ output2 }}<br />
  `
})
export class AppComponent {
  output1: string = '';
  output2: string = '';
  worker: Worker|undefined;

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker('./app.worker', { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        this.output2 = data;
      };
    } else {
      console.log('Web Workers are not supported in this environment.');
    }
  }

  randomNumber() {
    this.output1 = Math.random().toString();
  }

  findBigPrime() {
    this.output2 = find_big_prime().toString();
  }

  findBigPrimeWorker() {
    this.worker?.postMessage("John");
  }
}

function find_big_prime() {
  let start = Math.floor(Math.random() * 1000000000);
  let is_prime = false;
  while (!is_prime) {
    is_prime = test_prime(start);
    start++;
  }
  return start;
}

function test_prime(n:number) {
  if (n === 1) {
    return false;
  } else if (n === 2) {
    return true;
  } else {
    for (var x = 2; x < n; x++) {
      if (n % x === 0) {
        return false;
      }
    }
    return true;
  }
}