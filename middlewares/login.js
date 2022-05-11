const doesntExists = (value) => (!value);
const isEmpty = (value) => (value === '');

function validateLogin(email, password) {
  switch (true) {
    case (isEmpty(email)):
      return { status: 400, message: { message: '"email" is not allowed to be empty' } };
    case (isEmpty(password)):
      return { status: 400, message: { message: '"password" is not allowed to be empty' } };
    case (doesntExists(email)):
      return { status: 400, message: { message: '"email" is required' } };
    case (doesntExists(password)):
      return { status: 400, message: { message: '"password" is required' } };
    default:
      return false;
  }
}

module.exports = validateLogin;