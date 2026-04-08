console.log("JS loaded");

const categories = {
  "신체부위": ["eyes", "eye", "face", "arm", "leg", "breast", "breasts", "legs"],
  "헤어": ["hair", "bangs"],
  "의류": ["shirt", "skirt", "pants", "jacket", "thighhighs", "sleeves", "sweater", "turtleneck"],
  "이미지 후처리": ["lighting", "anime style", "detailed", "quality", "score"],
  "디테일": [],
  "악세사리": ["bow"],
  "공간구성": ["interior", "livingroom", "bed", "tiles", "tile_floor", "indoors"],
  "남성": ["male", "man"],
  "중복키워드": [],
  "기타": []
};

function normalize(str) {
  return str
    .split(',')
    .map(x => x.trim().toLowerCase())
    .filter(x => x.length > 0);
}

function matchTag(tag, keyword) {
  const tokens = tag.split(/[\s_]+/); // 공백 + _ 둘 다 분리
  return (
    tag === keyword ||
    tokens.includes(keyword) ||   // ← 핵심
    tag.endsWith("_" + keyword) ||
    tag.startsWith(keyword + "_") || 
    tokens.some(t => t.endsWith(keyword))
  );
}

function categorize(tags) {
  const result = {};
  for (const key in categories) {
    result[key] = [];
  }
  tags.forEach(tag => {
    const matchedCategories = [];
    // 1. 어떤 카테고리에 걸리는지 전부 수집
    for (const key in categories) {
      if (key === "중복키워드" || key === "기타") continue;

      for (const keyword of categories[key]) {
        if (matchTag(tag, keyword)) {
          matchedCategories.push(key);
          break;
        }
      }
    }
    // 2. 분기 처리
    if (matchedCategories.length === 0) {
      result["기타"].push(tag);
    } else if (matchedCategories.length === 1) {
      result[matchedCategories[0]].push(tag);
    } else {
      result["중복키워드"].push(tag);  // ← 핵심
      console.log(tag, "→ 중복:", matchedCategories);
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
  const setA = new Set(normalize(a));
  const setB = new Set(normalize(b));
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
