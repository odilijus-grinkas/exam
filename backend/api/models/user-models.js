const userModels = {
  createUser: async (con, email, password, username) => {
    await con.query(`INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, [email, password, username]);
  },

  getUser: async (con, email) => {
    const [user] = await con.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return user[0]
  },

  getAllUsers: async (con) => {
    const [users] = await con.query(`SELECT id, username, admin FROM users`);
    return users;
  },

  deleteUser: async (con, id) => {
    con.query(`DELETE FROM users WHERE id = ?`, [id]);
  },

}

module.exports = { userModels };