const express = require('express');
const router = express.Router();
const CPU = require('../models/cpu'); // Changed to uppercase CPU for model
// POST - Create a new CPU
router.post('/cpu', async (req, res) => {
  try {
    console.log('Received CPU data:', req.body);

    const { brand, model, manufacturer, cores, generation, frequency, socket, chipset, basespeed, boostspeed, productImage, tdp, price, stock } = req.body;

    // Validate required fields
    if (!brand || !model || !manufacturer || !cores || !generation ||
      !frequency || !socket || !chipset || !basespeed || !boostspeed ||
      !tdp || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
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
      brand,
      model,
      manufacturer,
      cores: Number(cores),
      generation,
      frequency: Number(frequency),
      socket,
      chipset,
      basespeed: Number(basespeed),
      boostspeed: Number(boostspeed),
      productImage,
      tdp: Number(tdp),
      price: Number(price),
      stock
    });

    console.log('Created CPU instance:', newCPU);

    // Save to database
    const savedCPU = await newCPU.save();
    console.log('Saved CPU to database:', savedCPU);

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

router.post('/motherboard', async (req, res) => {
  try {
    console.log('Received motherboard data:', req.body);

    const { brand, model, manufacturer, socket, formFactor, chipset, memoryType, memorySpeed, memorySlots, memorySize, productImage, tdp, price, stock } = req.body;

    // Validate required fields
    if (!brand || !model || !manufacturer || !socket || !formFactor ||
      !chipset || !memoryType || !memorySpeed || !memorySlots || !memorySize ||
      !tdp || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    let imageUrl;
    if (req.files && req.files.productImage) {
      const image = req.files.productImage;
      const uploadPath = path.join(__dirname, '..', 'public', 'images', image.name);
      image.mv(uploadPath, (err) => {
        if (err) {
          console.error('Error uploading image:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: err.message
          });
        }
        imageUrl = `/images/${image.name}`;
      });
    } else {
      imageUrl = productImage;
    }

    const newMotherboard = new Motherboard({
      brand,
      model,
      manufacturer,
      socket,
      formFactor,
      chipset,
      memoryType,
      memorySpeed: Number(memorySpeed),
      memorySlots: Number(memorySlots),
      memorySize: Number(memorySize),
      productImage: imageUrl,
      tdp: Number(tdp),
      price: Number(price),
      stock
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