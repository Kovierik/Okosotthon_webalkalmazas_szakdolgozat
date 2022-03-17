import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-time-widget',
  templateUrl: './time-widget.component.html',
  styleUrls: ['./time-widget.component.scss'],
})
export class TimeWidgetComponent implements OnInit {
  public currentTime?: Observable<Date>;

  constructor() {}

  ngOnInit(): void {
    this.currentTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    );
  }
}
