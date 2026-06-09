export type TimelineSubEvent = {
  text: string;
  date?: string | null;
};

export type TimelineStage = {
  key: string;
  label: string;
  state: 'completed' | 'current' | 'pending' | 'cancelled';
  events: TimelineSubEvent[];
};

export type OrderTimelineData = {
  stages: TimelineStage[];
  progressStages: { label: string; state: 'completed' | 'current' | 'pending' }[];
  isTerminal: boolean;
};

const STATUS_RANK: Record<string, number> = {
  pending: 0,
  group_pending: 0,
  unshipped: 1,
  waiting_for_pickup: 2,
  picked_up: 3,
  sent: 4,
  delivered: 5,
};

const PROGRESS_LABELS = [
  'Placed',
  'Confirmed',
  'Picked',
  'In Transit',
  'Delivered',
];

function getEffectiveRank(
  status: string,
  order: Record<string, unknown>
): number {
  if (status in STATUS_RANK) {
    return STATUS_RANK[status];
  }

  if (order.delivered_date) return 4;
  if (order.sent_date || order.dispatched_date) return 3;
  if (order.pickup_date) return 2;
  if (order.packing_slip_id) return 1;
  return 0;
}

function getStageState(
  stageIndex: number,
  rank: number
): TimelineStage['state'] {
  switch (stageIndex) {
    case 0:
      return rank >= 0 ? 'completed' : 'pending';
    case 1:
      if (rank >= 2) return 'completed';
      if (rank === 1) return 'current';
      return 'pending';
    case 2:
      if (rank >= 4) return 'completed';
      if (rank >= 2 && rank < 4) return 'current';
      return 'pending';
    case 3:
      if (rank >= 5) return 'completed';
      if (rank === 4) return 'current';
      return 'pending';
    case 4:
      if (rank >= 5) return 'completed';
      if (rank === 4) return 'current';
      return 'pending';
    default:
      return 'pending';
  }
}

function getProgressStageState(
  index: number,
  rank: number
): 'completed' | 'current' | 'pending' {
  const starts = [0, 1, 2, 4, 5];
  const start = starts[index];
  const nextStart = starts[index + 1] ?? 6;

  if (rank >= nextStart) return 'completed';
  if (rank >= start) return 'current';
  return 'pending';
}

export function buildOrderTimeline(order: Record<string, unknown>): OrderTimelineData {
  const status = String(order.order_status || 'pending');
  const isTerminal = status === 'cancelled' || status === 'failed';
  const rank = isTerminal
    ? getEffectiveRank(status, order)
    : (STATUS_RANK[status] ?? 0);

  const stages: TimelineStage[] = [
    {
      key: 'placed',
      label: 'Placed',
      state: getStageState(0, rank),
      events: [
        ...(order.order_date
          ? [{ text: 'Order placed.', date: String(order.order_date) }]
          : []),
        ...(order.payment_date
          ? [{ text: 'Payment received.', date: String(order.payment_date) }]
          : []),
      ],
    },
    {
      key: 'confirmed',
      label: 'Confirmed',
      state: getStageState(1, rank),
      events: [
        ...(rank >= 1
          ? [
              {
                text: order.packing_slip_id
                  ? `Order confirmed. Packing slip ${order.packing_slip_id} generated.`
                  : 'Order confirmed.',
                date: null,
              },
            ]
          : []),
        ...(order.group_id
          ? [{ text: `Group order — ID ${order.group_id}.`, date: null }]
          : []),
      ],
    },
    {
      key: 'pickup',
      label: 'Picked',
      state: getStageState(2, rank),
      events: [
        ...(status === 'waiting_for_pickup'
          ? [{ text: 'Waiting for pickup from seller.', date: null }]
          : []),
        ...(order.pickup_date
          ? [{ text: 'Order picked up.', date: String(order.pickup_date) }]
          : []),
      ],
    },
    {
      key: 'transit',
      label: 'In Transit',
      state: getStageState(3, rank),
      events: [
        ...(order.sent_date
          ? [{ text: 'Order marked as sent.', date: String(order.sent_date) }]
          : []),
        ...(order.dispatched_date
          ? [
              {
                text: order.carrier
                  ? `Dispatched via ${order.carrier}.`
                  : 'Order dispatched.',
                date: String(order.dispatched_date),
              },
            ]
          : []),
        ...(order.tracking_no
          ? [{ text: `Tracking no. ${order.tracking_no}.`, date: null }]
          : []),
      ],
    },
    {
      key: 'delivered',
      label: 'Delivered',
      state: getStageState(4, rank),
      events: [
        ...(order.delivered_date
          ? [{ text: 'Order delivered to buyer.', date: String(order.delivered_date) }]
          : []),
      ],
    },
  ];

  if (status === 'cancelled') {
    stages.push({
      key: 'cancelled',
      label: 'Cancelled',
      state: 'cancelled',
      events: [
        {
          text: order.cancel_reason
            ? `Cancelled by ${order.cancelled_by || 'seller'}: ${order.cancel_reason}`
            : `Cancelled by ${order.cancelled_by || 'seller'}.`,
          date: order.cancelled_date ? String(order.cancelled_date) : null,
        },
      ],
    });
  }

  if (status === 'failed') {
    stages.push({
      key: 'failed',
      label: 'Failed',
      state: 'cancelled',
      events: [
        {
          text: order.fail_reason
            ? `Delivery failed: ${order.fail_reason}`
            : 'Delivery failed.',
          date: order.failed_date ? String(order.failed_date) : null,
        },
      ],
    });
  }

  const progressStages = PROGRESS_LABELS.map((label, index) => ({
    label,
    state: getProgressStageState(index, rank),
  }));

  return {
    stages,
    progressStages,
    isTerminal,
  };
}
