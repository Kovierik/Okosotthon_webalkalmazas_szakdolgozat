import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EndpointNames, RoomTemperature, URL } from 'src/app/protocol/protocol';

@Injectable({
  providedIn: 'root',
})
export class RoomTemperatureService {
  public roomTemperature$ = new ReplaySubject<RoomTemperature[]>(1);

  constructor(private readonly httpClient: HttpClient) {}

  public getRoomTemperature(token: string): void {
    if (token === '') {
      return;
    }
    const httpHeader = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.httpClient
      .get<RoomTemperature[]>(URL + EndpointNames.roomTemperatures, {
        headers: httpHeader,
        responseType: 'json',
      })
      .pipe(take(1))
      .subscribe((response) => {
        this.roomTemperature$.next(response);
      });
  }
}
