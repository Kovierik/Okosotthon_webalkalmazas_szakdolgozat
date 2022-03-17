import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-navigation-bar',
  templateUrl: './app-navigation-bar.component.html',
  styleUrls: ['./app-navigation-bar.component.scss'],
})
export class AppNavigationBarComponent implements OnInit {
  @Output()
  public openDeviceManagerCallback = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  open() {
    this.openDeviceManagerCallback.emit();
  }
}
