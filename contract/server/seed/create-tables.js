// CREATE TABLE `addresses` (
//   `id` int unsigned NOT NULL AUTO_INCREMENT,
//   `street` varchar(100) DEFAULT NULL,
//   `city` varchar(100) DEFAULT NULL,
//   `state` enum('AZ') DEFAULT NULL,
//   `zip` varchar(10) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// CREATE TABLE `galleries` (
//   `id` int unsigned NOT NULL AUTO_INCREMENT,
//   `profile_id` int NOT NULL,
//   `img_src` varchar(500) DEFAULT NULL,
//   `caption` varchar(100) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// CREATE TABLE `orders` (
//   `id` int unsigned NOT NULL AUTO_INCREMENT,
//   `customer_id` int NOT NULL,
//   `contractor_id` int NOT NULL,
//   `date` date DEFAULT NULL,
//   `services` text,
//   `total` decimal(10,2) DEFAULT NULL,
//   `status` enum('approved','denied','pending','complete') NOT NULL DEFAULT 'pending',
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// CREATE TABLE `profiles` (
//   `id` int unsigned NOT NULL AUTO_INCREMENT,
//   `trade_1` enum('plumber') DEFAULT NULL,
//   `trade_2` enum('plumber') DEFAULT NULL,
//   `bio` text,
//   `address_id` int unsigned NOT NULL,
//   `thumbnail` varchar(500) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `id_UNIQUE` (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


// CREATE TABLE `services` (
//   `id` int unsigned NOT NULL AUTO_INCREMENT,
//   `user_id` int NOT NULL,
//   `description` varchar(50) DEFAULT NULL,
//   `price` decimal(10,2) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// TODO: update transaction table...

// CREATE TABLE `transactions` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// CREATE TABLE `users` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `username` varchar(45) NOT NULL,
//   `password` varchar(128) NOT NULL,
//   `salt` varchar(20) NOT NULL,
//   `contractor` tinyint unsigned NOT NULL,
//   `first_name` varchar(100) DEFAULT NULL,
//   `last_name` varchar(100) DEFAULT NULL,
//   `profile_id` int NOT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `id_UNIQUE` (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
