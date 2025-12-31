import './App.css'

import { Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import AddShow from './pages/AddShow'
import ListShows from './pages/ListShows'
import ListBookings from './pages/ListBookings'
import Manage360Videos from './pages/Manage360Videos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-show" element={<AddShow />} />
        <Route path="list-shows" element={<ListShows />} />
        <Route path="list-bookings" element={<ListBookings />} />
        <Route path="manage-360-videos" element={<Manage360Videos />} />
      </Route>
    </Routes>
  )
}

export default App
