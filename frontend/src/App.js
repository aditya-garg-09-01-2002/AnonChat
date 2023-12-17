import './App.css';
import './styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/login';
import SignUp from './components/signup';
import Home from './components/home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/home' exact element={<Home />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
