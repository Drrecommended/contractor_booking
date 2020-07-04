const query = require('./query');

(async () => {
  await query(`DROP TABLE users`)
  await query(`DROP TABLE profiles`)
  await query(`DROP TABLE addresses`)
  await query(`DROP TABLE galleries`)
  await query(`DROP TABLE services`)
  await query(`DROP TABLE orders`)
  await query(`DROP TABLE transactions`)
  process.exit()
})()