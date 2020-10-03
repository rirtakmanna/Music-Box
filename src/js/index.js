const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "TVF-0",
    displayName: "Main Bola Hey",
    artist: "Karthik Rao",
  },
  {
    name: "TVF-1",
    displayName: "Aam Aadmi Electro Mix",
    artist: "TVF CoCan Studio feat. Raka Ashok",
  },
  {
    name: "TVF-2",
    displayName: "Bohat Hi Zyada Hard",
    artist: "JIZZY x TS x YASH",
  },
  {
    name: "TVF-3",
    displayName: "Dilli De Sardarboys",
    artist: "TVF CoCan Studio",
  },
  {
    name: "Tamaashbeens-1",
    displayName: "Koi Toh Milay Ga",
    artist: "Taazi",
  },
  {
    name: "Tamaashbeens-2",
    displayName: "Lighter Machis",
    artist: "Taazi",
  },
  {
    name: "TVF-4",
    displayName: "Maula Mere Party Karade Tu",
    artist: "TVF Cocan Studio",
  },
  {
    name: "TVF-5",
    displayName: "Sajni",
    artist: "Karthik Rao",
  },
  {
    name: "TVF-6",
    displayName: "Sardarboys - Kalle Kalle",
    artist: "Doorbeen",
  },
  {
    name: "TVF-7",
    displayName: "Tere Naina Hai Al-Qaeda",
    artist: "Vaibhav Bundhoo",
  },
  {
    name: "TVF-8",
    displayName: "Hostel Party Song",
    artist: "Foster Black productions",
  },
  {
    name: "TVF-9",
    displayName: "Monsoon Song Ft. Leakin' Park",
    artist: "Vaibhav Bundhoo",
  },
  {
    name: "TVF-10",
    displayName: "Socha Na Tha",
    artist: "Karthik Rao & Shilpa Surroch",
  },
  {
    name: "TVF-11",
    displayName: "Kahaani Thi",
    artist: "TSP's Hum Tum",
  },
  {
    name: "laree-1",
    displayName: "Laree Choote",
    artist: "Xulfi",
  },
];

// check if playing
let isPlaying = false;

// Play
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};
// Pause
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update the DOM
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./albumArt/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;

// Prev Song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Onload - select first song
loadSong(songs[songIndex]);

// Update Progress Bar & TIme
const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update Progress Bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSecound = Math.floor(duration % 60);
    if (durationSecound < 10) {
      durationSecound = `0${durationSecound}`;
    }

    // Delay Switching Duration Element to Avoide Nan
    if (durationSecound) {
      durationEl.textContent = `${durationMinutes}:${durationSecound}`;
    }

    // Calculate display for current Time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSecound = Math.floor(currentTime % 60);
    if (currentSecound < 10) {
      currentSecound = `0${currentSecound}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSecound}`;
  }
};

// Set Progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    isPlaying ? pauseSong() : playSong();
  } else if (e.code === "ArrowRight") {
    nextSong();
  } else if (e.code === "ArrowLeft") {
    prevSong();
  }
});
