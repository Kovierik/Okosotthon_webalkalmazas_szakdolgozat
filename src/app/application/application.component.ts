import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceManagerComponent } from './device-manager/device-manager.component';
import { HelpMenuComponent } from './help-menu/help-menu.component';
import { HouseGroundPlanComponent } from './house-ground-plan/house-ground-plan.component';
import { SidebarService } from './services/sidebar-service/sidebar.service';
import { SideBarButtons, SideBarState } from './services/sidebar-service/types';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit, OnDestroy {
  @ViewChild('navbar') public list?: ElementRef<HTMLElement>;
  @ViewChild(DeviceManagerComponent)
  public deviceManagerComponentOverlay?: DeviceManagerComponent;
  @ViewChild(HelpMenuComponent)
  public helpMenuComponentOverlay?: HelpMenuComponent;
  @ViewChild('navBarContainer')
  public navBarContainer?: ElementRef<HTMLElement>;
  @ViewChild('content')
  public content?: ElementRef<HTMLElement>;

  public sideBarButtons: SideBarButtons = this.sidebarService.sideBarButtons;

  public subscriptions: Subscription[] = [];

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.sidebarService.change.subscribe(() => {
        this.cdr.detectChanges();
      })
    );

    this.sidebarService.removeActive = () => {
      if (!this.list) {
        return;
      }

      this.list.nativeElement.querySelectorAll('li').forEach((listItem) => {
        if (listItem.classList.contains('active')) {
          listItem.classList.remove('active');
        }
      });
    };
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  activateElement(event: Event): void {
    let targetElement = event.target as HTMLElement;

    if (this.list) {
      this.list.nativeElement.childNodes.forEach((element) => {
        if (
          element.nodeName === 'LI' &&
          (element as HTMLElement).classList.contains('active')
        ) {
          (element as HTMLElement).classList.remove('active');
        }
      });
    }

    if (
      !targetElement.classList.contains('list') &&
      targetElement.parentElement
    ) {
      targetElement = targetElement.parentElement;
    }
    targetElement.classList.add('active');
  }

  toggleMenu(): void {
    const menuToggle = document.querySelectorAll('.toggle-bar');
    const navigationBar = document.querySelectorAll('.navigation-bar');

    this.navBarContainer?.nativeElement.classList.toggle('active');
    this.content?.nativeElement.classList.toggle('active');

    if (menuToggle && navigationBar) {
      menuToggle.forEach((element) => {
        element.classList.toggle('active');
      });
      navigationBar.forEach((navBar) => {
        navBar.classList.toggle('active');
      });
    }
  }

  openDeviceManager(): void {
    this.deviceManagerComponentOverlay?.open();
  }

  openHelpManager(): void {
    this.helpMenuComponentOverlay?.openHelpMenu();
  }

  addRoom(): void {
    if (this.sidebarService.onAddRoom) {
      this.sidebarService.onAddRoom();
    }
  }

  addSensor(): void {
    if (this.sidebarService.onAddSensor) {
      this.sidebarService.onAddSensor();
    }
  }

  switchEditMode(): void {
    if (this.sidebarService.switchEditMode) {
      this.sidebarService.switchEditMode();
    }
  }
}
