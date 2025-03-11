import Knex from 'knex';
import * as dotenv from 'dotenv';
import knexConfiguration from 'knexfile';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const knexConnection = Knex(knexConfiguration[environment]);

export default knexConnection
