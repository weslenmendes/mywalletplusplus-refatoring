export async function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");

  console.log(token);

  if (!token) {
    throw { type: "notAuthorized", message: "You are not authorized." };
  }

  try {
    let user = jwt.verify(token, process.env.JWT_SECRET);

    res.user = user;

    next();
  } catch {
    throw { type: "notAuthorized", message: "You are not authorized." };
  }
}
