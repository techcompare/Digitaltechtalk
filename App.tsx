import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import SubmitToolPage from './pages/SubmitToolPage';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const renderPage = () => {
    switch (currentRoute) {
      case '#/search':
        return <SearchPage />;
      case '#/about':
        return <AboutPage />;
      case '#/submit':
        return <SubmitToolPage />;
      case '#/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 via-black to-black z-0"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentRoute={currentRoute} />
        <main className="container mx-auto px-4 max-w-6xl flex-grow py-10">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;