const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CineVora Backend Engine is Live!');
});

app.get('/api/stream', async (req, res) => {
  const { tmdbId, type = 'movie', lang = 'en' } = req.query;

  if (!tmdbId) {
    return res.status(400).json({ error: 'TMDB ID is required' });
  }

  try {
    const streamSource = `https://vidsrc.cc/v2/embed/${type}/${tmdbId}?lang=${lang}`;

    res.json({
      success: true,
      tmdbId: tmdbId,
      language: lang,
      streamUrl: streamSource
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to extract stream source' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CineVora Server running on port ${PORT}`);
});
