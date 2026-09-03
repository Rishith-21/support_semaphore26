import React from 'react';
import './App.css';
import { campusData, facilityCategories } from './data/campusData';
import { CampusMapSection } from './components/CampusMapSection';

function App() {
  return (
    <div className="app-layout">
      <main className="main-content-wrapper">
        <CampusMapSection
          campusData={campusData}
          categories={facilityCategories}
        />
      </main>
    </div>
  );
}

export default App;
