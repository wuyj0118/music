
export const calcCount = n => {
  if (n > 1e8) return (n / 1e8).toFixed(1) + '亿'
  if (n > 1e4) return (n / 1e4).toFixed(1) + '万'
  return n
}

