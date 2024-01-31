import React from 'react';
import { Route, Routes } from 'react-router';

import { paths } from './constants/path';

import { InventoryPage } from './pages/InventoryPage';

export const App = () => {
  return (
    <Routes>
      <Route path={paths.landing} element={<InventoryPage />} />
    </Routes>
  );
};

export default App;
