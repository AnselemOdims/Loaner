/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/routes';

const app = express();
// Set the server port
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// Set Router instance
app.use('/api/v1', router);

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Loaner' }));

// Validate all endpoints that do not exist
app.use((req, res) => {
  res.status(404).json({ error: 'Sorry, such endpoint does not exist' });
});

app.listen(PORT);
console.log(`app running on port, ${PORT}`);

export default app;
