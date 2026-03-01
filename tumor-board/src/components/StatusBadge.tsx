const statusStyles: Record<string, string> = {
  critique: "bg-red-50 text-red-700 border-red-200",
  attention: "bg-amber-50 text-amber-700 border-amber-200",
  stable: "bg-green-50 text-green-700 border-green-200",
  normal: "bg-gray-50 text-gray-500 border-gray-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  progression: "bg-red-50 text-red-700 border-red-200",
  regression: "bg-green-50 text-green-700 border-green-200",
  nouveau: "bg-red-50 text-red-700 border-red-200",
};

const colorStyles: Record<string, string> = {
  red: "bg-red-50 text-red-700 border-red-200",
  green: "bg-green-50 text-green-700 border-green-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  gray: "bg-gray-50 text-gray-500 border-gray-200",
};

export function StatusBadge({
  status,
  label,
  color,
  size = "sm",
}: {
  status?: string;
  label: string;
  color?: string;
  size?: "sm" | "lg";
}) {
  const style = color ? colorStyles[color] : status ? statusStyles[status] : colorStyles.gray;
  const sizeClass = size === "lg" ? "text-sm px-3 py-1" : "text-xs px-2.5 py-0.5";

  return (
    <span className={`rounded-full border text-xs font-medium ${sizeClass} ${style || colorStyles.gray}`}>
      {label}
    </span>
  );
}
