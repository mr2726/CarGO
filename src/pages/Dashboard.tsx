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
  FormControl,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getCargoList, updateCargoStatus, updatePaymentStatus } from '../services/cargo';
import { Cargo, LoadStatus, PaymentStatus } from '../types';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const [cargoList, setCargoList] = useState<Cargo[]>([]);
  const [filteredCargo, setFilteredCargo] = useState<Cargo[]>([]);
  const [driverFilter, setDriverFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCargo = async () => {
      try {
        const cargo = await getCargoList();
        setCargoList(cargo);
        setFilteredCargo(cargo);
      } catch (error) {
        console.error('Error fetching cargo:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCargo();
  }, []);

  useEffect(() => {
    let filtered = [...cargoList];

    if (driverFilter) {
      filtered = filtered.filter(cargo => 
        cargo.driverName.toLowerCase().includes(driverFilter.toLowerCase())
      );
    }

    if (monthFilter) {
      filtered = filtered.filter(cargo => {
        const cargoDate = new Date(cargo.pickupDate);
        return cargoDate.getMonth() === monthFilter.getMonth() &&
               cargoDate.getFullYear() === monthFilter.getFullYear();
      });
    }

    setFilteredCargo(filtered);
  }, [cargoList, driverFilter, monthFilter]);

  const handleStatusChange = async (cargoId: string, newStatus: LoadStatus) => {
    try {
      await updateCargoStatus(cargoId, newStatus);
      setCargoList(prevList =>
        prevList.map(cargo =>
          cargo.id === cargoId ? { ...cargo, status: newStatus } : cargo
        )
      );
    } catch (error) {
      console.error('Error updating cargo status:', error);
    }
  };

  const handlePaymentStatusChange = async (cargoId: string, newStatus: PaymentStatus) => {
    try {
      await updatePaymentStatus(cargoId, newStatus);
      setCargoList(prevList =>
        prevList.map(cargo =>
          cargo.id === cargoId ? { ...cargo, paymentStatus: newStatus } : cargo
        )
      );
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
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
          Cargo Dashboard
        </Typography>
        
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <TextField
            label="Filter by Driver Name"
            value={driverFilter}
            onChange={(e) => setDriverFilter(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['year', 'month']}
              value={monthFilter}
              onChange={(newValue: Date | null) => setMonthFilter(newValue)}
              slotProps={{
                textField: {
                  label: 'Filter by Month',
                  sx: { minWidth: 200 }
                }
              }}
            />
          </LocalizationProvider>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pickup Location</TableCell>
                <TableCell>Delivery Location</TableCell>
                <TableCell>Pickup Date</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Payment Type</TableCell>
                <TableCell>Load Status</TableCell>
                <TableCell>Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCargo.map((cargo) => (
                <TableRow key={cargo.id}>
                  <TableCell>{cargo.pickupLocation}</TableCell>
                  <TableCell>{cargo.deliveryLocation}</TableCell>
                  <TableCell>
                    {format(new Date(cargo.pickupDate), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell>{cargo.driverName}</TableCell>
                  <TableCell>${cargo.rate}</TableCell>
                  <TableCell>{cargo.paymentType}</TableCell>
                  <TableCell>
                    <FormControl size="small">
                      <Select
                        value={cargo.status}
                        onChange={(e) => handleStatusChange(cargo.id, e.target.value as LoadStatus)}
                      >
                        <MenuItem value={LoadStatus.ON_THE_WAY}>On the way</MenuItem>
                        <MenuItem value={LoadStatus.PICKED_UP}>Picked up</MenuItem>
                        <MenuItem value={LoadStatus.DELIVERED}>Delivered</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl size="small">
                      <Select
                        value={cargo.paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(cargo.id, e.target.value as PaymentStatus)}
                      >
                        <MenuItem value={PaymentStatus.RECEIVED}>Received</MenuItem>
                        <MenuItem value={PaymentStatus.WAITING}>Waiting</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Dashboard; 