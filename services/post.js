const { User, BlogPost, Category, PostCategory } = require('../models');
const validatePost = require('../middlewares/post');

const DATE = Date.now();

async function create({ title, content, categoryIds, user, t }) {
  try {
    const invalidPost = validatePost(title, content, categoryIds);
    if (invalidPost.status) return invalidPost;
    
    const findCategories = await Category.findAll({ where: { id: [...categoryIds] } },
      { transaction: t });
    
    if (findCategories.length !== categoryIds.length) {
      return { status: 400, message: { message: '"categoryIds" not found' } };
    }

    const post = await BlogPost.create({ 
      title, content, userId: user.id, published: new Date(DATE), updated: new Date(DATE) },
      { transaction: t });

    await Promise.all(categoryIds.map(async (id) => {
      await PostCategory.create({ postId: post.dataValues.id, categoryId: id }, { transaction: t });
    })); 

    return post;
  } catch (e) { 
    return { status: 500, message: { message: e.message } };
  }
}

async function getAll(t) {
  try {
    const posts = await BlogPost.findAll({ include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] }, { transaction: t });
    
    return posts;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

async function getById(id, t) {
  try {
    const post = await BlogPost.findByPk(id, { include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] }, { transaction: t });

    if (!post) return { status: 404, message: { message: 'Post does not exist' } };
    return post;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

module.exports = { create, getAll, getById };