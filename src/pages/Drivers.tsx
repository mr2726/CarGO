import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
} from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Driver, Cargo } from '../types';
import { getDrivers } from '../services/cargo';

const Drivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [activeCargo, setActiveCargo] = useState<Cargo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch drivers
        const driversList = await getDrivers();
        setDrivers(driversList);

        // Fetch active cargo
        const cargoRef = collection(db, 'cargo');
        const q = query(cargoRef, where('status', '!=', 'Delivered'));
        const cargoSnapshot = await getDocs(q);
        const cargoList: Cargo[] = [];
        cargoSnapshot.forEach((doc) => {
          cargoList.push({ id: doc.id, ...doc.data() } as Cargo);
        });
        setActiveCargo(cargoList);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDriverCurrentLocation = (driverId: string): string => {
    const driverActiveCargo = activeCargo.find(cargo => cargo.driverId === driverId);
    if (driverActiveCargo) {
      return driverActiveCargo.deliveryLocation;
    }
    const driver = drivers.find(d => d.id === driverId);
    return driver?.homeLocation || 'Unknown';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Drivers
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Driver Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Home Location</TableCell>
                <TableCell>Current Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell>{driver.phoneNumber}</TableCell>
                  <TableCell>{driver.homeLocation}</TableCell>
                  <TableCell>{getDriverCurrentLocation(driver.id)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Drivers; 