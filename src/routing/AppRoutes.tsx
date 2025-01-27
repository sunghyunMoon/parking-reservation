import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ParkingLot from '../components/ParkingLot.tsx';
import ReservePage from '../components/ReservePage.tsx';

const AppRoutes: React.FC = () => (
    <Routes>
        {/* "/" : temp path */}
        <Route path="/" element={<ParkingLot />} />
        <Route path="/parkinglot" element={<ParkingLot />} />
        <Route path="/reserve/:id" element={<ReservePage />} />
    </Routes>
);

export default AppRoutes;
