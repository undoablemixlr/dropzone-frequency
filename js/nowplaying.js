
async function updateNowPlaying() {
  try {
    const res = await fetch('https://onair.dropzone-frequency.com/api/nowplaying/azuracast');
    const data = await res.json();

    const song = data.now_playing.song;
    const artistTitle = `${song.artist} - ${song.title}`;
    document.getElementById('nowplaying-title').textContent = artistTitle;

    const art = song.art ? song.art : 'fallback.jpg'; // URL directe de la pochette
    document.getElementById('nowplaying-cover').src = art;
  } catch (e) {
    document.getElementById('nowplaying-title').textContent = 'Titre indisponible';
    document.getElementById('nowplaying-cover').src = 'fallback.jpg';
  }
}

// Premier appel + mise à jour toutes les 15 sec
updateNowPlaying();
setInterval(updateNowPlaying, 15000);
