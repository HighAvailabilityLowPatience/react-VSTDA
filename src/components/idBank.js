//ID BANK
const idBank = Array.from({ length: 500 }, (_, i) => i);

console.log("Building idBank......", idBank);


// Next ID to be assigned
export const nextId = function idBankQueue() {

  console.log(idBank.slice(0, 10));

  if (idBank.length === 0) {
    throw new Error("No IDs available");
  }

  return idBank.shift();
};


// Return deleted ID back to bank
export const recycleId = function(id) {

  idBank.push(id);

};