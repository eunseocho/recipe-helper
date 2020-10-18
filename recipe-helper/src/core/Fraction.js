function gcd(a, b) {
	while (a > 0) {
		[a, b] = [b % a, a];
	}
	return b;
}

function fractionFromString(s) {
  try {
    var split = s.split(" ");
    if (split.length === 1) {
      return new Fraction(parseInt(s), 1);
    } else {
      const wholePart = parseInt(split[0]);
      const frac = split[1];
      const fracSplit = frac.split("/");
      const fracNum = parseInt(fracSplit[0]);
      const fracDen = parseInt(fracSplit[1]);
      return new Fraction(wholePart * fracDen + fracNum, fracDen);
    }
  } catch (err) {
    return Fraction(1, 1);
  }
}

class Fraction {
	constructor(numerator, denominator) {
		// first reduce via gcd
		var common = gcd(numerator, denominator);
		this.numerator = (numerator / common) | 0;
    this.denominator = (denominator / common) | 0;

    this.asFractionString = this.asFractionString.bind(this);
    this.asMixedNumberString = this.asMixedNumberString.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
	}

  multiply(argument) {
    return new Fraction(this.numerator * argument.numerator, this.denominator * argument.denominator);
  }

  divide(argument) {
    return new Fraction(this.numerator * argument.denominator, this.denominator * argument.numerator);
  }

  asFractionString() {
    return `${this.numerator}/${this.denominator}`;
  }

  asMixedNumberString() {
    var wholePart = (this.numerator / this.denominator) | 0;
    if (wholePart === 0) {
      return this.asFractionString();
    } else {
      var fracPart = (this.numerator % this.denominator);
      if (fracPart > 0) {
        return `${wholePart} ${fracPart}/${this.denominator}`;
      } else {
        return `${wholePart}`;
      }
    }
  }
}

export { fractionFromString, Fraction };
export default Fraction;