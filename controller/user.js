const fs = require('fs');
const path = require('path');
var bcrypt = require('bcryptjs');
const db = require('../config').mongoUrl

const Usermodel = require('../model/user')
const {
    save,
    get,
    update,
    getUsersMainProfileData,
    getUsersProfileData,
    updateProfile,
    updateuser
    } = require('../services/user');

 

  const {
  handleResponse,
  handleError,
} = require('../common/requestHandle');




  module.exports.adduser = async ({ body }, res) => {
    try {
      const {
     firstName, lastName, email,password,
      } = body;
    
      const existingUserEmail = await get(email, 'email');
      // if (existingUserEmail && existingUserEmail.isEmailVerified === true) {
      if (existingUserEmail) {
        return handleResponse({ res,statusCode:400,msg:'User Already exists. Please try another one!' });
      }
        user = await save(body);
        if(user){
             handleResponse({ res,msg:' User Registered Successfully', data: user });
        }else{
            handleResponse({ res,msg:'not registered user', });
        }
    } catch (err) {
      return handleError({ res, err });
    }
  };

  module.exports.getUser = async (req,res,next) => {
    try {
      const user = await getUsersProfileData();
      handleResponse({
        res,
        statusCode: 200,
        msg: 'Your fetch data successully',
        data:user,
      });
      } catch (err) {
      handleError({ res, err });
    }
  };
  module.exports.updateuserProfile = async (req, res)  => {
    try {
      const userId = req.params.userId
        const data = await updateuser(req,userId)
        if(data){
          handleResponse({ res,msg:'PersonDetails update successfully', data: data });
        }else{
          throw 'not data found'
        }
    }
    catch (err) {
      handleError({ res, err });
    }
}

module.exports.deleteProfile = async (req, res) => {
    try {
      const userId = req.params.userId
      const user = await Usermodel.findOneAndRemove({_id: userId})
      if(user){
          handleResponse({ res,msg:'Persondetails delete successfully'});
      }else{
        handleResponse({ res,msg:'Persondetails Not  delete'});
      }
      } catch (err) {
      handleError({ res, err });
    }
  };