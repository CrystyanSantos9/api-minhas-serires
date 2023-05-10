const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "vegetaABC123";

const auth = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["token"];
  console.log(req.headers);

  if (token) {
    try {
      const payload = jwt.verify(token, jwtSecret);
      console.log(payload);
      if (payload.roles.indexOf("admin") >= 0) {
        next();
      } else {
        res.send({
          success:
            "user does not have permission to access the destination resource.",
        });
      }
    } catch (e) {
      res.statusCode = 403;
      res.send({ success: false });
    }
  } else {
    //se o token não existe
    res.statusCode = 403;
    res.send({ success: false });
  }
};

module.exports = auth;
