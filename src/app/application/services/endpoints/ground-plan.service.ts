import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  EndpointNames,
  SimpleResponse,
  UserGroundPlan,
  URL,
} from 'src/app/protocol/protocol';

@Injectable({
  providedIn: 'root',
})
export class GroundPlanService {
  public groundPlanUpdate$ = new ReplaySubject<SimpleResponse>(1);
  public groundPlan$ = new ReplaySubject<UserGroundPlan>(1);

  constructor(private readonly httpClient: HttpClient) {}

  public updateGroundPlanDetails(token: string, groundPlan: string): void {
    if (token === '') {
      return;
    }

    const httpHeader = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.httpClient
      .post<SimpleResponse>(
        URL + EndpointNames.userGroundPlans,
        { groundPlan: groundPlan },
        {
          headers: httpHeader,
          responseType: 'json',
        }
      )
      .pipe(take(1))
      .subscribe((response) => {
        this.groundPlanUpdate$.next(response);
      });
  }

  public getGroundPlanDeviceDetails(token: string): void {
    if (token === '') {
      return;
    }
    const httpHeader = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.httpClient
      .get<UserGroundPlan>(URL + EndpointNames.userGroundPlans, {
        headers: httpHeader,
        responseType: 'json',
      })
      .pipe(take(1))
      .subscribe((response) => {
        this.groundPlan$.next(response);
      });
  }

  public clearGroundPlan(): void {
    this.groundPlan$.complete();
    this.groundPlan$ = new ReplaySubject<UserGroundPlan>(1);
  }
}
