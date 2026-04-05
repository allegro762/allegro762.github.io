function diffTags(a, b) {
  const setA = new Set(a.split(',').map(x => x.trim()));
  const setB = new Set(b.split(',').map(x => x.trim()));
  return [...setB].filter(x => !setA.has(x));
}
