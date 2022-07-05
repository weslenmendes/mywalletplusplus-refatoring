import * as authServices from "./../services/authService.js";

export async function signUp(req, res) {
  await authServices.signUp(req.body.name, req.body.email, req.body.password);
  res.sendStatus(201);
}

export async function signIn(req, res) {
  const token = await authServices.signIn(req.body.email, req.body.password);
  res.send({ token });
}
