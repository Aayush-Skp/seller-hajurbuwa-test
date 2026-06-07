import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { IoCarOutline } from 'react-icons/io5';
import { formatDate } from '../../utils/dateformat';
import { DetailCard } from './OrderDetailCard';
import { buildOrderTimeline } from './buildOrderTimeline';

const StageIndicator = ({
  state,
}: {
  state: 'completed' | 'current' | 'pending' | 'cancelled';
}) => {
  if (state === 'completed') {
    return (
      <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-primary">
        <BsCheck className="text-xs text-white" aria-hidden />
      </span>
    );
  }

  if (state === 'current') {
    return (
      <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-accent-primary bg-white">
        <span className="h-2 w-2 rounded-full bg-accent-primary" />
      </span>
    );
  }

  if (state === 'cancelled') {
    return (
      <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-error-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>
    );
  }

  return (
    <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-gray-400 bg-white" />
  );
};

const ProgressNode = ({
  state,
  isTerminal,
}: {
  state: 'completed' | 'current' | 'pending';
  isTerminal: boolean;
}) => {
  const activeColor = isTerminal ? 'bg-error-primary' : 'bg-accent-primary';

  if (state === 'current') {
    return (
      <span
        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white shadow-sm ${activeColor}`}
      >
        <IoCarOutline className="text-base" aria-hidden />
      </span>
    );
  }

  if (state === 'completed') {
    return (
      <span
        className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full ${activeColor}`}
      >
        <BsCheck className="text-[10px] text-white" aria-hidden />
      </span>
    );
  }

  return (
    <span className="relative z-10 h-4 w-4 rounded-full border-2 border-gray-400 bg-white" />
  );
};

const TimelineProgressBar = ({
  stages,
  isTerminal,
}: {
  stages: { label: string; state: 'completed' | 'current' | 'pending' }[];
  isTerminal: boolean;
}) => {
  const activeColor = isTerminal ? 'bg-error-primary' : 'bg-accent-primary';
  const inactiveColor = 'bg-gray-300';

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="grid grid-cols-5">
        {stages.map((stage, index) => {
          const isFirst = index === 0;
          const isLast = index === stages.length - 1;
          const leftFilled =
            !isFirst && stages[index - 1].state === 'completed';
          const rightFilled = stage.state === 'completed';

          return (
            <div
              key={stage.label}
              className="flex flex-col items-center text-center"
            >
              <div className="relative flex h-9 w-full items-center justify-center">
                {!isFirst ? (
                  <span
                    className={`absolute left-0 right-1/2 top-1/2 h-0.5 -translate-y-1/2 ${leftFilled ? activeColor : inactiveColor}`}
                    aria-hidden
                  />
                ) : null}
                {!isLast ? (
                  <span
                    className={`absolute left-1/2 right-0 top-1/2 h-0.5 -translate-y-1/2 ${rightFilled ? activeColor : inactiveColor}`}
                    aria-hidden
                  />
                ) : null}
                <ProgressNode state={stage.state} isTerminal={isTerminal} />
              </div>

              <p
                className={`mt-3 w-full px-0.5 text-xs leading-snug ${
                  stage.state === 'pending'
                    ? 'text-gray-600'
                    : stage.state === 'current'
                      ? 'font-semibold text-black'
                      : 'font-medium text-black'
                }`}
              >
                {stage.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderTimeline = ({ order }: { order: Record<string, unknown> }) => {
  const { stages, progressStages, isTerminal } = buildOrderTimeline(order);

  return (
    <DetailCard title="Timeline">
      <div className="space-y-8 py-2">
        <TimelineProgressBar stages={progressStages} isTerminal={isTerminal} />

        <div className="space-y-0 border-t border-gray-300 pt-6">
          {stages.map((stage, index) => {
            const isLast = index === stages.length - 1;
            const lineColor =
              stage.state === 'completed'
                ? 'bg-success-primary'
                : stage.state === 'cancelled'
                  ? 'bg-error-primary'
                  : 'bg-gray-300';

            return (
              <div key={stage.key} className="relative flex gap-4 pb-6 last:pb-0">
                {!isLast ? (
                  <span
                    className={`absolute left-[9px] top-5 bottom-0 w-0.5 ${lineColor}`}
                    aria-hidden
                  />
                ) : null}

                <StageIndicator state={stage.state} />

                <div className="min-w-0 flex-1 pt-0.5">
                  <p
                    className={`text-sm ${
                      stage.state === 'pending'
                        ? 'font-medium text-gray-600'
                        : 'font-semibold text-black'
                    }`}
                  >
                    {stage.label}
                  </p>

                  {stage.events.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {stage.events.map((event, eventIndex) => (
                        <li key={`${stage.key}-${eventIndex}`} className="text-sm">
                          <p className="text-black">– {event.text}</p>
                          {event.date ? (
                            <p className="mt-0.5 text-xs text-gray-600">
                              {formatDate(event.date)}
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : stage.state === 'pending' ? (
                    <p className="mt-1 text-xs text-gray-600">Not reached yet.</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DetailCard>
  );
};

export default OrderTimeline;
