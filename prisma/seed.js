import { PrismaClient } from "./generated/prisma/client.js";
const client = new PrismaClient();

async function main() {
  const user = await client.user.create({
    data: {
      username: "admin",
      name: "Gustavo Alfredo Marín Sáez",
      password:
        "1b6ce880ac388eb7fcb6bcaf95e20083:341dfbbe86013c940c8e898b437aa82fe575876f2946a2ad744a0c51501c7dfe6d7e5a31c58d2adc7a7dc4b87927594275ca235276accc9f628697a4c00b4e01",
      token: "",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
