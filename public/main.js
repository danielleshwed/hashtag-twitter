
$(document).ready(function() {
  $("#my-button").on('click', function(){

    var input = $('#hashtag').val();
    const ul = document.getElementById('tweets');

    $.ajax({
      url: 'http://localhost:3000/tweets',
      type: 'GET',
      data: {
        hashtag: input
      },
      success: function(data){
        var tweets = JSON.parse(data);
        console.log(tweets);
        tweets.map(function(tweet){
          let li = createNode('li'),
              img = createNode('img'),
              span = createNode('span'),
              p = createNode('p')
          img.src = tweet.user.profile_image_url_https;
          span.innerHTML =`${tweet.user.name}`;
          p.innerHTML = `${tweet.text}`;
          append(li, img);
          append(li, span);
          append(li, p);
          append(ul, li);
        })
      }
    });
  });
});

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}
