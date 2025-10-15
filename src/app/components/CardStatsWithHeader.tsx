import React from "react";

type CardStatProps = {
  title: string;
  value: string;
  pagu?: string;
  percentage?: number | string;
  icon?: React.ReactNode;
  color?: string;
};

export default function CardStatsWithHeader({
  title,
  value,
  pagu,
  percentage,
  icon,
  color = "bg-white text-gray-800",
}: CardStatProps) {
  // Tentukan warna berdasarkan percentage
  const statusColor =
    typeof percentage === "number" && percentage < 50
      ? "text-amber-700"
      : "text-emerald-700";

  return (
    <div
      className={`rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-200 ${color}`}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 py-3 text-center font-semibold uppercase tracking-wide text-sm bg-white/20 backdrop-blur-sm">
        {icon && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
        <span>{title}</span>
      </div>

      {/* Content */}
      <div className="bg-white text-gray-700 flex flex-col h-[200px] text-center px-4 py-6">
        <div className="flex flex-col justify-between h-full items-center">
          {percentage !== undefined && (
            <p className={`text-4xl font-bold ${statusColor}`}>
              {typeof percentage === "number" ? `${percentage}%` : percentage}
            </p>
          )}
          <p className={`text-md uppercase ${statusColor}`}>
            Realisasi : <span className="font-bold">{value}</span>
          </p>
          {pagu && (
            <p className={`text-sm uppercase ${statusColor}`}>
              Pagu : <span className="font-bold">{pagu}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
