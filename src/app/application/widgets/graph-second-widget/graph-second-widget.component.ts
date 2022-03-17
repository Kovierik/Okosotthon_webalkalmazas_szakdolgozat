import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { RoomTemperature } from 'src/app/protocol/protocol';
import { RoomTemperatureService } from '../../services/endpoints/room-temperature.service';

@Component({
  selector: 'app-graph-second-widget',
  templateUrl: './graph-second-widget.component.html',
  styleUrls: ['./graph-second-widget.component.scss'],
})
export class GraphSecondWidgetComponent implements OnInit, OnDestroy {
  public roomTemperature: RoomTemperature[] = [];
  public subscriptions: Subscription[] = [];
  public chart?: Chart<'line', number[], string>;

  constructor(
    private readonly roomTemperatureService: RoomTemperatureService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.roomTemperatureService.roomTemperature$.subscribe((response) => {
        this.roomTemperature = response;
        Chart.register(...registerables);
        this.secondChartLoad();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
  }

  public secondChartLoad(): void {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    const temperatureNumber: number[] = [];
    for (let index = 0; index < this.roomTemperature.length; index++) {
      if (index > this.roomTemperature.length - 11) {
        temperatureNumber.push(this.roomTemperature[index].temperature);
      }
    }

    const labelNumber: string[] = [];
    for (let index = 0; index < this.roomTemperature.length; index++) {
      if (index > this.roomTemperature.length - 11) {
        labelNumber.push(this.roomTemperature[index].time);
      }
    }

    this.chart = new Chart('myChart-two', {
      type: 'line',
      data: {
        datasets: [
          {
            data: temperatureNumber,
            label: 'Hőmérséklet értéke °C-ban',
            backgroundColor: '#6930c3',
            borderColor: '#72efdd',
          },
        ],
        labels: labelNumber,
      },
      options: {
        plugins: {
          tooltip: {},
        },
        animations: {
          tension: {
            duration: 2000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
          },
        },
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }
}
