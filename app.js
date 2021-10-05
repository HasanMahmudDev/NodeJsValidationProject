const express = require('express');
const formidable= require('formidable');
const fs = require('fs');
const path = require('path');

const app = express();
//folder
var folderPath = path.join(__dirname, "uploads");

app.use(express.static(__dirname));
app.post('/submit', (req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,async function (err, fields, files) {
        var data = {f: fields.fullName, g: fields.courseName, c: fields.country, d: fields.dob, e:fields.email};
        //console.log(files.pic);
        fs.copyFile(files.pic.path, path.join(folderPath, files.pic.name),(err)=>{
            if(err) return console.log(err);
            data.p = `/uploads/${files.pic.name}`;
            res.json(data);
            res.end();
        });
       
    });
   
});
app.listen(9595);
console.log("Server running at port 9595...");