import express from "express";
import router from "#routes/router.js";
const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(express.json());
app.use("/api", router);

const users = [
  {
    username: "admin",
    name: "Gustavo Alfredo Marín Sáez",
    password:
      "1b6ce880ac388eb7fcb6bcaf95e20083:341dfbbe86013c940c8e898b437aa82fe575876f2946a2ad744a0c51501c7dfe6d7e5a31c58d2adc7a7dc4b87927594275ca235276accc9f628697a4c00b4e01", // certamen123
    token: "",
  },
  {
    username: "geomante",
    name: "Gran Maestro de las Flores",
    password:
      "1b6ce880ac388eb7fcb6bcaf95e20083:341dfbbe86013c940c8e898b437aa82fe575876f2946a2ad744a0c51501c7dfe6d7e5a31c58d2adc7a7dc4b87927594275ca235276accc9f628697a4c00b4e01",
    token: "",
  },
];

const reminders = [];

app.use(express.static("public"));

// Escriba su código a partir de aquí
app.get("/", (req, res) => {
  res.send(init);
});
// Hasta aquí

app.listen(PORT, (error) => {
  if (error) {
    console.error(`No se puede ocupar el puerto ${PORT} :(`);
    return;
  }

  console.log(`Escuchando en el puerto ${PORT}`);
});

export { users, reminders, app };
