import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  UserDetailResponse,
  EndpointNames,
  URL,
} from '../../../protocol/protocol';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public userDetails$ = new ReplaySubject<UserDetailResponse>(1);

  constructor(private readonly httpClient: HttpClient) {}

  public getUserDetails(token: string): void {
    if (token === '') {
      return;
    }
    const httpHeader = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.httpClient
      .get<UserDetailResponse>(URL + EndpointNames.userDetails, {
        headers: httpHeader,
        responseType: 'json',
      })
      .pipe(take(1))
      .subscribe((response) => {
        this.userDetails$.next(response);
      });
  }
}
