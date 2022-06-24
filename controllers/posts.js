const { successHandle, errorHandle } = require('../service/handles');
const checkBody = require('../service/checkBody');
const Posts = require('../models/posts');

const postsMethods = {
  async getAllPosts({req, res}){
    const allPosts = await Posts.find();
    successHandle(res, allPosts);
  },
  async createPost({body, req, res}){
    try {
      const data = JSON.parse(body);
      if (data.content && data.name){
        const newPost = await Posts.create({
          name: data.name,
          content: data.content,
          image: data.image,
          tags: data.tags,
          type: data.type
        });
        successHandle(res, newPost);
      } else {
        errorHandle(res);
      }
    } catch (err) {
      errorHandle(res, err);
    }
  },
  async deleteAllPosts({req, res}){
    await Posts.deleteMany({});
    successHandle(res, "成功刪除所有貼文");
  },
  async deleteOnePost({req, res, postID}){
    try {
      await Posts.findByIdAndDelete(postID);
      successHandle(res, "成功刪除一筆資料");
    } catch (error) {
      errorHandle(res);
    }
  },
  async editOnePost({req, res, postID, body}){
    try {
      const data = JSON.parse(body);
      const isPass = checkBody(res, data);
      if(isPass){
        await Posts.findByIdAndUpdate(postID, {
          name: data.name,
          tags: data.tags,
          type: data.type,
          image: data.image,
          content: data.content,
          likes: data.likes
        });
        successHandle(res, "成功編輯一筆貼文資料");
      }
    } catch (error) {
      errorHandle(res);
    }
  }
}

module.exports = postsMethods;