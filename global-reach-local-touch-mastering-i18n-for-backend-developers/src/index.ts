import express from "express";
import cors from "cors";
import { i18next, i18nextMiddleware, t } from "@/i18n";

const app = express();

app.use(i18nextMiddleware.handle(i18next));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const welcome = t("welcome", req);
  return res.send(welcome);
});

app.get("/blog", (req, res) => {
  const lang = req.language;
  const blog = {
    title: t("blog.title", { lang }),
    description: t("blog.description", { lang }),
  };
  res.json(blog);
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT} 🚀`);
});
