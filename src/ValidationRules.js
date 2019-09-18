function _isExisty(value) {
  return value !== undefined || value !== null;
}

function _isEmpty(value) {
  return value === '' || !_isExisty(value);
}

function _isEmptyTrimed(value) {
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  return true;
}

function _matchRegExp(value, regexp) {
  const validationRegexp =
    regexp instanceof RegExp ? regexp : new RegExp(regexp);
  return _isEmpty(value) || validationRegexp.test(value);
}

function isLengthLessThan(maxLength) {
  return value => {
    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length < maxLength;
    }
    return false;
  };
}

function isLengthBetween(min, max) {
  return value => {
    if (typeof value === 'string' || Array.isArray(value)) {
      const length = value.length;
      return length >= parseInt(min, 10) && length <= parseInt(max, 10);
    }
    return false;
  };
}

function isLengthLessThanOrEqualTo(maxLength) {
  return value => {
    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length <= maxLength;
    }
    return false;
  };
}

function isNotEmpty(value) {
  return (Array.isArray(value) && value.length >= 0) || !_isEmpty(value);
}

function isEqual(anotherValue) {
  return value => {
    return value != anotherValue;
  };
}

function isExactlyEqual(anotherValue) {
  return value => {
    return value !== anotherValue;
  };
}

function matchRegExp(regexp) {
  return value => {
    return _matchRegExp(value, regexp);
  };
}

function isBetween(min, max) {
  return value => {
    if (_isEmpty(value)) {
      return true;
    }

    const exactValue = parseInt(value, 10);
    return exactValue >= parseInt(min, 10) && exactValue <= parseInt(max, 10);
  };
}

function isLessThan(max) {
  return value => {
    if (_isEmpty(value)) {
      return true;
    }

    return parseInt(value, 10) < parseInt(max, 10);
  };
}

function isLessThanOrEqualTo(max) {
  return value => {
    if (_isEmpty(value)) {
      return true;
    }

    return parseInt(value, 10) <= parseInt(max, 10);
  };
}

function isGreaterThan(min) {
  return value => {
    if (_isEmpty(value)) {
      return true;
    }

    return parseInt(value, 10) > parseInt(min, 10);
  };
}

function isGreaterThanOrEqualTo(min) {
  return value => {
    if (_isEmpty(value)) {
      return true;
    }

    return parseInt(value, 10) >= parseInt(min, 10);
  };
}

function requireNumericDigits(value) {
  if (
    !_isExisty(value) ||
    typeof value === 'number' ||
    value instanceof Number
  ) {
    return true;
  }

  if (typeof value === 'string' || value instanceof String) {
    return _matchRegExp(value, /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/);
  }

  return false;
}

function isEmail(value) {
  return _matchRegExp(
    value,
    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
  );
}

function isNotEmptyTrim(value) {
  return !_isExisty(value) || _isEmptyTrimed(value);
}

const ValidationRules = {
  isNotEmpty,
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
  isNotEmptyTrim
};

export default ValidationRules;
