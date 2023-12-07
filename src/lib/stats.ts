export function mean(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length
}

export function median(numbers: number[]): number {
  const sorted = numbers.sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return (sorted[middle] + sorted[middle - 1]) / 2
  }

  return sorted[middle]
}

export function mode(numbers: number[]): number[] {
  const counts: { [key: number]: number } = {}
  let maxCount = 0

  numbers.forEach(num => {
    counts[num] = counts[num] ? counts[num] + 1 : 1
    maxCount = Math.max(maxCount, counts[num])
  })

  return Object.keys(counts)
    .map(key => Number(key))
    .filter(key => counts[key] === maxCount)
}

export function range(numbers: number[]): number {
  const sorted = numbers.sort((a, b) => a - b)
  return sorted[sorted.length - 1] - sorted[0]
}

export function standardDeviation(numbers: number[]): number {
  const meanValue = mean(numbers)
  const squaredDiffs = numbers.map(num => Math.pow(num - meanValue, 2))
  const meanSquaredDiff = mean(squaredDiffs)
  return Math.sqrt(meanSquaredDiff)
}
