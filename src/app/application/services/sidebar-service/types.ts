export enum SideBarState {
  editMode = 'editMode',
  normalMode = 'normalMode',
}

export interface SideBarButtons {
  enableEditMode: boolean;
  disableEditMode: boolean;
  addRoom: boolean;
  addSensor: boolean;
}
