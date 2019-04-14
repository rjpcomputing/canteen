# Canteen App
Simple app for keeping track of people and how much money they have left to spend.
The app is written in Node.js and uses Postgresql for persistant storage.

## Features
### Themes
The code includes several Bootstrap themes from [bootswatch.com](http://bootswatch.com/). You can dynamically change the active theme by <to be determined later>

Installed themes include:

* [amelia](http://bootswatch.com/amelia)
* [default](http://bootswatch.com/default)
* [flatly](http://bootswatch.com/flatly)
* [slate](http://bootswatch.com/slate)
* [spacelab](http://bootswatch.com/spacelab)
* [united](http://bootswatch.com/united)

## Hosts
* [Firebase](https://console.firebase.google.com/u/1/project/canteen-13d35/overview) - User management
* [AWS Lightsail](https://lightsail.aws.amazon.com/ls/webapp/us-east-1/instances/Canteen-Production/connect) - Node.js and Postgres hosting

### Stack Setup
- Uses PM2 and repo stored `ecosystem.config.js`
- Uses Lets Encrypt to make sure the connection is SSL (HTTPS)
	- Uses cron for renewing cert
- Uses locally installed Postgresql server

### LightSail Initialization Script
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createuser -s dbadmin
sudo -u postgres -H -- psql -d postgres -c "ALTER USER dbadmin WITH PASSWORD '<admin_password>'"
sudo -u postgres createuser --createdb canteen
sudo -u postgres -H -- psql -d postgres -c "ALTER USER canteen WITH PASSWORD '<password>'"
sudo -u postgres createdb --owner=canteen canteen

