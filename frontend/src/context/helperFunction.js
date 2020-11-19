const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/* TODO: Complete & use when displaying job */
const writeAsMoney = (amount) => {
  let amountAsString
  if (amount >= 1) {
    amountAsString = "£" + amount.toFixed(2).toString()
  } else {
    amountAsString = amount + "p"
  }
  return amountAsString
}

export default capitalize