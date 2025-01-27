import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../routing/AppRoutes.tsx';
import { useDispatch } from 'react-redux';
import { fetchMySpot } from '../redux/slices/mySpotSlice.ts';
import { AppDispatch } from '../redux/store.ts';

const VoltUpParkingApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    dispatch(fetchMySpot('user'));

    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default VoltUpParkingApp;
