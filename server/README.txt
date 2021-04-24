#Setting up Node app

1. If not installed, install Node JS
https://phoenixnap.com/kb/install-node-js-npm-on-windows

2. If not installed, install mongodb
https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514

3. If not installed, install Mongo Compass
https://docs.mongodb.com/compass/current/install/

4. Connect to local mongodb instance using compass 

5. Create a DB named radar and a Collection named radar_data using compass

## Note that if you wish to change Collection and DB names update the properties mentioned below in 
the .env file of this app appropriately

MONGO_DB=newDBName
MONGO_RADAR_COLLECTION=newCollectionName

6. Install packages by opening a terminal/command line/powershell inside app directory excel_to_radar_node and running command npm install.

7. Default password to access session data set in .env file please change as required
PASSWORD=QAZ123XX

#Once all packages are installed run command node server.js in terminal/command line/powershell to start the backend Node application.

### Please contact me for any clarifications ###