import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { EndpointNames, SimpleResponse, URL } from 'src/app/protocol/protocol';

@Injectable({
  providedIn: 'root',
})
export class DeviceConnectionService {
  constructor(private readonly httpClient: HttpClient) {}

  public connectDevice(
    token: string,
    deviceName: string,
    callBackMethod: (data: string) => void
  ): void {
    if (token === '') {
      return;
    }

    const httpHeader = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.httpClient
      .get<SimpleResponse>(
        URL + EndpointNames.deviceDetails + '/' + deviceName,
        {
          headers: httpHeader,
          responseType: 'json',
        }
      )
      .pipe(take(1))
      .subscribe((data) => {
        callBackMethod(data.responseCode);
      });
  }

  public deleteDevice(
    token: string,
    deviceName: string,
    callBackMethod: (data: string) => void
  ): void {
    if (token === '') {
      return;
    }

    const httpHeader = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.httpClient
      .delete<SimpleResponse>(
        URL + EndpointNames.deviceDetails + '/' + deviceName,
        {
          headers: httpHeader,
          responseType: 'json',
        }
      )
      .pipe(take(1))
      .subscribe((data) => {
        callBackMethod(data.responseCode);
      });
  }
}
