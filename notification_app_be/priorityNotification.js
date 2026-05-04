// assign weight
function getPriorityValue(type) {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
}

// main logic
export function getTopPriority(data, limit = 10) {
  return data
    .sort((a, b) => {
      const priorityDiff =
        getPriorityValue(b.Type) - getPriorityValue(a.Type);

      if (priorityDiff !== 0) return priorityDiff;

      
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, limit);
}