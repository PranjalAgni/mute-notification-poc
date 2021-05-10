import Status from './components/Status';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react';
import { updateStatusAfterExpiryTime } from './utils/timer';
import { addition, subtraction } from 'fastmath-utils';

function App() {
  console.log(addition(3, 5));
  console.log(subtraction(3, 5));
  useEffect(() => {
    const expTime = 2500;
    updateStatusAfterExpiryTime(expTime);
  }, []);

  return (
    <div className="App">
      <p className="header">Mute Notification Feature POC</p>
      <div className="header">
        <Status />
      </div>
    </div>
  );
}

export default App;
