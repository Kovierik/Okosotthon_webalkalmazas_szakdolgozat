import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenHandlerService } from 'src/app/authentication/token-handler.service';
import { Device } from '../device-manager/device';
import { GroundPlanService } from '../services/endpoints/ground-plan.service';
import { RoomDetailsService } from '../services/room-details/room-details.service';
import { SensorPickerService } from '../services/sensor-picker-service/sensor-picker.service';
import { SidebarService } from '../services/sidebar-service/sidebar.service';
import { Coordinates, GroundPlan, Room } from './types';

@Component({
  selector: 'app-house-ground-plan',
  templateUrl: './house-ground-plan.component.html',
  styleUrls: ['./house-ground-plan.component.scss'],
})
export class HouseGroundPlanComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('canvas')
  private canvas?: ElementRef<HTMLDivElement>;

  @ViewChild('grid')
  private grid?: ElementRef<HTMLCanvasElement>;

  @ViewChild('rectangle')
  private rectangle?: ElementRef<HTMLCanvasElement>;

  private subscriptions: Subscription[] = [];
  private token: string = '';

  public editMode: boolean = false;

  public canvasOnHover: boolean = false;

  public isAddRoomMode: boolean = false;

  public isAddSensorMode: boolean = false;

  public startDraw?: Coordinates;

  public groundPlan: GroundPlan = {
    rooms: [],
  };

  public newSensor?: Device;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly groundPlanService: GroundPlanService,
    private readonly tokenHandlerService: TokenHandlerService,
    private readonly roomDetailsService: RoomDetailsService,
    private readonly sensorPickerService: SensorPickerService
  ) {}

  ngOnInit(): void {
    this.sidebarService.enableEditMode();

    this.sidebarService.onAddRoom = () => {
      this.isAddSensorMode = false;
      this.isAddRoomMode = true;
    };

    this.sidebarService.onAddSensor = () => {
      if (!this.sensorPickerService.openOverlay) {
        return;
      }
      this.isAddRoomMode = false;
      this.isAddSensorMode = true;
      this.sensorPickerService.openOverlay();
    };

    this.sidebarService.switchEditMode = () => {
      this.enableEdit();
    };

    this.sensorPickerService.getEditedGroundPlan = () => {
      return this.groundPlan;
    };

    this.roomDetailsService.saveRooms = () => {
      this.groundPlanService.updateGroundPlanDetails(
        this.token,
        JSON.stringify(this.groundPlan)
      );
    };

    this.subscriptions.push(
      this.groundPlanService.groundPlan$.subscribe((groundPlan) => {
        if (groundPlan.groundPlan && groundPlan.groundPlan !== '') {
          this.groundPlan = JSON.parse(groundPlan.groundPlan);
          this.renderRooms(this.groundPlan);
        }
      }),
      this.tokenHandlerService.token$.subscribe((newToken) => {
        this.token = newToken;
        this.groundPlanService.getGroundPlanDeviceDetails(this.token);
      }),
      this.roomDetailsService.isOpen.subscribe((openState) => {
        if (openState === 'false') {
          this.renderRooms(this.groundPlan);
          this.groundPlanService.updateGroundPlanDetails(
            this.token,
            JSON.stringify(this.groundPlan)
          );
        }
      }),
      this.sensorPickerService.sensor.subscribe((sensor) => {
        if (sensor !== this.sensorPickerService.emptySensor) {
          this.newSensor = sensor;
          return;
        }
        this.isAddSensorMode = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.sidebarService.disableGroundPlan();
    this.groundPlanService.clearGroundPlan();
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });

    this.roomDetailsService.disable();

    this.isAddSensorMode = false;
    this.isAddRoomMode = false;
  }

  ngAfterViewInit(): void {
    this.renderRooms(this.groundPlan);

    if (!this.grid) {
      return;
    }

    const context = this.grid.nativeElement.getContext('2d');

    if (!context) {
      return;
    }

    const canvasWidth: number = 1280;
    const canvasHeight: number = 720;
    const gridDensity: number = 10;
    for (let i = 0; i <= canvasWidth; i += gridDensity) {
      context.moveTo(i, 0);
      context.lineTo(i, canvasHeight);

      context.strokeStyle = '#dfdfdf';
      context.stroke();
    }

    for (let i = 0; i <= canvasHeight; i += gridDensity) {
      context.moveTo(0, i);
      context.lineTo(canvasWidth, i);

      context.strokeStyle = '#dfdfdf';
      context.stroke();
    }
  }

  private async renderRooms(groundPlan: GroundPlan): Promise<void> {
    this.changeDetectionRef.detectChanges();
    const elements =
      this.canvas?.nativeElement.querySelectorAll<HTMLDivElement>('div.room');
    if (!elements || elements.length != groundPlan.rooms.length) {
      console.warn('Nem egyenlő a számuk.');
      return;
    }

    for (let i = 0; i < elements?.length; i++) {
      elements[i].style.backgroundColor = groundPlan.rooms[i].color;
      elements[i].style.position = 'absolute';
      elements[i].style.width = groundPlan.rooms[i].width + 'px';
      elements[i].style.height = groundPlan.rooms[i].height + 'px';
      elements[i].style.top = groundPlan.rooms[i].position.y + 'px';
      elements[i].style.left = groundPlan.rooms[i].position.x + 'px';
    }

    this.generateSensors(groundPlan);
  }

  private generateSensors(groundPlan: GroundPlan): void {
    const rooms =
      this.canvas?.nativeElement.querySelectorAll<HTMLDivElement>('div.room');

    rooms?.forEach((room, index) => {
      const sensors = room.querySelectorAll<HTMLDivElement>('div.sensor');
      const sensorsIcon = room.querySelectorAll<HTMLDivElement>('div.sensor i');

      if (
        !sensors ||
        !sensorsIcon ||
        sensors.length != groundPlan.rooms[index].sensors.length
      ) {
        console.warn('Szenzorok nem egyeznek.');
        return;
      }

      sensors?.forEach((sensor, i) => {
        sensorsIcon[i].style.color = groundPlan.rooms[index].sensors[i].color;
        sensor.style.position = 'absolute';
        sensor.style.top = groundPlan.rooms[index].sensors[i].position.y + 'px';
        sensor.style.left =
          groundPlan.rooms[index].sensors[i].position.x + 'px';
      });
    });
  }

  public enableEdit(): void {
    if (this.editMode === false) {
      this.sidebarService.disableEditMode();
      this.editMode = true;
      return;
    }
    this.sidebarService.enableEditMode();
    this.isAddSensorMode = false;
    this.editMode = false;
    this.isAddRoomMode = false;

    this.groundPlanService.updateGroundPlanDetails(
      this.token,
      JSON.stringify(this.groundPlan)
    );

    if (this.sidebarService.removeActive) {
      this.sidebarService.removeActive();
    }
  }

  public removeElement(room: Room) {
    this.groundPlan.rooms.splice(this.groundPlan.rooms.indexOf(room), 1);
  }

  public mouseEnter(): void {
    this.canvasOnHover = true;
  }

  public mouseLeave(): void {
    this.canvasOnHover = false;
  }

  public mouseMoving(event: MouseEvent): void {
    if (!this.editMode || !this.canvasOnHover || !this.canvas) {
      return;
    }

    let x = event.x - this.canvas.nativeElement.getBoundingClientRect().x;
    let y = event.y - this.canvas.nativeElement.getBoundingClientRect().y;

    const drawer =
      this.canvas.nativeElement.querySelector<HTMLDivElement>('.drawer');

    if (!drawer) {
      this.sensorMousePlacing(event);
      return;
    }

    x = Math.round(x / 10) * 10;
    y = Math.round(y / 10) * 10;

    x -= 4;
    y -= 4;
    drawer.style.top = y + 'px';
    drawer.style.left = x + 'px';

    if (!this.startDraw) {
      return;
    }

    let rectangleWidth: number = x + 4 - this.startDraw.x;
    let rectangleHeight: number = y + 4 - this.startDraw.y;

    this.rectangleDrawToCanvas(
      this.startDraw.x,
      this.startDraw.y,
      rectangleWidth,
      rectangleHeight
    );
  }

  public startDrawing(): void {
    if (!this.editMode || !this.isAddRoomMode || !this.canvas) {
      return;
    }

    const drawer =
      this.canvas.nativeElement.querySelector<HTMLDivElement>('.drawer');

    if (!drawer) {
      return;
    }
    this.startDraw = {
      x: Number.parseInt(drawer.style.left) + 4,
      y: Number.parseInt(drawer.style.top) + 4,
    };
  }

  public finishDraw(): void {
    if (
      !this.editMode ||
      !this.isAddRoomMode ||
      !this.canvas ||
      !this.startDraw
    ) {
      return;
    }

    const drawer =
      this.canvas.nativeElement.querySelector<HTMLDivElement>('.drawer');

    if (!drawer) {
      return;
    }

    const room = this.generateRoom(
      this.startDraw.x,
      this.startDraw.y,
      Number.parseInt(drawer.style.left) + 4 - this.startDraw.x,
      Number.parseInt(drawer.style.top) + 4 - this.startDraw.y
    );

    if (room) {
      this.groundPlan.rooms.push(room);
    }

    this.clearRectangleCanvas();

    this.startDraw = undefined;

    this.renderRooms(this.groundPlan);
  }

  private rectangleDrawToCanvas(
    startX: number,
    startY: number,
    width: number,
    height: number
  ): void {
    if (!this.rectangle) {
      return;
    }

    const ctx = this.rectangle.nativeElement.getContext('2d');

    if (!ctx) {
      return;
    }

    this.clearRectangleCanvas();

    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.strokeStyle = '#000000';
    ctx.stroke();
  }

  private clearRectangleCanvas(): void {
    if (!this.rectangle) {
      return;
    }

    const ctx = this.rectangle.nativeElement.getContext('2d');

    if (!ctx) {
      return;
    }
    ctx.clearRect(
      0,
      0,
      this.rectangle.nativeElement.width,
      this.rectangle.nativeElement.height
    );
  }

  private generateRoom(
    startX: number,
    startY: number,
    width: number,
    height: number
  ): Room | undefined {
    if (width === 0 || height === 0) {
      return undefined;
    }

    if (width < 0) {
      startX += width;
      width = Math.abs(width);
    }

    if (height < 0) {
      startY += height;
      height = Math.abs(height);
    }

    return {
      color: '#ffffff',
      height: height,
      width: width,
      position: { x: startX, y: startY },
      name: '',
      sensors: [],
    };
  }

  public openRoom(room: Room) {
    if (this.editMode) {
      return;
    }
    this.roomDetailsService.currentRoom = room;
    this.roomDetailsService.open(room);
  }

  private sensorMousePlacing(event: MouseEvent): void {
    if (!this.isAddSensorMode || !this.canvasOnHover || !this.canvas) {
      return;
    }

    const sensorDrawer =
      this.canvas.nativeElement.querySelector<HTMLDivElement>('.sensor-drawer');

    if (!sensorDrawer) {
      return;
    }

    let x = event.x - this.canvas.nativeElement.getBoundingClientRect().x;
    let y = event.y - this.canvas.nativeElement.getBoundingClientRect().y;

    x = Math.round(x / 10) * 10;
    y = Math.round(y / 10) * 10;

    sensorDrawer.style.top = y + 'px';
    sensorDrawer.style.left = x + 'px';
  }

  public placeSensor(event: MouseEvent): void {
    if (this.isAddSensorMode === false || !this.newSensor || !this.canvas) {
      return;
    }

    let targetRoom: HTMLDivElement | undefined;

    event.composedPath().forEach((element) => {
      const htmlElement = element as HTMLElement;
      if (
        htmlElement.tagName === 'DIV' &&
        htmlElement.classList.contains('room')
      ) {
        targetRoom = htmlElement as HTMLDivElement;
      }
    });

    const sensorDrawer =
      this.canvas.nativeElement.querySelector<HTMLDivElement>('.sensor-drawer');

    if (!targetRoom || !sensorDrawer) {
      console.warn('Szobához történjen a szenzor hozzáadása.');
      return;
    }

    let position: Coordinates = {
      x: parseInt(targetRoom.style.left),
      y: parseInt(targetRoom.style.top),
    };

    this.groundPlan.rooms.forEach((room) => {
      if (
        room.position.x === position.x &&
        room.position.y === position.y &&
        this.newSensor
      ) {
        room.sensors.push({
          color: '#000',
          name: this.newSensor.deviceAdress,
          position: {
            x: parseInt(sensorDrawer.style.left) - position.x,
            y: parseInt(sensorDrawer.style.top) - position.y,
          },
        });
      }
    });

    this.newSensor = undefined;
    this.isAddSensorMode = false;
    this.renderRooms(this.groundPlan);
    this.groundPlanService.updateGroundPlanDetails(
      this.token,
      JSON.stringify(this.groundPlan)
    );
  }
}
