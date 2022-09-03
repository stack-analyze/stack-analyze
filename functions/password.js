import colors from "colors";

/** 
 *
 * @description generate a new password
 * @returns { void }
*/
const genPassword = () => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // blank password var
  let password = "";

  // loop generate chars
  for(let i = 0; i < 12; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);

    password += chars.substring(randomNumber, randomNumber + 1);
  }

  // print new passwors
  console.info(colors.yellow("new password:"), password);
};

export default genPassword;
