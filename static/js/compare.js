console.log("JS loaded");

const categories = {
  "신체부위": ["eye", "hair", "face", "arm", "leg"],
  "의류": ["shirt", "skirt", "pants", "jacket"],
  "기타": []
};

function categorize(tags) {
  const result = {};

  for (const key in categories) {
    result[key] = [];
  }
  result["기타"] = [];

  tags.forEach(tag => {
    let found = false;

    for (const key in categories) {
      for (const keyword of categories[key]) {
        if (tag.endsWith(keyword)) {
          result[key].push(tag);
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      result["기타"].push(tag);
    }
  });

  return result;
}

function renderCategorized(data) {
  const container = document.getElementById('out');
  container.innerHTML = '';

  for (const key in data) {
    if (data[key].length === 0) continue;

    const box = document.createElement('div');
    box.className = 'category-box';

    const title = document.createElement('div');
    title.className = 'category-title';
    title.textContent = key;

    const content = document.createElement('div');
    content.className = 'category-content';
    content.textContent = data[key].map(x => x + ',').join('\n');

    box.appendChild(title);
    box.appendChild(content);
    container.appendChild(box);
  }
}

function diffTags(a, b) {
  const setA = new Set(a.split(',').map(x => x.trim()));
  const setB = new Set(b.split(',').map(x => x.trim()));
  return [...setB].filter(x => !setA.has(x));
}

function run() {
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const diff = diffTags(a, b);
  const categorized = categorize(diff);
  renderCategorized(categorized);
}
