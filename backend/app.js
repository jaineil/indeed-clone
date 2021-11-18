import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import {
  frontendIP,
  frontendPort,
  sessionSecretKey,
} from "./config/serverConfig.js";

const app = express();
app.use(
  cors({ origin: `http://${frontendIP}:${frontendPort}`, credentials: true })
);
app.use(cookieParser());

app.use(
  session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

export default app;
