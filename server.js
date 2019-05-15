/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import router from './server/routes/routes';

const app = express();
// Set the server port
const PORT = process.env.PORT || 3000;

// load the swagger.yaml file 
const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
// Set Doc instance
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set Router instance
app.use('/api/v1', router);

// Home Route
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Loaner' }));

// Validate all endpoints that do not exist
app.use((req, res) => {
  res.status(404).json({ error: 'Sorry, such endpoint does not exist' });
});

app.listen(PORT);
console.log(`app running on port, ${PORT}`);

export default app;
