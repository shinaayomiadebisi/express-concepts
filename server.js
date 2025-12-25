require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { configureCors } = require("./config/corsConfig");
const {
  requestLogger,
  addTImeStamp,
} = require("./middleware/customMiddleware");
const { globalErrorHandler } = require("./middleware/errorHandler");
const { urlVersioning } = require("./middleware/apiVersioning");
const { createBasicRateLimiter } = require("./middleware/rateLimiting.js");
const itemRoutes = require("./routes/item-routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

//express json middleware
app.use(requestLogger);
app.use(addTImeStamp);

app.use(configureCors());
app.use(createBasicRateLimiter(2, 15 * 60 * 15000)); //100 request per 15 minutes
app.use(express.json());

app.use(urlVersioning("v1"));
app.use("/api/v1", itemRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
