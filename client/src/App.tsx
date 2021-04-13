import Status from './components/Status';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
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
