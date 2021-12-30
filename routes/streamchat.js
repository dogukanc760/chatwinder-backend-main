const app = require('express');
const server = require('http').createServer(app)
const router = require("express").Router();
const io = require('socket.io')(server)
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Messages = require("../models/Messages");


router.get('/fetch/:id', function (reqq, ress) {
  
  // Using Node.js
  const https = require('https');
  const crypto = require('crypto');
  var hostname = 'api.cloud.wowza.com'
  var path = '/api/v1.7/live_streams/'+reqq.params.id;
  //For security, never reveal API key in client-side code
  var wscApiKey = 'VBzDvdvO4j0x7GXnXprr3OxHDvE45pNWPLpHKltf5WUDCrBBYbV3rTtjR1oN3405';
    var wscAccessKey = 'ZV2smAgAf8Bhx5CHhDK5fjRD0xZPOzECQLulQC7l3ENrbOpCo8DsPuLhntQc3332';
  var timestamp = Math.round(new Date().getTime()/1000);
  var hmacData = (timestamp+':'+path+':'+wscApiKey);
  var signature = crypto.createHmac('sha256',wscApiKey).update(hmacData).digest('hex')
  const options = {
    hostname: hostname,
    path: path,
    headers: {
      'wsc-access-key': wscAccessKey,
      'wsc-timestamp': timestamp,
      'wsc-signature': signature,
      'Content-Type': 'application/json'
    }
  };
  https.get(options, function(res) {
    var body = '';
    res.on('data', function(data){
      body += data;
    });
    res.on('end', function() {
      console.log(JSON.parse(body));
      ress.status(200).send(JSON.parse(body));
    });
  }).on('error', function(e) {
    console.log(e.message);
  });
  
})

router.post('/:name', function(reqq, ress) {
    const https = require('https');
    const crypto = require('crypto');
    var hostname = 'api.cloud.wowza.com'
    var path = '/api/v1.7/live_streams';
    //For security, never reveal API key in client-side code
    var wscApiKey = 'VBzDvdvO4j0x7GXnXprr3OxHDvE45pNWPLpHKltf5WUDCrBBYbV3rTtjR1oN3405';
    var wscAccessKey = 'ZV2smAgAf8Bhx5CHhDK5fjRD0xZPOzECQLulQC7l3ENrbOpCo8DsPuLhntQc3332';
    var timestamp = Math.round(new Date().getTime()/1000);
    var hmacData = (timestamp+':'+path+':'+wscApiKey);
    var signature = crypto.createHmac('sha256',wscApiKey).update(hmacData).digest('hex')
    const options = {
      hostname: hostname,
      path: path,
      method: 'POST',
      headers: {
        'wsc-access-key': wscAccessKey,
        'wsc-timestamp': timestamp,
        'wsc-signature': signature,
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(options, function(res) {
      var body = '';
      res.on('data', function(data) {
        body += data;
      });
      res.on('end', function() {
        console.log(JSON.parse(body));
        ress.status(200).send(JSON.parse(body));
      });
    }).on('error', function(e) {
      console.log(e.message);
    });
    req.write(JSON.stringify({
      "live_stream": {
        "name": reqq.params.name,
        "broadcast_location":"us_west_oregon",
        "aspect_ratio_height":720,
        "aspect_ratio_width":1280,
        "billing_mode":"pay_as_you_go",
        "encoder":"other_rtmp",
        "transcoder_type":"transcoded",
       
      }
    }));
    req.end();
});


// fetch all stream - live 
router.get('/', function(reqq, ress) {
    const https = require('https');
const crypto = require('crypto');
var hostname = 'api.cloud.wowza.com'
var path = '/api/v1.7/live_streams';
//For security, never reveal API key in client-side code
var wscApiKey = 'VBzDvdvO4j0x7GXnXprr3OxHDvE45pNWPLpHKltf5WUDCrBBYbV3rTtjR1oN3405';
var wscAccessKey = 'ZV2smAgAf8Bhx5CHhDK5fjRD0xZPOzECQLulQC7l3ENrbOpCo8DsPuLhntQc3332';
var timestamp = Math.round(new Date().getTime()/1000);
var hmacData = (timestamp+':'+path+':'+wscApiKey);
var signature = crypto.createHmac('sha256',wscApiKey).update(hmacData).digest('hex')
const options = {
  hostname: hostname,
  path: path,
  headers: {
    'wsc-access-key': wscAccessKey,
    'wsc-timestamp': timestamp,
    'wsc-signature': signature,
    'Content-Type': 'application/json'
  }
};
https.get(options, function(res) {
  var body = '';
  res.on('data', function(data){
    body += data;
  });
  res.on('end', function() {
    console.log(JSON.parse(body));
    ress.status(200).send(JSON.parse(body));
  });
}).on('error', function(e) {
  console.log(e.message);
});
})

router.get('/get-by-name/:name', function(reqq, ress) {
 
  const https = require('https');
const crypto = require('crypto');
var hostname = 'api.cloud.wowza.com'
var path = '/api/v1.7/live_streams';
//For security, never reveal API key in client-side code
var wscApiKey = 'VBzDvdvO4j0x7GXnXprr3OxHDvE45pNWPLpHKltf5WUDCrBBYbV3rTtjR1oN3405';
var wscAccessKey = 'ZV2smAgAf8Bhx5CHhDK5fjRD0xZPOzECQLulQC7l3ENrbOpCo8DsPuLhntQc3332';
var timestamp = Math.round(new Date().getTime()/1000);
var hmacData = (timestamp+':'+path+':'+wscApiKey);
var signature = crypto.createHmac('sha256',wscApiKey).update(hmacData).digest('hex')
const options = {
hostname: hostname,
path: path,
headers: {
  'wsc-access-key': wscAccessKey,
  'wsc-timestamp': timestamp,
  'wsc-signature': signature,
  'Content-Type': 'application/json'
}
};
https.get(options, function(res) {
var body = '';
res.on('data', function(data){
  body += data;
});
res.on('end', function() {
  var name = reqq.params.name;
  console.log(JSON.parse(body));
  var result = JSON.parse(body).filter(function(name){
        return name.stream_name === reqq.params.name
  });
  ress.status(200).send(result);
});
}).on('error', function(e) {
console.log(e.message);
});
})

//start live a stream
router.put('/start-live-stream/:id', function(reqq, ress){
  const https = require('https');
const crypto = require('crypto');
var hostname = 'api.cloud.wowza.com'
var path = '/api/v1.7/live_streams/'+reqq.params.id+'/start';
//For security, never reveal API key in client-side code
var wscApiKey = 'VBzDvdvO4j0x7GXnXprr3OxHDvE45pNWPLpHKltf5WUDCrBBYbV3rTtjR1oN3405';
  var wscAccessKey = 'ZV2smAgAf8Bhx5CHhDK5fjRD0xZPOzECQLulQC7l3ENrbOpCo8DsPuLhntQc3332';
var timestamp = Math.round(new Date().getTime()/1000);
var hmacData = (timestamp+':'+path+':'+wscApiKey);
var signature = crypto.createHmac('sha256',wscApiKey).update(hmacData).digest('hex')
const options = {
  hostname: hostname,
  path: path,
  method: 'PUT',
  headers: {
    'wsc-access-key': wscAccessKey,
    'wsc-timestamp': timestamp,
    'wsc-signature': signature,
    'Content-Type': 'application/json'
  }
};
const req = https.request(options, function(res) {
  var body = '';
  res.on('data', function(data) {
    body += data;
  });
  res.on('end', function() {
    console.log(JSON.parse(body));
    ress.status(200).send(JSON.parse(body));
  });
}).on('error', function(e) {
  console.log(e.message);
  ress.status(500).send(JSON.parse(e.message));
});
req.end();
});

//stop lvie stream 
router.post('/stop-live/:id', function(reqq, ress){
  const https = require('https');
  const crypto = require('crypto');
  var hostname = 'api.cloud.wowza.com'
  var path = '/api/v1.7/live_streams/'+reqq.params.id+'/stop';
  //For security, never reveal API key in client-side code
  var wscApiKey = 'VBzDvdvO4j0x7GXnXprr3OxHDvE45pNWPLpHKltf5WUDCrBBYbV3rTtjR1oN3405';
  var wscAccessKey = 'ZV2smAgAf8Bhx5CHhDK5fjRD0xZPOzECQLulQC7l3ENrbOpCo8DsPuLhntQc3332';
  var timestamp = Math.round(new Date().getTime()/1000);
  var hmacData = (timestamp+':'+path+':'+wscApiKey);
  var signature = crypto.createHmac('sha256',wscApiKey).update(hmacData).digest('hex')
  const options = {
    hostname: hostname,
    path: path,
    method: 'PUT',
    headers: {
      'wsc-access-key': wscAccessKey,
      'wsc-timestamp': timestamp,
      'wsc-signature': signature,
      'Content-Type': 'application/json'
    }
  };
  const req = https.request(options, function(res) {
    var body = '';
    res.on('data', function(data) {
      body += data;
    });
    res.on('end', function() {
      console.log(JSON.parse(body));
      ress.status(200).send(JSON.parse(body));
    });
  }).on('error', function(e) {
    console.log(e.message);
  });
  req.end();
})

//get a live stream source
router.get('/get-stream-source/:id', function(reqq, ress) {
  const https = require('https');
  const crypto = require('crypto');
  var hostname = 'api.cloud.wowza.com'
  var path = '/api/v1.7/stream_sources/wowza/'+reqq.params.id;
  //For security, never reveal API key in client-side code
  var wscApiKey = 'VBzDvdvO4j0x7GXnXprr3OxHDvE45pNWPLpHKltf5WUDCrBBYbV3rTtjR1oN3405';
  var wscAccessKey = 'ZV2smAgAf8Bhx5CHhDK5fjRD0xZPOzECQLulQC7l3ENrbOpCo8DsPuLhntQc3332';
  var timestamp = Math.round(new Date().getTime()/1000);
  var hmacData = (timestamp+':'+path+':'+wscApiKey);
  var signature = crypto.createHmac('sha256',wscApiKey).update(hmacData).digest('hex')
  const options = {
    hostname: hostname,
    path: path,
    headers: {
      'wsc-access-key': wscAccessKey,
      'wsc-timestamp': timestamp,
      'wsc-signature': signature,
      'Content-Type': 'application/json'
    }
  };
  https.get(options, function(res) {
    var body = '';
    res.on('data', function(data){
      body += data;
    });
    res.on('end', function() {
      console.log(JSON.parse(body));
    });
  }).on('error', function(e) {
    console.log(e.message);
  });
})



module.exports = router;