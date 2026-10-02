// Type name(s) here: aaron, Jackson 



// 2. This code loads the IFrame Player API code asynchronously.
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
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
//assignment 3 additions:

function pauseVideo(){
  player.pauseVideo();
}
function getIframe(){
  return player.getIframe();
}

//geeks for geeks example modified:
/*
function isElementVisible(element) {
            const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top < window.innerHeight
  );
}
  
const elementToCheck = player.getIframe();

        window.addEventListener('scroll', () => {
            if (isElementVisible(elementToCheck)) {
                console.log('Element is visible in viewport');
            } else {
                console.log('Element is not visible in viewport');
            }
        });
*/
//stackoverflow example modified:
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

var handler = onVisibilityChange(document.getElementById('player'), function() {
    window.addEventListener('scroll', () => {
            if (isElementInViewport(el)) {
               console.log('Element is visible in viewport');
              player.pauseVideo();
            } else {
                console.log('Element is not visible in viewport');
              
            }
    })
  });