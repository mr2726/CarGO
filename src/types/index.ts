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
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: Date;
  deliveryDate?: Date;
  driverName: string;
  driverId: string;
  rate: number;
  paymentType: PaymentType;
  status: LoadStatus;
  paymentStatus: PaymentStatus;
}

export interface Driver {
  id: string;
  name: string;
  phoneNumber: string;
  homeLocation: string;
} 