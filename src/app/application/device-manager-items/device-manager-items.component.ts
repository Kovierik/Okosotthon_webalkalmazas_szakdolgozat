import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../device-manager/device';

@Component({
  selector: 'app-device-manager-items',
  templateUrl: './device-manager-items.component.html',
  styleUrls: ['./device-manager-items.component.scss'],
})
export class DeviceManagerItemsComponent {
  @Input()
  public device?: Device;

  @Output()
  public deleteDevice = new EventEmitter<void>();

  constructor() {}

  public deleteItem(): void {
    this.deleteDevice.emit();
  }
}
