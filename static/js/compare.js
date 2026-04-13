console.log("JS loaded");

const categories = {
  "신체부위": ["eyes", "eye", "face", "arm", "arms", "leg", "breast", "breasts", "legs", "ass", "nipples", "nipple", "bare_shoulders", "barefoot", "lips", "nose", "forehead"],
  "헤어": ["hair", "bangs", "ponytail"],
  "의류": ["shirt", "skirt", "pants", "jacket", "thighhighs", "sleeves", "sweater", "turtleneck", "underwear", "panties", "bra", "denim", "tank_top", "jeans", "gloves"],
  "이미지 후처리": ["lighting", "anime style", "detailed", "quality", "score", "light_particles", "realistic"],
  "디테일": ["shiny_skin", "saliva_trail"],
  "악세사리": ["bow", "cuffs", "tattoo", "eyewear", "glasses", "ribbon", "piercing", "earrings"],
  "공간구성": ["interior", "livingroom", "bed", "tiles", "tile_floor", "indoors", "sky", "cloud", "public_indecency", "background"],
  "여성": ["arched_back", "pussy", "cum_in", "cum_on", "off_shoulder", "eyelashes", "saliva", "oral", "fellatio", "long_fingernails", "mascara"],
  "남성": ["male", "man", "faceless", "exhibitionism", "penis", "testicles", "hand_on_another's_head"],
  "연출": ["rape", "sex", "from_behind", "bound_wrists", "public_nudity", "slave", "humiliation", "chained", "chain_leash", "doggystyle", "standing", "sitting", "nude", "kneeling"],
  "얼굴표현": ["angry", "blush", "drooling", "teeth", "mouth"],
  "중복키워드": [],
  "제외": ["artist_name", "text", "watermark", "censored", "string", "futanari", "Mosaics", "bar_censor", "ugly", "older_lady", "middle-aged_woman", "worst", "low quality", "lowres", "signature", "username", "logo", "bad hands", "mutated hands", "A man's face"],
  "관점과시점": ["from_side", "solo_focus", "out_of_frame"],
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
