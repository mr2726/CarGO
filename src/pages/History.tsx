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
} from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Cargo } from '../types';
import { format } from 'date-fns';

const History: React.FC = () => {
  const [deliveredCargo, setDeliveredCargo] = useState<Cargo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveredCargo = async () => {
      try {
        const cargoRef = collection(db, 'cargo');
        const q = query(cargoRef, where('status', '==', 'Delivered'));
        const querySnapshot = await getDocs(q);
        
        const cargo: Cargo[] = [];
        querySnapshot.forEach((doc) => {
          cargo.push({ id: doc.id, ...doc.data() } as Cargo);
        });
        
        setDeliveredCargo(cargo);
      } catch (error) {
        console.error('Error fetching delivered cargo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveredCargo();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Delivery History
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cargo ID</TableCell>
                <TableCell>Pickup Location</TableCell>
                <TableCell>Delivery Location</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveredCargo.map((cargo) => (
                <TableRow key={cargo.id}>
                  <TableCell>{cargo.id}</TableCell>
                  <TableCell>{cargo.pickupLocation}</TableCell>
                  <TableCell>{cargo.deliveryLocation}</TableCell>
                  <TableCell>{cargo.driverName}</TableCell>
                  <TableCell>
                    {cargo.deliveryDate ? format(new Date(cargo.deliveryDate), 'MM/dd/yyyy') : 'N/A'}
                  </TableCell>
                  <TableCell>{cargo.paymentStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default History; 