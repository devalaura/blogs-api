const Sequelize = require('sequelize');

const config = require('../config/config');
const service = require('../services/post');

const sequelize = new Sequelize(config.development);

async function create(req, res, next) {
  const t = await sequelize.transaction();

  try {
    const { title, content, categoryIds } = req.body;
    const { user } = req;

    const newPost = await service.create({ title, content, categoryIds, user, t });

    if (newPost.status) {
      await t.rollback();
      return res.status(newPost.status).json(newPost.message);
    }

    await t.commit();
    return res.status(201).json(newPost);
  } catch (e) {
    await t.rollback();
    return next(e);
  }
}

async function getAll(req, res, next) {
  const t = await sequelize.transaction();

  try {
    const posts = await service.getAll(t);

    if (posts.status) {
      await t.rollback();
      return res.status(posts.status).json(posts.message);
    }

    await t.commit();
    return res.status(200).json(posts);
  } catch (e) {
    await t.rollback();
    return next(e);
  }
}

module.exports = { create, getAll };
