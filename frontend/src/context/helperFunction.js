export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export const formatCurrency = (amount) => {
  let amountAsString
  if (amount >= 1) {
    amountAsString = "£" + amount.toFixed(2).toString()
  } else {
    amountAsString = amount * 100 + "p"
  }
  return amountAsString
}
