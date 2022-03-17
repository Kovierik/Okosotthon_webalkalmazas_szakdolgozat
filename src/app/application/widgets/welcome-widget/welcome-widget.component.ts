import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenHandlerService } from 'src/app/authentication/token-handler.service';
import { UserDataService } from '../../services/endpoints/user-data.service';

@Component({
  selector: 'app-welcome-widget',
  templateUrl: './welcome-widget.component.html',
  styleUrls: ['./welcome-widget.component.scss'],
})
export class WelcomeWidgetComponent implements OnInit, OnDestroy {
  public userName: string = '';

  public subscriptions: Subscription[] = [];

  constructor(
    private readonly userDataService: UserDataService,
    private readonly tokenHandlerService: TokenHandlerService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userDataService.userDetails$.subscribe((response) => {
        this.userName = response.username;
      }),

      this.tokenHandlerService.token$.subscribe((token) => {
        this.userDataService.getUserDetails(token);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  widgetsToggle(): void {
    const widgetOnOff = document.querySelector('.widget-pattern');

    if (widgetOnOff) {
      widgetOnOff.classList.toggle('active');
    }
  }
}
