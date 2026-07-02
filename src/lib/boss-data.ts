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
  { name: "Chambers of Xeric", slug: "chambers_of_xeric", category: "raids", image: "chambers_of_xeric.png" },
  { name: "Chambers of Xeric (CM)", slug: "chambers_of_xeric_challenge_mode", category: "raids", image: "chambers_of_xeric.png" },
  { name: "Theatre of Blood", slug: "theatre_of_blood", category: "raids", image: "theatre_of_blood.png" },
  { name: "Theatre of Blood (HM)", slug: "theatre_of_blood_hard_mode", category: "raids", image: "theatre_of_blood.png" },
  { name: "Tombs of Amascut", slug: "tombs_of_amascut", category: "raids", image: "tombs_of_amascut.png" },
  { name: "Tombs of Amascut (Expert)", slug: "tombs_of_amascut_expert", category: "raids", image: "tombs_of_amascut.png" },

  // Boss KC — GWD
  { name: "Commander Zilyana", slug: "commander_zilyana", category: "boss", image: "commander_zilyana.png" },
  { name: "General Graardor", slug: "general_graardor", category: "boss", image: "general_graardor.png" },
  { name: "Kree'Arra", slug: "kreearra", category: "boss", image: "kreearra.png" },
  { name: "K'ril Tsutsaroth", slug: "kril_tsutsaroth", category: "boss", image: "kril_tsutsaroth.png" },
  { name: "Nex", slug: "nex", category: "boss", image: "nex.png" },

  // Boss KC — DT2
  { name: "Duke Sucellus", slug: "duke_sucellus", category: "boss", image: "duke_sucellus.png" },
  { name: "The Leviathan", slug: "the_leviathan", category: "boss", image: "the_leviathan.png" },
  { name: "The Whisperer", slug: "the_whisperer", category: "boss", image: "the_whisperer.png" },
  { name: "Vardorvis", slug: "vardorvis", category: "boss", image: "vardorvis.png" },

  // Boss KC — General
  { name: "Amoxliatl", slug: "amoxliatl", category: "boss", image: "amoxliatl.png" },
  { name: "Barrows Chests", slug: "barrows_chests", category: "boss", image: "barrows_chests.png" },
  { name: "Brutus", slug: "brutus", category: "boss", image: "brutus.png" },
  { name: "Bryophyta", slug: "bryophyta", category: "boss", image: "bryophyta.png" },
  { name: "Corporeal Beast", slug: "corporeal_beast", category: "boss", image: "corporeal_beast.png" },
  { name: "Dagannoth Prime", slug: "dagannoth_prime", category: "boss", image: "dagannoth_prime.png" },
  { name: "Dagannoth Rex", slug: "dagannoth_rex", category: "boss", image: "dagannoth_rex.png" },
  { name: "Dagannoth Supreme", slug: "dagannoth_supreme", category: "boss", image: "dagannoth_supreme.png" },
  { name: "Deranged Archaeologist", slug: "deranged_archaeologist", category: "boss", image: "deranged_archaeologist.png" },
  { name: "Doom of Mokhaiotl", slug: "doom_of_mokhaiotl", category: "boss", image: "doom_of_mokhaiotl.png" },
  { name: "Giant Mole", slug: "giant_mole", category: "boss", image: "giant_mole.png" },
  { name: "Kalphite Queen", slug: "kalphite_queen", category: "boss", image: "kalphite_queen.png" },
  { name: "Maggot King", slug: "maggot_king", category: "boss", image: "maggot_king.png" },
  { name: "Nightmare", slug: "nightmare", category: "boss", image: "nightmare.png" },
  { name: "Phosani's Nightmare", slug: "phosanis_nightmare", category: "boss", image: "nightmare.png" },
  { name: "Obor", slug: "obor", category: "boss", image: "obor.png" },
  { name: "Phantom Muspah", slug: "phantom_muspah", category: "boss", image: "phantom_muspah.png" },
  { name: "Sarachnis", slug: "sarachnis", category: "boss", image: "sarachnis.png" },
  { name: "Scurrius", slug: "scurrius", category: "boss", image: "scurrius.png" },
  { name: "Skotizo", slug: "skotizo", category: "boss", image: "skotizo.png" },
  { name: "Sol Heredit", slug: "sol_heredit", category: "boss", image: "sol_heredit.png" },
  { name: "The Gauntlet", slug: "the_gauntlet", category: "boss", image: "the_gauntlet.png" },
  { name: "The Corrupted Gauntlet", slug: "the_corrupted_gauntlet", category: "boss", image: "the_gauntlet.png" },
  { name: "The Hueycoatl", slug: "the_hueycoatl", category: "boss", image: "the_hueycoatl.png" },
  { name: "The Royal Titans", slug: "the_royal_titans", category: "boss", image: "the_royal_titans.png" },
  { name: "TzKal-Zuk", slug: "tzkal_zuk", category: "boss", image: "tzkal_zuk.png" },
  { name: "TzTok-Jad", slug: "tztok_jad", category: "boss", image: "tztok_jad.png" },
  { name: "Vorkath", slug: "vorkath", category: "boss", image: "vorkath.png" },
  { name: "Yama", slug: "yama", category: "boss", image: "yama.png" },
  { name: "Lunar Chests", slug: "lunar_chests", category: "boss", image: "lunar_chests.png" },
  { name: "Zulrah", slug: "zulrah", category: "boss", image: "zulrah.png" },

  // Slayer
  { name: "Abyssal Sire", slug: "abyssal_sire", category: "slayer", image: "abyssal_sire.png" },
  { name: "Alchemical Hydra", slug: "alchemical_hydra", category: "slayer", image: "alchemical_hydra.png" },
  { name: "Araxxor", slug: "araxxor", category: "slayer", image: "araxxor.png" },
  { name: "Cerberus", slug: "cerberus", category: "slayer", image: "cerberus.png" },
  { name: "Grotesque Guardians", slug: "grotesque_guardians", category: "slayer", image: "grotesque_guardians.png" },
  { name: "Kraken", slug: "kraken", category: "slayer", image: "kraken.png" },
  { name: "Shellbane Gryphon", slug: "shellbane_gryphon", category: "slayer", image: "shellbane_gryphon.png" },
  { name: "Thermonuclear Smoke Devil", slug: "thermonuclear_smoke_devil", category: "slayer", image: "thermonuclear_smoke_devil.png" },

  // Wilderness
  { name: "Artio", slug: "artio", category: "wilderness", image: "artio.png" },
  { name: "Callisto", slug: "callisto", category: "wilderness", image: "callisto.png" },
  { name: "Calvar'ion", slug: "calvarion", category: "wilderness", image: "calvarion.png" },
  { name: "Chaos Elemental", slug: "chaos_elemental", category: "wilderness", image: "chaos_elemental.png" },
  { name: "Chaos Fanatic", slug: "chaos_fanatic", category: "wilderness", image: "chaos_fanatic.png" },
  { name: "Crazy Archaeologist", slug: "crazy_archaeologist", category: "wilderness", image: "crazy_archaeologist.png" },
  { name: "King Black Dragon", slug: "king_black_dragon", category: "wilderness", image: "king_black_dragon.png" },
  { name: "Scorpia", slug: "scorpia", category: "wilderness", image: "scorpia.png" },
  { name: "Spindel", slug: "spindel", category: "wilderness", image: "spindel.png" },
  { name: "Venenatis", slug: "venenatis", category: "wilderness", image: "venenatis.png" },
  { name: "Vet'ion", slug: "vetion", category: "wilderness", image: "vetion.png" },

  // Minigame
  { name: "Hespori", slug: "hespori", category: "minigame", image: "hespori.png" },
  { name: "Mimic", slug: "mimic", category: "minigame", image: "mimic.png" },
  { name: "Tempoross", slug: "tempoross", category: "minigame", image: "tempoross.png" },
  { name: "Wintertodt", slug: "wintertodt", category: "minigame", image: "wintertodt.png" },
  { name: "Zalcano", slug: "zalcano", category: "minigame", image: "zalcano.png" },
];

export function getBossesByCategory(category: BossCategory): BossMeta[] {
  return BOSSES.filter((b) => b.category === category);
}
