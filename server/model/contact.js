import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  number: {
    type: Number,
    minlength: 10,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
})

const Contact = mongoose.model("contact", contactSchema);

export default Contact;
