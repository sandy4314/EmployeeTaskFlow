const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
category: {
  type: String,
  required: true,
  enum: [
    // Design Domain
    'UI/UX Design',
    'Graphic Design',
    'Product Design',
    'Motion Graphics',
    
    // Development Domain
    'Frontend Development',
    'Backend Development',
    'Mobile Development',
    'DevOps',
    'Database Management',
    
    // Data Domain
    'Data Analysis',
    'Data Engineering',
    'Business Intelligence',
    'Machine Learning',
    
    // Marketing Domain
    'Digital Marketing',
    'Content Marketing',
    'SEO/SEM',
    'Social Media',
    
    // Quality Assurance
    'Manual Testing',
    'Automated Testing',
    'QA Engineering',
    
    // Support Domain
    'Technical Support',
    'Customer Success',
    'IT Helpdesk',
    
    // Project Management
    'Agile Coordination',
    'Scrum Master',
    'Product Management',
    
    // Infrastructure (replacing your original categories)
    'Electrical Systems',
    'Water Supply Systems',
    'Sanitation Maintenance',
    'Road Repair Works',
    
    // General Categories
    'Documentation',
    'Training',
    'Research',
    'Meeting'
  ],
  default: 'Documentation' // Optional: set a default category
},
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'active', 'completed', 'failed'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', taskSchema);