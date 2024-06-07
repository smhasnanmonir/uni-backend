import dotenv from "dotenv";

import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  passwordHash: process.env.PASSWORD_HASH,
  defaultPassword: process.env.DEFAULT_PASS,
  mongoDB: process.env.MONGO_DB,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
};
