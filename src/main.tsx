import React from 'react';
import { Routes } from './route';

import { Navbar } from './components';

interface MainProps {}

const Main: React.FC = (props: MainProps) => (
  <>
    <Navbar/>
    <Routes />

  </>
);

export default Main;
