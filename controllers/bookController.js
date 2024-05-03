import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// afficher book
const afficherBooks = async (req, res, next) => {
  try {
    const books = await prisma.book.findMany();

    if (!books) {
      return res
        .status(404)
        .json({ Erreur: "Books not found ! add some books .." });
    }

    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// ajouter book
const ajouterBook = async (req, res, next) => {
  try {
    const { name, author, datedesortie } = req.body;
    const book = await prisma.book.create({
      data: {
        name,
        author,
        datedesortie: new Date(datedesortie),
      },
    });
    return res.status(201).json({ sucess: "Book added successfully", book });
  } catch (error) {
    next(error);
  }
};

//modifier book
const modifierBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, author, datedesortie } = req.body;

    const existBook = await prisma.book.findUnique({
      where: {
        idbook: parseInt(id),
      },
    });

    if (!existBook) {
      return res.status(404).json({ Erreur: "Book to update not found !" });
    }

    const book = await prisma.book.update({
      where: {
        idbook: parseInt(id),
      },
      data: {
        name,
        author,
        datedesortie: new Date(datedesortie),
      },
    });
    return res.status(200).json({ sucess: "Book updated successfully", book });
  } catch (error) {
    next(error);
  }
};

// supprimer book
const supprimerBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existBook = await prisma.book.findUnique({
      where: {
        idbook: parseInt(id),
      },
    });

    if (!existBook) {
      return res.status(404).json({ Erreur: "Book to delete not found !" });
    }

    const book = await prisma.book.delete({
      where: {
        idbook: parseInt(id),
      },
    });
    return res.status(200).json({ sucess: "Book deleted successfully", book });
  } catch (error) {
    next(error);
  }
};

export { afficherBooks, ajouterBook, modifierBook, supprimerBook };
