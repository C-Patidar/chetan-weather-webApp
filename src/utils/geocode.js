const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYy1wIiwiYSI6ImNsYXo3MDVvYzBvNTMzd214M3V4emhxMjgifQ.P-U8FUmmwyjlW5S3PBqW0g&limit=1'
   
    //request({url:url, json:true}, (error,response) => {
    request({url, json:true}, (error,response) => {              //used the object shorthand syntax for url //you can use object destucting for response as well here
       if (error){
           callback("Unable to connect to location services!",undefined)
       }else if (response.body.features.length === 0){
           callback("Unable to find location. Try another location",undefined)
       }else{
           callback(undefined,{
               latitude: response.body.features[0].center[1],
               longitude: response.body.features[0].center[0],
               location: response.body.features[0].place_name
           })
       }
    })
   }
   
   
module.exports = geocode