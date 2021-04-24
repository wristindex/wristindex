let dbUtil = require("./../utils/db");

const REACT_APP_MONGO_RADAR_COLLECTION = process.env["REACT_APP_MONGO_RADAR_COLLECTION"]

async function getData(req, res){
    try{

        let db = await dbUtil.connectMongo(); 

        db.collection(REACT_APP_MONGO_RADAR_COLLECTION)
        let data = await new Promise((resolve, reject) => {
            db.find({}).toArray( (data, error) => {
                if(error === null){
                    resolve(data)
                }else{
                    reject(error)
                }
            })
        });

        console.log("Successfully querried data")
        res.json({ error : false, data : data})
    }catch(e){
        console.error(e.message)
        res.json({ error : true, message : e.message})
    }
}

async function createData(req, res){
    try{

        let db = await dbUtil.connectMongo(); 

        db.collection(REACT_APP_MONGO_RADAR_COLLECTION)
        let data = await new Promise((resolve, reject) => {
            db.find({}).toArray( (data, error) => {
                if(error === null){
                    resolve(data)
                }else{
                    resolve(null)
                }
            })
        });

        console.log("Successfully querried data")
        res.json({ error : false, data : data})
    }catch(e){
        console.error(e.message)
        res.json({ error : true, message : e.message})
    }
}