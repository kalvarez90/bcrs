/*
============================================
; Title:  roles-api.js
; Author: Professor Krasso
; Date:   28 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: Roles API
;===========================================
*/

//require files to export
const express = require('express');
const User = require('../models/user');
const Role = require('../models/role');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response')


//It defines router variables - configuration
const router = express.Router();

/**
 * FindAll Role API
 */

/**
 * FindById Role API
 */
router.get('/:roleId', async(req, res) => {
  try
  {
    //Finds the role by id
    Role.findOne({'_id': req.params.roleId}, function(err, role) {

      // if...else function to help handling error and  successful queries
      if (err)
      {
        console.log(err);
        const findRoleByIdMongodbErrorResponse = new ErrorResponse(500, 'Role Id not found', err);
        res.status(500).send(findRoleByIdMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(role);
        const findRoleByIdResponse = new BaseResponse(200, 'Role Successfully found', role);
        res.json(findRoleByIdResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findRoleByIdCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

/**
 * CreateRole Role API
 */

/**
 * UpdateRole Role API
 */

/**
 * DeleteRole Role API
 */
router.delete('/:roleId', async(req, res) => {
  try
  {
    //Finds the role by id
    Role.findOne({'_id': req.params.roleId}, function(err, role) {

      //if...else function to help handle errors within MongoDB
      if (err)
      {
        console.log(role);
        const deleteRoleMongodbErrorResponse = new ErrorResponse(500, 'Error, roleId not found', err);
        res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(role);

        /**
          * aggregate query to determine if the role being deleted is already
          * been assigned to a user
        */
       User.aggregate(
         [
           {
             $lookup:
             {
               from: 'roles',
               localField: 'role.role',
               foreignField: 'text',
               as: 'userRoles'
             }
           },
           {
             $match:
             {
               'userRoles.text': role.text
             }
           }
         ], function(err, users) {

          //if an error occurs, this will be shown to the user
          if (err)
          {
            console.log(err);
            const userMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
            res.status(500).send(userMongodbErrorResponse.toObject());
          }
          //if the query returns 1+ users, then the role is already in use and shouldn't be disabled
          else
          {
            if (users.length > 0)
            {
              console.log(`Role <${role.text}> is already in use and cannot be deleted`);
              const userRoleAlreadyInUseResponse = new BaseResponse(200, `Role <${role.text}> is already in use and cannot be deleted`, role);
              res.json(userRoleAlreadyInUseResponse.toObject());
            }
            else
            //if no users found, role can be disabled
            {
              console.log(`Role <${role.text}> is not an active role and can be safely removed`);

              role.set({
                isDisabled: true
              });

              role.save(function(err, updatedRole){

                if (err)
                {
                  console.log(err);
                  const updatedRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
                  res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                }
                else
                {
                  console.log(updatedRole);
                  const roleDeletedResponse = new BaseResponse(200, `Role <${role.text}> has been successfully deleted`, updatedRole);
                  res.json(roleDeletedResponse.toObject)
                }
              })
            }
          }
         })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const deleteRoleErrorCatchResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(deleteRoleErrorCatchResponse.toObject());
  }
})

module.exports = router;