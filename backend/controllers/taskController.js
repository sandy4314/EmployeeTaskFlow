const Task = require('../models/Task');
const Employee = require('../models/Employee');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    let query = {};
    
    // If user is employee, only show their tasks
    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ username: req.user.username });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      query.assignedTo = employee._id;
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'fullName employeeId')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (Admin only)
exports.createTask = async (req, res) => {
  const { title, description, assignedTo, category, dueDate } = req.body;

  try {
    // Find employee by username
    const employee = await Employee.findOne({ username: assignedTo });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const task = new Task({
      title,
      description,
      assignedTo: employee._id,
      assignedBy: req.user.id,
      category,
      dueDate
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private
exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // If user is employee, verify they are assigned to this task
    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ username: req.user.username });
      if (!employee || !task.assignedTo.equals(employee._id)) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    task.status = status;
    task.updatedAt = Date.now();
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
exports.getTaskStats = async (req, res) => {
  try {
    let match = {};
    
    // If user is employee, only count their tasks
    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ username: req.user.username });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      match.assignedTo = employee._id;
    }

    const stats = await Task.aggregate([
      { $match: match },
      { $group: { 
        _id: '$status', 
        count: { $sum: 1 }
      }}
    ]);

    // Format the response
    const result = {
      new: 0,
      active: 0,
      completed: 0,
      failed: 0
    };

    stats.forEach(stat => {
      result[stat._id] = stat.count;
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};