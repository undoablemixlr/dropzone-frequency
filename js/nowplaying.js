async function updateNowPlaying() {
  try {
    const res = await fetch('https://onair.dropzone-frequency.com/api/nowplaying/azuracast');
    const data = await res.json();

    const song = data.now_playing.song;
    const artistTitle = `${song.artist} - ${song.title}`;
    const coverUrl = song.art ? song.art : 'fallback.jpg';

    // Met à jour le DOM
    document.getElementById('nowplaying-title').textContent = artistTitle;
    document.getElementById('nowplaying-cover').src = coverUrl;

  } catch (e) {
    console.error("Erreur nowplaying:", e);
    document.getElementById('nowplaying-title').textContent = 'Titre indisponible';
    document.getElementById('nowplaying-cover').src = 'fallback.jpg';
  }
}

// Rafraîchir toutes les 15 secondes
updateNowPlaying();
setInterval(updateNowPlaying, 15000);
