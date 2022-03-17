import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenHandlerService } from 'src/app/authentication/token-handler.service';
import { RoomTemperature } from 'src/app/protocol/protocol';
import { Room, Sensor } from '../house-ground-plan/types';
import { RoomTemperatureService } from '../services/endpoints/room-temperature.service';
import { RoomDetailsService } from '../services/room-details/room-details.service';

@Component({
  selector: 'app-room-details-overlay',
  templateUrl: './room-details-overlay.component.html',
  styleUrls: ['./room-details-overlay.component.scss'],
})
export class RoomDetailsOverlayComponent implements OnInit, OnDestroy {
  constructor(
    public readonly roomDetailsService: RoomDetailsService,
    private readonly roomTemperatureService: RoomTemperatureService,
    private readonly tokenHandlerService: TokenHandlerService
  ) {}

  public isOpen: boolean = false;

  public room: Room = {
    color: '#ffffff',
    height: 0,
    width: 0,
    name: '',
    position: {
      x: 0,
      y: 0,
    },
    sensors: [],
  };

  public currentTemperature: number[] = [];

  private subscription: Subscription[] = [];
  public roomTemperature: RoomTemperature[] = [];
  public roomSensors: {
    sensorId: string;
    lastTemperature: number;
  }[] = [];
  public token: string = '';

  ngOnInit(): void {
    this.subscription.push(
      this.tokenHandlerService.token$.subscribe((token) => {
        this.token = token;
      }),
      this.roomDetailsService.isOpen.subscribe((isOpen) => {
        this.isOpen = isOpen === 'true' ? true : false;
        if (this.roomDetailsService.currentRoom) {
          this.room = this.roomDetailsService.currentRoom;
        }
        if (this.isOpen === false) {
          this.roomSensors = [];
        } else {
          this.roomTemperatureService.getRoomTemperature(this.token);
        }
      }),
      this.roomTemperatureService.roomTemperature$.subscribe((response) => {
        this.roomTemperature = response;
        this.roomTemperature.forEach((deviceName) => {
          let includes: boolean = false;
          this.roomSensors.forEach((sensorName) => {
            if (sensorName.sensorId === deviceName.deviceId) {
              includes = true;
            }
          });
          let roomIncludes: string = 'false';
          this.room.sensors.forEach((name) => {
            if (name.name === deviceName.deviceId) {
              roomIncludes = 'true';
            }
          });
          if (includes === false && roomIncludes === 'true') {
            this.roomSensors.push({
              sensorId: deviceName.deviceId,
              lastTemperature: 0,
            });
          }
        });
        for (let index = 0; index < this.roomTemperature.length; index++) {
          this.roomSensors.forEach((element) => {
            if (element.sensorId === this.roomTemperature[index].deviceId) {
              element.lastTemperature = this.roomTemperature[index].temperature;
            }
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public removeSensor(sensor: Sensor): void {
    this.room.sensors.splice(this.room.sensors.indexOf(sensor), 1);
  }

  public saveRooms(): void {
    if (!this.roomDetailsService.saveRooms) {
      return;
    }
    this.roomDetailsService.saveRooms();
  }
}
