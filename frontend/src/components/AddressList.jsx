import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHome, FaBriefcase } from 'react-icons/fa';
import { PiUsersFill } from "react-icons/pi";

const AddressList = () => {
  const { token } = useAuth();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/addresses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error.response ? error.response.data : error.message);
      }
    };
    fetchAddresses();
  }, [token]);


  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Home':
        return <FaHome className="w-6 h-6" />;
      case 'Office':
        return <FaBriefcase className="w-6 h-6" />;
      case 'Friends':
        return <PiUsersFill className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Addresses</h1>


      <Link
        to="/add-address"
        className="inline-block mb-4 px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add New Address
      </Link>

      {addresses.length > 0 ? (
        addresses.map((address) => (
          <div key={address._id} className="border-b py-4">
            <div className="flex items-center mb-2">
              {getCategoryIcon(address.category)}
              <p className="ml-2 font-semibold text-lg">{address.category}</p>
            </div>
            <p><strong>House No:</strong> {address.houseNo}</p>
            {address.flatNo && <p><strong>Flat No:</strong> {address.flatNo}</p>}
            <p><strong>Locality:</strong> {address.locality}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>Country:</strong> {address.country}</p>
            <p><strong>Pincode:</strong> {address.pincode}</p>
          </div>
        ))
      ) : (
        <p>No addresses found.</p>
      )}
    </div>
  );
};

export default AddressList;
