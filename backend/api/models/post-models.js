const postModels = {
  getCategories(con) {
    const results = con.query("SELECT * FROM categories");
    return results;
  },

  createCategory(con, name) {
    con.query("INSERT INTO categories (name) VALUES (?)", [name]);
  },

  async createPost(con, title, time, place, category, userId) {
    const [categorySearch] = await con.query(
      "SELECT id FROM categories WHERE name = ?",
      [category]
    );
    const categoryId = categorySearch[0].id;

    const [results] = await con.query(
      "INSERT INTO posts (title, time, place, user_id) VALUES (?, ?, ?, ?)",
      [title, time, place, userId]
    );
    const postId = results.insertId;
    await con.query(
      "INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)",
      [postId, categoryId]
    );
  },

  async getAllPosts(con) {
    const [results] = await con.query(
      "SELECT *, categories.name AS category FROM posts JOIN post_categories ON posts.id = post_categories.post_id JOIN categories ON post_categories.category_id = categories.id LIMIT 100"
    );
    await ratingsQuery(con, results);
    timePrettifier(results);

    return results;
  },

  addStars(con, id, stars) {
    con.query("INSERT INTO ratings (post_id, rating) VALUES (?, ?)", [
      id,
      stars,
    ]);
  },

  deletePost(con, id) {
    con.query("DELETE FROM posts WHERE id = ?", [id]);
  },

  async getFilteredPosts(con, filter) {
    const query = `WHERE ${filter[0]} = '${filter[1]}'`
    const [result] = await con.query(
      `SELECT *, categories.name AS category FROM posts JOIN post_categories ON posts.id = post_categories.post_id JOIN categories ON post_categories.category_id = categories.id ${query}`
    );
    await ratingsQuery(con, result);
    timePrettifier(result);
    return result;
  },

  async getPost(con, id) {
    const [result] = await con.query(
      "SELECT *, categories.name AS category FROM posts JOIN post_categories ON posts.id = post_categories.post_id JOIN categories ON post_categories.category_id = categories.id WHERE posts.id = ?",
      [id]
    );
    return result[0];
  },

  async updatePost(con, title, time, place, category, id) {
    con.query(
      "UPDATE posts SET title = ?, time = ?, place = ? WHERE id = ?",
      [title, time, place, id]
    );
  }
};

const timePrettifier = (posts) => {
  posts.forEach((post) => {
    if (post.time) {
      const prettyDate = new Date(post.time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      post.time = prettyDate;
    }
  });
}

const ratingsQuery = async (con, posts) => {
  const [ratings] = await con.query(
    "SELECT post_id, AVG(rating) AS rating FROM ratings GROUP BY post_id"
  );
  ratings.forEach((rating) => {
    rating.rating = Math.round(rating.rating * 100) / 100;
  });
  posts.forEach((post) => {
    let ratingsExist = false;
    ratings.forEach((rating) => {
      if (post.post_id === rating.post_id) {
        post.rating = rating.rating;
        ratingsExist = true;
      }
      if (!ratingsExist) {
        post.rating = 0;
      }
    });
  });
}

module.exports = { postModels };
