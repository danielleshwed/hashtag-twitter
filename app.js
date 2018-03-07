var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors')
var Twitter = require('twitter');

//Twitter details
var client = new Twitter({
  consumer_key: 'vpjF3GcdPbsFrk1bXS3c7GVNQ',
  consumer_secret: 'CbH3I3mRfN9KIM4O5T4dxA6KkKQg2jjDza7jHFrmfPDm73wffR',
  access_token_key: '35959106-QeiCIvLidFZYG7no4cxQV7GhTOrDwclp3TdjxpSka',
  access_token_secret: 'LDwGCreURNxLJBOfFbKJvdewTxEXcXyvquONITDMknlg6'
});

// tell Express to serve files from our public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.get('/', function(req, res){
  // route to serve up the homepage (index.html)
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/tweets', function(req,res){
  var query = req.query.hashtag;
  var params = {q: query, count:'20'};
  client.get('search/tweets', params, function(error, tweets, response){
    if(!error){
      var status = tweets.statuses;
      res.end(JSON.stringify(status))
    }
  })
})

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
