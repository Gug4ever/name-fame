# -*- coding: utf-8 -*-
"""Name Fame site generator.

Reads the production content JSONs and (re)generates:
  - books.js            (popup data for every published book)
  - names/{slug}.html   (one crawlable, SEO-optimised page per name)
  - sitemap.xml, robots.txt
  - index.html          (patched between BOYS/GIRLS/JSONLD/COUNT markers)

Run it again whenever books are added to FINAL VERSIONS/:
    python tools/generate.py
"""
import json, os, re, html, datetime

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = r"C:\Users\guill\OneDrive\Desktop\New Name Fame - fichiers\production\content"
BASE_URL = "https://namefame.vercel.app"

BOYS = ["john","james","william","henry","michael","alexander","daniel","benjamin","oliver",
        "charles","thomas","george","edward","arthur","david","robert","paul","peter",
        "samuel","louis","anthony","leonardo","joseph","frederick","albert","christopher",
        "raphael","theodore","jack","jose","liam","noah","nicholas","richard","carlos",
        "luis","mark","martin","stephen","francis",
        "adam","andrew","antonio","eric","gabriel","isaac","matthew","miguel","patrick","timothy"]
GIRLS = ["olivia","emma","charlotte","sophia","amelia","isabella","emily","victoria",
         "elizabeth","mary","anne","catherine","margaret","jane","alice","grace","diana",
         "helen","eleanor","florence","clara","anna","julia","sarah",
         "eva","ella","lucy","maria","rose","michelle","jennifer","barbara","susan",
         "alexandra","angela","beatrice","carmen","caroline","christine","hannah","josephine",
         "karen","laura","louise","martha","natalie","patricia","rachel","rebecca","teresa"]
NAMES = BOYS + GIRLS

COUNT_WORDS = {73: "Seventy-Three", 100: "One Hundred"}

JOHN = {
    "display": "John",
    "meaning": "John means: God is gracious.",
    "number": 2, "ntitle": "The Diplomat",
    "symbols": ["Mercury", "Blue Sapphire", "White Lily", "Royal Blue"],
    "etymology": ("John comes from the Hebrew Yohanan — \u201cGod is gracious\u201d. Carried by John the "
                  "Baptist and John the Apostle, it spread with Christianity into almost every "
                  "language on Earth: Juan, Jean, Giovanni, Ivan, Se\u00e1n, Hans, Jo\u00e3o. For centuries it "
                  "was the most common male name of the English-speaking world — a name so "
                  "universal it became shorthand for \u201canyone\u201d, and yet borne by some of the most "
                  "singular people in history."),
    "portrait": ("Twos are the diplomats of the number cycle: intuitive, patient, and happiest "
                 "building bridges rather than walls. A name that resolves to two carries a gift "
                 "for listening, for timing, and for the quiet work that holds people together."),
    "legends": [
        {"n": "John Lennon", "c": "Music", "o": "British", "d": "1940\u20131980"},
        {"n": "John F. Kennedy", "c": "Politics & History", "o": "American", "d": "1917\u20131963"},
        {"n": "John Coltrane", "c": "Music & Jazz", "o": "American", "d": "1926\u20131967"},
        {"n": "John Wayne", "c": "Cinema", "o": "American", "d": "1907\u20131979"},
        {"n": "John McEnroe", "c": "Sport", "o": "American", "d": "b. 1959"},
        {"n": "John Steinbeck", "c": "Literature", "o": "American", "d": "1902\u20131968"},
        {"n": "John Legend", "c": "Music", "o": "American", "d": "b. 1978"},
        {"n": "John Adams", "c": "Politics & History", "o": "American", "d": "1735\u20131826"},
        {"n": "John Cleese", "c": "Comedy", "o": "British", "d": "b. 1939"},
        {"n": "John Muir", "c": "Nature & Conservation", "o": "Scottish-American", "d": "1838\u20131914"},
    ],
    "fiction": [
        {"n": "John Watson", "f": "Sherlock Holmes"},
        {"n": "John McClane", "f": "Die Hard"},
        {"n": "Jon Snow", "f": "Game of Thrones"},
        {"n": "John Wick", "f": "John Wick films"},
        {"n": "John Doe", "f": "The everyman of law and legend"},
        {"n": "Long John Silver", "f": "Treasure Island"},
    ],
}


def nz(v):
    return v if v else ""


def load_books():
    books = {}
    for n in NAMES:
        if n == "john":
            books["john"] = dict(JOHN)
            continue
        d = json.load(open(os.path.join(CONTENT, n + ".json"), encoding="utf-8"))
        num = d["numerology"]["number"]
        title = d["numerology"]["title"]
        title = title.split("\u2014")[-1].strip() if "\u2014" in title else title
        sy = d["symbols"]
        books[n] = {
            "display": nz(d.get("name")) or n.capitalize(),
            "meaning": nz(d.get("meaning_line")),
            "number": num, "ntitle": title,
            "symbols": [sy["planet"]["name"], sy["gemstone"]["name"],
                        sy["flower"]["name"], sy["colour"]["name"]],
            "etymology": nz(d.get("etymology")),
            "portrait": nz(d["numerology"].get("portrait")),
            "legends": [{"n": nz(b.get("full_name")), "c": nz(b.get("category")),
                         "o": nz(b.get("nationality")), "d": nz(b.get("dates"))}
                        for b in d["famous_bearers"][:10]],
            "fiction": [{"n": nz(f.get("character")),
                         "f": nz(f.get("source") or f.get("franchise"))}
                        for f in d["fiction"]],
        }
        assert len(books[n]["legends"]) == 10, f"{n}: {len(books[n]['legends'])} legends"
    return books


def write_books_js(books):
    slim = {}
    for k, b in books.items():
        slim[k] = {x: b[x] for x in ("display", "meaning", "number", "ntitle",
                                     "symbols", "legends", "fiction")}
    out = ("// Name Fame — published books data (generated by tools/generate.py)\n"
           "const BOOKS = " + json.dumps(slim, ensure_ascii=False, indent=1) + ";\n")
    open(os.path.join(SITE, "books.js"), "w", encoding="utf-8").write(out)


PAGE_TMPL = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="book">
<meta property="og:url" content="{url}">
<meta property="og:site_name" content="Name Fame">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{base}/images/cover_john_front.jpg">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#12294E">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%231B3A6B'/%3E%3Ctext x='50' y='72' font-size='62' text-anchor='middle' fill='%23C9A84C'%3E%E2%9C%A6%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cinzel:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">
<script type="application/ld+json">{jsonld}</script>
</head>
<body>

<nav id="nav">
  <a href="../" class="nav-logo"><img src="../images/logo.webp" alt="Name Fame" width="1200" height="344"></a>
  <div class="nav-links">
    <a href="../#inside">Inside the Book</a>
    <a href="../#symbols">Symbols</a>
    <a href="../#discover">Discover Your Name</a>
    <a href="../#collection">Collection</a>
  </div>
</nav>

<header class="name-hero">
  <p class="name-breadcrumb"><a href="../">Name Fame</a> &nbsp;\u2726&nbsp; <a href="../#collection">The Collection</a> &nbsp;\u2726&nbsp; {display}</p>
  <p class="kicker kicker-gold">An Illustrated Keepsake Book</p>
  <h1>{display}</h1>
  <p class="name-meaning">{meaning}</p>
  <div class="name-chips">
    <span class="modal-chip">Number {number} \u2014 {ntitle}</span>
    <span class="modal-chip">{symbols}</span>
  </div>
</header>

<main>
  <section class="name-section section-cream">
    <div class="container">
      <h2>The Story of the Name</h2>
      <p>{etymology}</p>
    </div>
  </section>

  <section class="name-section section-cream">
    <div class="container">
      <h2>The Numerology of {display}</h2>
      <p>In the Pythagorean tradition, the letters of {display} add up to the number
      <strong>{number}</strong> \u2014 \u201c{ntitle}\u201d. {portrait}</p>
      <p>Its four emblems in classical tradition: the planet <strong>{sym0}</strong>,
      the gemstone <strong>{sym1}</strong>, the flower <strong>{sym2}</strong> and the
      colour <strong>{sym3}</strong>.</p>
    </div>
  </section>

  <section class="name-section section-cream">
    <div class="container">
      <h2>The Ten Legends Named {display}</h2>
      <p>The <em>Name Fame: {display}</em> book devotes an illustrated double-page
      spread to each of these ten remarkable bearers of the name:</p>
      <ul class="modal-list">
{legends_html}
      </ul>
    </div>
  </section>

  <section class="name-section section-cream">
    <div class="container">
      <h2>{display} Beyond Reality</h2>
      <p>The name also lives in fiction, carried by beloved characters of page and screen:</p>
      <ul class="modal-list">
{fiction_html}
      </ul>
    </div>
  </section>

  <div class="name-cta section-cream">
    <a class="btn btn-gold" href="../#collection">Explore all {count} names</a>
    <a class="btn btn-ghost" href="../?name={slug}#discover">Reveal this name's number</a>
  </div>
</main>

<footer>
  <img class="footer-logo" src="../images/logo.webp" alt="Name Fame" width="1200" height="344" loading="lazy">
  <p class="footer-tag">10\u00a0Legends\u2002\u2726\u20021\u00a0Name\u2002\u2726\u2002Your\u00a0Story</p>
  <p class="footer-copy">\u00a9 2026 Name Fame. All rights reserved.</p>
</footer>

</body>
</html>
"""


def write_pages(books):
    os.makedirs(os.path.join(SITE, "names"), exist_ok=True)
    e = html.escape
    for slug, b in books.items():
        url = f"{BASE_URL}/names/{slug}.html"
        disp = b["display"]
        l3 = ", ".join(x["n"] for x in b["legends"][:3])
        desc = (f"{b['meaning']} Discover the numerology, symbols and famous bearers of "
                f"the name {disp} \u2014 {l3} and more, in an illustrated keepsake book.")
        if len(desc) > 300:
            desc = desc[:297] + "\u2026"
        title = f"{disp} \u2014 Name Meaning, Numerology & Famous Bearers | Name Fame"
        jsonld = json.dumps([
            {"@context": "https://schema.org", "@type": "Book",
             "name": f"Name Fame: {disp}",
             "url": url, "inLanguage": "en",
             "bookFormat": "https://schema.org/Paperback",
             "publisher": {"@type": "Organization", "name": "Name Fame"},
             "description": desc,
             "about": [{"@type": "Person", "name": p["n"]} for p in b["legends"]]},
            {"@context": "https://schema.org", "@type": "BreadcrumbList",
             "itemListElement": [
                 {"@type": "ListItem", "position": 1, "name": "Name Fame", "item": BASE_URL + "/"},
                 {"@type": "ListItem", "position": 2, "name": "The Collection", "item": BASE_URL + "/#collection"},
                 {"@type": "ListItem", "position": 3, "name": disp, "item": url}]},
        ], ensure_ascii=False)
        legends_html = "\n".join(
            f'        <li><span class="ml-name">{e(p["n"])}</span>'
            f'<span class="ml-meta">{e(p["c"])} \u00b7 {e(p["o"])} \u00b7 {e(p["d"])}</span></li>'
            for p in b["legends"])
        fiction_html = "\n".join(
            f'        <li><span class="ml-name">{e(p["n"])}</span>'
            f'<span class="ml-meta">{e(p["f"])}</span></li>'
            for p in b["fiction"])
        page = PAGE_TMPL.format(
            title=e(title), desc=e(desc), url=url, base=BASE_URL, jsonld=jsonld,
            display=e(disp), meaning=e(b["meaning"]),
            number=b["number"], ntitle=e(b["ntitle"]),
            symbols=" \u2726 ".join(e(s) for s in b["symbols"]),
            sym0=e(b["symbols"][0]), sym1=e(b["symbols"][1]),
            sym2=e(b["symbols"][2]), sym3=e(b["symbols"][3]),
            etymology=e(b["etymology"]), portrait=e(b["portrait"]),
            legends_html=legends_html, fiction_html=fiction_html,
            count=len(books), slug=slug)
        open(os.path.join(SITE, "names", slug + ".html"), "w", encoding="utf-8").write(page)


def write_sitemap(books):
    today = datetime.date.today().isoformat()
    urls = [f"{BASE_URL}/"] + [f"{BASE_URL}/names/{s}.html" for s in NAMES]
    items = "\n".join(
        f" <url><loc>{u}</loc><lastmod>{today}</lastmod></url>" for u in urls)
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           f"{items}\n</urlset>\n")
    open(os.path.join(SITE, "sitemap.xml"), "w", encoding="utf-8").write(xml)
    open(os.path.join(SITE, "robots.txt"), "w", encoding="utf-8").write(
        f"User-agent: *\nAllow: /\n\nSitemap: {BASE_URL}/sitemap.xml\n")


def patch_index(books):
    p = os.path.join(SITE, "index.html")
    src = open(p, encoding="utf-8").read()

    def links(slugs):
        out = []
        for s in slugs:
            d = html.escape(books[s]["display"])
            out.append(f'          <li><a href="names/{s}.html" data-name="{s}">{d}</a></li>')
        return "\n".join(out)

    def between(text, start, end, repl):
        pat = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
        return pat.sub(start + "\n" + repl + "\n" + end, text)

    src = between(src, "<!-- BOYS:START -->", "<!-- BOYS:END -->", links(BOYS))
    src = between(src, "<!-- GIRLS:START -->", "<!-- GIRLS:END -->", links(GIRLS))

    n = len(books)
    word = COUNT_WORDS.get(n, str(n))
    src = re.sub(r"<!-- COUNT:START -->.*?<!-- COUNT:END -->",
                 f"<!-- COUNT:START -->{word} Names, {word} Books<!-- COUNT:END -->", src, flags=re.S)
    src = re.sub(r"<!-- COUNTLEAD:START -->.*?<!-- COUNTLEAD:END -->",
                 f"<!-- COUNTLEAD:START -->{word.lower()}<!-- COUNTLEAD:END -->", src, flags=re.S)

    ld = json.dumps([
        {"@context": "https://schema.org", "@type": "WebSite",
         "name": "Name Fame", "url": BASE_URL + "/"},
        {"@context": "https://schema.org", "@type": "Organization",
         "name": "Name Fame", "url": BASE_URL + "/",
         "logo": BASE_URL + "/images/logo.png",
         "description": "Publisher of the Name Fame illustrated keepsake book series: "
                        "one first name, one book \u2014 history, symbols, numerology and "
                        "ten famous bearers per name."},
        {"@context": "https://schema.org", "@type": "ItemList",
         "name": "The Name Fame Collection",
         "numberOfItems": n,
         "itemListElement": [
             {"@type": "ListItem", "position": i + 1,
              "name": books[s]["display"],
              "url": f"{BASE_URL}/names/{s}.html"}
             for i, s in enumerate(NAMES)]},
    ], ensure_ascii=False)
    src = between(src, "<!-- JSONLD:START -->", "<!-- JSONLD:END -->",
                  f'<script type="application/ld+json">{ld}</script>')
    open(p, "w", encoding="utf-8", newline="\n").write(src)


if __name__ == "__main__":
    books = load_books()
    assert len(books) == len(NAMES) == len(set(NAMES)), (len(books), len(NAMES))
    write_books_js(books)
    write_pages(books)
    write_sitemap(books)
    patch_index(books)
    print(f"OK \u2014 {len(books)} books: books.js, names/*.html, sitemap.xml, robots.txt, index patched")
