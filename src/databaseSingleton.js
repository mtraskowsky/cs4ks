// database singleton module that loads provided sqlite database
// and makes it available to the project

const Database = require('better-sqlite3');

/** @module database 
 * Provides access to the better-sqlite3 database object 
 * for the project.
 */

module.exports = new Database('db/cs4ks.sqlite3');