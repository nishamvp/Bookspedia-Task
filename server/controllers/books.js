import prisma from "../db/prisma.js";

export const createFavBooks = async (req, res) => {
  const { title, author } = req.body;
  const userId = req.user.id;

  try {
    // Validate inputs
    if (!title || !author) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide title and author",
      });
    }

    // Create a new favorite book for the user
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        userId,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Favorite book added successfully",
      data: newBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while adding the book",
    });
  }
};
