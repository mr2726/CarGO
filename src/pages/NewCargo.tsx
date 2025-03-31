import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addNewCargo, getDrivers } from '../services/cargo';
import { PaymentType, LoadStatus, PaymentStatus, Driver } from '../types';

interface FormData {
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: Date;
  driverName: string;
  driverId: string;
  rate: string;
  paymentType: PaymentType;
  status: LoadStatus;
  paymentStatus: PaymentStatus;
}

const NewCargo: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [formData, setFormData] = useState<FormData>({
    pickupLocation: '',
    deliveryLocation: '',
    pickupDate: new Date(),
    driverName: '',
    driverId: '',
    rate: '',
    paymentType: PaymentType.COD,
    status: LoadStatus.ON_THE_WAY,
    paymentStatus: PaymentStatus.WAITING
  });

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driversList = await getDrivers();
        setDrivers(driversList);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
    fetchDrivers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedDriver = drivers.find(d => d.name === formData.driverName);
      if (!selectedDriver) {
        throw new Error('Driver not found');
      }

      await addNewCargo({
        ...formData,
        driverId: selectedDriver.id,
        rate: parseFloat(formData.rate),
      });
      // Reset form
      setFormData({
        pickupLocation: '',
        deliveryLocation: '',
        pickupDate: new Date(),
        driverName: '',
        driverId: '',
        rate: '',
        paymentType: PaymentType.COD,
        status: LoadStatus.ON_THE_WAY,
        paymentStatus: PaymentStatus.WAITING
      });
    } catch (error) {
      console.error('Error adding cargo:', error);
    }
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Cargo
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Pickup Location"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleTextFieldChange}
              required
            />
            <TextField
              label="Delivery Location"
              name="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={handleTextFieldChange}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Pickup Date"
                value={formData.pickupDate}
                onChange={(newValue: Date | null) => {
                  if (newValue) {
                    setFormData(prev => ({ ...prev, pickupDate: newValue }));
                  }
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                  }
                }}
              />
            </LocalizationProvider>
            <FormControl fullWidth required>
              <InputLabel>Driver</InputLabel>
              <Select
                name="driverName"
                value={formData.driverName}
                onChange={handleSelectChange}
                label="Driver"
              >
                {drivers.map((driver) => (
                  <MenuItem key={driver.id} value={driver.name}>
                    {driver.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Rate"
              name="rate"
              type="number"
              value={formData.rate}
              onChange={handleTextFieldChange}
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Payment Type</InputLabel>
              <Select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleSelectChange}
                label="Payment Type"
              >
                <MenuItem value={PaymentType.COD}>COD</MenuItem>
                <MenuItem value={PaymentType.ZOD}>ZOD</MenuItem>
                <MenuItem value={PaymentType.OTHER}>Other</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Add Cargo
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default NewCargo; 