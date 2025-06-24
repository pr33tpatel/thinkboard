import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //sort and show most recently created note first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Error 404: Note not found" });
    }
    res.status(200).json({ message: `Found Note: ${note.title}!`, note: note });
  } catch (error) {
    console.error("Error in getAllNotes controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title: title, content: content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
    console.log(`New Note Created!\nTitle: "${title}"\nContent: "${content}"`);
  } catch (error) {
    console.error("Error in createNote controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    // prettier-ignore
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, // update by getting the :id from the url
      {title,content}, // what to update
      {new: true} ); //new: true returns the updated note, not the pre-updated note

    if (!updatedNote) {
      return res.status(404).json({ message: "Error 404: Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    console.log(`Note Updated!\nTitle: "${title}"\nContent: "${content}"`);
  } catch (error) {
    console.error("Error in updateNote controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id); // delete the note based off :id from the url
    if (!deletedNote) {
      return res.status(404).json({ message: "Error 404: Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully", note: deletedNote });
    console.log(`\nNote Deleted!\nTitle: "${deletedNote.title}"\nContent: "${deletedNote.content}"`);
  } catch (error) {
    console.error("Error in deleteNote controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
