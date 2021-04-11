const express = require("express");
const cors = require("cors");
import routes from "./routes";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3333);
