exports.getWeather = function () {
  return {
    locations: [
      {
        name: 'Portland',
        forecastUrl:'http://www.wunderground.comm/US/OR/portland.html',
        iconUrl:'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
        weather:'Overcast',
        temp:'54.1F'
      }, {
        name: 'Bend',
        forecastUrl:'http://www.wunderground.comm/US/OR/Bend.html',
        iconUrl:'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
        weather:'Overcast',
        temp:'54.1F'
      },{
        name: 'Manzanita',
        forecastUrl:'http://www.wunderground.comm/US/OR/Manzanita.html',
        iconUrl:'http://icons-ak.wxug.com/i/c/k/rain.gif',
        weather:'Overcast',
        temp:'54.1F'
      }
    ]
  }
};