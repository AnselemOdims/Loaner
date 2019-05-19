// The User Query Methods
const userQuery = {
  // create a user query
  createUser: `INSERT INTO users(firstName, lastName, email, password, address)
                VALUES($1,$2,$3,$4,$5) RETURNING firstName, lastName, email, address, status, isAdmin`,

  // get a user by email query
  getUserByEmail: 'SELECT * FROM users WHERE email = $1',

  // verify a user query
  verifyUser: "UPDATE users SET status='verified' WHERE email=$1",

  // get a user by Id query
  getUserById: 'SELECT * FROM users WHERE id = $1',

  // get all users query
  getAllUsers: 'SELECT * FROM users',

  // delete user query
  deleteUser: 'DELETE FROM users WHERE email = $1',
};

export default userQuery;
