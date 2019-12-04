import React from 'react';
import Routes from './routes';
import GlobalStyles from './styles/global';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function App() {
  return (
    <>
      <MuiThemeProvider>
        <Routes />
        <GlobalStyles />
      </MuiThemeProvider>
    </>
  );
}

export default App;
