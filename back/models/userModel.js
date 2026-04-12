const { sql } = require("../db_Connection");

exports.createUser = async (newUser) => {
  const users = await sql`
insert into users ${sql(newUser, "username", "password")}
returning *
`;
  return users[0];
};

exports.getUserByUsername = async (username) => {
  const users = await sql`
  select * from users where username =${username}
  `;
  return users[0];
};

exports.getUserByID = async (id) => {
  const users = await sql`select * from users where id=${id}`;
  return users[0];
};