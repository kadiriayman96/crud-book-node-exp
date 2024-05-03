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

export { afficherBooks, ajouterBook };
