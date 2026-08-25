// ===== Name Fame — data =====

const MEANINGS = {
  1: ['The Leader', 'Independent, pioneering and determined — a name that opens paths and walks first.'],
  2: ['The Diplomat', 'Gentle, intuitive and harmonious — a name that unites people and soothes storms.'],
  3: ['The Creator', 'Expressive, joyful and inspired — a name made for words, art and laughter.'],
  4: ['The Builder', 'Steady, loyal and hardworking — a name that turns dreams into foundations.'],
  5: ['The Explorer', 'Curious, adventurous and free — a name that cannot sit still for long.'],
  6: ['The Guardian', 'Warm, responsible and devoted — a name that protects and cares for its own.'],
  7: ['The Thinker', 'Deep, wise and searching — a name drawn to mysteries and quiet truths.'],
  8: ['The Achiever', 'Ambitious, powerful and confident — a name born to accomplish great things.'],
  9: ['The Humanitarian', 'Generous, idealistic and kind — a name that belongs a little to everyone.'],
  11: ['The Visionary', 'A master number: intuitive and inspiring, a name that sees further than most.'],
  22: ['The Master Builder', 'A master number: rare and powerful, a name that can build on a grand scale.'],
};

// Symbol libraries: key -> [image file, display name, meaning]
const LIB = {
  planets: {
    soleil:   ['planetes_soleil.jpg', 'The Sun', 'Vitality, presence and a light that others follow.'],
    lune:     ['planetes_lune.jpg', 'The Moon', 'Intuition, memory and the quiet pull of imagination.'],
    mercure:  ['planetes_mercure.jpg', 'Mercury', 'Wit, words and the art of connection.'],
    venus:    ['planetes_venus.jpg', 'Venus', 'Harmony, beauty and the gift of loving well.'],
    terre:    ['planetes_terre.jpg', 'The Earth', 'Groundedness, patience and a home for everyone.'],
    mars:     ['planetes_mars.jpg', 'Mars', 'Courage, drive and the fire of action.'],
    jupiter:  ['planetes_jupiter.jpg', 'Jupiter', 'Generosity, luck and natural leadership.'],
    saturne:  ['planetes_saturne.jpg', 'Saturn', 'Discipline, wisdom and things built to last.'],
    uranus:   ['planetes_uranus.jpg', 'Uranus', 'Originality, invention and happy surprises.'],
    neptune:  ['planetes_neptune.jpg', 'Neptune', 'Dreams, depth and boundless empathy.'],
    pluton:   ['planetes_pluton.jpg', 'Pluto', 'Transformation and the power of new beginnings.'],
  },
  gems: {
    diamant:      ['pierres_diamant.jpg', 'Diamond', 'Clarity, strength and unbreakable will.'],
    perle:        ['pierres_perle.jpg', 'Pearl', 'Purity, patience and quiet elegance.'],
    amethyste:    ['pierres_amethyste.jpg', 'Amethyst', 'Serenity, insight and a peaceful mind.'],
    saphir_bleu:  ['pierres_saphir_bleu.jpg', 'Blue Sapphire', 'Wisdom, loyalty and noble truth.'],
    citrine:      ['pierres_citrine.jpg', 'Citrine', 'Sunlight held in stone: optimism and energy.'],
    emeraude:     ['pierres_emeraude.jpg', 'Emerald', 'Rebirth, growth and a generous heart.'],
    aigue_marine: ['pierres_aigue_marine.jpg', 'Aquamarine', 'Calm waters, courage and clear speech.'],
    rubis:        ['pierres_rubis.jpg', 'Ruby', 'Passion, vitality and a fearless heart.'],
    grenat:       ['pierres_grenat.jpg', 'Garnet', 'Devotion, warmth and a steady flame.'],
    jade:         ['pierres_jade.jpg', 'Jade', 'Balance, luck and gentle prosperity.'],
    lapis_lazuli: ['pierres_lapis_lazuli.jpg', 'Lapis Lazuli', 'Vision, truth and starry wisdom.'],
    opale:        ['pierres_opale.jpg', 'Opal', 'Imagination and a thousand hidden colours.'],
    onyx_noir:    ['pierres_onyx_noir.jpg', 'Black Onyx', 'Focus, protection and inner resolve.'],
    topaze:       ['pierres_topaze.jpg', 'Topaz', 'Confidence, abundance and golden joy.'],
    turquoise:    ['pierres_turquoise.jpg', 'Turquoise', 'Protection, friendship and open skies.'],
  },
  flowers: {
    tournesol:  ['fleurs_tournesol.jpg', 'Sunflower', 'Always turned to the light: loyalty and joy.'],
    lys_blanc:  ['fleurs_lys_blanc.jpg', 'White Lily', 'Nobility of heart and pure intention.'],
    iris:       ['fleurs_iris.jpg', 'Iris', 'A message of hope, wisdom and promise.'],
    lavande:    ['fleurs_lavande.jpg', 'Lavender', 'Serenity, grace and quiet devotion.'],
    coquelicot: ['fleurs_coquelicot.jpg', 'Poppy', 'Freedom, remembrance and wild beauty.'],
    rose:       ['fleurs_rose.jpg', 'Rose', 'Love, in every one of its languages.'],
    violette:   ['fleurs_violette.jpg', 'Violet', 'Modest strength and faithful affection.'],
    magnolia:   ['fleurs_magnolia.jpg', 'Magnolia', 'Dignity, perseverance and splendour.'],
    jasmin:     ['fleurs_jasmin.jpg', 'Jasmine', 'Sweetness, warmth and good grace.'],
    orchidee:   ['fleurs_orchidee.jpg', 'Orchid', 'Rare, refined and quietly spectacular.'],
    pivoine:    ['fleurs_pivoine.jpg', 'Peony', 'Honour, good fortune and a full heart.'],
    muguet:     ['fleurs_muguet.jpg', 'Lily of the Valley', 'The return of happiness.'],
    marguerite: ['fleurs_marguerite.jpg', 'Daisy', 'Innocence, cheer and new mornings.'],
    tulipe:     ['fleurs_tulipe.jpg', 'Tulip', 'A declaration of perfect love.'],
    chardon:    ['fleurs_chardon.jpg', 'Thistle', 'Resilience: beauty that defends itself.'],
  },
  colours: {
    or_chaud:      ['couleurs_or_chaud.jpg', 'Warm Gold', 'Radiance, generosity and worth.'],
    bleu_nuit:     ['couleurs_bleu_nuit.jpg', 'Midnight Blue', 'Depth, mystery and calm night skies.'],
    bleu_royal:    ['couleurs_bleu_royal.jpg', 'Royal Blue', 'Loyalty, dignity and quiet authority.'],
    ardoise:       ['couleurs_ardoise.jpg', 'Slate', 'Steadiness, good sense and timeless taste.'],
    orange_brule:  ['couleurs_orange_brule.jpg', 'Burnt Orange', 'Adventure, warmth and bold spirit.'],
    rose:          ['couleurs_rose.jpg', 'Rose Pink', 'Tenderness, kindness and open arms.'],
    violet:        ['couleurs_violet.jpg', 'Violet', 'Imagination, spirit and rare vision.'],
    rouge_fonce:   ['couleurs_rouge_fonce.jpg', 'Deep Red', 'Power, passion and presence.'],
    vert_emeraude: ['couleurs_vert_emeraude.jpg', 'Emerald Green', 'Growth, generosity and life itself.'],
    vert_foret:    ['couleurs_vert_foret.jpg', 'Forest Green', 'Rootedness, calm and quiet strength.'],
    bleu_marine:   ['couleurs_bleu_marine.jpg', 'Navy Blue', 'Confidence, order and trust.'],
    sarcelle:      ['couleurs_sarcelle.jpg', 'Teal', 'Originality, balance and clear thought.'],
  },
};

// number -> emblems (all eleven planets are used across the twelve numbers)
const PROFILE = {
  1:  { planets: 'soleil',  gems: 'diamant',      flowers: 'tournesol',  colours: 'or_chaud' },
  2:  { planets: 'lune',    gems: 'perle',        flowers: 'lys_blanc',  colours: 'bleu_nuit' },
  3:  { planets: 'jupiter', gems: 'amethyste',    flowers: 'iris',       colours: 'bleu_royal' },
  4:  { planets: 'saturne', gems: 'saphir_bleu',  flowers: 'lavande',    colours: 'ardoise' },
  5:  { planets: 'mercure', gems: 'citrine',      flowers: 'coquelicot', colours: 'orange_brule' },
  6:  { planets: 'venus',   gems: 'emeraude',     flowers: 'rose',       colours: 'rose' },
  7:  { planets: 'neptune', gems: 'aigue_marine', flowers: 'violette',   colours: 'violet' },
  8:  { planets: 'mars',    gems: 'rubis',        flowers: 'magnolia',   colours: 'rouge_fonce' },
  9:  { planets: 'terre',   gems: 'turquoise',    flowers: 'jasmin',     colours: 'vert_emeraude' },
  11: { planets: 'uranus',  gems: 'lapis_lazuli', flowers: 'orchidee',   colours: 'sarcelle' },
  22: { planets: 'pluton',  gems: 'onyx_noir',    flowers: 'pivoine',    colours: 'vert_foret' },
};

const EMBLEM_LABELS = { planets: 'Guiding Planet', gems: 'Gemstone', flowers: 'Flower', colours: 'Colour' };

// ===== numerology =====

function letterValue(ch) {
  const i = ch.toUpperCase().charCodeAt(0) - 65; // A = 0
  if (i < 0 || i > 25) return 0;
  return (i % 9) + 1;
}

function computeNumber(name) {
  const letters = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
  if (!letters) return null;
  const values = [...letters].map(letterValue);
  let total = values.reduce((a, b) => a + b, 0);
  const firstSum = total;
  while (total > 9 && total !== 11 && total !== 22) {
    total = String(total).split('').reduce((a, d) => a + Number(d), 0);
  }
  return { letters, values, firstSum, total };
}

function reveal(fromName) {
  const input = document.getElementById('calc-name');
  if (fromName) input.value = fromName;
  const r = computeNumber(input.value);
  if (!r) { input.focus(); return; }

  const displayName = input.value.trim().replace(/\s+/g, ' ');
  const pretty = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const steps = [...r.letters].map((l, i) => `${l}=${r.values[i]}`).join(' · ');
  const chain = r.firstSum === r.total ? `${r.firstSum}` : `${r.firstSum} → ${r.total}`;
  const [title, meaning] = MEANINGS[r.total];

  document.getElementById('calc-heading').textContent = pretty;
  document.getElementById('calc-steps').textContent = `${steps}  —  ${chain}`;
  document.getElementById('calc-number').textContent = r.total;
  document.getElementById('calc-title').textContent = title;
  document.getElementById('calc-meaning').textContent = meaning;

  const emblems = PROFILE[r.total];
  const wrap = document.getElementById('calc-emblems');
  wrap.innerHTML = '';
  for (const cat of ['planets', 'gems', 'flowers', 'colours']) {
    const [file, name, line] = LIB[cat][emblems[cat]];
    const card = document.createElement('div');
    card.className = 'emblem-card';
    card.innerHTML = `
      <img src="images/${file}" alt="${name}" loading="lazy">
      <p class="emblem-cat">${EMBLEM_LABELS[cat]}</p>
      <h4>${name}</h4>
      <p class="emblem-line">${line}</p>`;
    wrap.appendChild(card);
  }

  const result = document.getElementById('calc-result');
  result.hidden = false;
  requestAnimationFrame(() => result.classList.add('shown'));
}

document.getElementById('calc-btn').addEventListener('click', () => reveal());
document.getElementById('calc-name').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') reveal();
});

// ===== book popup =====

const modal = document.getElementById('book-modal');
const modalContent = document.getElementById('modal-content');

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function openBook(name) {
  const key = name.toLowerCase();
  const book = typeof BOOKS !== 'undefined' ? BOOKS[key] : null;
  if (!book) {
    reveal(name);
    document.getElementById('discover').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  const legends = book.legends.map((l) =>
    `<li><span class="ml-name">${esc(l.n)}</span><span class="ml-meta">${esc(l.c)} · ${esc(l.o)} · ${esc(l.d)}</span></li>`
  ).join('');
  const fiction = book.fiction.map((f) =>
    `<li><span class="ml-name">${esc(f.n)}</span><span class="ml-meta">${esc(f.f)}</span></li>`
  ).join('');
  modalContent.innerHTML = `
    <p class="modal-kicker">Inside the book</p>
    <h3 id="modal-name" class="modal-name">${esc(name)}</h3>
    <p class="modal-meaning">${esc(book.meaning)}</p>
    <div class="modal-facts">
      <span class="modal-chip">Number ${book.number} — ${esc(book.ntitle)}</span>
      <span class="modal-chip">${book.symbols.map(esc).join(' ✦ ')}</span>
    </div>
    <p class="modal-sub">✦&ensp;The Ten Legends</p>
    <ul class="modal-list">${legends}</ul>
    <p class="modal-sub">✦&ensp;Beyond Reality</p>
    <ul class="modal-list modal-list-fiction">${fiction}</ul>
    <div class="modal-cta">
      <button class="btn btn-gold" id="modal-discover">Reveal its emblems</button>
    </div>`;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('open'));
  document.getElementById('modal-discover').addEventListener('click', () => {
    closeBook();
    reveal(name);
    document.getElementById('discover').scrollIntoView({ behavior: 'smooth' });
  });
}

function closeBook() {
  modal.classList.remove('open');
  modal.hidden = true;
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeBook);
document.getElementById('modal-backdrop').addEventListener('click', closeBook);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeBook();
});

// collection chips -> book popup
document.querySelectorAll('.names-list button').forEach((b) => {
  b.addEventListener('click', () => openBook(b.textContent.trim()));
});

// ?name= deep link (for QR variants)
const qName = new URLSearchParams(location.search).get('name');
if (qName) {
  reveal(qName);
  setTimeout(() => document.getElementById('discover').scrollIntoView(), 150);
}

// ===== symbol library tabs =====

const GALLERY_INTROS = {
  planets: 'Eleven celestial bodies watch over the world of names. Classical tradition gives each name a guiding planet — the sky it was born under.',
  gems: 'Fifteen stones, fifteen virtues. Since antiquity, gems have been worn as talismans; each name is paired with the stone that mirrors its character.',
  flowers: 'The Victorian language of flowers gave every bloom a voice. These are the flowers our names speak with.',
  colours: 'Every name wears a colour — the shade of its temperament. It tints the pages of its book from cover to cover.',
};

function renderGallery(cat) {
  document.getElementById('lib-intro').textContent = GALLERY_INTROS[cat];
  const grid = document.getElementById('lib-grid');
  grid.innerHTML = '';
  for (const key of Object.keys(LIB[cat])) {
    const [file, name, line] = LIB[cat][key];
    const item = document.createElement('div');
    item.className = 'lib-item';
    item.innerHTML = `
      <img src="images/${file}" alt="${name}" loading="lazy">
      <h4>${name}</h4>
      <p>${line}</p>`;
    grid.appendChild(item);
  }
  document.querySelectorAll('.lib-tab').forEach((t) =>
    t.classList.toggle('active', t.dataset.cat === cat)
  );
}

document.querySelectorAll('.lib-tab').forEach((t) =>
  t.addEventListener('click', () => renderGallery(t.dataset.cat))
);
renderGallery('planets');

// ===== scroll reveal =====

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
}

// ===== mobile nav =====

const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => links.classList.remove('open'))
);
