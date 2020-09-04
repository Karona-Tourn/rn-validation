function isNotNullUndefined(value: any) {
  return value !== undefined && value !== null;
}

function isEmpty(value: any) {
  return value === '' || !isNotNullUndefined(value);
}

function isEmptyWithTrim(value: string) {
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  return true;
}

function didMatchRegExp(value: string, regexp: string | RegExp) {
  const validationRegexp =
    regexp instanceof RegExp ? regexp : new RegExp(regexp);
  return isEmpty(value) || validationRegexp.test(value);
}

function isLengthLessThan(maxLength: number) {
  return (value: string | any[]) => {
    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length < maxLength;
    }
    return false;
  };
}

function isLengthBetween(min: string, max: string) {
  return (value: string | any[]) => {
    if (typeof value === 'string' || Array.isArray(value)) {
      const length = value.length;
      return length >= parseInt(min, 10) && length <= parseInt(max, 10);
    }
    return false;
  };
}

function isLengthLessThanOrEqualTo(maxLength: number) {
  return (value: string | any[]) => {
    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length <= maxLength;
    }
    return false;
  };
}

function isNotEmpty(value: string | any[]) {
  return (
    (Array.isArray(value) && value.length > 0) ||
    (typeof value === 'string' && !isEmpty(value))
  );
}

function isEqual(anotherValue: any) {
  return (value: any) => {
    return value == anotherValue;
  };
}

function isExactlyEqual(anotherValue: any) {
  return (value: any) => {
    return value === anotherValue;
  };
}

function matchRegExp(regexp: any) {
  return (value: any) => {
    return didMatchRegExp(value, regexp);
  };
}

function isBetween(min: string, max: string) {
  return (value: string) => {
    if (isEmpty(value)) {
      return true;
    }

    const exactValue = parseInt(value, 10);
    return exactValue >= parseInt(min, 10) && exactValue <= parseInt(max, 10);
  };
}

function isLessThan(max: string) {
  return (value: string) => {
    if (isEmpty(value)) {
      return true;
    }

    return parseInt(value, 10) < parseInt(max, 10);
  };
}

function isLessThanOrEqualTo(max: string) {
  return (value: string) => {
    if (isEmpty(value)) {
      return true;
    }

    return parseInt(value, 10) <= parseInt(max, 10);
  };
}

function isGreaterThan(min: string) {
  return (value: string) => {
    if (isEmpty(value)) {
      return true;
    }

    return parseInt(value, 10) > parseInt(min, 10);
  };
}

function isGreaterThanOrEqualTo(min: string) {
  return (value: string) => {
    if (isEmpty(value)) {
      return true;
    }

    return parseInt(value, 10) >= parseInt(min, 10);
  };
}

function requireNumericDigits(value: any) {
  if (!isNotNullUndefined(value) || typeof value === 'number') {
    return true;
  }

  if (typeof value === 'string') {
    return didMatchRegExp(value, /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/);
  }

  return false;
}

function isEmail(value: string) {
  return didMatchRegExp(
    value,
    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
  );
}

function isNotEmptyTrim(value: any) {
  return !isNotNullUndefined(value) && isEmptyWithTrim(value);
}

const ValidationRules = {
  isNotEmpty,
  isNotEmptyTrim,
  isLengthLessThan,
  isLengthLessThanOrEqualTo,
  isLengthBetween,
  isEqual,
  isExactlyEqual,
  matchRegExp,
  isBetween,
  isLessThan,
  isLessThanOrEqualTo,
  isGreaterThan,
  isGreaterThanOrEqualTo,
  requireNumericDigits,
  isEmail,
};

export default ValidationRules;
