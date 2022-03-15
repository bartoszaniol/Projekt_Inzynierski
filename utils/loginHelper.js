const db = require("./database");

exports.findUser = (userName) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users`;
    db.all(sql, (err, rows) => {
      rows.forEach((user) => {
        if(user.username == userName){
          resolve(user);
        } else {
          resolve(null);
        }
      })
    });
  });
};
