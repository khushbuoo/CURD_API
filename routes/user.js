const express = require('express');

const router = express.Router();

const {
    adduser,
    getUser,
    updateuserProfile,
    deleteProfile
} = require('../controller/user')

// User
router.post('/Adddetails',adduser)
router.get('/Showdetails',getUser)
router.put('/Updateprofile/:userId', updateuserProfile);
router.delete('/Deleteprofile/:userId',deleteProfile);


module.exports = router;

