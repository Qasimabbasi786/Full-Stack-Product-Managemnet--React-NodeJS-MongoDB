import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct' // Naya import
import EditProduct from './pages/EditProduct' // Naya import
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetails from './pages/ProductDetails';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes: In sab ke liye login hona zaroori hai */}
        <Route path="/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />

        {/* Naya product add karne ka rasta */}
        <Route path="/add-product" element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        } />

        {/* Product edit karne ka rasta (ID ke saath) */}
        <Route path="/edit-product/:id" element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        } />

        {/* Product details ke liye route */}
        <Route path="/product/:id" element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/products" />} />
      </Routes>
    </Router>
  )
}

export default App