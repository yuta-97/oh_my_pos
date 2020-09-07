const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV != "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      process.env.MONGO_URI,
      { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS },
      error => {
        if (error) {
          console.log("몽고디비 연결에 실패했습니다.", error);
        } else {
          console.log("몽고디비 연결에 성공했습니다.");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.error("몽고디비 연결이 끊어졌습니다.", error);
  });
  mongoose.connection.on("dicsonnected", error => {
    console.error("몽고디비에 재연결합니다.");
    connect();
  });
};
