(() => {
  const root = new URL("./", document.currentScript.src).href;   // .../blog/
  const site = new URL("../", root).href;                         // site kökü
  const B = window.BLOG;
  const $ = (q) => document.querySelector(q);
  const put = (q, html) => { const el = $(q); if (el) el.innerHTML = html; };

  const S = {
    portfolio: { tr: "Portfolyo", en: "Portfolio" },
    blog: { tr: "Blog", en: "Blog" },
    chapters: { tr: "Bölümler", en: "Chapters" },
    contents: { tr: "İçindekiler", en: "Contents" },
    prev: { tr: "Önceki", en: "Previous" },
    next: { tr: "Sonraki", en: "Next" },
    draft: { tr: "taslak", en: "draft" },
    count: { tr: "bölüm", en: "chapters" },
    draftNote: {
      tr: "Bu bölüm taslak; notlar eklendikçe güncellenecek.",
      en: "This chapter is a draft; it will be updated as I add notes."
    }
  };

  let lang = localStorage.getItem("portfolio-language") ||
    (navigator.language.startsWith("tr") ? "tr" : "en");
  const t = (o) => o[lang] || o.tr;
  const name = (c) => (lang === "en" && c.e) || c.t;

  const seriesHref = (s) => `${root}${s.path}/index.html`;
  const chHref = (s, g, c) => `${root}${s.path}/${g.id}/${c.slug}.html`;
  const flat = (s) => s.groups.flatMap((g) => g.chapters.map((c) => ({ g, c, href: chHref(s, g, c) })));
  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (d) => new Date(d).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  const crumbs = (...tail) =>
    [[t(S.portfolio), site + "index.html"], [t(S.blog), root + "index.html"], ...tail]
      .map(([l, h], i, a) => (h && i < a.length - 1 ? `<a href="${h}">${l}</a>` : `<span>${l}</span>`))
      .join("<i>/</i>");

  const card = (href, label, text, cls) =>
    `<a class="${cls}" href="${href}"><small>${label}</small><strong>${text}</strong></a>`;

  function home() {
    put("#crumbs", crumbs());
    put("#series-list", B.series.map((s) =>
      `<a class="project" href="${seriesHref(s)}"><div><h3>${t(s.title)} <span>→</span></h3><p>${t(s.desc)}</p></div>
       <div class="tags small">${s.groups.map((g) => `<span>${t(g.title)}</span>`).join("")}<span>${flat(s).length} ${t(S.count)}</span></div></a>`
    ).join(""));
    document.title = "Blog · Gökhan Gökcen";
  }

  function seriesPage(s) {
    put("#crumbs", crumbs([t(s.title), null]));
    put("#series-title", t(s.title));
    put("#series-desc", t(s.desc));
    document.title = `${t(s.title)} · Gökhan Gökcen`;
    let n = 0;
    put("#chapter-list", s.groups.map((g) =>
      `<h2 id="${g.id}">${t(g.title)}</h2><ol class="chapters">${g.chapters.map((c) =>
        `<li><a href="${chHref(s, g, c)}"><span class="num">${pad(++n)}</span><span>${name(c)}</span>${c.draft ? `<em class="badge">${t(S.draft)}</em>` : ""}</a></li>`
      ).join("")}</ol>`
    ).join(""));
  }

  function chapterPage(s) {
    const all = flat(s);
    const slug = location.pathname.split("/").pop().replace(/\.html?$/, "");
    const i = all.findIndex((x) => x.c.slug === slug);
    if (i < 0) return;
    const { g, c } = all[i];

    put("#crumbs", crumbs([t(s.title), seriesHref(s)], [name(c), null]));
    put("#post-eyebrow", `${t(g.title)} · ${pad(i + 1)}/${pad(all.length)}`);
    put("#post-title", name(c));
    put("#post-meta", c.date ? fmt(c.date) : "");
    document.title = `${name(c)} · ${t(s.title)} · Gökhan Gökcen`;

    const dn = $("#draft-note");
    if (dn) { dn.hidden = !c.draft; dn.textContent = t(S.draftNote); }

    let n = 0;
    put("#picker",
      `<summary>${t(S.chapters)} · ${i + 1}/${all.length}</summary><div>${s.groups.map((gr) =>
        `<p class="group-label">${t(gr.title)}</p><ol class="chapters">${gr.chapters.map((ch) => {
          n++;
          return `<li><a href="${chHref(s, gr, ch)}"${ch === c ? ' class="current" aria-current="page"' : ""}><span class="num">${pad(n)}</span><span>${name(ch)}</span></a></li>`;
        }).join("")}</ol>`
      ).join("")}<a class="all" href="${seriesHref(s)}">${t(S.contents)} →</a></div>`);

    const p = all[i - 1], q = all[i + 1];
    put("#pager",
      (p ? card(p.href, "← " + t(S.prev), name(p.c), "prev") : card(seriesHref(s), "← " + t(S.contents), t(s.title), "prev")) +
      (q ? card(q.href, t(S.next) + " →", name(q.c), "next") : card(seriesHref(s), t(S.contents) + " →", t(s.title), "next")));
  }

  function buildToc() {
    const nav = $(".toc nav");
    if (!nav) return;
    const hs = [...document.querySelectorAll("main h2")];
    hs.forEach((h, k) => { h.id = h.id || `s${k + 1}`; });
    nav.innerHTML = hs.map((h) => `<a href="#${h.id}">${h.textContent}</a>`).join("");
    spy();
  }

  function spy() {
    const hs = [...document.querySelectorAll("main h2[id]")];
    if (!hs.length) return;
    const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    const cur = atEnd ? hs.at(-1) : hs.filter((h) => h.getBoundingClientRect().top <= 96).at(-1) || hs[0];
    document.querySelectorAll(".toc a").forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === `#${cur.id}`));
  }

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-tr][data-en]").forEach((n) => { n.innerHTML = n.dataset[lang]; });
    document.querySelectorAll("[data-lang]").forEach((n) => n.classList.toggle("active", n.dataset.lang === lang));
    const page = document.body.dataset.page;
    const s = B.series.find((x) => x.id === document.body.dataset.series);
    if (page === "home") home();
    else if (s && page === "series") seriesPage(s);
    else if (s && page === "chapter") chapterPage(s);
    buildToc();
  }

  $(".language-switch").addEventListener("click", () => {
    lang = lang === "tr" ? "en" : "tr";
    localStorage.setItem("portfolio-language", lang);
    render();
  });
  addEventListener("scroll", spy, { passive: true });
  addEventListener("resize", spy);

  $("#year").textContent = new Date().getFullYear();
  render();
})();
