/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Loaner' }));

const port = 3000;
app.listen(port);
console.log(`app running on port, ${port}`);

export default app;
