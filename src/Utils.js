export function Difference(a, b) {
  let total = 0;
  for (let i = 0; i < a.length; i++) {
    if (i >= b.length) {
      return total;
    }
    total += a[i] !== b[i] ? 1 : 0;
  }
  return total;
}
