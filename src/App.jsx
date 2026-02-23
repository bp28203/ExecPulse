/**
 * EXECUTIVE VOICE TRANSFORMER
 * - Phase 3: React Router Implementation
 * - Navigation: Home, Price, How It Works, App, Login/Signup
 */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useOutletContext } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import PricePage from './pages/PricePage';
import HowItWorksPage from './pages/HowItWorksPage';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import useHeroCarousel from './hooks/useHeroCarousel';

// Layout wrapper for all pages with Navigation
function LayoutWithNav() {
  const currentHeroIndex = useHeroCarousel(true);
  
  return (
    <RootLayout>
      <Outlet context={{ currentHeroIndex }} />
    </RootLayout>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LayoutWithNav />}>
          <Route path="/" element={<HomePageWithCarousel />} />
          <Route path="/price" element={<PricePage setAuthMode={() => {}} />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Wrapper component to use outlet context
function HomePageWithCarousel() {
  const { currentHeroIndex } = useOutletContext();
  return <HomePage currentHeroIndex={currentHeroIndex} />;
}