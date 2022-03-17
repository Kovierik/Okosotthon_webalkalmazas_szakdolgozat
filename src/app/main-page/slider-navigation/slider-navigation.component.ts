import { Component, OnInit } from '@angular/core';
import { MainPageContentTextStateService } from '../services/main-page-content-text-state.service';

@Component({
  selector: 'app-slider-navigation',
  templateUrl: './slider-navigation.component.html',
  styleUrls: ['./slider-navigation.component.scss'],
})
export class SliderNavigationComponent implements OnInit {
  constructor(
    private mainPageContentTextStateService: MainPageContentTextStateService
  ) {}

  ngOnInit(): void {}

  vUrl(video: string, contentNumber: number): void {
    const searchedVideo = document.querySelectorAll('.video-slide');
    const mainPageContent = document.querySelectorAll('.content');

    this.mainPageContentTextStateService.setMainPageBackgroundVideo(
      contentNumber
    );

    if (searchedVideo) {
      searchedVideo.forEach((element) => {
        element.setAttribute('src', video);
        element.classList.toggle('active');
      });

      mainPageContent.forEach((content) => {
        if (content.classList.contains('active')) {
          content.classList.remove('active');
        } else {
          content.classList.toggle('active');
        }
      });
    }
  }
}
