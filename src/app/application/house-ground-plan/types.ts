export interface Room {
  position: Coordinates;
  width: number;
  height: number;
  name: string;
  color: string;
  sensors: Sensor[];
}

export interface GroundPlan {
  rooms: Room[];
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Sensor {
  position: Coordinates;
  color: string;
  name: string;
}
