import { GameMode } from "../data/types";
import dayjs from "dayjs";

const domain =
  sessionStorage.getItem("overrideDomain") || localStorage.getItem("overrideDomain") || window.location.hostname;

export const CONFIGURATIONS = {
  DEFAULT: {
    apiSuffix: process.env.NODE_ENV === "development" ? "api-test/v2/pl_friend/" : "api/v2/pl_friend/",
    features: {
      ranking: false as const,
      statistics: true,
      estimatedStableLevel: false,
      contestTools: false,
      statisticsSubPages: {
        rankBySeat: true,
        dataByRank: false as const,
        fanStats: true,
        numPlayerStats: true,
      },
      aiReview: false,
    },
    table: {
      showGameMode: true,
    },
    availableModes: [GameMode.友人, GameMode.友人特殊],
    modePreference: [GameMode.友人, GameMode.友人特殊],
    dateMin: dayjs("2019-08-23", "YYYY-MM-DD"),
    siteTitle: "雀魂牌谱屋",
    canonicalDomain: "amae-koromo.sapk.ch",
    showTopNotice: true,
    rootClassName: "koromo",
    rankColors: ["#28a745", "#17a2b8", "#6c757d", "#dc3545"],
    maskedGameLink: true,
  },
  ikeda: {
    apiSuffix: process.env.NODE_ENV === "development" ? "api-test/v2/pl_friend3/" : "api/v2/pl_friend3/",
    features: {
      ranking: false as const,
      statistics: true,
      estimatedStableLevel: false,
      contestTools: false,
      statisticsSubPages: {
        rankBySeat: true,
        dataByRank: false as const,
        fanStats: true,
        numPlayerStats: true,
      },
      aiReview: false,
    },
    availableModes: [GameMode.友人],
    modePreference: [GameMode.友人],
    dateMin: dayjs("2019-11-29", "YYYY-MM-DD"),
    siteTitle: "雀魂牌谱屋·三麻",
    canonicalDomain: "ikeda.sapk.ch",
    rankColors: ["#28a745", "#6c757d", "#dc3545"],
    rootClassName: "yuuki",
  },
  contest: {
    apiSuffix: (s: string) => `api/contest/${s}/`,
    features: {
      ranking: false as const,
      rankingGroups: null,
      statistics: true,
      estimatedStableLevel: false,
      contestTools: true,
      statisticsSubPages: {
        rankBySeat: true,
        dataByRank: false as const,
        fanStats: true,
        numPlayerStats: false,
      },
      aiReview: false,
    },
    table: {
      showGameMode: true,
    },
    availableModes: [],
    canonicalDomain: domain,
    showTopNotice: false,
    maskedGameLink: false,
  },
};

type Configuration = typeof CONFIGURATIONS.DEFAULT;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeDeep<T extends { [key: string]: any }>(...objects: Partial<T>[]): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isObject = <T>(obj: T) => obj && typeof obj === "object" && (obj as any).constructor === Object;

  return objects.reduce((prev: T, obj: Partial<T>) => {
    Object.keys(obj).forEach((key: keyof T) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prev[key] = oVal as any;
      } else if (isObject(pVal) && isObject(oVal)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prev[key] = mergeDeep(pVal, oVal as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prev[key] = oVal as any;
      }
    });

    return prev;
  }, {} as T) as T;
}

const ConfBase: Partial<Configuration> = (() => {
  if (/^(ikeda|momoko)\./i.test(domain)) {
    return CONFIGURATIONS.ikeda;
  }
  const m = /^([^.]+)\.contest\./i.exec(domain);
  if (m) {
    return { ...CONFIGURATIONS.contest, apiSuffix: CONFIGURATIONS.contest.apiSuffix(m[1]) };
  }
  return CONFIGURATIONS.DEFAULT;
})();

const Conf = mergeDeep<Configuration>(CONFIGURATIONS.DEFAULT, ConfBase);

document.documentElement.className += " " + Conf.rootClassName;

export function canTrackUser() {
  return window.location.host === Conf.canonicalDomain;
}

export default Conf;
