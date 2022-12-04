const request = require('request')

const forecast = (latitude,longitude,callback) => {
  
    const url = 'http://api.weatherstack.com/current?access_key=054d642db847fc507ddf12a3b93386a4&query='+ latitude +','+  longitude+ '&units=f'

    request({url:url,json:true},(error,response)=>{
         
        if(error){
            callback("Unable to connect to location services!",undefined)
        }else if (response.body.error){
            callback("Unable to find location. Try another location!",undefined)
        }else{
            callback(undefined,response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " ferehnite out.")
        }

    })
}

module.exports = forecast