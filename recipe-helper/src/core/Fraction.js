function gcd(a, b) {
	while (a > 0) {
		[a, b] = [b % a, a];
	}
	return b;
}

class Fraction {
	constructor(numerator, denominator) {
		// first reduce via gcd
		var common = gcd(numerator, denominator);
		this.numerator = (numerator / common) | 0;
    this.denominator = (denominator / common) | 0;

    this.asFractionString = this.asFractionString.bind(this);
    this.asMixedNumberString = this.asMixedNumberString.bind(this);
	}

  multiply(argument) {
    return new Fraction(this.numerator * argument.numerator, this.denominator * argument.denominator);
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

export default Fraction;