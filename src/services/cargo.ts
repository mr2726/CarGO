import { collection, addDoc, getDocs, query, where, updateDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Cargo, Driver, LoadStatus, PaymentStatus } from '../types';

const TEST_DRIVERS: Driver[] = [
  { id: '1', name: 'Juan' },
  { id: '2', name: 'Marko' },
  { id: '3', name: 'Frank' }
];

export const getCargoList = async (): Promise<Cargo[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cargo'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        pickupDate: data.pickupDate instanceof Timestamp ? data.pickupDate.toDate() : new Date(data.pickupDate)
      } as Cargo;
    });
  } catch (error) {
    console.error('Error fetching cargo list:', error);
    throw new Error('Failed to fetch cargo list');
  }
};

export const addNewCargo = async (cargo: Omit<Cargo, 'id'>): Promise<Cargo> => {
  try {
    // Convert the Date object to Firestore Timestamp
    const cargoData = {
      ...cargo,
      pickupDate: cargo.pickupDate instanceof Date ? cargo.pickupDate : new Date(cargo.pickupDate)
    };
    
    const docRef = await addDoc(collection(db, 'cargo'), cargoData);
    return {
      id: docRef.id,
      ...cargoData
    };
  } catch (error) {
    console.error('Error adding new cargo:', error);
    throw new Error('Failed to add new cargo');
  }
};

export const updateCargoStatus = async (cargoId: string, loadStatus: Cargo['loadStatus']): Promise<void> => {
  try {
    const cargoRef = doc(db, 'cargo', cargoId);
    await updateDoc(cargoRef, { loadStatus });
  } catch (error) {
    throw new Error('Failed to update cargo status');
  }
};

export const updatePaymentStatus = async (cargoId: string, paymentStatus: Cargo['paymentStatus']): Promise<void> => {
  try {
    const cargoRef = doc(db, 'cargo', cargoId);
    await updateDoc(cargoRef, { paymentStatus });
  } catch (error) {
    throw new Error('Failed to update payment status');
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
        await setDoc(doc(driversRef, driver.id), driver);
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