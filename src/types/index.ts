export interface User {
  email: string;
  password: string;
}

export enum LoadStatus {
  ON_THE_WAY = 'On the way',
  PICKED_UP = 'Picked up',
  DELIVERED = 'Delivered'
}

export enum PaymentStatus {
  RECEIVED = 'Received',
  WAITING = 'Waiting'
}

export enum PaymentType {
  COD = 'COD',
  ZOD = 'ZOD',
  OTHER = 'Other'
}

export interface Cargo {
  id: string;
  from: string;
  to: string;
  pickupDate: Date;
  driverName: string;
  rate: number;
  paymentType: PaymentType;
  loadStatus?: LoadStatus;
  paymentStatus?: PaymentStatus;
}

export interface Driver {
  id: string;
  name: string;
} 