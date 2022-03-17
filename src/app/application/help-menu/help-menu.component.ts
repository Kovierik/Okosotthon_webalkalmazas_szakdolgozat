import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenHandlerService } from 'src/app/authentication/token-handler.service';
import { UserDataService } from '../services/endpoints/user-data.service';

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.scss'],
})
export class HelpMenuComponent implements OnInit, OnDestroy {
  public isHelpOpen: boolean = false;
  @ViewChild('blur') public blur?: ElementRef<HTMLElement>;
  @ViewChild('popup') public popup?: ElementRef<HTMLElement>;

  public userName: string = '';

  public successfulMessage: boolean = false;

  public subscriptions: Subscription[] = [];

  constructor(
    private readonly userDataService: UserDataService,
    private readonly tokenHandlerService: TokenHandlerService
  ) {}

  ngOnInit(): void {
    this.keyHelpEvent = this.keyHelpEvent.bind(this);
    document.body.addEventListener('keydown', this.keyHelpEvent);

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
    document.body.removeEventListener('keydown', this.keyHelpEvent);
  }

  openHelpMenu(): void {
    if (this.isHelpOpen) {
      return;
    }

    if (this.blur) {
      this.blur.nativeElement.classList.add('active');
    }

    if (this.popup) {
      this.popup.nativeElement.classList.add('active');
    }

    this.isHelpOpen = true;
  }

  closeHelpMenu(): void {
    if (!this.isHelpOpen) {
      return;
    }

    if (this.blur) {
      this.blur.nativeElement.classList.remove('active');
    }

    if (this.popup) {
      this.popup.nativeElement.classList.remove('active');
    }

    this.isHelpOpen = false;
  }

  private keyHelpEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeHelpMenu();
    }
  }

  public message(): void {
    this.successfulMessage = true;
  }

  public removeMessage(): void {
    this.successfulMessage = false;
  }
}
