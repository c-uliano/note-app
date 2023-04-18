import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import HomePage from './components/HomePage';
import NewNote from './components/NewNote';
import EditNote from './components/EditNote';
import ViewNote from './components/ViewNote';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="" element={<HomePage/>}/>
          <Route path="/new/note" element={<NewNote/>}/>
          <Route path="/edit/note/:id" element={<EditNote/>}/>
          <Route path="/view/note/:id" element={<ViewNote/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
