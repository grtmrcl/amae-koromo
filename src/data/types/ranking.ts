import { PlayerMetadata } from "./metadata";

export enum RankingTimeSpan {
  OneDay = "1d",
  ThreeDays = "3d",
  OneWeek = "1w",
  FourWeeks = "4w",
}
export type DeltaRankingItem = {
  id: number;
  nickname: string;
  delta: number;
};
export type DeltaRankingResponse = {
  [modeId: string]: {
    top: DeltaRankingItem[];
    bottom: DeltaRankingItem[];
    num_games: DeltaRankingItem[];
  };
};
export interface CareerRankingItem extends PlayerMetadata {
  rank_key: number;
  count: number;
}
export enum CareerRankingType {
  Rank1 = "rank1",
  Rank12 = "rank12",
  Rank123 = "rank123",
  Rank3 = "rank3",
  Rank4 = "rank4",
  AvgRank = "avg_rank",
  MaxLevelGlobal = "max_level_global",
  NumGames = "num_games",
  StableLevel = "stable_level",
  PointEfficiency = "point_efficiency",
  Win = "win",
  Lose = "lose",
  WinLoseDiff = "win_lose_diff",
  WinRev = "win_rev",
  LoseRev = "lose_rev",
  ExpectedGamePoint0 = "expected_game_point_0",
  ExpectedGamePoint1 = "expected_game_point_1",
  ExpectedGamePoint2 = "expected_game_point_2",
  ExpectedGamePoint3 = "expected_game_point_3",
  UraRate = "ura_rate",
  BombedRate = "bombed_rate",
  IppatsuRate = "ippatsu_rate",
  UraRateRev = "ura_rate_rev",
  BombedRateRev = "bombed_rate_rev",
  IppatsuRateRev = "ippatsu_rate_rev",
  AvgWinPoint = "avg_win_point",
  AvgDealInPoint = "avg_deal_in_point",
  WinPointEfficiency = "win_point_efficiency",
  NetPointEfficiency = "net_point_efficiency",
  DealInPointLoss = "deal_in_point_loss",
  GameScoreBalance = "game_score_balance",
}
