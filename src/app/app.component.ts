import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateTime as Luxon } from 'luxon';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clock';
  time = signal('');
  date = signal('');
  isRunning = signal(false);
  stopwatchTime = signal(0);
  stopwatchTimeDisplay = signal('00:00:00');
  interval!: any;

  ngOnInit() {
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = Luxon.now();
    this.time.set(now.toFormat('HH:mm:ss'));
    this.date.set(now.toFormat('cccc, LLLL dd, yyyy'));
  }

  start() {
    this.isRunning.set(true);
    const startTime = Date.now();

    this.interval = setInterval(() => {
      const swTime = Date.now() - startTime;
      this.stopwatchTime.set(swTime);
      this.stopwatchTimeDisplay.set(this.formatTime(this.stopwatchTime()));
    }, 100);
  }

  stop() {
    this.isRunning.set(false);
    clearInterval(this.interval);
  }

  reset() {
    this.isRunning.set(false);
    clearInterval(this.interval);
    this.stopwatchTime.set(0);
    this.stopwatchTimeDisplay.set(this.formatTime(this.stopwatchTime()));
  }

  formatTime(time: number) {
    const totalSeconds = Math.floor(time / 1000);
    const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const ss = String(totalSeconds % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
}
