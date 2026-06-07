export type StatusCountItem = {
  status: string;
  count: number | string;
};

export const normalizeStatusCounts = (
  payload?: StatusCountItem[] | null
): StatusCountItem[] => {
  if (!Array.isArray(payload)) return [];
  return payload.map((item) => ({
    status: item.status,
    count: Number(item.count ?? 0),
  }));
};

export const getTabBadgeCount = (
  statusArray: StatusCountItem[] | undefined,
  tabId: string
): number | undefined => {
  if (!Array.isArray(statusArray) || statusArray.length === 0) {
    return undefined;
  }

  const match = statusArray.find((item) => item.status === tabId);
  return Number(match?.count ?? 0);
};

export const formatBadgeCount = (count: number) => {
  if (count > 9999) return '9999+';
  if (count > 999) return `${Math.floor(count / 1000)}k+`;
  return String(count);
};
