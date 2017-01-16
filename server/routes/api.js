var express = require('express');
var router = express.Router();

//Server Events API
router.get('/shares', function(req, res, next) {
  console.log("Publishing...")
  sendSSE(req, res);
});

//SSE Emiiter
function sendSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  var id = (new Date()).toLocaleTimeString();
  var data = JSON.stringify(generateUpdates());
 
  // Sends a SSE every 2 seconds on a single connection.
  setInterval(function() {
      id = (new Date()).toLocaleTimeString();
      data = JSON.stringify(generateUpdates());
      constructSSE(res, id, data);
  }, 2000);

  constructSSE(res, id, data);
}

//Generate Publish Data
function constructSSE(res, id, data) {
  res.write('id: ' + id + '\n');
  res.write("data: " + data + '\n\n');
}

/********* Utils Start *******/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

function getGrowth(share) {
    var value = getRandomInt(1000, 10000);

    share.val = value;
    if(value > 5999) {
        share.growth = "up";
    } else if(value > 2999) {
        share.growth = "down";
    } else {
        share.growth = "freeze";
    }
}

function generateUpdates() {
    var arr = [
        {"name":"AAPL","val":7663.56,"growth":"up"},
        {"name":"AMZN","val":4237.55,"growth":"up"},
        {"name":"GOOGL","val":3556.72,"growth":"up"},
        {"name":"MSFT","val":6763.49,"growth":"down"},
        {"name":"NIKE","val":5148.39,"growth":"freeze"}
    ];

    arr.forEach(function(element) {
        getGrowth(element);
    }, this);

    return arr;
}

/********* Utils End *******/

module.exports = router;