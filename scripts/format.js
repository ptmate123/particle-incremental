var formatList = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc']

function toFormat(value) {
    if (!(value instanceof Decimal)) {
        return value
    }
    let mantissa = value.mantissa
    let exp = value.exponent 
    if (exp == Infinity) {
        return value.toFixed(3)
    }
    mantissa = mantissa.toFixed(2)
    if (exp <= 35) {
        let notation = formatList[Math.floor(exp / 3)]
        let formatMantissa = (mantissa * Math.pow(10, exp % 3)).toPrecision(3)
        return formatMantissa + notation
    }
    if (exp >= 1000) {
        return mantissa + 'e' + toFormat(new Decimal(exp))
    }
    return mantissa + 'e' + exp
}