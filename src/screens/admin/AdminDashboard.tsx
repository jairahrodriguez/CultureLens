import React from 'react'
import { Link } from 'react-router-dom'

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-screen bg-[#fef7e0] p-8 flex flex-col">
      <h1 className="text-3xl font-bold text-[#754b34] mb-6 font-serif">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Countries */}
        <Link
          to="/admin/countries"
          className="p-6 bg-[#fcf8dd] rounded-xl shadow-md hover:shadow-lg border border-[#d4c4a8] transition-all"
        >
          <h2 className="text-xl font-semibold text-[#754b34] mb-2">Manage Countries</h2>
          <p className="text-[#6d5a42] text-sm">Add, edit, or remove countries in the system</p>
        </Link>

        {/* Landmarks */}
        <Link
          to="/admin/landmarks"
          className="p-6 bg-[#fcf8dd] rounded-xl shadow-md hover:shadow-lg border border-[#d4c4a8] transition-all"
        >
          <h2 className="text-xl font-semibold text-[#754b34] mb-2">Manage Landmarks</h2>
          <p className="text-[#6d5a42] text-sm">Add, edit, or remove landmarks for countries</p>
        </Link>

        {/* Users */}
        <Link
          to="/admin/users"
          className="p-6 bg-[#fcf8dd] rounded-xl shadow-md hover:shadow-lg border border-[#d4c4a8] transition-all"
        >
          <h2 className="text-xl font-semibold text-[#754b34] mb-2">Manage Users</h2>
          <p className="text-[#6d5a42] text-sm">View, edit, or delete registered users</p>
        </Link>

                <Link
        to="/admin/profile"
        className="p-6 bg-[#fcf8dd] rounded-xl shadow-md hover:shadow-lg border border-[#d4c4a8] transition-all"
        >
        <h2 className="text-xl font-semibold text-[#754b34] mb-2">Manage Profile</h2>
        <p className="text-[#6d5a42] text-sm">Edit your name or log out</p>
        </Link>
      </div>
    </div>
  )
}
