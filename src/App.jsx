import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import Home from './Home';
import Login from './Login';
import Account from './Account';
import MovieItemDetails from './MovieItemDetails';
import Popular from './Popular';
import Search from './Search';
import NotFound from './NotFound';
import YoutubeVideo from './YoutubeVideo';
import Wishlist from './Wishlist';
import ProtectedRoute from './ProtectedRoute';
import WishlistProvider from './WishlistContext';
import PlayTrailer from './PlayTrailer';


const lastVisit = sessionStorage.getItem('lastVisit');
const expiredSession = !lastVisit || Date.now() - parseInt(lastVisit) > 1000;


if (expiredSession) {
  Cookies.remove('jwt_token');
  localStorage.removeItem('wishlistMovies');
  sessionStorage.clear(); 
}

const App = () => {
  useEffect(() => {
    sessionStorage.setItem('lastVisit', Date.now().toString());

    const handleUnload = () => {
      sessionStorage.setItem('lastVisit', Date.now().toString());
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <WishlistProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/movieitemdetails/:id" element={<ProtectedRoute><MovieItemDetails /></ProtectedRoute>} />
          <Route path="/popular" element={<ProtectedRoute><Popular /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/youtubevideo/:movieId" element={<ProtectedRoute><YoutubeVideo /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/playtrailer" element={<ProtectedRoute><PlayTrailer /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
};

export default App;
