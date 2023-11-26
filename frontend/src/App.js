import './App.css';
import './styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/login';
import SignUp from './components/signup';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
