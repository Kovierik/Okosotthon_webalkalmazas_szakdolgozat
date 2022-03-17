import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Device } from '../../device-manager/device';
import { GroundPlan } from '../../house-ground-plan/types';

@Injectable({
  providedIn: 'root',
})
export class SensorPickerService {
  public sensor = new ReplaySubject<Device>(1);

  public getEditedGroundPlan?: () => GroundPlan;

  public openOverlay?: () => void;

  public emptySensor: Device = {
    deviceAdress: '',
    state: false,
    username: '',
  };

  constructor() {}

  public open() {
    this.sensor.next(this.emptySensor);
  }

  public close(sensor: Device) {
    this.sensor.next(sensor);
  }
}
