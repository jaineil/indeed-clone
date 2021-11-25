import { createConnection } from "mysql";

const dbConfig = {
  HOST: "database-1.c7demyr6eccb.us-west-1.rds.amazonaws.com",
  PORT: "3306",
  USER: "admin",
  PASSWORD: "Cmpe_273",
  DB: "indeed_clone",
};

// Create connection to database
const conn = createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// Connect to database
conn.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database");
});

export default conn;
