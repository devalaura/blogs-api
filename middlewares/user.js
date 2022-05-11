const isEmpty = (value) => (!value);
const isntString = (value) => (typeof value !== 'string');
const invalidLength = (value, min) => (value.length < min);
const invalidSize = (password) => (password.length !== 6);
const invalidFormat = (email) => {
  const REGEX = /\S+@\S+\.\S+/;
  return !(REGEX.test(email));
};

const invalidName = (name) => {
  switch (true) {
    case (isEmpty(name)):
      return { status: 400, message: { message: '"displayName" is required' } };
    case (isntString(name)):
      return { status: 400, message: { message: '"displayName" must be a string' } };
    case (invalidLength(name, 8)):
      return { 
        status: 400, 
        message: { message: '"displayName" length must be at least 8 characters long' },
      };
    default: 
      return false;
  }
};

const invalidEmail = (email) => {
  switch (true) {
    case (isEmpty(email)):
      return { status: 400, message: { message: '"email" is required' } };
    case (isntString(email)):
      return { status: 400, message: { message: '"email" must be a string' } };
    case (invalidFormat(email)):
      return { status: 400, message: { message: '"email" must be a valid email' } };
    default:
      return false;
  }
};

const invalidPassword = (password) => {
  switch (true) {
    case (isEmpty(password)):
      return { status: 400, message: { message: '"password" is required' } };
    case (isntString(password)):
      return { status: 400, message: { message: '"password" must be a string' } };
    case (invalidSize(password)):
      return { 
        status: 400, 
        message: { message: '"password" length must be 6 characters long' },
      };
    default:
      return false;
  }
};

const invalidImage = (image) => {
  switch (true) {
    case (isEmpty(image)):
      return { status: 400, message: { message: '"image" is required' } };
    case (isntString(image)):
      return { status: 400, message: { message: '"image" must be a string' } };
    default:
      return false;
  }
};

function invalidUser(name, email, password, image) {
  const isValid = [
      invalidName(name), invalidEmail(email), invalidPassword(password), invalidImage(image),
    ];
  
  const result = isValid.find((value) => value);
  
  if (result) return result;

  return false;
}

module.exports = invalidUser;