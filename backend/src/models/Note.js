import mongoose from "mongoose";

// step 1: create a schema
// step 2: create a model based off schema

// STEP 1:
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
    },
  },

  { timestamps: true }
);

// STEP 2:
const Note = mongoose.model("Note", noteSchema);

export default Note;
