/*************  ✨ Codeium Command 🌟  *************/
const express = require('express');
const router = express.Router();
const CPU = require('../models/cpu'); // Changed to uppercase CPU for model
const motherboard = require('../models/motherboard');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// POST - Create a new CPU

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the verified upload directory
  },
  filename: (req, file, cb) => {
    // Add file extension validation
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExt = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      return cb(new Error('Invalid file type. Only jpg, jpeg, png, and gif are allowed.'));
    }

    cb(null, file.fieldname + '-' + Date.now() + fileExt);
  }
});
// File filter (optional: restrict file types)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Validate mime types
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

const uploadMiddleware = (req, res, next) => {
  upload.single('productImage')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred (e.g., file too large)
      return res.status(400).json({
        success: false,
        message: 'File upload error: ' + err.message
      });
    } else if (err) {
      // An unknown error occurred
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next();
  });
};

router.post('/cpu', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received CPU data:', req.body);
    const { model, manufacturer, cores, generation, socket, chipset, basespeed, boostspeed, productImage, tdp, price, stock } = req.body;

    // // Validate required fields
    // if (!brand || !model || !manufacturer || !cores || !generation ||
    //   !frequency || !socket || !chipset || !basespeed || !boostspeed ||
    //   !tdp || !price || !stock) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Please provide all required fields'
    //   });
    // }

    if (!req.file) {
      return res.status(400).json({ error: "File upload failed or missing" });
    }


    // Validate manufacturer
    if (!['Intel', 'AMD'].includes(manufacturer)) {
      console.log('Validation failed - invalid manufacturer'); // Debug log
      return res.status(400).json({
        success: false,
        message: 'Manufacturer must be either Intel or AMD'
      });
    }
    // Create new CPU
    const newCPU = new CPU({
      model,
      manufacturer,
      cores: Number(cores),
      generation,
      socket,
      chipset,
      basespeed: Number(basespeed),
      boostspeed: Number(boostspeed),
      productImage: `/uploads/${req.file.filename}`,
      tdp: Number(tdp),
      price: Number(price),
      stock: Number(stock)
    });

    console.log('Created CPU instance:', newCPU);

    // Save to database
    const savedCPU = await newCPU.save();
    console.log('Saved CPU to database:', savedCPU);
    console.log("Uploaded file details:", req.file);

    // Send success response
    res.status(201).json({
      success: true,
      message: 'CPU created successfully',
      data: savedCPU
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create CPU',
      error: error.message,
      details: error.errors
    });
  }
});

// Add a route to serve uploaded files
router.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.sendFile(filePath);
});

router.post('/motherboard', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received motherboard data:', req.body);

    // First check if file was uploaded
    // if (!req.file) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Product image is required'
    //   });
    // }

    const {
      model,
      manufacturer,
      socket,
      formFactor,
      chipset,
      memorySlots,
      maxMemory,
      tdp,
      supportedProcessor,
      ramSlots,
      ramType,
      nvmeSupport,
      pcieVersion,
      stock,
      price
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'model',
      'manufacturer',
      'socket',
      'chipset',
      'formFactor',
      'maxMemory',
      'tdp',
      'supportedProcessor',
      'ramSlots',
      'ramType',
      'nvmeSupport',
      'pcieVersion',
      'stock',
      'price'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please provide the following required fields: ${missingFields.join(', ')}`
      });
    }

    // Create new motherboard with the uploaded file path
    const newMotherboard = new motherboard({
      model,
      manufacturer,
      socket,
      chipset,
      formFactor,
      memorySlots: Number(memorySlots),
      maxMemory: Number(maxMemory),
      tdp: Number(tdp),
      supportedProcessor: supportedProcessor.split(',').map(p => p.trim()),
      ramSlots: Number(ramSlots),
      ramType,
      nvmeSupport: nvmeSupport === 'true',
      pcieVersion,
      productImage: `/uploads/${req.file.filename}`, // Now safe to use req.file.filename
      stock: Number(stock),
      price: Number(price)
    });

    const savedMotherboard = await newMotherboard.save();
    console.log('Saved motherboard to database:', savedMotherboard);

    res.status(201).json({
      success: true,
      message: 'Motherboard created successfully',
      data: savedMotherboard
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create motherboard',
      error: error.message,
      details: error.errors
    });
  }
});

// Make sure to export the router
module.exports = router;
