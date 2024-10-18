import Post from '../models/PostModel.js';
import { decrypt } from '../utils/encry.js';
import mongoose from 'mongoose';

export const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostsByApiKey = async (req, res) => {
    try {

        const { apiKey } = req.params;

        if (!apiKey) return res.status(400).json({ message: 'API Key is required' });

        // const decryptedAuthorId = decrypt(apiKey);
        const authorId = new mongoose.Types.ObjectId(apiKey);

        const posts = await Post.find({ author: authorId });
        if (!posts.length) return res.status(404).json({ message: 'No posts found for this author' });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};