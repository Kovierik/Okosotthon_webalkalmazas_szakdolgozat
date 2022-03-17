import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toggle(): void {
    const blur = document.querySelectorAll('[id^="blur"]');
    if (blur) {
      blur.forEach((element) => {
        element.classList.toggle('active');
      });
    }

    const popup = document.querySelectorAll('[id^="popup"]');
    if (blur) {
      popup.forEach((element) => {
        element.classList.toggle('active');
      });
    }
  }
}
