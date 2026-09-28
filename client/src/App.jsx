import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Schemes from './pages/Schemes';
import SchemeDetails from './pages/SchemeDetails';
import Announcements from './pages/Announcements';
import Services from './pages/Services';
import Jobs from './pages/Jobs';
import Agriculture from './pages/Agriculture';
import Health from './pages/Health';
import Education from './pages/Education';
import Emergency from './pages/Emergency';
import Login from './pages/Login';
import Register from './pages/Register';

// Citizen Pages
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import CitizenProfile from './pages/citizen/CitizenProfile';
import SubmitComplaint from './pages/citizen/SubmitComplaint';
import MyComplaints from './pages/citizen/MyComplaints';
import ComplaintDetails from './pages/citizen/ComplaintDetails';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCitizens from './pages/admin/ManageCitizens';
import ManageComplaints from './pages/admin/ManageComplaints';
import ManageSchemes from './pages/admin/ManageSchemes';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';
import ManageJobs from './pages/admin/ManageJobs';
import ManageServices from './pages/admin/ManageServices';
import ManageHealth from './pages/admin/ManageHealth';
import ManageSchools from './pages/admin/ManageSchools';
import ManageAgriculture from './pages/admin/ManageAgriculture';
import ManageEmergency from './pages/admin/ManageEmergency';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/schemes/:id" element={<SchemeDetails />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/services" element={<Services />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/agriculture" element={<Agriculture />} />
                <Route path="/health" element={<Health />} />
                <Route path="/education" element={<Education />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Citizen Routes */}
                <Route
                  path="/citizen/dashboard"
                  element={
                    <ProtectedRoute>
                      <CitizenDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/citizen/profile"
                  element={
                    <ProtectedRoute>
                      <CitizenProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/citizen/submit-complaint"
                  element={
                    <ProtectedRoute>
                      <SubmitComplaint />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/citizen/my-complaints"
                  element={
                    <ProtectedRoute>
                      <MyComplaints />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/citizen/complaint/:id"
                  element={
                    <ProtectedRoute>
                      <ComplaintDetails />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/citizens"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageCitizens />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/complaints"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageComplaints />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/schemes"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageSchemes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/announcements"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageAnnouncements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/jobs"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageJobs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/services"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageServices />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/health"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageHealth />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/schools"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageSchools />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/agriculture"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageAgriculture />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/emergency"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageEmergency />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
