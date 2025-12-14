import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
    userId: { 
    type: String,        // Basit String
    required: true,
    index: true       // ZORUNLU
  }
  },
     
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', contactSchema, 'contacts');
export default Contact;