
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PostGenerator from './components/PostGenerator';
import ContentPlanner from './components/ContentPlanner';
import ProductBuilder from './components/ProductBuilder';
import ProfileSettings from './components/ProfileSettings';
import Quiz from './components/Quiz';
import Inspiration from './components/Inspiration';
import Pricing from './components/Pricing';
import SalesLab from './components/SalesLab';
import Support from './components/Support';
import ClientSimulator from './components/ClientSimulator';
import { getTelegramUser } from './services/notificationService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user_profile');
    const tgUser = getTelegramUser();
    
    const initialProfile = saved ? JSON.parse(saved) : {
      name: 'Эксперт',
      niche: 'Psychologist',
      specialization: 'Общая',
      voiceStyle: 'gentle',
      telegramChatId: '449767672',
      diplomas: [],
      videoIntroUrl: '',
      isPremium: false,
      generationsUsed: 0
    };

    return { ...initialProfile, telegramUser: tgUser };
  });

  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
  }, [profile]);

  const trackGeneration = () => {
    setProfile(prev => ({
      ...prev,
      generationsUsed: prev.generationsUsed + 1
    }));
  };

  const checkAccess = (view: AppView) => {
    const tools = [AppView.POST_GEN, AppView.CONTENT_PLAN, AppView.PRODUCT_BUILDER, AppView.QUIZ, AppView.SALES_LAB, AppView.CLIENT_SIMULATOR];
    if (tools.includes(view) && !profile.isPremium && profile.generationsUsed >= 1) {
      setCurrentView(AppView.PRICING);
      return false;
    }
    setCurrentView(view);
    return true;
  };

  const handlePurchase = () => {
    setProfile(prev => ({ ...prev, isPremium: true }));
    // Здесь можно также вызвать уведомление админу
    setCurrentView(AppView.DASHBOARD);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onNavigate={checkAccess} isPremium={profile.isPremium} />;
      case AppView.POST_GEN:
        return <PostGenerator profile={profile} onGenerated={trackGeneration} />;
      case AppView.CONTENT_PLAN:
        return <ContentPlanner profile={profile} onGenerated={trackGeneration} />;
      case AppView.PRODUCT_BUILDER:
        return <ProductBuilder profile={profile} onGenerated={trackGeneration} onNavigate={checkAccess} />;
      case AppView.PROFILE:
        return <ProfileSettings profile={profile} setProfile={setProfile} />;
      case AppView.QUIZ:
        return <Quiz onGenerated={trackGeneration} isPremium={profile.isPremium} generationsUsed={profile.generationsUsed} onUpgrade={() => setCurrentView(AppView.PRICING)} />;
      case AppView.INSPIRATION:
        return <Inspiration />;
      case AppView.PRICING:
        return <Pricing onPurchase={handlePurchase} />;
      case AppView.SALES_LAB:
        return <SalesLab profile={profile} onGenerated={trackGeneration} />;
      case AppView.SUPPORT:
        // Fix: Pass missing 'profile' prop to Support component
        return <Support profile={profile} />;
      case AppView.CLIENT_SIMULATOR:
        return <ClientSimulator profile={profile} onGenerated={trackGeneration} />;
      default:
        return <Dashboard onNavigate={checkAccess} isPremium={profile.isPremium} />;
    }
  };

  return (
    <Layout activeView={currentView} onNavigate={checkAccess}>
      {renderView()}
    </Layout>
  );
};

export default App;
