import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SideBarButtons, SideBarState } from './types';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public change = new ReplaySubject<void>(1);

  public onAddRoom?: () => void;

  public onAddSensor?: () => void;

  public removeActive?: () => void;

  public switchEditMode?: () => void;

  public sideBarButtons: SideBarButtons = {
    enableEditMode: false,
    disableEditMode: false,
    addRoom: false,
    addSensor: false,
  };

  constructor() {}

  public enableEditMode(): void {
    this.sideBarButtons.enableEditMode = true;
    this.sideBarButtons.disableEditMode = false;
    this.sideBarButtons.addSensor = false;
    this.sideBarButtons.addRoom = false;
    this.change.next();
  }

  public disableEditMode(): void {
    this.sideBarButtons.enableEditMode = false;
    this.sideBarButtons.disableEditMode = true;
    this.sideBarButtons.addSensor = true;
    this.sideBarButtons.addRoom = true;
    this.change.next();
  }

  public disableGroundPlan(): void {
    this.sideBarButtons.enableEditMode = false;
    this.sideBarButtons.disableEditMode = false;
    this.sideBarButtons.addSensor = false;
    this.sideBarButtons.addRoom = false;
    this.change.next();
  }
}
