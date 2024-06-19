const jwt = require("jsonwebtoken");

const authToken = (
  req,
  res,
  next
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.tokenInfo = userInfo;
      next();
    });
  }
}

module.exports = authToken;