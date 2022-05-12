const doesntExists = (value) => (!value);
const tryUpdateCategory = (value) => (typeof value !== 'undefined');

function validateCreate(title, content, categoryIds) {
  switch (true) {
    case (doesntExists(categoryIds)):
      return { status: 400, message: { message: '"categoryIds" is required' } };
    case (doesntExists(title)):
      return { status: 400, message: { message: '"title" is required' } };
    case (doesntExists(content)):
      return { status: 400, message: { message: '"content" is required' } };
    default:
      return false;
  }
}

function validateUpdate(title, content, categoryIds) {
  switch (true) {
    case (doesntExists(title)):
      return { status: 400, message: { message: '"title" is required' } };
    case (doesntExists(content)):
      return { status: 400, message: { message: '"content" is required' } };
    case (tryUpdateCategory(categoryIds)):
      return { status: 400, message: { message: 'Categories cannot be edited' } };
    default:
      return false;
  }
}

module.exports = { validateCreate, validateUpdate };