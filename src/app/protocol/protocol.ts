export interface UserDetailResponse {
  username: string;
  password: string;
  email: string;
}

export interface UserGroundPlan {
  username: string;
  groundPlan: string;
}

export enum EndpointNames {
  userDetails = 'SECRET',
  deviceDetails = 'SECRET',
  userGroundPlans = 'SECRET',
  roomTemperatures = 'SECRET',
}

export const URL: string = 'SECRET';

export interface SimpleResponse {
  responseCode: string;
}

export interface RoomTemperature {
  username: string;
  deviceId: string;
  temperature: number;
  time: string;
  id: number;
}
