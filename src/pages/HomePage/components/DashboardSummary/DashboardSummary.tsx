import { useSummaryStats } from "../../hooks/useSummaryStats";

interface PeriodStats {
  total: number;
  completed: number;
  pending: number;
  cancelled: number;
}

// interface SummaryStats {
//   week: PeriodStats;
//   month: PeriodStats;
//   year: PeriodStats;
// }

export const DashboardSummary = () => {
  const { data: summaryStats } = useSummaryStats();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
      <SummaryCard title="За неделю" data={summaryStats?.week} />
      <SummaryCard title="За месяц" data={summaryStats?.month} />
      <SummaryCard title="За год" data={summaryStats?.year} />
    </div>
  );
};

const SummaryCard = ({
  title,
  data,
}: {
  title: string;
  data?: PeriodStats;
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="text-sm text-gray-500 mb-4">{title}</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-lg sm:text-xl font-bold">
            {data?.total ?? "—"}
          </div>
          <div className="text-xs text-gray-500">Платежей</div>
          <div className="mt-4">
            <div className="text-lg sm:text-xl font-bold">
              {data?.pending ?? "—"}
            </div>
            <div className="text-xs text-gray-500">Платежей в обработке</div>
          </div>
        </div>
        <div>
          <div className="text-lg sm:text-xl font-bold">
            {data?.completed ?? "—"}
          </div>
          <div className="text-xs text-gray-500">Успешных платежей</div>
          <div className="mt-4">
            <div className="text-lg sm:text-xl font-bold">
              {data?.cancelled ?? "—"}
            </div>
            <div className="text-xs text-gray-500">Отмененных платежей</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
