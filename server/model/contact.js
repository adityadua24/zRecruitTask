import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number! Must be at least 10 digits.`,
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add index on userId for better query performance
contactSchema.index({ userId: 1 });

const Contact = mongoose.model("contact", contactSchema);

export default Contact;
