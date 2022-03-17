import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EndpointNames, URL } from 'src/app/protocol/protocol';
import { Device } from '../../device-manager/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceDataService {
  public devicesDetails$ = new ReplaySubject<Device[]>(1);

  constructor(private readonly httpClient: HttpClient) {}

  public getDeviceDetails(token: string): void {
    if (token === '') {
      return;
    }
    const httpHeader = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.httpClient
      .get<Device[]>(URL + EndpointNames.deviceDetails, {
        headers: httpHeader,
        responseType: 'json',
      })
      .pipe(take(1))
      .subscribe((response) => {
        this.devicesDetails$.next(response);
      });
  }
}
