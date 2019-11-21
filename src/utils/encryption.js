import bcrypt from "bcrypt";

const saltRounds = 10;
export const passwordHash = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(Number(saltRounds), function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, function(err, res) {
      if (err) {
        reject(err);
      }
      return resolve(res);
    });
  });
};
