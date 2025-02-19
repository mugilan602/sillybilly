import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BunnyList from "./pages/user/BunnyList";
import Chicks from "./pages/user/Chicks";
import Goats from "./pages/user/Goats";
import ContactSection from "./pages/user/ContactSection";
import Gallery from "./pages/user/Gallery";
import BunnyCare from "./pages/user/BunnyCare";
import Temp from "./components/Temp";

import AdminNavbar from "./components/dashboard/AdminNavbar";
import Dashboard from "./pages/admin/Dashboard";
import ManageListings from "./components/dashboard/ManageListings";
import GalleryManagement from "./components/dashboard/GalleryManagement";
import FormResponsesDashboard from "./components/dashboard/FormResponsesDashboard";
import HomePageCarousel from "./components/dashboard/HomePageCarousel";
import AddNewBunny from "./components/dashboard/AddNewBunny";
import Login from "./components/dashboard/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import ProtectedRoute

// User Layout
const UserLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// Admin Layout
const AdminLayout = ({ children }) => (
  <>
    <AdminNavbar />
    {children}
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/holland_lop"
          element={
            <UserLayout>
              <BunnyList />
            </UserLayout>
          }
        />
        <Route
          path="/netherland_dwarf"
          element={
            <UserLayout>
              <BunnyList />
            </UserLayout>
          }
        />
        <Route
          path="/chicks-eggs"
          element={
            <UserLayout>
              <Chicks />
            </UserLayout>
          }
        />
        <Route
          path="/goats"
          element={
            <UserLayout>
              <Goats />
            </UserLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <UserLayout>
              <ContactSection />
            </UserLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <UserLayout>
              <Gallery />
            </UserLayout>
          }
        />
        <Route
          path="/bunny-care"
          element={
            <UserLayout>
              <BunnyCare />
            </UserLayout>
          }
        />
        <Route
          path="/temp"
          element={
            <UserLayout>
              <Temp />
            </UserLayout>
          }
        />

        {/* ✅ Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-listing"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageListings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-bunny"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AddNewBunny />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <GalleryManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forms"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <FormResponsesDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/carousel"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <HomePageCarousel />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
