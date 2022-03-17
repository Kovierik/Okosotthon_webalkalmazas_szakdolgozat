import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenHandlerService } from 'src/app/authentication/token-handler.service';
import { RoomTemperature } from 'src/app/protocol/protocol';
import { RoomTemperatureService } from '../services/endpoints/room-temperature.service';
import { UserDataService } from '../services/endpoints/user-data.service';

@Component({
  selector: 'app-home-grid-layout',
  templateUrl: './home-grid-layout.component.html',
  styleUrls: ['./home-grid-layout.component.scss'],
})
export class HomeGridLayoutComponent implements OnInit, OnDestroy {
  public userName: string = '';
  public roomTemperature: RoomTemperature[] = [];
  public subscriptions: Subscription[] = [];

  constructor(
    private readonly userDataService: UserDataService,
    private readonly tokenHandlerService: TokenHandlerService,
    private readonly roomTemperatureService: RoomTemperatureService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userDataService.userDetails$.subscribe((response) => {
        this.userName = response.username;
      }),
      this.tokenHandlerService.token$.subscribe((token) => {
        this.userDataService.getUserDetails(token);
        this.roomTemperatureService.getRoomTemperature(token);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
