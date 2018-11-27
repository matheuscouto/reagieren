import React from 'react';
import { Route } from 'react-router-dom';
import { ExamplePage } from './pages';
import styled from './styles/styled-components';

const App: React.FunctionComponent = () => {
  
  return (
    <AppWrapper>
      <Route exact path='/' component={ExamplePage} />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})