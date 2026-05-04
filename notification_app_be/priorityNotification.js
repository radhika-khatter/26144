
function calculateImportance(type) {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
}
 // main fucntion
export function fetchTopPriorityNotifications(data, limit = 10) {
  return data
    .sort((a, b) => {
      const Diff =
        calculateImportance(b.Type) - calculateImportance(a.Type);

      if (Diff !== 0) {
        return Diff;
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, limit);
}