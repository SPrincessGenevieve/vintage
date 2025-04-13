type ChartStatisticsCardT = {
  icon: React.ReactNode;
  title: string;
  data: string;
  data_color: string;
};

export default function ChartStatisticsCard({
  item,
}: {
  item: ChartStatisticsCardT;
}) {
  return (
    <div className="chart-stats-cont border rounded-lg flex flex-col gap-2 p-2 bg-muted">
      <div className="flex w-full h-full gen-text-s icon-item">{item.icon}</div>
      <span className="text-muted-foreground text-[12px]">{item.title}</span>
      <span className={`gen-text-s ${item.data_color}`}>{item.data}</span>
    </div>
  );
}
