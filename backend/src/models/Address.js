const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  houseNo: { type: String, required: true },
  flatNo: { type: String, required: false },
  locality: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  category: { type: String, enum: ['Home', 'Office', 'Friends & Family'], required: true },
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
