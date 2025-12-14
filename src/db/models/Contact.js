import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  phoneNumber: { 
    type: String, 
    required: [true, 'Phone number is required'] 
  },
  email: { 
    type: String,
    lowercase: true,
    trim: true
  },
  isFavourite: { 
    type: Boolean, 
    default: false 
  },
  contactType: { 
    type: String, 
    enum: ['work', 'home', 'personal'],
    required: [true, 'Contact type is required'] 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    index: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Contact', contactSchema);