import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenHandlerService } from '../../authentication/token-handler.service';
import { UserDataService } from '../services/endpoints/user-data.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {
  public userName: string = '';

  public subscriptions: Subscription[] = [];

  @Output()
  public openHelpManagerCallback = new EventEmitter<void>();

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

  accountToggle(): void {
    const accountMenu = document.querySelector('.dropdown');

    if (accountMenu) {
      accountMenu.classList.toggle('active');
    }
  }

  openHelpMenu(): void {
    this.openHelpManagerCallback.emit();
  }

  logOut(): void {
    this.tokenHandlerService.resetToken();
  }
}
