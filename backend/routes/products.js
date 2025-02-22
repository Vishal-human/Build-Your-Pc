const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Model schema imports
const CPU = require('../models/cpu');
const Motherboard = require('../models/motherboard');
const RAM = require('../models/ram');
const Storage = require('../models/storage');
const GPU = require('../models/gpu');
const PSU = require('../models/PSU');
const Cabinet = require('../models/cabinet');
const CPUCooler = require('../models/CPUCooler');


// Ensure upload directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storagefile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExt = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      return cb(new Error('Invalid file type. Only jpg, jpeg, png, and gif are allowed.'));
    }

    cb(null, file.fieldname + '-' + Date.now() + fileExt);
  }
});

// File Upload Filter & Limit
const upload = multer({
  storage: storagefile,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Multer Middleware with Proper Error Handling
const uploadMiddleware = (req, res, next) => {
  upload.single('productImage')(req, res, (err) => {
    console.log('Multer File Debug:', req.file); // Debugging log

    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: 'File upload error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    } else if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    next();
  });
};

// POST - Create a new CPU
router.post('/cpu', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received CPU data:', req.body);
    const { brand, model, manufacturer, cores, generation, socket, chipset, basespeed, boostspeed, tdp, price, stock } = req.body;

    if (!['Intel', 'AMD'].includes(manufacturer)) {
      return res.status(400).json({ success: false, message: 'Manufacturer must be either Intel or AMD' });
    }

    const newCPU = new CPU({
      brand,
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

    const savedCPU = await newCPU.save();
    res.status(201).json({ success: true, message: 'CPU created successfully', data: savedCPU });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Failed to create CPU', error: error.message });
  }
});

// Serve uploaded files
router.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.sendFile(filePath);
});

// POST - Create a new Motherboard
router.post('/motherboard', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received motherboard data:', req.body);

    const {
      brand,
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

    const requiredFields = ['model', 'manufacturer', 'socket', 'chipset', 'formFactor', 'maxMemory', 'tdp', 'supportedProcessor', 'ramSlots', 'ramType', 'nvmeSupport', 'pcieVersion', 'stock', 'price'];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ success: false, message: `Please provide the following required fields: ${missingFields.join(', ')}` });
    }

    const newMotherboard = new Motherboard({
      brand,
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
      productImage: `/uploads/${req.file.filename}`,
      stock: Number(stock),
      price: Number(price)
    });

    const savedMotherboard = await newMotherboard.save();
    res.status(201).json({ success: true, message: 'Motherboard created successfully', data: savedMotherboard });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Failed to create motherboard', error: error.message });
  }
});

// POST - Create a new RAM
router.post('/ram', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received RAM data:', req.body);
    const { brand, model, manufacturer, ramType, ramCapacity, ramSpeed, voltage, price, stock } = req.body;

    const newRAM = new RAM({
      brand,
      model,
      manufacturer,
      ramType,
      ramCapacity,
      ramSpeed,
      voltage,
      productImage: `/uploads/${req.file.filename}`,
      price,
      stock
    });

    const savedRam = await newRAM.save();
    res.status(201).json({ success: true, message: 'RAM created successfully', data: savedRam });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Failed to create RAM', error: error.message });
  }
});

// POST - Create a new Storage
router.post('/storage', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received storage data:', req.body);
    const { brand, model, manufacturer, capacity, type, nvmeSupport, readSpeed, writeSpeed, voltage, price, stock } = req.body;

    const newStorage = new Storage({
      brand,
      model,
      manufacturer,
      capacity,
      type,
      nvmeSupport: nvmeSupport === 'true', // This correctly converts the string to Boolean
      readSpeed,
      writeSpeed,
      voltage,
      productImage: `/uploads/${req.file.filename}`,
      price,
      stock
    });

    const savedStorage = await newStorage.save();
    res.status(201).json({ success: true, message: 'Storage created successfully', data: savedStorage });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Failed to create storage', error: error.message });
  }
});

router.post('/gpu', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received GPU data:', req.body);
    const { brand, model, manufacturer, chipset, memory, memoryType, pcieVersion, tdp, length, productImage, price, stock } = req.body;

    const newGPU = new GPU({
      brand,
      model,
      manufacturer,
      chipset,
      memory,
      memoryType,
      pcieVersion,
      tdp,
      length,
      productImage: `/uploads/${req.file.filename}`,
      price,
      stock
    });

    const savedGPU = await newGPU.save();
    res.status(201).json({ success: true, message: 'GPU created successfully', data: savedGPU });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Failed to create GPU', error: error.message });
  }
});


router.post('/psu', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received PSU data:', req.body);
    const { brand, model, manufacturer, wattage, formFactor, efficiency, productImage, price, stock } = req.body;

    const newPSU = new PSU({
      brand,
      model,
      manufacturer,
      wattage,
      formFactor,
      efficiency,
      productImage: `/uploads/${req.file.filename}`,
      price,
      stock
    });

    const savedPSU = await newPSU.save();
    res.status(201).json({ success: true, message: 'PSU created successfully', data: savedPSU });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Failed to create PSU', error: error.message });
  }
});

router.post('/cpucooler', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received CPU Cooler data:', req.body);
    const { brand, model, manufacturer, socket, tdp, cpuType, coolingType, rpm, liquid, productImage, price, stock } = req.body;

    const newCPUCooler = new CPUCooler({
      brand,
      model,
      manufacturer,
      socket,
      tdp,
      cpuType,
      coolingType,
      rpm,
      liquid,
      productImage: `/uploads/${req.file.filename}`,
      price,
      stock
    });

    const savedCPUcooler = await newCPUCooler.save();
    res.status(201).json({ success: true, message: 'CPU Cooler created successfully', data: savedCPUcooler });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Failed to create CPU Cooler', error: error.message });
  }
});

router.post('/cabinet', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received Cabinet data:', req.body);
    const { brand, model, manufacturer, size, color, sidePanel, motherboadFormFactor, dimensions, volume, usbSlots, productImage, price, stock } = req.body;

    const newCabinet = new Cabinet({
      brand,
      model,
      manufacturer,
      size,
      color,
      sidePanel,
      motherboadFormFactor,
      volume,
      usbSlots,
      productImage: `/uploads/${req.file.filename}`,
      price,
      stock
    });

    const savedCabinet = await newCabinet.save();
    res.status(201).json({ success: true, message: 'Cabinet created successfully', data: savedCabinet });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Failed to create Cabinet', error: error.message });
  }
});


module.exports = router;
