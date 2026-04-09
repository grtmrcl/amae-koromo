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
  win_rate: number;
  tsumo_rate: number;
  damaten_rate: number;
  deal_in_rate: number;
  call_rate: number;
  riichi_rate: number;
  avg_win_point: number;
  max_consecutive_dealer?: number;
  avg_win_turn: number;
  avg_deal_in_point: number;
  draw_rate: number;
  draw_tenpai_rate: number;
  ura_rate: number;
  ippatsu_rate: number;
  bombed_rate: number;
  avg_bombed_point: number;
  deal_in_riichi_rate: number;
  deal_in_call_rate: number;
  riichi_deal_in_rate: number;
  riichi_deal_in_non_instant_rate: number;
  call_deal_in_rate: number;
  riichi_win_rate: number;
  call_win_rate: number;
  riichi_draw_rate: number;
  call_draw_rate: number;
  yakuman?: number;
  accumulated_yakuman?: number;
  max_fan_count?: number;
  w_riichi?: number;
  ryuuman?: number;
  avg_start_shanten: number;
  avg_start_shanten_dealer?: number;
  avg_start_shanten_non_dealer?: number;
  deal_in_to_riichi: number;
  deal_in_to_call: number;
  deal_in_to_damaten: number;
  riichi_win_count: number;
  call_win_count: number;
  damaten_win_count: number;
  avg_riichi_turn: number;
  riichi_draw_count: number;
  riichi_point_balance: number;
  riichi_win_income: number;
  riichi_deal_in_cost: number;
  first_riichi_rate: number;
  chasing_riichi_rate: number;
  chased_riichi_rate: number;
  furiten_riichi_rate: number;
  riichi_multiway_rate?: number;
  riichi_good_shape_rate2?: number;
  win_point_efficiency: number;
  deal_in_point_loss: number;
  net_point_efficiency: number;
  game_score_balance?: number;
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
