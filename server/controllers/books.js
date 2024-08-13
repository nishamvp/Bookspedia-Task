import prisma from "../db/prisma.js";

export const createFavBooks = async (req, res) => {
  const { title, author } = req.body.data;
  const userId = req.user?.id;

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
    return res.status(500).json({
      status: "error",
      message: "An error occurred while adding the book",
    });
  }
};

export const getFavBooks = async (req, res) => {
  // Ensure userId is obtained from the authenticated user's data
  const userId = req.user?.id;

  try {
    // Check if userId is available
    if (!userId) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized: No user ID ",
      });
    }

    // Retrieve favorite books for the user from the database
    const books = await prisma.book.findMany({
      where: {
        userId,
      },
    });

    // Respond with the list of books
    return res.status(200).json({ status: "success", data: books });
  } catch (error) {
    // Handle and log any errors that occur
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while retrieving books",
    });
  }
};

export const editFavBooks = async (req, res) => {
  const userId = req.user?.id;
  const bookId = Number(req.params?.id);
  const { title, author } = req.body;

  try {
    // Check if userId is available
    if (!userId) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized: No user ID",
      });
    }

    // Validate bookId
    if (isNaN(bookId) || bookId <= 0) {
      return res.status(400).json({
        status: "failed",
        message: "Bad request: Invalid book ID",
      });
    }

    // Ensure the book belongs to the user
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({
        status: "failed",
        message: "Book not found",
      });
    }

    if (book.userId !== userId) {
      return res.status(403).json({
        status: "failed",
        message: "Forbidden: You do not have permission to edit this book",
      });
    }

    // Validate content
    if (!title || !author) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide title and author",
      });
    }

    // Update the book
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: { title, author },
    });

    return res.status(200).json({ status: "success", data: updatedBook });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while updating the book",
    });
  }
};

export const deleteFavBooks = async (req, res) => {
  const userId = req.user?.id;
  const bookId = Number(req.params?.id);

  try {
    // Check if userId is available
    if (!userId) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized: No user ID provided",
      });
    }

    // Validate bookId
    if (isNaN(bookId) || bookId <= 0) {
      return res.status(400).json({
        status: "failed",
        message: "Bad request: Invalid book ID",
      });
    }

    // Ensure the book exists and belongs to the user
    const book = await prisma.book.findUnique({ where: { id: bookId } });

    if (!book) {
      return res.status(404).json({
        status: "failed",
        message: "Book not found",
      });
    }

    if (book.userId !== userId) {
      return res.status(403).json({
        status: "failed",
        message: "Forbidden: You do not have permission to delete this book",
      });
    }

    // Deleting the book
    await prisma.book.delete({
      where: { id: bookId },
    });

    return res.status(200).json({
      status: "success",
      message: "Book deleted successfully",
    });
  } catch (error) {
    // Log and handle errors
    console.error("Error deleting book:", error);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while deleting the book",
    });
  }
};
