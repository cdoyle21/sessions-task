import './App.style';
import React, { FC } from 'react';
import { Wrapper } from './App.style';
import Products from './components/organisms';

const App: FC = () => {
  return (
    <>
      <Wrapper>
        Sessions task
        <Products />
      </Wrapper>
    </>
  );
};

export default App;
