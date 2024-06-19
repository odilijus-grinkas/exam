async function initialQuery(con) {
  // await con.query(`DROP TABLE IF EXISTS users`)
  await con.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE
  )`);
  await con.query(`CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    time DATETIME NOT NULL,
    place VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
  await con.query(`CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    rating INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  )`);
  await con.query(`CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
  )`);
  await con.query(`CREATE TABLE IF NOT EXISTS post_categories (
    post_id INT,
    category_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
  );`);
  // Add users
  await con.query(`
    INSERT INTO users (username, email, password, admin)
    SELECT * FROM (SELECT 'admin' AS username, 'admin@gmail.com' AS email, '$2a$10$WZfRzr4g8Rl83Mf5Ppbn9ukCyjk7vo571HMndi.Q18PC2ZiEObUj.' AS password, 1 AS admin) AS tmp
    WHERE NOT EXISTS (
      SELECT username FROM users WHERE username = 'admin'
    ) LIMIT 1;
  `);
  // Add categories
  await con.query(`
    INSERT INTO categories (name)
    SELECT * FROM (SELECT 'Programming') AS tmp
    WHERE NOT EXISTS (
      SELECT name FROM categories WHERE name = 'Programming'
    ) LIMIT 1;
  `);
  await con.query(`
    INSERT INTO categories (name)
    SELECT * FROM (SELECT 'Dungeons and Dragons') AS tmp
    WHERE NOT EXISTS (
      SELECT name FROM categories WHERE name = 'Dungeons and Dragons'
    ) LIMIT 1;
  `);
}

module.exports = { initialQuery };
