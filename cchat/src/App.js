import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Join from './components/Join/Join'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Join />} />
          <Route exact path='/chat' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
