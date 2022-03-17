import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenHandlerService } from 'src/app/authentication/token-handler.service';
import { UserGroundPlan } from 'src/app/protocol/protocol';
import { GroundPlan } from '../house-ground-plan/types';
import { DeviceConnectionService } from '../services/endpoints/device-connection.service';
import { DeviceDataService } from '../services/endpoints/device-data.service';
import { GroundPlanService } from '../services/endpoints/ground-plan.service';
import { Device } from './device';

@Component({
  selector: 'app-device-manager',
  templateUrl: './device-manager.component.html',
  styleUrls: ['./device-manager.component.scss'],
})
export class DeviceManagerComponent implements OnInit, OnDestroy {
  public isOpen: boolean = false;

  @ViewChild('blur') public blur?: ElementRef<HTMLElement>;
  @ViewChild('popup') public popup?: ElementRef<HTMLElement>;

  public devices: Device[] = [];
  public subscriptions: Subscription[] = [];
  private token?: string;

  public newDeviceName: string = '';

  public deviceError?: string;

  public groundPlan?: UserGroundPlan;

  constructor(
    private deviceDataService: DeviceDataService,
    private readonly tokenHandlerService: TokenHandlerService,
    private readonly deviceConnectionService: DeviceConnectionService,
    private readonly groundPlanService: GroundPlanService
  ) {}

  ngOnInit(): void {
    this.keyEvent = this.keyEvent.bind(this);
    document.body.addEventListener('keydown', this.keyEvent);

    this.subscriptions.push(
      this.deviceDataService.devicesDetails$.subscribe((response) => {
        this.devices = response;
      }),

      this.tokenHandlerService.token$.subscribe((responseToken) => {
        this.token = responseToken;
      }),

      this.groundPlanService.groundPlan$.subscribe((response) => {
        this.groundPlan = response;
      })
    );
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('keydown', this.keyEvent);
  }

  open(): void {
    if (this.isOpen || !this.token) {
      return;
    }

    this.deviceError = undefined;

    this.deviceDataService.getDeviceDetails(this.token);

    this.groundPlanService.getGroundPlanDeviceDetails(this.token);

    if (this.blur) {
      this.blur.nativeElement.classList.add('active');
    }

    if (this.popup) {
      this.popup.nativeElement.classList.add('active');
    }

    this.isOpen = true;
  }

  close(): void {
    if (!this.isOpen) {
      return;
    }

    if (this.blur) {
      this.blur.nativeElement.classList.remove('active');
    }

    if (this.popup) {
      this.popup.nativeElement.classList.remove('active');
    }

    this.isOpen = false;
  }

  private keyEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  public addDeviceRequest(): void {
    if (!this.token) {
      return;
    }

    this.deviceConnectionService.connectDevice(
      this.token,
      this.newDeviceName,
      (response) => {
        if (!this.token) {
          return;
        }

        switch (response) {
          case 'Ok':
            this.deviceDataService.getDeviceDetails(this.token);
            this.deviceError = undefined;
            break;

          case 'DeviceNotFound':
            this.deviceError = 'Az eszköz nem található!';
            break;

          case 'DeviceAlreadyConnectedToUser':
            this.deviceError = 'Az eszköz már csatlakoztatva van!';
            break;

          default:
            break;
        }

        this.newDeviceName = '';
      }
    );
  }

  public deleteDeviceRequest(deletedDeviceName: string): void {
    if (!this.token || !this.groundPlan) {
      return;
    }

    let isUsed: boolean = false;
    const groundPlan = JSON.parse(this.groundPlan.groundPlan) as GroundPlan;

    groundPlan.rooms.forEach((room) => {
      room.sensors.forEach((sensor) => {
        if (sensor.name === deletedDeviceName) {
          isUsed = true;
        }
      });
    });

    if (isUsed) {
      this.deviceError = 'Az eszköz használatban van, törölje először.';
      return;
    }

    this.deviceConnectionService.deleteDevice(
      this.token,
      deletedDeviceName,
      (response) => {
        if (!this.token) {
          return;
        }

        switch (response) {
          case 'Ok':
            this.deviceDataService.getDeviceDetails(this.token);
            this.deviceError = undefined;
            break;

          case 'DeviceNotFound':
            this.deviceError = 'Device is not found!';
            break;

          default:
            break;
        }
      }
    );
  }
}
