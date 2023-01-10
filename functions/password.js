// save password 
import { stackSave } from "../utils.js";

/**
 * It generates a random password
 * @returns {void}
 */
export default function genPassword() {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // blank password var
  let password = "";

  // loop generate chars
  for(let i = 0; i < 12; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);

    password += chars.substring(randomNumber, randomNumber + 1);
  }

  // print new passwors
  console.info("new password:", password);
  stackSave("password.txt", `new password: ${password}`)
}
