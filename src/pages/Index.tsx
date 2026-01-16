import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { useApp } from '@/context/AppContext';

const Index = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useApp();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  return <LoginPage />;
};

export default Index;
