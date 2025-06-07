// hashPasswords.js (CommonJS)
const fs = require("fs/promises");
const bcrypt = require("bcrypt");

const inputFile = "Data\\new_users_data.json";
const outputFile = "Data\\new_users_hashed.json";

async function hashPasswordsInFile() {
  try {
    const data = await fs.readFile(inputFile, "utf-8");
    const users = JSON.parse(data);

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      })
    );

    await fs.writeFile(outputFile, JSON.stringify(hashedUsers, null, 2));
    console.log("✅ Passwords hashed and saved to", outputFile);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

hashPasswordsInFile();
