// Type name(s) here: Jane Doe

// 2. This code loads the IFrame Player API code asynchronously.

var myplayer=document.getElementById('player')
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '6CGyASDjE-U',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
// THIS FUNCTION WAS CHANGED FOR THIS ASSIGNMENT

var done = false;
var isvisible = isElementInViewport(myplayer);
function onPlayerStateChange(event) {

  
// If visible and the event is NOT playing
if (isvisible && event.data!= YT.PlayerState.PLAYING){

  // Play video
  player.playVideo();
  console.log('this is visible')
}

// If NOT visible, event is playing, and the video isn't over
else if(!isvisible && event.data== YT.PlayerState.PLAYING && !done){

  // Pause video
  player.pauseVideo();
  console.log('this is not visible')
  done=true;
}
  /*
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
  
    
   if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(pauseVideo, 6000);
    done = true;
  }*/
}
function playVideo(){
  player.playVideo();
}
function stopVideo() {
  player.stopVideo();
}
//function pauses video
function pauseVideo(){
  player.pauseVideo();
}
//function gets video play status
function getstatus(){
  player.getPlayerState();
}

// stack overflow code: 


function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

var handler = onVisibilityChange(el, function() {
    /* Your code go here */
});


// jQuery
$(window).on('DOMContentLoaded load resize scroll', handler);

/* // Non-jQuery
if (window.addEventListener) {
    addEventListener('DOMContentLoaded', handler, false);
    addEventListener('load', handler, false);
    addEventListener('scroll', handler, false);
    addEventListener('resize', handler, false);
} else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
    attachEvent('onload', handler);
    attachEvent('onscroll', handler);
    attachEvent('onresize', handler);
}
*/