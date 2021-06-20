import knex from 'knex'
const knexInstance = knex({
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: '/usr/src/app/src/database/ocs_athletes.db',
    },
  });
export default knexInstance;
