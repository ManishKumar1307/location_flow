const express = require('express');
const { addAddress, getAddresses, deleteAddress } = require('../controllers/addressController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/address', authMiddleware, addAddress);
router.get('/addresses', authMiddleware, getAddresses);
router.delete('/address/:addressId', authMiddleware, deleteAddress);

module.exports = router;
