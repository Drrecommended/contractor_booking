const conn = require('../db.js')
const query = require('./query');

(async () => {
  await query(
    `
      CREATE TABLE IF NOT EXISTS addresses (
        id int unsigned NOT NULL AUTO_INCREMENT,
        street varchar(100) DEFAULT NULL,
        city varchar(100) DEFAULT NULL,
        state enum('AZ') DEFAULT NULL,
        zip varchar(10) DEFAULT NULL,
        PRIMARY KEY (id)
      )
    `,
  )

  await query(
    `
      CREATE TABLE IF NOT EXISTS galleries (
        id int unsigned NOT NULL AUTO_INCREMENT,
        profile_id int NOT NULL,
        img_src varchar(500) DEFAULT NULL,
        caption varchar(100) DEFAULT NULL,
        PRIMARY KEY (id)
      )
    `,
  )

  await query(
    `
      CREATE TABLE IF NOT EXISTS orders (
        id int unsigned NOT NULL AUTO_INCREMENT,
        customer_id int NOT NULL,
        contractor_id int NOT NULL,
        date date DEFAULT NULL,
        services text,
        total decimal(10,2) DEFAULT NULL,
        status enum('approved','denied','pending','complete') NOT NULL DEFAULT 'pending',
        PRIMARY KEY (id)
      )
    `,
  )

  await query(
    `
      CREATE TABLE IF NOT EXISTS profiles (
        id int unsigned NOT NULL AUTO_INCREMENT,
        trade_1 enum('plumber', 'carpenter', 'painter', 'electrician', 'roofer', 'landscaper', 'pipefitter', 'welder', 'mechanic') DEFAULT NULL,
        trade_2 enum('plumber', 'carpenter', 'painter', 'electrician', 'roofer', 'landscaper', 'pipefitter', 'welder', 'mechanic') DEFAULT NULL,
        bio text,
        address_id int unsigned NOT NULL,
        thumbnail varchar(500) DEFAULT NULL,
        PRIMARY KEY (id)
      )
    `,
  )

  await query(
    `
      CREATE TABLE IF NOT EXISTS services (
        id int unsigned NOT NULL AUTO_INCREMENT,
        user_id int NOT NULL,
        description varchar(50) DEFAULT NULL,
        price decimal(10,2) DEFAULT NULL,
        PRIMARY KEY (id)
      )
    `,
  )


  // TODO: update transaction table...
  await query(
    `
      CREATE TABLE IF NOT EXISTS transactions (
        id int unsigned NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (id)
      )
    `,
  )

  await query(
    `
      CREATE TABLE IF NOT EXISTS users (
        id int NOT NULL AUTO_INCREMENT,
        username varchar(45) NOT NULL,
        email varchar(45) NOT NULL,
        password varchar(128) NOT NULL,
        salt varchar(20) NOT NULL,
        contractor tinyint unsigned NOT NULL,
        first_name varchar(100) DEFAULT NULL,
        last_name varchar(100) DEFAULT NULL,
        profile_id int NOT NULL,
        PRIMARY KEY (id)
      )
    `,
  )
  process.exit()
})()
