import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Components/PrivateRoute'; // Import PrivateRoute
import { Navigate } from 'react-router-dom';
import ArticleDetail from './Components/ArticleDetail';
import ArticleList from './Components/ArticleList';
import Archive from './Pages/Archives';
import SortingHat from './Pages/SortingHatQuiz';
import Enrollment from './Pages/Enrollment';
import Potion from'./Pages/Potion';
import Profile from './Pages/Profile';
import MainArticle from './Pages/MainArticle';
import AboutUs from './Components/AboutUs';
import Library from './Pages/Library';
import Fortune from './Pages/Fortune';





function App() {
  return (
    <Router>
      <div style={appStyle}>
        <ConditionalNavbar />
        <main style={mainStyle}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/archive" element={<Archive/>} />
            <Route path="/sortinghat" element={<SortingHat/>} />
            <Route path="/enrollment" element={<Enrollment/>} />
            <Route path="/potion" element={<Potion/>} />
            <Route path="/aboutcharmcasters" element={<AboutUs/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/main" element={<MainArticle/>} />
            <Route path="/hogwartsherald" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticleDetail />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/library" element={<Library />} />
            <Route path="/fortune" element={<Fortune />} />


          </Routes>
        </main>
        <ConditionalFooter /> {/* Conditionally render the footer */}
      </div>
    </Router>
  );
}

// Helper component to conditionally render the Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  const shouldShowNavbar = !['/login', '/register'].includes(location.pathname);

  return shouldShowNavbar ? <Navbar /> : null;
};

// Helper component to conditionally render the Footer
const ConditionalFooter = () => {
  const location = useLocation();
  const shouldShowFooter = !['/login', '/register'].includes(location.pathname);

  return shouldShowFooter ? <Footer /> : null;
};

const appStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const mainStyle = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#f9f9f9',
};

export default App;
