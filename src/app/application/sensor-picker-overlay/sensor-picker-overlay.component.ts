import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenHandlerService } from 'src/app/authentication/token-handler.service';
import { Device } from '../device-manager/device';
import { GroundPlan, Sensor } from '../house-ground-plan/types';
import { DeviceDataService } from '../services/endpoints/device-data.service';
import { GroundPlanService } from '../services/endpoints/ground-plan.service';
import { SensorPickerService } from '../services/sensor-picker-service/sensor-picker.service';

@Component({
  selector: 'app-sensor-picker-overlay',
  templateUrl: './sensor-picker-overlay.component.html',
  styleUrls: ['./sensor-picker-overlay.component.scss'],
})
export class SensorPickerOverlayComponent implements OnInit, OnDestroy {
  public isOpen: boolean = false;

  private subscription: Subscription[] = [];

  public devices: Device[] = [];

  private token: string = '';

  private groundPlan?: GroundPlan;

  constructor(
    public readonly sensorPickerService: SensorPickerService,
    private readonly deviceDataService: DeviceDataService,
    private readonly tokenHandlerService: TokenHandlerService
  ) {}

  ngOnInit(): void {
    this.sensorPickerService.openOverlay = () => {
      this.isOpen = true;
      if (this.sensorPickerService.getEditedGroundPlan) {
        this.groundPlan = this.sensorPickerService.getEditedGroundPlan();
        this.deviceDataService.getDeviceDetails(this.token);
        this.removeAddedSensor();
      }
    };

    this.subscription.push(
      this.tokenHandlerService.token$.subscribe((token) => {
        this.token = token;
      }),
      this.deviceDataService.devicesDetails$.subscribe((deviceDetails) => {
        this.devices = JSON.parse(JSON.stringify(deviceDetails));
        this.removeAddedSensor();
      })
    );

    this.deviceDataService.getDeviceDetails(this.token);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public close(): void {
    this.isOpen = false;
    this.sensorPickerService.close(this.sensorPickerService.emptySensor);
  }

  public addSensor(device: Device) {
    this.sensorPickerService.close(device);
    this.isOpen = false;
  }

  public removeAddedSensor(): void {
    const addedSensors: Sensor[] = [];
    this.groundPlan?.rooms.forEach((room) => {
      room.sensors.forEach((sensors) => {
        addedSensors.push(sensors);
      });
    });

    addedSensors.forEach((sensor) => {
      this.devices.forEach((device) => {
        if (device.deviceAdress === sensor.name) {
          this.devices.splice(this.devices.indexOf(device), 1);
        }
      });
    });
  }
}
