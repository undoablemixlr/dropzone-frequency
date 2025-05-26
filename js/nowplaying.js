
async function updateNowPlaying() {
  try {
    const res = await fetch('https://onair.dropzone-frequency.com/api/nowplaying/azuracast');
    const data = await res.json();
    const title = data.now_playing.song.title;
    const artist = data.now_playing.song.artist;
    document.getElementById("now-playing").innerText = `${artist} - ${title}`;
  } catch (err) {
    console.error(err);
    document.getElementById("now-playing").innerText = "Titre indisponible";
  }
}

updateNowPlaying();
setInterval(updateNowPlaying, 15000);
