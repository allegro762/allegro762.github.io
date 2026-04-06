console.log("JS loaded");

function diffTags(a, b) {
  const setA = new Set(a.split(',').map(x => x.trim()));
  const setB = new Set(b.split(',').map(x => x.trim()));
  return [...setB].filter(x => !setA.has(x));
}

function run() {
  console.log("clicked");
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const result = diffTags(a, b);
  document.getElementById('out').textContent =
  result.map(x => x + ',').join('\n');
}
