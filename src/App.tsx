import './App.style';
import React, { FC } from 'react';
import { Wrapper } from './App.style';
import Products from './components/organisms/Products';

const App: FC = () => {
  return (
    <>
      <Wrapper>
        <Products />
      </Wrapper>
    </>
  );
};

export default App;
