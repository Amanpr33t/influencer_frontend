
import Navbar from './components/Navbar';
import Body from './components/Body';
import InfluencerForm from './components/InfluencerForm';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='w-full min-h-screen box-border'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Body />}></Route>
        <Route path='/form' element={<InfluencerForm />}></Route>
        <Route path='*' element={<Navigate replace to='/' />}></Route>
      </Routes>
    </div>
  );
}

export default App;
