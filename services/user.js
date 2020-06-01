const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongoose').Types;
const Model = require('../model/user')
const request = require('request');

module.exports.save = (data) => new Model(data).save();

module.exports.get = async (idOrEmail, fieldName = '_id') => {
    // console.log('zzz',idOrEmail);
    // console.log('yyy',idOrEmail);
  const data = await Model.findOne({
    [fieldName]: `${idOrEmail}`,
  });
  return data;
};

module.exports.isUserExists = (idOrEmail, fieldName = '_id') => Model.countDocuments({
  [fieldName]: idOrEmail,
});

module.exports.getUsersMainProfileData = async (userId) => {
  try {
    const userData = await Model.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);
    // console.log('userdata is',userData)
    return userData[0];
  } catch (error) {
    throw error;
  }
};
module.exports.updateProfile = async (profileId, body)=>{
 try{
  const {
    firstName, lastName, email,password,
     } = body;
  const data = await Model.findByIdAndUpdate(
    profileId,
    {
      $set: {
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
      },
    },
    {
      runValidators: true,
      new: true,
    },
  );
  return data;
 }catch(error){
   throw error;
 }
}

module.exports.getUsersProfileData = async () => {
    try {
      const userData = await Model.aggregate([
        {
          $project: {
            password: 0,
          },
        },
      ]);
      console.log('userdata is',userData)
      return userData;
    } catch (error) {
      throw error;
    }
  };
  module.exports.updateuser = async(req, userId)=>{
    try{
      const firstName = req.body.firstName;
    const lastName  = req.body.lastName;
    const email =  req.body.email;
    const password =  req.body.password;
    const updatedata = await Model.findByIdAndUpdate(
            {_id:userId},
            {
              $set: {
                firstname:firstName,
                lastname:lastName,
                email:email,
                password:password
              },
            },
            {
             upsert: true
            },
          );
          return updatedata;
  
    }catch(err){
      throw err;
    }
  };






