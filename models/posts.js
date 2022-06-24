const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema(
  {
    //貼文姓名
    name: {
      type: String,
      require: [true, "貼文姓名未填寫"]
    },
    //貼文標籤
    tags: [
      {
        type: String,
        require: [true, "貼文標籤 tags 未填寫"]
      }
    ],
    //類型
    type: {
      type: String,
      enum: ['group', 'person'],  //enum很像【範圍】概念，類似HTML的select選單
      required: [true, "貼文類型 type 未填寫"]
    },
    //圖片
    image: {
      type: String,
      default: ""
    },
    //建立日期
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    //貼文內容
    content: {
      type: String,
      require: [true, "貼文內容 content 未填寫"]
    },
    //按讚數
    likes: {
      type: Number,
      default: 0
    },
    //留言數
    comments:{
      type: Number,
      default:0
    },
  },
  {
    versionKey: false,
    timestamps: true  //更新時間
  }
);

const posts = mongoose.model('posts', postsSchema);
module.exports = posts;