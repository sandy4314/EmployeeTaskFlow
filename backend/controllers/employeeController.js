const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private (Admin only)
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// @desc    Create new employee
// @route   POST /api/employees
// @access  Private (Admin only)

exports.createEmployee = async (req, res) => {
  const { fullName, username, domain, salary, position, employeeId,password } = req.body;

  try {
    // Check for existing employee (improved error handling)
    const existingEmployee = await Employee.findOne({ 
      $or: [{ employeeId }, { username }] 
    });

    if (existingEmployee) {
      return res.status(400).json({ 
        success: false,
        message: existingEmployee.employeeId === employeeId 
          ? 'Employee ID already in use' 
          : 'Username already taken'
      });
    }

    // Create and save employee
    const employee = new Employee({
      fullName,
      username,
      domain,
      salary,
      position,
      employeeId,
      password
    });

    await employee.save();
    
    res.status(201).json({
      success: true,
      data: employee
    });

  } catch (err) {
    console.error('Error creating employee:', err); // Log full error
    res.status(500).json({ 
      success: false,
      message: err.message || 'Server error' // Send actual error
    });
  }
};

exports.updateEmployee = async (req, res) => {
  const { fullName, domain, salary, position } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { fullName, domain, salary, position },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private (Admin only)
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};