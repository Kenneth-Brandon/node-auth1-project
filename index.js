const app = require('./api/server');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is up!' });
});

app.listen(PORT, () => {
  console.log(`***Listening on port ${PORT} ***`);
});
