import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express, { json } from "express";
import { afficherBooks, ajouterBook } from "./controllers/bookController.js";

const app = express();

app.use(express.json());

app.route("/books").get(afficherBooks).post(ajouterBook);

// middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({
    erreur: "Un erreur serveur , contactez votre Admin",
  });
});

app.listen(5000, () => {
  console.log("Server is running on 5000...");
});
