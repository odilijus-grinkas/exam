const {postModels} = require('../models/post-models');
const { get } = require('../routes/post-routes');

const postControllers = {
  getCategories: async (req, res) => {
    try {
      const categories = await postModels.getCategories(req.con);
      res.status(200).json(categories[0]);
    } catch (err) {
      console.log(err)
      res.status(403).json("Categories not found.");
    }
  },
  
  createCategory: async (req, res) => {
    if (req.body.name.length === 0) {
      res.status(403).json("Please fill out all fields.");
      return;
    }
    try {
      await postModels.createCategory(req.con, req.body.name);
      res.status(200).json("Category created.");
    } catch (err) {
      res.status(403).json("Category not created.");
    }
  },

  createPost: async (req, res) => {
    if (req.body.title.length === 0 || req.body?.content?.length === 0) {
      res.status(403).json("Please fill out all fields.");
      return;
    }
    if (req.body.title.length > 50) {
      res.status(403).json("Title must be less than 50 characters long");
      return;
    }
    try {
      await postModels.createPost(req.con, req.body.title, req.body.time, req.body.place, req.body.category, req.tokenInfo.id);
      res.status(200).json("Post created.");
    } catch (err) {
      res.status(403).json("Post not created.");
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await postModels.getAllPosts(req.con);
      res.status(200).json(posts);
    } catch (err) {
      res.status(403).json("Posts not found.");
    }
  },

  addStars: async (req, res) => {
    try {
      console.log(req.body)
      await postModels.addStars(req.con, req.body.postId, req.body.rating);
      res.status(200).json("Stars added.");
    } catch (err) {
      res.status(403).json("Stars not added.");
    }
  },

  deletePost: async (req, res) => {
    try {
      await postModels.deletePost(req.con, req.params.id);
      res.status(200).json("Post deleted.");
    } catch (err) {
      res.status(403).json("Post not found.");
    }
  },

  getFilteredPosts: async (req, res) => {
    const filter = req.params.filter;
    const split = filter.split('=').map(s => s.replace(/^:/, '')); // Remove colon at the start
    try {
      const posts = await postModels.getFilteredPosts(req.con, split);
      res.status(200).json(posts);
    } catch (err) {
      res.status(403).json("Posts not found.");
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await postModels.getPost(req.con, req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(403).json("Post not found.");
    }
  },

  updatePost: async (req, res) => {
    try {
      await postModels.updatePost(req.con, req.body.title, req.body.time, req.body.place, req.body.category, req.tokenInfo.id);
      res.status(200).json("Post updated.");
    } catch (err) {
      console.log(err)
      res.status(403).json("Post not updated.");
    }
  }

}

module.exports = { postControllers };