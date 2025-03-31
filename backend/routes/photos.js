const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Photo = require('../models/Photo');
const User = require('../models/User');

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    // Create a unique filename with timestamp and original name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Upload photo
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('Upload request received:', {
      file: req.file ? {
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: req.file.path
      } : null,
      body: req.body,
      user: req.user ? {
        userId: req.user.userId,
        email: req.user.email
      } : null,
      headers: {
        authorization: req.headers.authorization ? 'Present' : 'Missing'
      }
    });

    if (!req.file) {
      console.log('No file provided in request');
      return res.status(400).json({ 
        message: 'No image file provided',
        error: 'MISSING_FILE'
      });
    }

    if (!req.user || !req.user.userId) {
      console.log('No authenticated user found');
      return res.status(401).json({ 
        message: 'Authentication required',
        error: 'UNAUTHORIZED'
      });
    }

    const { name, description } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ 
        message: 'Photo title is required',
        error: 'MISSING_TITLE'
      });
    }
    
    // Create new photo with local file path
    const photo = new Photo({
      name,
      description,
      imageUrl: `/uploads/${req.file.filename}`, // Store the relative path
      userId: req.user.userId
    });

    console.log('Saving photo to database:', {
      name,
      description,
      imageUrl: photo.imageUrl,
      userId: req.user.userId
    });

    await photo.save();
    
    // Populate user information
    await photo.populate('userId', 'name');
    
    console.log('Photo saved successfully:', {
      photoId: photo._id,
      name: photo.name,
      imageUrl: photo.imageUrl
    });

    res.status(201).json(photo);
  } catch (error) {
    console.error('Upload error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name,
      path: error.path,
      value: error.value
    });
    
    // Handle specific error cases
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File size should be less than 5MB',
        error: 'FILE_TOO_LARGE'
      });
    }
    if (error.message === 'Only image files are allowed!') {
      return res.status(400).json({ 
        message: error.message,
        error: 'INVALID_FILE_TYPE'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: error.message,
        error: 'VALIDATION_ERROR',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Error saving photo. Please try again.',
      error: 'SAVE_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user's photos
router.get('/user/:userId', async (req, res) => {
  try {
    const photos = await Photo.find({ userId: req.params.userId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ message: 'Error fetching photos' });
  }
});

// Get trending photos
router.get('/trending', async (req, res) => {
  try {
    const photos = await Photo.find()
      .populate('userId', 'name')
      .sort({ likes: -1, createdAt: -1 })
      .limit(10);
    res.json(photos);
  } catch (error) {
    console.error('Get trending photos error:', error);
    res.status(500).json({ message: 'Error fetching trending photos' });
  }
});

// Like photo
router.post('/:photoId/like', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Check if user already liked the photo
    const hasLiked = photo.likes.includes(req.user.userId);
    if (hasLiked) {
      // Unlike
      photo.likes = photo.likes.filter(id => id.toString() !== req.user.userId);
    } else {
      // Like
      photo.likes.push(req.user.userId);
    }

    await photo.save();
    await photo.populate('userId', 'name');
    res.json(photo);
  } catch (error) {
    console.error('Like photo error:', error);
    res.status(500).json({ message: 'Error liking photo' });
  }
});

// Share photo
router.post('/:photoId/share', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    photo.shares += 1;
    await photo.save();
    res.json(photo);
  } catch (error) {
    console.error('Share photo error:', error);
    res.status(500).json({ message: 'Error sharing photo' });
  }
});

// Get all photos with user information
router.get('/all', auth, async (req, res) => {
  try {
    // Fetch all photos and populate with user information
    const photos = await Photo.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate('userId', 'email') // Get user email
      .exec();

    // Transform the photos to include username
    const transformedPhotos = photos.map(photo => ({
      _id: photo._id,
      name: photo.name,
      description: photo.description,
      imageUrl: photo.imageUrl,
      likes: photo.likes,
      shares: photo.shares,
      createdAt: photo.createdAt,
      username: photo.userId ? photo.userId.email.split('@')[0] : 'Unknown User',
      isOwnPhoto: photo.userId && photo.userId._id.toString() === req.user.userId
    }));

    res.json(transformedPhotos);
  } catch (error) {
    console.error('Error fetching all photos:', error);
    res.status(500).json({ message: 'Failed to fetch photos' });
  }
});

module.exports = router; 