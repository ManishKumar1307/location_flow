import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { MdOutlineMyLocation } from "react-icons/md";
import { FaHome, FaBriefcase } from 'react-icons/fa'; 
import { PiUsersFill } from "react-icons/pi"; 
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [category, setCategory] = useState('Home');
  const [houseNo, setHouseNo] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
  
          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
            );
            const geoData = response.data.results[0];
  
            if (geoData) {
              const cityName = geoData.components.city || geoData.components.town || geoData.components.village;
              const countryName = geoData.components.country;
              const localityName = geoData.components.locality || geoData.components.neighbourhood || geoData.components.road || 'Unknown locality';
              const pincodeValue = geoData.components.postcode || 'Unknown postcode';
  
              setLocality(localityName);
              setCity(cityName);
              setCountry(countryName);
              setPincode(pincodeValue);
            } else {
              alert('Unable to fetch location details.');
            }
          } catch (error) {
            console.error('Error fetching location details:', error);
            alert('Unable to fetch location details.');
          }
        },
        (error) => {
          alert('Error retrieving your location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/address',
        { latitude, longitude, houseNo, flatNo, category, locality, city, country, pincode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Address added successfully');
      navigate('/addresses');
    } catch (error) {
      console.error('Error adding address:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-64">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Address</h1>

      <form onSubmit={handleAddAddress} className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="flex items-center space-x-2 col-span-2">

          <MdOutlineMyLocation className='text-red-600 font-bold text-xl' />
          <span className='text-red-600 font-bold text-xl'>Use Current Location</span>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="text-red-500 hover:text-white hover:bg-red-600 text-lg font-bold border rounded px-4 py-1 border-red-600 border-2 "
          >
            Enable
          </button>
        </div>

        <div>
          <label htmlFor="houseNo" className="block text-gray-700 font-medium">House Number</label>
          <input
            type="text"
            id="houseNo"
            placeholder="House Number"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div>
          <label htmlFor="flatNo" className="block text-gray-700 font-medium">Flat Number</label>
          <input
            type="text"
            id="flatNo"
            placeholder="Flat Number"
            value={flatNo}
            onChange={(e) => setFlatNo(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>


        <div>
          <label htmlFor="pincode" className="block text-gray-700 font-medium">Pincode</label>
          <input
            type="text"
            id="pincode"
            value={pincode}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
            readOnly
          />
        </div>

        <div>
          <label htmlFor="locality" className="block text-gray-700 font-medium">Locality</label>
          <input
            type="text"
            id="locality"
            value={locality}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
            readOnly
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-gray-700 font-medium">City</label>
          <input
            type="text"
            id="city"
            value={city}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
            readOnly
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-gray-700 font-medium">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
            readOnly
          />
        </div>

        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">SAVE AS</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value="Home"
                checked={category === 'Home'}
                onChange={(e) => setCategory(e.target.value)}
                className="hidden"
              />
              <div
                className={`w-12 h-12 flex items-center justify-center border-2 ${category === 'Home' ? 'border-teal-600' : 'border-gray-300'} rounded-full p-2`}
              >
                <FaHome className={`text-xl ${category === 'Home' ? 'text-teal-600' : 'text-gray-500'}`} />
              </div>
              <span className={`text-sm ${category === 'Home' ? 'text-teal-600' : 'text-gray-600'}`}>Home</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value="Office"
                checked={category === 'Office'}
                onChange={(e) => setCategory(e.target.value)}
                className="hidden"
              />
              <div
                className={`w-12 h-12 flex items-center justify-center border-2 ${category === 'Office' ? 'border-teal-600' : 'border-gray-300'} rounded-full p-2`}
              >
                <FaBriefcase className={`text-xl ${category === 'Office' ? 'text-teal-600' : 'text-gray-500'}`} />
              </div>
              <span className={`text-sm ${category === 'Office' ? 'text-teal-600' : 'text-gray-600'}`}>Office</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value="Friends & Family"
                checked={category === 'Friends & Family'}
                onChange={(e) => setCategory(e.target.value)}
                className="hidden"
              />
              <div
                className={`w-12 h-12 flex items-center justify-center border-2 ${category === 'Friends & Family' ? 'border-teal-600' : 'border-gray-300'} rounded-full p-2`}
              >
                <PiUsersFill className={`text-xl ${category === 'Friends & Family' ? 'text-teal-600' : 'text-gray-500'}`} />
              </div>
              <span className={`text-sm ${category === 'Friends & Family' ? 'text-teal-600' : 'text-gray-600'}`}>Friends & Family</span>
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
