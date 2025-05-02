const express = require('express');
require('dotenv').config();
require('./db');

const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
app.use(express.json());
app.use('/media', mediaRoutes);
app.get('/', (req, res) => {
  res.send('Hello from the media service!');
});

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Media service running on port ${PORT}`);
});
