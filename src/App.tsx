import React, { useEffect, useState } from 'react';
import { supabase } from './config/supabase';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { HomeScreen } from './screens/home/HomeScreen';
import { SearchScreen } from './screens/search/SearchScreen';
import { BuddyScreen } from './screens/buddy/BuddyScreen';
import { GuideScreen } from './screens/guide/GuideScreen';
import { AccountScreen } from './screens/account/AccountScreen';
import { TranslateScreen } from './screens/translate/TranslateScreen';
import { ItineraryScreen } from './screens/itinerary/ItineraryScreen';
import { PlanTripScreen } from './screens/plan/PlanTripScreen';
import { MainLayout } from './components/layouts/MainLayout';
import { AuthLayout } from './components/layouts/AuthLayout';
import { WelcomeScreen } from './screens/welcome/WelcomeScreen';
import { PostExperienceScreen } from './screens/experience/PostExperienceScreen';
import { CommunityExperiencesScreen } from './screens/experience/CommunityExperiencesScreen';
import { SavedTripsScreen } from './screens/saved-trips/SavedTripsScreen';
import { AdminDashboard } from './screens/admin/AdminDashboard';
import { AdminProfile } from './screens/admin/AdminProfile';
import { AdminCountries } from './screens/admin/AdminCountries';
import { AdminLandmarks } from './screens/admin/AdminLandmarks';
import { AdminUsers } from './screens/admin/AdminUsers';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'Traveler' | 'Admin' | null>(null);

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Verify Supabase session on app start to avoid false auth from stale localStorage
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // valid session
          setIsAuthenticated(true);
          try {
            const stored = localStorage.getItem('user');
            if (stored) {
              const parsed = JSON.parse(stored);
              if (parsed && (parsed.role === 'Traveler' || parsed.role === 'Admin')) {
                setUserType(parsed.role as 'Traveler' | 'Admin');
              }
            }
          } catch (e) {
            // ignore parse errors; default will be Traveler
          }
        } else {
          // no active session — clear any stale localStorage user
          localStorage.removeItem('user');
        }
      } catch (err) {
        console.warn('Auth check failed', err);
      } finally {
        setAuthLoading(false);
      }
    })();
  }, []);

  const handleLogin = (type: 'Traveler' | 'Admin') => {
    setIsAuthenticated(true);
    setUserType(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('isDemoAccount');
    localStorage.removeItem('demoUser');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserType(null);
  };

  return (
    // Show a brief loading state while we verify auth session to avoid flashes/incorrect redirects
    authLoading ? (
      <div className="min-h-screen flex items-center justify-center bg-[#fef7e0]">
        <p className="text-[#754b34]">Checking session...</p>
      </div>
    ) : (
    <BrowserRouter>
      <Routes>
        {/* Welcome */}
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <WelcomeScreen />
            ) : userType === 'Admin' ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginScreen onLogin={handleLogin} />
              ) : userType === 'Admin' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <RegisterScreen onRegister={handleLogin} />
              ) : userType === 'Admin' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
        </Route>

        {/* Protected */}
        <Route
          element={
            isAuthenticated ? (
              <MainLayout onLogout={handleLogout} userType={userType} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/* Traveler Routes */}
          {userType === 'Traveler' && (
            <>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/buddy" element={<BuddyScreen />} />
              <Route path="/guide" element={<GuideScreen />} />
              <Route path="/itinerary" element={<ItineraryScreen />} />
              <Route path="/account" element={<AccountScreen onLogout={handleLogout} />} />
              <Route path="/translate" element={<TranslateScreen />} />
              <Route path="/plan-trip" element={<PlanTripScreen />} />
              <Route path="/post-experience" element={<PostExperienceScreen />} />
              <Route path="/experiences" element={<CommunityExperiencesScreen />} />
              <Route path="/saved-trips" element={<SavedTripsScreen />} />
            </>
          )}

          {/* Admin Routes */}
          {userType === 'Admin' && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/profile" element={<AdminProfile onLogout={handleLogout} />} />
              <Route path="/admin/countries" element={<AdminCountries />} />
              <Route path="/admin/landmarks" element={<AdminLandmarks />} />
              <Route path="/admin/users" element={<AdminUsers />} />

             
            </>
          )}
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={isAuthenticated ? (<Navigate to={userType === 'Admin' ? '/admin/dashboard' : '/home'} replace />) : (<Navigate to="/login" replace />)}
        />
      </Routes>
    </BrowserRouter>
    )
  );
}
