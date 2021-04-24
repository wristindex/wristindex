require("dotenv").config();
const path = require("path")
const multer = require("multer");
const excel = require('read-excel-file/node');
const fs = require("fs");
const moment = require('moment');
let deleteWristData = require("./db").deleteWristData;
let insertWristData = require("./db").insertWristData;
let insertSessionData = require("./db").insertSessionData;

const KB_LIMIIT = parseInt(process.env["KB_LIMIIT"]);
const UPLOAD_PATH = process.env["UPLOAD_PATH"];
const FILE_RENAME = process.env["FILE_RENAME"];
const DATE_FORMAT = "MM/DD/YYYY";

const MAX_SIZE = 1 * 1000 * KB_LIMIIT;

//multer config
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, FILE_RENAME)
    }
})

//multer upload 
module.exports.upload = multer({ 
    storage: storage,
    //file size validation
    limits: { fileSize: MAX_SIZE },
    fileFilter: function (req, file, cb){
    
        //file type validation
        let filetypes = /.xlsx/;
        
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (extname) {
            cb(null, true);
            return file.originalname;
        }else{
            cb("File is not of type - " + filetypes);
        }
      
      } 
  
}).single("dataFile"); 

//read excel and write data to mongo
module.exports.readExcel = async (DB, filename) => {
    console.log("Init Excel read");
    //read excel file in uploads dir
    let rows = await excel(
        fs.createReadStream(UPLOAD_PATH+"/"+FILE_RENAME), 
        { sheet: 'Wrist Index ' }
    );

    //data to be captured
    let title = "" ;
    let seriesLabels = [];
    let datasets = [];

    //traverse cells
    for(x = 0 ; x<rows.length; x++){
        //row wise
        let currentRow = (x+1)
        let row = rows[x];

        let getRowData = false;
        let rowData = [];
        let rowLable = "";
        
        for(let y = 0 ; y<row.length; y++){
            //cell wise
            let col = String.fromCharCode(65 + y);
            
            let cellAddr = (col+currentRow);
            let cellContent = row[y];
            
            //read A2 for title
            if(cellAddr === "A2"){
                title = cellContent; 
            }

            //Read row 2 for lables from D onwards
            if(currentRow === 2 && y >= 4 && cellContent !== null){
                seriesLabels.push(cellContent);
            }

            // if row contains 'scaled data' push to data series
            if(col === "D" && cellContent !== null && cellContent.trim().toLowerCase() === "scaled data"){
                //flag row as data series
                getRowData = true;
                //obtain data label for frontend
                rowLable = (row[1] instanceof Date)?moment(row[1]).format(DATE_FORMAT):row[1]+"";
            }

            // collect data for series of flagged row
            if(getRowData && y >= 4 && cellContent !== null){
                if(isNaN(cellContent)){
                    throw('Cell data is not a number');
                }else{
                    rowData.push(cellContent)
                }
            }

        }

        if(getRowData){
            //puh to main data if ro is a dataset
            datasets.push({
                name : rowLable,
                data : rowData,
                title : title,
                lables : seriesLabels
            })
        }
    }

    
    //add new sessions
    let session = moment().utc().format("MM-DD-YYYY HH:mm:ss");
    let sessionId = await insertSessionData(DB, { session : session, filename : filename });
    sessionId = sessionId.insertedId+"";

    datasets = datasets.map( obj => {
        obj.sessionId = sessionId;
        return obj;
    });
    
    //add new data
    await insertWristData(DB, datasets);

    return datasets;
}