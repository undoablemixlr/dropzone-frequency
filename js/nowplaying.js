async function updateNowPlaying() {
  try {
    // Appel à l'API Dropzone
    const res = await fetch('https://onair.dropzone-frequency.com/api/nowplaying/dropzone_frequency');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    // Récupération sécurisée du morceau en cours
    const song = data?.now_playing?.song;
    if (!song || !song.artist || !song.title) throw new Error("Chanson non définie");

    const artistTitle = `${song.artist} - ${song.title}`;
    let coverUrl = song.art;

    // Si aucune pochette, requête vers Last.fm
    if (!coverUrl || coverUrl.trim() === '') {
      const lastfmApiKey = 'cb4458b2ec7d60a1a8ca7d98ab12f376';  // ta vraie clé
      const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lastfmApiKey}&artist=${encodeURIComponent(song.artist)}&track=${encodeURIComponent(song.title)}&format=json`;

      const lastfmRes = await fetch(lastfmUrl);
      const lastfmData = await lastfmRes.json();

      const images = lastfmData?.track?.album?.image || [];
      const foundImg = images.find(img => img.size === 'extralarge') || images.find(img => img.size === 'large');
      coverUrl = foundImg?.['#text'] || 'fallback.jpg';
    }

    // Mise à jour de l'interface
    document.getElementById('nowplaying-title').textContent = artistTitle;
    document.getElementById('nowplaying-cover').src = coverUrl;

  } catch (e) {
    console.error("Erreur nowplaying:", e);
    document.getElementById('nowplaying-title').textContent = 'Titre indisponible';
    document.getElementById('nowplaying-cover').src = 'fallback.jpg';
  }
}

// Rafraîchissement automatique toutes les 15 secondes
updateNowPlaying();
setInterval(updateNowPlaying, 15000);
