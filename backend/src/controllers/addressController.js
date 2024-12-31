const Address = require('../models/Address');
const axios = require('axios');

const apiKey = '662028e983a94797a53df682254208ad';

exports.addAddress = async (req, res) => {
  const { latitude, longitude, houseNo, flatNo, category, city, country } = req.body;

  try {
    // Get city, locality, country, and pincode from geolocation API based on latitude and longitude
    const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
    const geoData = geoResponse.data.results[0];

    // Check if geoData is found
    if (!geoData) {
      return res.status(404).json({ message: 'Geolocation not found' });
    }


    const cityName = city || geoData.components.city || geoData.components.town || geoData.components.village;
    const countryName = country || geoData.components.country;
    const localityName = geoData.components.locality || geoData.components.neighbourhood || geoData.components.road || 'Unknown locality';


    const newAddress = new Address({
      userId: req.user.userId,
      latitude,
      longitude,
      houseNo,
      flatNo,
      locality: localityName,
      city: cityName,
      country: countryName,
      pincode: geoData.components.postcode || 'Unknown postcode',
      category,
    });

    await newAddress.save();
    res.status(201).json({ message: 'Address added successfully', newAddress });

  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAddress = async (req, res) => {
  const { addressId } = req.params;
  try {
    const address = await Address.findByIdAndDelete(addressId);
    if (!address) return res.status(404).json({ message: 'Address not found' });
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
