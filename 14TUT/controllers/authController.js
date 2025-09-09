const User = require("../model/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
   const { user, pwd } = req.body;
   if (!user || !pwd)
      return res.status(400).json({ "message": "Username and password are required." });

   const duplicate = await User.findOne({ username: user }).exec();
   if (duplicate) return res.sendStatus(401); //Unauthorized
   // evaluate password
   const duplicatePwd = await User.findOne({ password: pwd }).exec();
   const match = bcrypt.compare({ pwd, duplicatePwd });
   if (match) {
      const roles = Object.values(User.roles);
      // create JWTs
      const accessToken = jwt.sign(
         {
            "UserInfo": {
               "username": user,
               "roles": roles,
            },
         },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
         { "username": foundUser.username },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: "1d" }
      );
      // Saving refreshToken with current user
      const otherUsers = usersDB.users.filter((person) => person.username !== foundUser.username);
      const currentUser = { ...foundUser, refreshToken };
      usersDB.setUsers([...otherUsers, currentUser]);
      await fsPromises.writeFile(
         path.join(__dirname, "..", "model", "users.json"),
         JSON.stringify(usersDB.users)
      );
      res.cookie("jwt", refreshToken, {
         httpOnly: true,
         sameSite: "None",
         secure: true,
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
   } else {
      res.sendStatus(401);
   }
};

module.exports = { handleLogin };
