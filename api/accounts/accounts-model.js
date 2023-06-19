const db = require("../../data/db-config");

const getAll = async (limit,sortBy,sortDir) => {
  // KODLAR BURAYA
  //select * from accounts
  //knex('users').orderBy('name', 'desc')
  //knex.select('*').from('users').limit(10)
  limit = limit || await db("accounts").length;
  sortBy = sortBy || "id";
  sortDir = sortDir || "asc";
  return db("accounts").orderBy(sortBy,sortDir).limit(limit);
}

const getById = id => {
  // KODLAR BURAYA
  //default select için return array formatındadır. First yapınca object {} formatında dönüyor.
  return db("accounts").where("id",id).first();
}

const getByName = name =>{
  //select * from accounts where name = '{name}' limit 1
  return db("accounts").where("name",name).first();
}

const create = async (account) => {
  // KODLAR BURAYA
  const [id] = await db("accounts").insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  // KODLAR BURAYA
 await  db("accounts").where("id",id).update(account);
  return getById(id);
}

const deleteById = id => {
  // KODLAR BURAYA
  return db("accounts").where("id",id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}