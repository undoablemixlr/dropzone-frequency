async function updateNowPlaying() {
  try {
    const res = await fetch('https://onair.dropzone-frequency.com/api/nowplaying/dropzone_frequency_');
    const data = await res.json();

    const song = data.now_playing.song;
    const artistTitle = `${song.artist} - ${song.title}`;
    let coverUrl = song.art;

    // Si aucune pochette, essaie Last.fm
    if (!coverUrl || coverUrl.trim() === '') {
      const lastfmApiKey = 'cb4458b2ec7d60a1a8ca7d98ab12f376';  // remplace par ta vraie clé
      const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lastfmApiKey}&artist=${encodeURIComponent(song.artist)}&track=${encodeURIComponent(song.title)}&format=json`;

      const lastfmRes = await fetch(lastfmUrl);
      const lastfmData = await lastfmRes.json();

      coverUrl = lastfmData?.track?.album?.image?.pop()?.['#text'] || 'fallback.jpg';
    }

    // Met à jour l'interface
    document.getElementById('nowplaying-title').textContent = artistTitle;
    document.getElementById('nowplaying-cover').src = coverUrl;

  } catch (e) {
    console.error("Erreur nowplaying:", e);
    document.getElementById('nowplaying-title').textContent = 'Titre indisponible';
    document.getElementById('nowplaying-cover').src = 'fallback.jpg';
  }
}

// Rafraîchit toutes les 15 secondes
updateNowPlaying();
setInterval(updateNowPlaying, 15000);
