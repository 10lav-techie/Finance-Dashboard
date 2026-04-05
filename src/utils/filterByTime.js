export const filterByTime = (transactions, filter) => {
  const now = new Date();

  return transactions.filter((t) => {
    const date = new Date(t.date);

    if (filter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return date >= weekAgo;
    }

    if (filter === "month") {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    if (filter === "year") {
      return date.getFullYear() === now.getFullYear();
    }

    return true;
  });
};