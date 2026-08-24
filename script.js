// Name Fame — numerology calculator & nav

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

function letterValue(ch) {
  const i = ch.toUpperCase().charCodeAt(0) - 65; // A = 0
  if (i < 0 || i > 25) return 0;
  return (i % 9) + 1;
}

function reveal() {
  const input = document.getElementById('calc-name');
  const raw = input.value.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const letters = raw.toUpperCase().replace(/[^A-Z]/g, '');
  if (!letters) { input.focus(); return; }

  const values = [...letters].map(letterValue);
  let total = values.reduce((a, b) => a + b, 0);
  const firstSum = total;
  while (total > 9 && total !== 11 && total !== 22) {
    total = String(total).split('').reduce((a, d) => a + Number(d), 0);
  }

  const steps = [...letters].map((l, i) => `${l}=${values[i]}`).join(' · ');
  const chain = firstSum === total ? `${firstSum}` : `${firstSum} → ${total}`;
  const [title, meaning] = MEANINGS[total];

  document.getElementById('calc-steps').textContent = `${steps}  —  ${chain}`;
  document.getElementById('calc-number').textContent = total;
  document.getElementById('calc-title').textContent = title;
  document.getElementById('calc-meaning').textContent = meaning;
  document.getElementById('calc-result').hidden = false;
}

document.getElementById('calc-btn').addEventListener('click', reveal);
document.getElementById('calc-name').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') reveal();
});

// mobile nav
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => links.classList.remove('open'))
);
