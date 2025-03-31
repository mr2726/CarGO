import { collection, doc, getDocs, addDoc, updateDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Cargo, Driver, LoadStatus, PaymentStatus } from '../types';

const TEST_DRIVERS: Driver[] = [
  { id: '1', name: 'Juan', phoneNumber: '+1234567890', homeLocation: 'New York' },
  { id: '2', name: 'Marko', phoneNumber: '+1987654321', homeLocation: 'Los Angeles' },
  { id: '3', name: 'Frank', phoneNumber: '+1122334455', homeLocation: 'Chicago' }
];

export const getCargoList = async (): Promise<Cargo[]> => {
  try {
    const cargoRef = collection(db, 'cargo');
    const querySnapshot = await getDocs(cargoRef);
    const cargo: Cargo[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      cargo.push({
        id: doc.id,
        pickupLocation: data.pickupLocation,
        deliveryLocation: data.deliveryLocation,
        pickupDate: data.pickupDate?.toDate() || new Date(),
        deliveryDate: data.deliveryDate?.toDate(),
        driverName: data.driverName,
        driverId: data.driverId,
        rate: data.rate,
        paymentType: data.paymentType,
        status: data.status,
        paymentStatus: data.paymentStatus
      });
    });
    
    return cargo;
  } catch (error) {
    console.error('Error fetching cargo:', error);
    return [];
  }
};

export const addNewCargo = async (cargo: Omit<Cargo, 'id'>): Promise<void> => {
  try {
    const cargoRef = collection(db, 'cargo');
    await addDoc(cargoRef, cargo);
  } catch (error) {
    console.error('Error adding cargo:', error);
    throw error;
  }
};

export const updateCargoStatus = async (cargoId: string, status: LoadStatus): Promise<void> => {
  try {
    const cargoRef = doc(db, 'cargo', cargoId);
    await updateDoc(cargoRef, { status });
  } catch (error) {
    console.error('Error updating cargo status:', error);
    throw error;
  }
};

export const updatePaymentStatus = async (cargoId: string, paymentStatus: PaymentStatus): Promise<void> => {
  try {
    const cargoRef = doc(db, 'cargo', cargoId);
    await updateDoc(cargoRef, { paymentStatus });
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

export const getDrivers = async (): Promise<Driver[]> => {
  try {
    // Создаем тестовых водителей в Firestore, если их еще нет
    const driversRef = collection(db, 'drivers');
    const driversSnapshot = await getDocs(driversRef);
    
    if (driversSnapshot.empty) {
      // Создаем тестовых водителей
      for (const driver of TEST_DRIVERS) {
        await addDoc(driversRef, driver);
      }
      return TEST_DRIVERS;
    }
    
    return driversSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Driver));
  } catch (error) {
    console.error('Failed to fetch drivers:', error);
    // В случае ошибки возвращаем тестовых водителей из памяти
    return TEST_DRIVERS;
  }
}; 