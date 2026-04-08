console.log("JS loaded");

const categories = {
  "신체부위": ["eye", "hair", "face", "arm", "leg"],
  "의류": ["shirt", "skirt", "pants", "jacket"],
  "기타": []
};

function categorize(tags) {
  const result = {};
  // 초기화
  for (const key in categories) {
    result[key] = [];
  }
  tags.forEach(tag => {
    let found = false;
    for (const key in categories) {
      if (categories[key].includes(tag)) {
        result[key].push(tag);
        found = true;
        break;
      }
    }
    if (!found) {
      result["기타"].push(tag);
    }
  });
  return result;
}

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
