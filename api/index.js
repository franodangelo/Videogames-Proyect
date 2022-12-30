const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { DB_PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(`${ DB_PORT }`, () => {
    console.log(`%s listening at port ${DB_PORT}`);
  })
})
