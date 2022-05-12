const doesntExists = (value) => (!value);

function validatePost(title, content, categoryIds) {
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

module.exports = validatePost;