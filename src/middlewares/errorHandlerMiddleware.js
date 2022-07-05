export default async function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.type === "missingFields")
    return res.status(422).send("Missing fields on request body");

  if (error.type === "userAlreadyExists")
    return res.status(409).send("User already exists");

  if (error.type === "invalidCredentials")
    return res.status(401).send("Invalid credentials");

  if (error.type === "notAuthorized")
    return res.status(401).send("You are not authorized.");

  if (error.type === "invalidType")
    return res.status(422).send("Invalid type.");

  res.status(500).send("Internal server error");
}
