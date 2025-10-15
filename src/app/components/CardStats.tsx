type CardStatProps = {
  title: string;
  value: string;
  percentage?: number;
  color?: string;
  icon?: React.ReactNode;
};

export default function CardStat({
  title,
  value,
  percentage,
  color,
  icon,
}: CardStatProps) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-md border border-gray-100 ${color}`}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon && <div className="text-blue-500">{icon}</div>}
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {percentage !== undefined && (
        <p className="text-sm text-gray-500 mt-1">{percentage}%</p>
      )}
    </div>
  );
}
