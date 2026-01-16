import { useNavigate } from 'react-router-dom';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { useApp } from '@/context/AppContext';
import { useEffect } from 'react';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isOnboarding } = useApp();

  useEffect(() => {
    if (isLoggedIn && !isOnboarding) {
      navigate('/home');
    }
  }, [isLoggedIn, isOnboarding, navigate]);

  return <OnboardingFlow />;
};
