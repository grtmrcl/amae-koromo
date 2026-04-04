import i18n from "../../i18n";

const t = i18n.getFixedT(null, "gameModeShort");

export enum GameMode {
  友人 = 1,
  友人特殊 = 2,
}
export function modeLabelNonTranslated(mode: GameMode) {
  if (!mode) {
    return "全部";
  }
  if (mode === GameMode.友人特殊) {
    return "友人(特殊)";
  }
  return "友人";
}
export function modeLabel(mode: GameMode) {
  return t(modeLabelNonTranslated(mode));
}
export function parseCombinedMode(modeString?: string): GameMode[] {
  return (modeString || "")
    .split(".")
    .map((x) => parseInt(x.trim(), 10) as GameMode)
    .map((x) => (GameMode[x] ? x : (0 as GameMode)))
    .filter((x) => x);
}
