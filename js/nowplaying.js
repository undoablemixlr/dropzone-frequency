
async function updateNowPlaying() {
  try {
    const res = await fetch('https://onair.dropzone-frequency.com/api/nowplaying/dropzone_frequency_');
    const data = await res.json();

    if (!data?.now_playing?.song) throw new Error("Aucune chanson");

    const song = data.now_playing.song;
    const artistTitle = `${song.artist} - ${song.title}`;
    const coverUrl = song.art || 'fallback.jpg';

    document.getElementById('nowplaying-title').textContent = artistTitle;
    document.getElementById('nowplaying-cover').src = coverUrl;

  } catch (e) {
    console.error("Erreur nowplaying:", e);
    document.getElementById('nowplaying-title').textContent = 'Titre indisponible';
    document.getElementById('nowplaying-cover').src = 'fallback.jpg';
  }
}

updateNowPlaying();
setInterval(updateNowPlaying, 15000);
