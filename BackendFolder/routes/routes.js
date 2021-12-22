const express = require("express");
const router = express.Router();
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const axios = require("axios");
const path = require('path');
const moment = require('moment');
const { getMaxListeners } = require("process");

var mysqlconnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dineshnb66@D',
    database: 'farmer_portal_website',
    multipleStatements: true
})

mysqlconnect.connect(err => {
    if(err){
        console.log("Database Is not Connected" + JSON.stringify(err, undefined, 2));
    }
    else{
        console.log("DataBase conneted Successfully")
    }
})

router.post('/getalldata', (req,res) => {
    mysqlconnect.query("SELECT * FROM add_crop_image_table WHERE Crop_id LIKE CONCAT('%', ?,  '%') AND E_mail_id LIKE CONCAT('%', ?,  '%') AND crop_name LIKE CONCAT('', ?,  '%') AND crop_status LIKE CONCAT('', ?,  '%') AND crop_category LIKE CONCAT('%', ?,  '%')", [req.body.Crop_id,req.body.E_mail_id,req.body.crop_name,req.body.crop_status,req.body.crop_category],(err, All_crop_data)=>{
        if (!err) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data Inserted Successfully",
              data: All_crop_data,
            });
        } else {
            res.statusCode = 404;
            res.send(err);
        }
    })
})

router.get('/getallcrop_category',(req,res) => {
    mysqlconnect.query("SELECT * FROM crop_category",(err, crop_category_data) => {
        if(!err){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data fetched Successfully",
              data: crop_category_data,
            });
        }
    });
})

router.get('/getallcrop_name/:crop_category',(req,res) => {
    mysqlconnect.query("SELECT * FROM crop_category_items WHERE Crop_Category = ?",[req.params.crop_category],(err, crop_name_data) => {
        if(!err){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data fetched Successfully",
              data: crop_name_data,
            });
        }
    });
})

router.get('/getentireData/:ID',(req,res) => {
    mysqlconnect.query("SELECT * FROM add_crop_image_table WHERE Crop_id = ?",[req.params.ID],(err, crop_details) => {
        if(!err){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data fetched Successfully",
              data: crop_details,
            });
        }
    });
})

router.get('/getpurchaserDatils/:ID', (req,res) => {
    mysqlconnect.query("SELECT * FROM purchased_crop_item WHERE Crop_id = ?",[req.params.ID],(err, purchaser_info) => {
        if(!err){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data fetched Successfully",
              data: purchaser_info,
            });
        }
    });
})

// graph related

router.get('/getcropnamesprice/:emailid', (req,res) => {
    mysqlconnect.query("SELECT crop_name, crop_price FROM add_crop_image_table WHERE E_mail_id = ?", [req.params.emailid],(err,data) => {
        if(!err){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data fetched Successfully",
              data: data,
            });
        }
    })
})
router.get('/getfarmeremailid',(req,res) => {
    mysqlconnect.query("SELECT DISTINCT E_mail_id FROM add_crop_image_table", (err,data) => {
        if(!err){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data fetched Successfully",
              data: data,
            });
        }
    })
})
router.get('/getcrop_status_count/:emailid', (req,res) => {
    mysqlconnect.query("SELECT crop_status, COUNT(crop_status) AS Approved_count FROM add_crop_image_table WHERE E_mail_id = ? GROUP BY crop_status", [req.params.emailid], (err, data) => {
        if(!err){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data fetched Successfully",
              data: data,
            });
        }
    })
})


router.post('/signupUser', async (req, res) => {
    const saltpassword = await bcrypt.genSalt(10);
    const securpassword = await bcrypt.hash(req.body.createpassword, saltpassword)
    const signupuser = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.phone,
        req.body.dob,
        req.body.gender,
        securpassword
    ]
    mysqlconnect.query("INSERT INTO sign_up_info (first_name, last_name, email_id, phone_number, date_of_birth, gender, user_password) VALUES (?)", [signupuser], (err, rows)=>{
        if (!err) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data Inserted Successfully",
              data: rows,
            });
          } else {
            res.statusCode = 404;
            res.send(err);
          }
    })
    console.log('Data Inserted Succefully');
})

router.get('/getemailunique/:email', (req, res) => {
    mysqlconnect.query("SELECT COUNT(*) AS email_unique FROM sign_up_info WHERE email_id = ?", [req.params.email], (err, data) => {
        if(!err){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data fetched Successfully",
              data: data,
            });
        }
        else{
            res.statusCode = 404;
            res.send(err);
        }
    })
})

router.get('/getphoneunique/:phone', (req, res) => {
    mysqlconnect.query("SELECT COUNT(*) AS phone_unique FROM sign_up_info WHERE phone_number = ?", [req.params.phone], (err, data) => {
        if(!err){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              message: "Data fetched Successfully",
              data: data,
            });
        }
        else{
            res.statusCode = 404;
            res.send(err);
        }
    })
})

router.post('/login', (req, res) => {
    mysqlconnect.query("SELECT * FROM sign_up_info WHERE email_id = ?", [req.body.email], (err, email_password)=>{
        if(!err){
            if(email_password.length > 0){
                bcrypt.compare(req.body.createpassword, email_password[0].user_password)
                .then(data => {
                    if(data){
                        res.status(200).send({
                            successmessage: "login Successfuly",
                        })
                    }
                    else{
                        res.send({
                            errormessage: "Password Is Not Correct"
                        })
                    }
                })
            }
            else{
                res.send({
                    errormessage: "Email is Not Found"
                })
            }
        }
        else{
            res.send({
                message: "data is not wrong"
            })
        }
    })
})

let date_conversion = (data) => {
    const data_info = data.map(user_data => {
      user_data.date_of_birth = moment(user_data.date_of_birth).format('LL');
      return user_data;
    });
    return data_info;
  }

router.get('/all_user',(req,res)=>{
    mysqlconnect.query("SELECT * FROM sign_up_info", (err, data) => {
        if(!err){
            res.send({
                message:"Data Got",
                data: date_conversion(data)
            })
        }
        else{
            res.send({
                message: "Some error"
            })
        }
    })
})
router.delete('/all_user/:user_id', (req,res) => {
    mysqlconnect.query("DELETE FROM sign_up_info WHERE user_id = ?",[req.params.user_id],(err, deleteddata) => {
        if(!err){
            res.send({
                message:"data deleted successfully",
                data: deleteddata
            })
        }
        else{
            res.send({
                message: "Some error"
            })
        }
    })
})

module.exports = router;