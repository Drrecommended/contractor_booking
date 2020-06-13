const conn = require('../db.js')

conn.query(`CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(45) NOT NULL,
    password varchar(128) NOT NULL,
    salt varchar(20) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `)