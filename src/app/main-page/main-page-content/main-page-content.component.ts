import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MainPageContentTextStateService } from '../services/main-page-content-text-state.service';

@Component({
  selector: 'app-main-page-content',
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss'],
})
export class MainPageContentComponent implements OnInit {
  public currentContent: number = 1;

  constructor(
    private cdr: ChangeDetectorRef,
    private mainPageContentTextStateService: MainPageContentTextStateService
  ) {}

  ngOnInit(): void {
    this.mainPageContentTextStateService.mainPageBackgroundVideoState$.subscribe(
      (number) => {
        this.currentContent = number;
        this.cdr.detectChanges();
      }
    );
  }

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
