import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select-menu-box',
  templateUrl: './select-menu-box.component.html',
  styleUrls: ['./select-menu-box.component.scss'],
})
export class SelectMenuBoxComponent implements OnInit {
  @ViewChild('dropdown') public dropdown?: ElementRef<HTMLElement>;
  @ViewChild('options') public options?: ElementRef<HTMLElement>;
  @ViewChild('input') public input?: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {}

  selectMenu(): void {
    if (this.dropdown) {
      this.dropdown.nativeElement.classList.toggle('active');
    }

    this.options?.nativeElement.addEventListener('click', (e: any) => {
      let listItem = e.target;
      let value = listItem!.attributes.options.value;
      this.input!.nativeElement.value = value;
    });
  }
}
