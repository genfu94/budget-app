export function formatDate(v) {
  return `${v["$y"]}-${(v["$M"] + 1).toString().padStart(2, "0")}-${v["$D"]
    .toString()
    .padStart(2, "0")}`;
}