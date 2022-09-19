

import { Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';

function App() {
  return (
    <div >
      <Routes>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
