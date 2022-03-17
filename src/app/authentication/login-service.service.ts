import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { URL } from '../protocol/protocol';

interface LoginResponse {
  responseCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private readonly httpClient: HttpClient) {}

  login(
    username: string,
    password: string,
    callBackMethod: (data: string) => void
  ): void {
    this.httpClient
      .post<LoginResponse>(URL + 'api/Users/byUsername', {
        password: password,
        username: username,
      })
      .pipe(take(1))
      .subscribe((data) => {
        callBackMethod(data.responseCode);
      });
  }

  register(
    username: string,
    password: string,
    email: string,
    callBackMethod: (data: string) => void
  ): void {
    this.httpClient
      .post<LoginResponse>(URL + 'api/Users', {
        password: password,
        username: username,
        email: email,
      })
      .pipe(take(1))
      .subscribe((data) => {
        callBackMethod(data.responseCode);
      });
  }
}
