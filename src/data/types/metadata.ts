import { GameMode } from "./gameMode";
import { FanStatEntry } from "./statistics";
import { sum } from "../../utils";
import i18n from "../../i18n";

const t = i18n.t.bind(i18n);

export type RankRates = [number, number, number, number] | [number, number, number];
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RankRates = Object.freeze({
  getAvg(rates: RankRates): number {
    return sum(rates.map((value, index) => value * (index + 1))) / sum(rates);
  },
  normalize(rates: RankRates): RankRates {
    const total = sum(rates);
    return rates.map((value) => value / total) as RankRates;
  },
});

export type FanStatEntry2 = FanStatEntry & {
  役満: number;
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FanStatEntry2 = Object.freeze({
  formatFan(entry: FanStatEntry2): string {
    if (entry.役満) {
      if (entry.役満 === 1) {
        return t("役満");
      }
      return `${entry.役満} ${t("倍役満")}`;
    }
    return `${entry.count} ${t("番")}`;
  },
});
export type FanStatEntryList = FanStatEntry2[];
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FanStatEntryList = Object.freeze({
  formatFanList(list: FanStatEntryList): string {
    return list.map((x) => `[${x.count}] ${t(x.label)}`).join("\n");
  },
  formatFanSummary(list: FanStatEntryList): string {
    const count = sum(list.map((x) => x.count));
    const 役満 = sum(list.map((x) => x.役満));
    if (役満) {
      if (役満 === 1) {
        return t("役満");
      }
      return `${役満} ${t("倍役満")}`;
    }
    let result = `${count} ${t("番")}`;
    if (count >= 13) {
      result += " - " + t("累计役满");
    } else if (count >= 11) {
      result += " - " + t("三倍满");
    } else if (count >= 8) {
      result += " - " + t("倍满");
    } else if (count >= 6) {
      result += " - " + t("跳满");
    } else if (count === 5) {
      result += " - " + t("满贯");
    }
    return result;
  },
});

export type PlayerExtendedStats = {
  count: number;
  和牌率: number;
  自摸率: number;
  默听率: number;
  放铳率: number;
  副露率: number;
  立直率: number;
  平均打点: number;
  最大连庄?: number;
  和了巡数: number;
  平均铳点: number;
  流局率: number;
  流听率: number;
  里宝率: number;
  一发率: number;
  被炸率: number;
  平均被炸点数: number;
  放铳时立直率: number;
  放铳时副露率: number;
  立直后放铳率: number;
  立直后非瞬间放铳率: number;
  副露后放铳率: number;
  立直后和牌率: number;
  副露后和牌率: number;
  立直后流局率: number;
  副露后流局率: number;
  役满?: number;
  累计役满?: number;
  最大累计番数?: number;
  W立直?: number;
  流满?: number;
  平均起手向听: number;
  平均起手向听亲?: number;
  平均起手向听子?: number;
  放铳至立直: number;
  放铳至副露: number;
  放铳至默听: number;
  立直和了: number;
  副露和了: number;
  默听和了: number;
  立直巡目: number;
  立直流局: number;
  立直收支: number;
  立直收入: number;
  立直支出: number;
  先制率: number;
  追立率: number;
  被追率: number;
  振听立直率: number;
  立直多面?: number;
  立直好型2?: number;
  打点效率: number;
  铳点损失: number;
  净打点效率: number;
  局收支?: number;
};
export interface Metadata {
  count: number;
}
export interface PlayerMetadataLite extends Metadata {
  id: number;
  nickname: string;
}
export interface PlayerMetadataLite2 extends Metadata {
  rank_rates: RankRates;
  avg_rank: number;
  negative_rate: number;
}
export interface PlayerMetadata extends PlayerMetadataLite, PlayerMetadataLite2 {
  rank_avg_score: RankRates;
  played_modes?: (string | GameMode)[];
  cross_stats?: PlayerMetadataLite & {
    played_modes: GameMode[];
  };
  extended_stats?: PlayerExtendedStats | Promise<PlayerExtendedStats>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PlayerMetadata = Object.freeze({
  dummy: null,
});
