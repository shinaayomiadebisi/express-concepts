const cors = require("cors");

const configureCors = () => {
  return cors({
    //origin -> this tells which origins you want the user to access in your api
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", //local development
        "https://yourcustomdomain.com", //production domain
      ];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); //giving permission so that request can be allowed
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true, //enable support for cookies
    preflightContinue: false,
    maxAge: 600, //cache preflight responses for 10mins (600 seconds) -> avoid sending options requests multiple times
    optionsSuccessStatus: 204,
  });
};

module.exports = { configureCors };
