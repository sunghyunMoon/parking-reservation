import React from 'react';
import VoltUpParkingApp from './app/VoltUpParkingApp.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <VoltUpParkingApp />
        </Provider>
    );
};

export default App;
