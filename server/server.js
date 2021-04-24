const express = require('express');
const app = express()
let cors = require('cors')
const bp = require('body-parser')
const path = require('path');

//file util mehods
let upload = require("./utils/fileUtils").upload;
let readExcel = require("./utils/fileUtils").readExcel;
let getWristData = require("./utils/db").getWristData;
let getSessions = require("./utils/db").getSessions;
let deleteWristData = require("./utils/db").deleteWristData;
let deleteSessionData = require("./utils/db").deleteSessionData;

require("dotenv").config();
const { MongoClient } = require('mongodb');

//Init mongo
const MONGO_URL = process.env["MONGO_URL"];
const MONGO_DB = process.env["MONGO_DB"];
const CLIENT  = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
let DB = null;

//App port
const REACT_APP_PORT = process.env["REACT_APP_PORT"];
const PASSWORD = process.env["PASSWORD"];

const PORT = process.env.PORT || 5000;

//cors
app.use(cors())

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));


// app.use(bodyParser);
//init db connection
CLIENT.connect(function (err, conn) {
    if(err){
        throw err;
    }else{
        //assign db
        DB = conn.db(MONGO_DB);
        
        //get chart data
        app.post('/getData', async (req, res) => {
            try{
                let sessionId = req.body.sessionId;
                // let pwd = req.body.pwd;

                // if(pwdCheck(pwd)){
                    //get all wrist datasets
                    let data = await getWristData(DB, { sessionId : sessionId });
                    console.log("Successfully querried data");
                    res.json({ error : false, data : data});
                // }

            }catch(e){
                console.error(e);
                res.json({ error : true, message : getErrorMessage(e)});
            }
            
        });
        
        //get chart data
        app.post('/getSessions', async (req, res) => {
            try{
                let pwd = req.body.pwd;
                if(pwdCheck(pwd)){
                    //get all wrist datasets
                    let data = await getSessions(DB, {});
                    console.log("Successfully querried data");
                    res.json({ error : false, data : data});

                }
            }catch(e){
                console.error(e);
                res.json({ error : true, message : getErrorMessage(e)});
            }
            
        });

        //upload excel and populate mongo
        app.post('/saveData', (req, res) => {
            try{
                console.log("File recieved ");
                upload(req, res, async (err) => {
                    try{
                        
                        //error writing file
                        if(err) {
                            res.json({ error : true, message : err });
                        }else {
                            //file written
                            console.log("Excel written");
                            
                            //read file and update DB
                            let datasets = await readExcel(DB, res.req.file.originalname);
                            
                            //return session id for
                            res.json({ error : false, data : datasets});
                        }
                    }catch(e){
                        console.error(e);
                        res.json({ error : true, message : getErrorMessage(e)});
                    }
                });
            }catch(e){
                console.error(e);
                res.json({ error : true, message : getErrorMessage(e) });
            }
            
        })

        app.get('/truncate', async (req, res) => {
            try{
                deleteWristData(DB, {});
                deleteSessionData(DB, {});
                res.json({ error : false, message : "truncated" });
            }catch(e){
                console.error(e);
                res.json({ error : true, message : getErrorMessage(e)});
            }
            
        });
    }            

});

function pwdCheck(pwd){
    if(pwd !== PASSWORD){
        throw("Password mismatch")
    }else{
        return true;
    }
}
function getErrorMessage(e){
    let str = "";
    str = (e.message !== undefined)?e.message:e;
    return str;
}
//innit listner
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})