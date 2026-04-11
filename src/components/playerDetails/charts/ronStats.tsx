import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getRonStats, RonStatsCategory, RonStatsState } from "../../../data/source/misc";
import { useModel } from "../../gameRecords/model";
import { useAsync } from "../../../utils/async";
import Loading from "../../misc/loading";
import { SimpleRoutedSubViews, ViewRoutes, RouteDef, NavButtons, ViewSwitch } from "../../routing";
import { PlayerMetadata } from "../../../data/types";
import { Box } from "@mui/material";
import { formatPercent } from "../../../utils";

const CATEGORIES: RonStatsCategory[] = ["honor", "terminals", "near-terminals", "middle", "inner", "five"];

const CATEGORY_LABELS: Record<RonStatsCategory, string> = {
  honor: "字牌",
  terminals: "19牌",
  "near-terminals": "28牌",
  middle: "37牌",
  inner: "46牌",
  five: "5牌",
};

const CATEGORY_COLORS: Record<RonStatsCategory, string> = {
  honor: "#8884d8",
  terminals: "#82ca9d",
  "near-terminals": "#ffc658",
  middle: "#ff7300",
  inner: "#00C49F",
  five: "#FF0000",
};

const STATE_LABELS: Record<RonStatsState, string> = {
  total: "合計",
  riichi: "立直",
  open: "副露",
  other: "門前",
};

const MAX_JUNME = 18;

const Y_AXIS_MAX: Record<RonStatsState, number> = {
  total: 4,
  riichi: 10,
  open: 6,
  other: 4,
};

type ChartRow = { junme: number } & { [cat: string]: number };

function buildChartData(
  ronStats: { [state in RonStatsState]: { [cat in RonStatsCategory]: { [junme: string]: number } } },
  state: RonStatsState
): ChartRow[] {
  const rows: ChartRow[] = [];
  for (let j = 1; j <= MAX_JUNME; j++) {
    const row: ChartRow = { junme: j };
    let hasAny = false;
    for (const cat of CATEGORIES) {
      const rate = ronStats[state]?.[cat]?.[String(j)];
      if (rate !== undefined) {
        row[cat] = rate * 100;
        hasAny = true;
      } else {
        row[cat] = NaN;
      }
    }
    if (hasAny) {
      rows.push(row);
    } else if (j <= 12) {
      rows.push(row);
    }
  }
  // 末尾の全NaN行を削除
  let lastValid = rows.length - 1;
  while (lastValid >= 0 && CATEGORIES.every((c) => isNaN(rows[lastValid][c]))) {
    lastValid--;
  }
  return rows.slice(0, lastValid + 1);
}

function RonStatsChart({ playerId, state }: { playerId: number; state: RonStatsState }) {
  const [model] = useModel();
  const startDate = model.type === "player" ? model.startDate : null;
  const endDate = model.type === "player" ? model.endDate : null;
  const modeStr = model.type === "player" ? model.selectedModes.join(".") : "";

  const promise = useMemo(
    () => getRonStats(playerId, startDate ?? undefined, endDate ?? undefined, modeStr),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playerId, String(startDate), String(endDate), modeStr]
  );
  const ronStats = useAsync(promise);

  const chartData = useMemo(() => {
    if (!ronStats) {
      return [];
    }
    return buildChartData(ronStats as Parameters<typeof buildChartData>[0], state);
  }, [ronStats, state]);

  if (!ronStats) {
    return <Loading />;
  }

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="junme"
          label={{ value: "巡目", position: "insideBottomRight", offset: -5 }}
          type="number"
          domain={[1, "dataMax"]}
          allowDecimals={false}
        />
        <YAxis
          tickFormatter={(v: number) => `${v.toFixed(1)}%`}
          label={{ value: "和了率(%)", angle: -90, position: "insideLeft", offset: 10 }}
          domain={[0, Y_AXIS_MAX[state]]}
        />
        <Tooltip
          formatter={(value: number) => (isNaN(value) ? "データなし" : formatPercent(value / 100))}
          labelFormatter={(label: number) => `${label}巡目`}
        />
        <Legend formatter={(value: string) => CATEGORY_LABELS[value as RonStatsCategory] ?? value} />
        {CATEGORIES.map((cat) => (
          <Line
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={CATEGORY_COLORS[cat]}
            dot={false}
            connectNulls={false}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function RonStatsView({ metadata }: { metadata: PlayerMetadata }) {
  return (
    <Box>
      <SimpleRoutedSubViews>
        <ViewRoutes>
          <RouteDef path="total" title={STATE_LABELS.total}>
            <RonStatsChart playerId={metadata.id} state="total" />
          </RouteDef>
          <RouteDef path="riichi" title={STATE_LABELS.riichi}>
            <RonStatsChart playerId={metadata.id} state="riichi" />
          </RouteDef>
          <RouteDef path="open" title={STATE_LABELS.open}>
            <RonStatsChart playerId={metadata.id} state="open" />
          </RouteDef>
          <RouteDef path="other" title={STATE_LABELS.other}>
            <RonStatsChart playerId={metadata.id} state="other" />
          </RouteDef>
        </ViewRoutes>
        <NavButtons sx={{ mt: 1 }} />
        <ViewSwitch mutateTitle={false} />
      </SimpleRoutedSubViews>
    </Box>
  );
}
