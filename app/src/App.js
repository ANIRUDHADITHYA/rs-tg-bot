import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import BackButton from './Components/TelegramChecks/BackButton';
import DailyBonus from './Pages/DailyBonus/DailyBonus';
import Boost from './Pages/Boost/Boost';
import UserWrapper from './ContextAPI/UserWrapper';
import Loader from './Pages/Loader/Loader';

const Home = lazy(() => import('./Pages/Home/Home'));
const Tasks = lazy(() => import('./Pages/Tasks/Tasks'));
const Wallet = lazy(() => import('./Pages/Wallet/Wallet'));
const Friends = lazy(() => import('./Pages/Friends/Friends'));
const tele = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tele.ready();

    const loadAssets = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadAssets();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <BackButton />
          <UserWrapper>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/tasks' exact element={<Tasks />} />
              <Route path='/wallet' exact element={<Wallet />} />
              <Route path='/friends' exact element={<Friends />} />
              <Route path='/daily-bonus' exact element={<DailyBonus />} />
              <Route path='/boost' exact element={<Boost />} />
            </Routes>
          </UserWrapper>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
