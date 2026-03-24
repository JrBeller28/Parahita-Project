/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import CustomOrder from "./pages/CustomOrder"
import Portfolio from "./pages/Portfolio"
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard"

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin"
import { AdminLayout } from "./components/layout/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminCatalog from "./pages/admin/AdminCatalog"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminPortfolio from "./pages/admin/AdminPortfolio"
import AdminContacts from "./pages/admin/AdminContacts"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="custom-order" element={<CustomOrder />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="catalog" element={<AdminCatalog />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
    </Router>
  )
}
