import financialRepository from "./../repositories/financialRepository.js";

export async function addFinancialEvent(userId, value, type) {
  if (!value || !type) {
    throw { type: "missingFields", message: "Missing fields." };
  }

  const financialTypes = ["INCOME", "OUTCOME"];
  if (!financialTypes.includes(type)) {
    throw { type: "invalidType", message: "Invalid type." };
  }

  if (value < 0) {
    throw { type: "invalidType", message: "Invalid type." };
  }

  await financialRepository.addFinancialEvent(userId, value, type);
}

export async function getFinancialEvents(userId) {
  const events = await financialRepository.getFinancialEvents(userId);

  return events.rows;
}

export async function sumFinancialEvents(userId) {
  const events = await financialRepository.getFinancialEvents(userId);

  const sum = events.rows.reduce(
    (total, event) =>
      event.type === "INCOME" ? total + event.value : total - event.value,
    0,
  );

  return sum;
}
