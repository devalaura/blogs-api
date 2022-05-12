const { User, BlogPost, Category, PostCategory } = require('../models');
const { validateCreate, validateUpdate } = require('../middlewares/post');

const DATE = Date.now();

async function create({ title, content, categoryIds, user, t }) {
  try {
    const invalidPost = validateCreate(title, content, categoryIds);
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

async function update({ id, title, content, categoryIds, user, t }) {
  try {
    const validData = validateUpdate(title, content, categoryIds);
    if (validData.status) return validData;

    const post = await BlogPost.findByPk(id, { include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] }, { transaction: t });
    if (!post) return { status: 404, message: { message: 'Post does not exist' } };
    if (post.userId !== user.id) return { status: 401, message: { message: 'Unauthorized user' } };

    const updated = new Date(DATE);

    await BlogPost.update({ title, content, updated }, { transaction: t, where: { id } });

    post.title = title;
    post.content = content;
    post.updated = updated;

    return post;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

async function destroy(id, user, t) {
  try {
    const findPost = await BlogPost.findByPk(id, { transaction: t });
    if (!findPost) return { status: 404, message: { message: 'Post does not exist' } };
    if (findPost.userId !== user.id) { 
      return { status: 401, message: { message: 'Unauthorized user' } };
    }

    await BlogPost.destroy({ where: { id } }, { transaction: t });
    
    return;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

module.exports = { create, getAll, getById, update, destroy };