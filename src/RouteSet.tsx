import Home from 'pages/Home';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function RouteSet() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default RouteSet;
