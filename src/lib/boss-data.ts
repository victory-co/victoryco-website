export type BossCategory =
  | "raids"
  | "boss"
  | "slayer"
  | "wilderness"
  | "minigame"
  | "collection_log"
  | "misc";

export interface BossMeta {
  name: string;
  slug: string;
  category: BossCategory;
  image: string;
}

export const BOSS_CATEGORIES: { key: BossCategory; label: string }[] = [
  { key: "raids", label: "Raids KC" },
  { key: "boss", label: "Boss KC" },
  { key: "slayer", label: "Slayer Boss KC" },
  { key: "wilderness", label: "Wilderness Boss KC" },
  { key: "minigame", label: "Minigame Boss KC" },
  { key: "collection_log", label: "Collection Log KC" },
  { key: "misc", label: "Misc Boss KC" },
];

export const BOSSES: BossMeta[] = [
  // Raids
  { name: "Chambers of Xeric", slug: "cox", category: "raids", image: "cox.png" },
  { name: "Theatre of Blood", slug: "tob", category: "raids", image: "tob.png" },
  { name: "Tombs of Amascut", slug: "toa", category: "raids", image: "toa.png" },

  // Boss KC
  { name: "Vorkath", slug: "vorkath", category: "boss", image: "vorkath.png" },
  { name: "Zulrah", slug: "zulrah", category: "boss", image: "zulrah.png" },
  { name: "Corporeal Beast", slug: "corp", category: "boss", image: "corp.png" },
  { name: "Commander Zilyana", slug: "zilyana", category: "boss", image: "zilyana.png" },
  { name: "General Graardor", slug: "graardor", category: "boss", image: "graardor.png" },

  // Slayer
  { name: "Alchemical Hydra", slug: "hydra", category: "slayer", image: "hydra.png" },
  { name: "Cerberus", slug: "cerberus", category: "slayer", image: "cerberus.png" },
  { name: "Kraken", slug: "kraken", category: "slayer", image: "kraken.png" },
  { name: "Grotesque Guardians", slug: "grotesque-guardians", category: "slayer", image: "grotesque-guardians.png" },

  // Wilderness
  { name: "Callisto", slug: "callisto", category: "wilderness", image: "callisto.png" },
  { name: "Venenatis", slug: "venenatis", category: "wilderness", image: "venenatis.png" },
  { name: "Vet'ion", slug: "vetion", category: "wilderness", image: "vetion.png" },

  // Minigame
  { name: "Tempoross", slug: "tempoross", category: "minigame", image: "tempoross.png" },
  { name: "Wintertodt", slug: "wintertodt", category: "minigame", image: "wintertodt.png" },
  { name: "Zalcano", slug: "zalcano", category: "minigame", image: "zalcano.png" },
];

export function getBossesByCategory(category: BossCategory): BossMeta[] {
  return BOSSES.filter((b) => b.category === category);
}
