import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-sensor-widget',
  templateUrl: './sensor-widget.component.html',
  styleUrls: ['./sensor-widget.component.scss'],
})
export class SensorWidgetComponent implements OnInit, AfterViewInit {
  @ViewChild('toggle') public toggleWidget?: ElementRef<HTMLElement>;
  @ViewChild('container')
  public container?: ElementRef<HTMLElement>;
  @ViewChild('widgetIcon') public icon?: ElementRef<HTMLElement>;

  @Input()
  public widgetName: string = 'Empty';

  @Input()
  public widgetIcon: string = 'bi bi-search';

  constructor() {}

  ngAfterViewInit(): void {
    if (this.icon) {
      this.icon.nativeElement.className = this.widgetIcon;
    }
  }

  ngOnInit(): void {}

  widgetToggle(): void {
    if (this.toggleWidget && this.container) {
      this.toggleWidget.nativeElement.classList.toggle('active');
      this.container.nativeElement.classList.toggle('active');
    }
  }
}
