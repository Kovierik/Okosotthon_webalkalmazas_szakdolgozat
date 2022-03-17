import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainPageContentTextStateService {
  public mainPageBackgroundVideoState$: BehaviorSubject<number> =
    new BehaviorSubject<number>(1);

  public setMainPageBackgroundVideo(number: number): void {
    this.mainPageBackgroundVideoState$.next(number);
  }
}
