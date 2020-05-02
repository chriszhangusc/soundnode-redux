import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import configureProxy from './config/proxy';
import configureGraphQL from './config/graphql';

dotenv.config();

// This has to come before others

const app = express();
const port = process.env.PORT;

app.use(cors());
configureProxy(app);
configureGraphQL(app);

app.listen(port, () => {
  console.log('Server running at port:', port);
});
