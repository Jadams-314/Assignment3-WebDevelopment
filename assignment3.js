// Justin Adams and Jason Gonatas

// 2. This code loads the IFrame Player API code asynchronously.

//var myplayer=document.getElementById('player')
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
      //'onVisibilityChange': onVisibilityChange,
      //'isElementInViewport': isElementInViewport
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
 //   event.target.playVideo();

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
// The function's contents are commented out but the function is kept so the video can appear
function onPlayerStateChange(event) {
//    if (event.data == YT.PlayerState.PLAYING && !done) {
//      setTimeout(stopVideo, 6000);
//      done = true;
//    }
      if (event.data == YT.PlayerState.PLAYING && !done){
       //onVisibilityChange();
       //function call no longer necessary. added to event listeners at bottom of code.
        done = true;
      }

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


// our code starts here (largest reference is stack overflow code):


function isElementInViewport (el) {

    if (!el) return false;

    var rect = el.getBoundingClientRect();
    if (rect.width===0 && rect.height ===0) return false;
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

//made some changes to stack overflow code. don't have experience with jquery so don't have any
//proper means to reliably troubleshoot. going to keep only the non jquery parts of the 
//example code and replace the rest with something as similar to geeks4geeks code as I can

//clicked=false;



function onVisibilityChange() {
  //without this line I think 'player' references the div with id=player before it gets converted
  //into an iframe leading to the id 'player' to always show as not visible causing it to 
  //get paused the instant the video was played
  const iframeElement = document.getElementById('player');
  if(!done) return;
  if (!iframeElement) return;
  //tested with console .logs. visibility works as expected. El = iframeElement
  var visible = isElementInViewport(iframeElement);
  if (visible !== window.old_visible) {
    window.old_visible = visible;
    if (visible) {
      //.taking the console.log code from the geeks4geeks example for troubleshooting wasted
      //a lot of time trying to get the code to work without knowing if visibility was even
      //being recognized(it wasn't)
      console.log('Element is visible in viewport');
      
      playVideo();
    } else {
      console.log('Element is not visible in viewport');
      pauseVideo();
    }
  }

}

//Non-jQuery
if (window.addEventListener) {
    addEventListener('DOMContentLoaded', onVisibilityChange, false);
    addEventListener('load', onVisibilityChange, false);
    addEventListener('scroll', onVisibilityChange, false);
    addEventListener('resize', onVisibilityChange, false);
} else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', onVisibilityChange); // Internet Explorer 9+ :(
    attachEvent('onload', onVisibilityChange);
    attachEvent('onscroll', onVisibilityChange);
    attachEvent('onresize', onVisibilityChange);
}