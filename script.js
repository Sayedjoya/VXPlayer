const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const forwardTen = document.querySelector('.forward');
const backwardTen = document.querySelector('.backward');
const forwardIcon = document.querySelector('.fas-redo-alt');
const backwardIcon = document.querySelector('.fas-undo-alt');
const forwardTenPressed = document.querySelector('.forward');
const backwardTenPressed = document.querySelector('.backward');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}

// On video end, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Format current time, duration
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Mute
function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
    volumeBar.style.width = 0;
  } else {
    video.volume = lastVolume;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  // Change icon depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

//skip ahead or Rewind back 10 seconds
function forwardTenSeconds(e) {
  e.preventDefault();
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
//  progressBar.style.width = `${myNewTime * 100}%`;
  const vid = video.currentTime;
  video.currentTime = vid + 10;
  //setting up rotating animation
  forwardTen.classList.add("anim");
  forwardTen.addEventListener('animationend',() =>{
    forwardTen.classList.remove('anim');

  });
  

}
function backwardTenSeconds(e) {
  e.preventDefault();
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  const vidi = video.currentTime;
  video.currentTime = vidi - 10;
  //setting up rotating animation
  backwardTen.classList.add("anime");
  backwardTen.addEventListener('animationend',() =>{
    backwardTen.classList.remove('anime');

  });

}

//pressed right array key to skip 10 seconds ahead
function arrowBackwardTenSeconds(e) {
  if (e.keyCode == 37)
    backwardTenSeconds(e);
}

//pressed left array key to skip 10 seconds backward
function arrowForwardTenSeconds(e) {
  if (e.keyCode == 39)
    forwardTenSeconds(e);
}

//pressed space bar to pause and play the video 
function spacebarTogglePlay(e){
  if (e.keyCode == 32)
    togglePlay();
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
forwardTen.addEventListener('click',forwardTenSeconds);
backwardTen.addEventListener('click',backwardTenSeconds);
window.addEventListener('keydown',arrowBackwardTenSeconds);
window.addEventListener('keydown',arrowForwardTenSeconds);
window.addEventListener('keydown',spacebarTogglePlay);


// pause/play toggle through space key and Full Screen Toggle through F key

document.addEventListener('keyup',(ev)=>{
  var keyname=ev.key;
  var keycode =ev.code;
  if(keyname=='f'||keyname=='F')
    toggleFullscreen();
  else if(keycode=='Space')
    togglePlay();
})
