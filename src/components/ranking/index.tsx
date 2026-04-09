import React from "react";

import { Alert } from "../misc/alert";
import DeltaRanking from "./deltaRanking";
import { CareerRanking, CareerRankingColumn, CareerRankingPlain } from "./careerRanking";
import { CareerRankingType } from "../../data/types";
import { formatFixed3, formatIdentity, formatPercent, formatRound } from "../../utils/index";
import { ViewRoutes, SimpleRoutedSubViews, NavButtons, RouteDef } from "../routing";
import { ViewSwitch } from "../routing/index";
import { useTranslation } from "react-i18next";
import Conf from "../../utils/conf";

const SANMA = Conf.rankColors.length === 3;

const ROUTES = (
  <ViewRoutes>
    <RouteDef path="delta" title="苦主及汪汪">
      <DeltaRanking />
    </RouteDef>
    <RouteDef path="career1" title="一位率/四位率" disabled={SANMA}>
      <CareerRanking>
        <CareerRankingColumn type={CareerRankingType.Rank1} title="一位率" />
        <CareerRankingColumn type={CareerRankingType.Rank4} title="四位率" />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="career1" title="一位率/三位率" disabled={!SANMA}>
      <CareerRanking>
        <CareerRankingColumn type={CareerRankingType.Rank1} title="一位率" />
        <CareerRankingColumn type={CareerRankingType.Rank3} title="三位率" />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="career2" title="连对率" disabled={SANMA}>
      <CareerRanking>
        <CareerRankingColumn type={CareerRankingType.Rank12} title="连对率" />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="career3" title="平均顺位/对局数">
      <CareerRanking>
        <CareerRankingColumn type={CareerRankingType.AvgRank} title="平均顺位" formatter={formatFixed3} />
        <CareerRankingColumn
          type={CareerRankingType.NumGames}
          title="对局数"
          formatter={formatIdentity}
          showNumGames={false}
        />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="career4" title={(t) => `${t("平均打点")}/${t("平均铳点")}`}>
      <CareerRanking>
        <CareerRankingColumn type={CareerRankingType.AvgWinPoint} title="平均打点" formatter={formatRound} />
        <CareerRankingColumn type={CareerRankingType.AvgDealInPoint} title="平均铳点" formatter={formatRound} />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="career5" title={(t) => `${t("打点效率")}/${t("铳点损失")}`}>
      <CareerRanking>
        <CareerRankingColumn type={CareerRankingType.WinPointEfficiency} title="打点效率" formatter={formatRound} />
        <CareerRankingColumn type={CareerRankingType.DealInPointLoss} title="铳点损失" formatter={formatRound} />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="netwinefficiency" title="净打点效率">
      <CareerRanking>
        <CareerRankingColumn
          type={CareerRankingType.NetPointEfficiency}
          title="净打点效率"
          formatter={formatRound}
          extraColumns={[
            {
              label: "打点效率",
              value: (x) =>
                x.extended_stats && "count" in x.extended_stats ? formatRound(x.extended_stats.win_point_efficiency) : "",
            },
            {
              label: "铳点损失",
              value: (x) =>
                x.extended_stats && "count" in x.extended_stats ? formatRound(x.extended_stats.deal_in_point_loss) : "",
            },
          ]}
        />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="winlose" title="和率/铳率">
      <CareerRanking>
        <CareerRankingColumn type={CareerRankingType.Win} title="和牌率" />
        <CareerRankingColumn type={CareerRankingType.Lose} title="放铳率" />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="winlosediff" title="和铳差">
      <CareerRanking>
        <CareerRankingColumn
          type={CareerRankingType.WinLoseDiff}
          title="和铳差"
          extraColumns={[
            {
              label: "和牌率",
              value: (x) =>
                x.extended_stats && "win_rate" in x.extended_stats ? formatPercent(x.extended_stats.win_rate) : "",
            },
            {
              label: "放铳率",
              value: (x) =>
                x.extended_stats && "deal_in_rate" in x.extended_stats ? formatPercent(x.extended_stats.deal_in_rate) : "",
            },
          ]}
        />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="ept12" title="一/二位平均 Pt" disabled={SANMA}>
      <CareerRanking>
        <CareerRankingColumn
          type={CareerRankingType.ExpectedGamePoint0}
          title="一位平均 Pt"
          formatter={formatFixed3}
          valueLabel="Pt"
          disableMixedMode
        />
        <CareerRankingColumn
          type={CareerRankingType.ExpectedGamePoint1}
          title="二位平均 Pt"
          formatter={formatFixed3}
          valueLabel="Pt"
          disableMixedMode
        />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="ept34" title="三位平均 Pt/四位平均得点 Pt" disabled={SANMA}>
      <CareerRanking>
        <CareerRankingColumn
          type={CareerRankingType.ExpectedGamePoint2}
          title="三位平均 Pt"
          formatter={formatFixed3}
          valueLabel="Pt"
          disableMixedMode
        />
        <CareerRankingColumn
          type={CareerRankingType.ExpectedGamePoint3}
          title="四位平均得点 Pt"
          formatter={formatFixed3}
          valueLabel="Pt"
          disableMixedMode
        />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="efficiency" title="得点效率" disabled={SANMA}>
      <CareerRanking>
        <CareerRankingColumn
          type={CareerRankingType.PointEfficiency}
          title="得点效率"
          formatter={formatFixed3}
          disableMixedMode
        />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="career6" title="局收支">
      <CareerRanking>
        <CareerRankingColumn type={CareerRankingType.GameScoreBalance} title="局收支" formatter={formatRound} disableMixedMode />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="lucky" title="欧洲人">
      <CareerRanking>
        <CareerRankingColumn showNumGames={false} type={CareerRankingType.BombedRate} title="被炸率" />
        <CareerRankingColumn showNumGames={false} type={CareerRankingType.UraRate} title="里宝率" />
        <CareerRankingColumn showNumGames={false} type={CareerRankingType.IppatsuRate} title="一发率" />
      </CareerRanking>
    </RouteDef>
    <RouteDef path="unlucky" title="非洲人">
      <CareerRanking>
        <CareerRankingColumn showNumGames={false} type={CareerRankingType.BombedRateRev} title="被炸率" />
        <CareerRankingColumn showNumGames={false} type={CareerRankingType.UraRateRev} title="里宝率" />
        <CareerRankingColumn showNumGames={false} type={CareerRankingType.IppatsuRateRev} title="一发率" />
      </CareerRanking>
    </RouteDef>
  </ViewRoutes>
);

export default function Routes() {
  const { t } = useTranslation();
  if (!Array.isArray(Conf.features.ranking)) {
    return <></>;
  }
  return (
    <SimpleRoutedSubViews>
      {ROUTES}
      <>
        <Alert stateName="rankingNotice20201229" title={t("提示")}>
          {t("排行榜非实时更新，可能会有数小时的延迟。")}
        </Alert>
        <NavButtons />
        <ViewSwitch />
      </>
    </SimpleRoutedSubViews>
  );
}
