import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import Routes from './routes/Routes';
import theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Routes/>
    </ThemeProvider>
  );
}

export default App;
