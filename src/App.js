import './App.css';
import About from './components/About';
import TaskTracker from './components/TaskTracker';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskTracker />}>
        </Route>
        <Route path='about' element={<About/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
