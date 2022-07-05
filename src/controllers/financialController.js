import * as financialServices from "./../services/financialService.js";

export async function addFinancialEvent(req, res) {
  await financialServices.addFinancialEvent(
    res.user.id,
    req.body.value,
    req.body.type,
  );

  res.sendStatus(201);
}

export async function getFinancialEvents(req, res) {
  const events = await financialServices.getFinancialEvents(res.user.id);
  res.send(events);
}

export async function sumFinancialEvents(req, res) {
  const sum = await financialServices.sumFinancialEvents(res.user.id);
  res.send({ sum });
}
