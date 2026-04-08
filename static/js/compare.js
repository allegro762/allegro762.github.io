console.log("JS loaded");

const categories = {
  "신체부위": ["eyes", "eye", "face", "arm", "leg", "breast", "breasts", "legs"],
  "헤어": ["hair", "bangs"],
  "의류": ["shirt", "skirt", "pants", "jacket", "thighhighs", "sleeves", "sweater", "turtleneck"],
  "이미지 후처리": ["lighting", "anime style", "detailed", "quality", "score_"],
  "디테일": ["striped", "leather"],
  "악세사리": ["bow"],
  "공간구성": ["interior", "livingroom", "bed", "tiles", "tile_floor", "indoors"],
  "남성": ["male", "man"],
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
    
    data[key].forEach(tag => {
      const item = document.createElement('div');
      item.textContent = tag + ','; // 쉼표 유지
      content.appendChild(item);
    });

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
  console.log("diff:", diff);
  const categorized = categorize(diff);
  console.log("categorized:", categorized);
  renderCategorized(categorized);
}
