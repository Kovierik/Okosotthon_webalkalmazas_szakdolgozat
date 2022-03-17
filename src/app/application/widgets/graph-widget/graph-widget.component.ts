import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { RoomTemperature } from 'src/app/protocol/protocol';
import { RoomTemperatureService } from '../../services/endpoints/room-temperature.service';

@Component({
  selector: 'app-graph-widget',
  templateUrl: './graph-widget.component.html',
  styleUrls: ['./graph-widget.component.scss'],
})
export class GraphWidgetComponent implements OnInit, OnDestroy {
  public roomTemperature: RoomTemperature[] = [];
  public subscriptions: Subscription[] = [];
  public chart?: Chart<'bar', (string | number)[], string>;

  constructor(
    private readonly roomTemperatureService: RoomTemperatureService,
    private readonly elementRef: ElementRef
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
  }

  ngOnInit(): void {
    const oldcanv = this.elementRef.nativeElement.querySelector(
      '[id="firstChart"]'
    ) as HTMLElement;

    const container = oldcanv.parentElement;
    if (!container) {
      return;
    }
    container.removeChild(oldcanv);

    const canv = document.createElement('canvas');
    canv.id = 'firstChart';
    container.appendChild(canv);

    this.subscriptions.push(
      this.roomTemperatureService.roomTemperature$.subscribe((response) => {
        this.roomTemperature = response;
        this.firstChartLoad();
      })
    );
  }

  public firstChartLoad(): void {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    const temperatureNumber: number[] = [];
    for (let index = 0; index < this.roomTemperature.length; index++) {
      if (index > this.roomTemperature.length - 6) {
        temperatureNumber.push(this.roomTemperature[index].temperature);
      }
    }

    const temperatureNumberAverage: number =
      (temperatureNumber[0] +
        temperatureNumber[1] +
        temperatureNumber[2] +
        temperatureNumber[3] +
        temperatureNumber[4]) /
      5;

    const labelNumber: string[] = [];
    for (let index = 0; index < this.roomTemperature.length; index++) {
      if (index > this.roomTemperature.length - 6) {
        labelNumber.push(this.roomTemperature[index].time);
      }
    }

    Chart.register(...registerables);
    this.chart = new Chart('firstChart', {
      type: 'bar',
      data: {
        labels: ['', 'Átlagérték', ''],
        datasets: [
          {
            label: 'Hőmérséklet maximum értéke °C-ban',
            data: ['', temperatureNumberAverage, ''],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
