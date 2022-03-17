import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Room } from '../../house-ground-plan/types';

@Injectable({
  providedIn: 'root',
})
export class RoomDetailsService {
  public isOpen = new ReplaySubject<string>(1);

  public currentRoom?: Room;

  public saveRooms?: () => void;

  constructor() {}

  public open(room: Room): void {
    this.isOpen.next('true');
    this.currentRoom = room;
  }

  public close(): void {
    this.isOpen.next('false');
    this.currentRoom = undefined;
  }

  public disable(): void {
    this.isOpen.next('disable');
    this.currentRoom = undefined;
  }
}
