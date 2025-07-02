const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes
router.use(authMiddleware.protect);

// Admin only routes
router.post('/', authMiddleware.restrictTo('admin'), taskController.createTask);

// All authenticated users
router.get('/', taskController.getTasks);
router.get('/status', taskController.getTaskStats);
router.put('/:id/status', taskController.updateTaskStatus);

module.exports = router;