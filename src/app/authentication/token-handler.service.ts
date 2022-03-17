import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenHandlerService {
  public token$ = new ReplaySubject<string>(1);

  constructor() {}

  public tokenSet(token: string): void {
    this.token$.next(token);
  }

  public resetToken(): void {
    this.token$.next('');
    this.deleteToken();
  }

  public saveToken(token: string): void {
    let todayDate = new Date();
    todayDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() + 1,
      todayDate.getHours(),
      todayDate.getMinutes()
    );
    document.cookie = `token=${token};expires=${todayDate.toUTCString()}; path=/`;
  }

  public deleteToken(): void {
    document.cookie = `token=; path=/`;
  }

  private getToken(): string {
    let token: string = '';
    document.cookie.split(';').forEach((cookie) => {
      const cookieName = cookie.split('=')[0];
      const cookieValue = cookie.split('=')[1];

      if (cookieName === 'token') {
        token = cookieValue;
      }
    });
    return token;
  }

  public getTokenFromCookies(): void {
    const token = this.getToken();
    if (token !== '') {
      this.token$.next(token);
    }
  }
}
