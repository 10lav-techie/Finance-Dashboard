function Badge({ type }) {
  const styles =
    type === "income"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  return (
    <span className={`px-2 py-1 text-sm rounded ${styles}`}>
      {type}
    </span>
  );
}

export default Badge;