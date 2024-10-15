import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categories: [{ type: String }],
  tags: [{ type: String }],
  featuredImage: { type: String },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  // likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;