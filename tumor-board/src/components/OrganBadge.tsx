const organMap: Record<string, { icon: string; label: string }> = {
  poumons: { icon: "🫁", label: "Poumons" },
  foie: { icon: "🫀", label: "Foie" },
  ganglions: { icon: "🔵", label: "Ganglions" },
  os: { icon: "🦴", label: "Os" },
};

export function OrganBadge({ organ }: { organ: string }) {
  const item = organMap[organ] ?? { icon: "•", label: organ };

  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
      <span>{item.icon}</span>
      <span>{item.label}</span>
    </span>
  );
}
