import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenHandlerService } from './authentication/token-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'OkosOtthon';

  constructor(
    private readonly tokenHandler: TokenHandlerService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.tokenHandler.getTokenFromCookies();

    this.tokenHandler.token$.subscribe((token) => {
      if (token === '') {
        this.router.navigate(['main-page/home/']);
        return;
      }

      this.tokenHandler.saveToken(token);
      this.router.navigate(['app-home/home-page']);
    });
  }
}
