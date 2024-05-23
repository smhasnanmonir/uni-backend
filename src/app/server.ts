import app from "./app";
import mongoose from "mongoose";
import config from "./config";
const port = 3000;

async function main() {
  try {
    await mongoose.connect(config.mongoDB as string);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
