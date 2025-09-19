import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  template: `<h5 class="m-0">Current Time: {{ currentTime | date:'mediumTime' }}</h5>`,
})
export class ClockComponent implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  private intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.currentTime = new Date(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
