const { getRonStats } = require("../../../data/source/misc");

jest.mock("../../../data/source/api", () => ({
  apiGet: jest.fn(),
}));

const { apiGet } = require("../../../data/source/api");

describe("牌危険度統計の取得期間", () => {
  beforeEach(() => {
    apiGet.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    {
      name: "期間未指定の場合、URLに日付パスを含めない（全期間）",
      // Given
      input: { playerId: 12345, startDate: undefined, endDate: undefined, mode: "" },
      // Then
      expectedUrlPattern: /^ron_stats\/12345\?mode=$/,
    },
    {
      name: "開始日のみ指定した場合、開始日のみURLに含める",
      // Given
      input: { playerId: 12345, startDate: new Date("2024-01-01"), endDate: undefined, mode: "" },
      // Then
      expectedUrlPattern: /^ron_stats\/12345\/\d+\?mode=$/,
    },
    {
      name: "開始日と終了日を指定した場合、両方をURLに含める",
      // Given
      input: { playerId: 12345, startDate: new Date("2024-01-01"), endDate: new Date("2024-12-31"), mode: "" },
      // Then
      expectedUrlPattern: /^ron_stats\/12345\/\d+\/\d+\?mode=$/,
    },
    {
      name: "モードを指定した場合、URLのモードパラメータに反映される",
      // Given
      input: { playerId: 12345, startDate: undefined, endDate: undefined, mode: "16" },
      // Then
      expectedUrlPattern: /^ron_stats\/12345\?mode=16$/,
    },
  ])("$name", async ({ input, expectedUrlPattern }) => {
    // When
    await getRonStats(input.playerId, input.startDate, input.endDate, input.mode);

    // Then
    expect(apiGet).toHaveBeenCalledTimes(1);
    const calledUrl = apiGet.mock.calls[0][0];
    expect(calledUrl).toMatch(expectedUrlPattern);
  });
});
