const fs = require("fs");

// CREATE FOLDER
if (!fs.existsSync("./new")) {
   fs.mkdir("./new", (err) => {
      if (err) throw err;
      console.log("Directory created");
   });
}
// REMOVE FOLDER
if (fs.existsSync("./new")) {
   fs.rmdir("./new", (err) => {
      if (err) throw err;
      console.log("Directory removed");
   });
}
