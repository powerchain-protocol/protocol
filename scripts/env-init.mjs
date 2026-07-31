import { copyFile, access } from "node:fs/promises";
import { constants } from "node:fs";
try { await access(".env", constants.F_OK); console.log(".env already exists"); } catch { await copyFile(".env.example", ".env"); console.log("Created .env from .env.example"); }
