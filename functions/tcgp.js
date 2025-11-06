import TCGdex from "@tcgdex/sdk";
import boxen from "boxen";
import colors from "colors";
import { stackSave } from "../utils.js";

/**
 * @param {string} info 
 * @returns {string}
 */
const boxInfo = (info) => boxen(info, {
  title: "🎴 CARD INFORMATION", 
  titleAlignment: "center",
  padding: 1
});

/**
 * @async
 * @param {string} set
 * @param {number} id
 * @returns {Promise<void>}
 */
export default async function getTcgpCard(set, id) {
  const tcgdex = new TCGdex("en");

  try {
    const card = await tcgdex.fetchCard(id, set);

    const cardInfo = `
    Name: ${card.name}
    ID: ${card.id}
    Type: ${card.category}
    
    ${card.hp && `HP: ${card.hp}` || ""}
    ${card.types?.length && `Types: ${card.types.join(", ")}` || ""}
    Rarity: ${card.rarity}
    ${card.stage && `Stage: ${card.stage}` || ""}
    ${card.evolveFrom && `Evolves from: ${card.evolveFrom}\n` || ""}
    
    ${card.abilities?.length && `⚡ Abilities:
      ${card.abilities.map((ability, i) => `
        ${i + 1}. ${ability.name || "Unnamed Ability"}
        ${ability.effect && " Effect: "+ability.effect}
      `.trim()).join("")}
      \n`.trim()  
    || ""}
    
    ${card.attacks?.length && `⚔️  Moveset/Attacks:
      ${card.attacks.map((attack, i) => `
        ${i + 1}. ${attack.name}
          Energy Cost: ${attack.cost?.length ? attack.cost.join(", ") : "free" }
          Damage: ${attack.damage ? attack.damage : "special"}
          Effect: ${attack.effect ? attack.effect: "no effect"}
      \n`).join("")}
    ` || ""}
    
    ${card.effect && `✨ Card Effect: ${card.effect} ` || ""}
    
    ${card.weaknesses?.length && `🔻 Weaknesses:
      ${card.weaknesses.map(({type, value}) => `${type}: ${value}`).join("")}\n` || ""}
    
    ${card.retreat !== undefined && `🏃 Retreat Cost: ${card.retreat}\n` || ""} \n`
      .replace(/(^[ \t]*\n)/gm, "");

    console.info(boxInfo(cardInfo));
    stackSave(`${card.name}.txt`, cardInfo);
  } catch (err) {
    console.error(colors.red(err.message));
  }
}
