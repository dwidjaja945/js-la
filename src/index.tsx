import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';

const root = document.getElementById('app-container');

const Container = (): JSX.Element => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
ReactDOM.render(<Container />, root);
