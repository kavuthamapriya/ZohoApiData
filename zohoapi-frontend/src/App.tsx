import React from 'react';
import './components/App.css';
import LeaveList from './components/LeaveList';

const App: React.FC = () => {
  return (
    <div className="App">
      <LeaveList />
    </div>
  );
};

export default App;
