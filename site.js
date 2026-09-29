/**
 * Edit this object to update the site. Leave a field as "" or [] to hide it.
 * projects.status is "current" or "past". href on a project is optional.
 */
const site = {
  name: "ኔት",
  latinName: "Net",
  location: "Matthews, North Carolina",
  lede: "A quiet home for what I’m doing, what I’ve finished, and a resume you can actually read.",
  email: "",
  updated: "September 2026",
  x: {
    label: "X",
    href: "https://x.com/_natorade_",
    handle: "@_natorade_",
  },
  about: [
    "I go by ኔት — Net, if you need the Latin letters. I live in Matthews, North Carolina.",
    "This is the short version: a little about me, projects split into current and past, and a resume that prints cleanly. The page is built to load fast, stay readable, and work with a keyboard.",
  ],
  facts: [
    { label: "Based in", value: "Matthews, North Carolina" },
    { label: "Focus", value: "Fast, accessible pages" },
    { label: "Find me", value: "@_natorade_", href: "https://x.com/_natorade_" },
  ],
  workNote: "Sample projects. Replace them with work you want to show.",
  projects: [
    {
      title: "Personal site",
      year: "2026",
      status: "current",
      summary:
        "The page you’re on. A light home for a resume, a project list, and a short introduction — no account, no extra scripts beyond the page itself.",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Morning glance",
      year: "2026",
      status: "current",
      summary:
        "A one-look page for the day in Matthews: temperature, wind, and whether a walk makes sense. Still in progress.",
      tags: ["Web", "Local"],
    },
    {
      title: "Match notes",
      year: "2024",
      status: "past",
      summary:
        "A tiny page for writing down what happened in a game — the score and a few lines, nothing more. Retired once a notebook did the same job.",
      tags: ["Notes"],
    },
    {
      title: "List strip",
      year: "2023",
      status: "past",
      summary:
        "A grocery list that stayed on the device and opened instantly. Replaced by something simpler.",
      tags: ["Utility"],
    },
  ],
  resumeNote: "Starter resume. Replace these entries with your own history.",
  experience: [
    {
      title: "Independent",
      org: "Self-directed",
      location: "Matthews, North Carolina",
      start: "2024",
      end: "Now",
      highlights: [
        "Build small websites that load quickly and stay readable on a phone.",
        "Treat accessibility as part of the layout: headings, contrast, keyboard, and a skip link.",
        "Keep personal tools free of accounts when the browser is enough.",
      ],
    },
  ],
  education: [],
  skills: [
    { label: "Making", items: ["HTML", "CSS", "JavaScript"] },
    { label: "Care", items: ["Accessibility", "Fast pages", "Clear writing"] },
  ],
};

const main = document.querySelector("#content");
let filter = "all";

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function link(href, label) {
  const external = href.startsWith("http");
  const extra = external ? ' target="_blank" rel="noopener noreferrer"' : "";
  const sr = external ? '<span class="sr-only"> (opens in a new tab)</span>' : "";
  return `<a class="link" href="${esc(href)}"${extra}>${esc(label)}${sr}</a>`;
}

function counts() {
  return {
    all: site.projects.length,
    current: site.projects.filter((project) => project.status === "current").length,
    past: site.projects.filter((project) => project.status === "past").length,
  };
}

function projectList() {
  const visible = site.projects.filter((project) => filter === "all" || project.status === filter);
  if (visible.length === 0) return '<p class="muted">No projects in this view yet.</p>';
  return `<ol class="projects">${visible
    .map((project, index) => {
      const status = project.status === "current" ? "Current" : "Past";
      const tags = project.tags.length
        ? `<ul class="tags" aria-label="${esc(project.title)} tags">${project.tags
            .map((tag) => `<li>${esc(tag)}</li>`)
            .join("")}</ul>`
        : "";
      const visit = project.href
        ? `<p><a class="visit link" href="${esc(project.href)}" target="_blank" rel="noopener noreferrer">Visit <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></p>`
        : "";
      return `<li>
        <p class="index">${String(index + 1).padStart(2, "0")}</p>
        <article>
          <div class="project-top">
            <h3>${esc(project.title)}</h3>
            <p class="meta"><span class="${project.status === "current" ? "current" : ""}">${status}</span> · <span>${esc(project.year)}</span></p>
          </div>
          <p class="summary">${esc(project.summary)}</p>
          ${tags}
          ${visit}
        </article>
      </li>`;
    })
    .join("")}</ol>`;
}

function filters() {
  const tally = counts();
  return ["all", "current", "past"]
    .map((id) => {
      const label = id[0].toUpperCase() + id.slice(1);
      return `<button type="button" data-filter="${id}" aria-pressed="${filter === id}">${label} <span class="count">${tally[id]}</span></button>`;
    })
    .join("");
}

function render() {
  const about =
    site.about.length || site.facts.length
      ? `<section id="about" aria-labelledby="about-title">
          <div class="section-head"><div><p class="eyebrow">Personal</p><h2 id="about-title">About</h2></div></div>
          <div class="split">
            <div class="prose">${site.about.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</div>
            ${
              site.facts.length
                ? `<dl class="facts">${site.facts
                    .map(
                      (fact) =>
                        `<div><dt>${esc(fact.label)}</dt><dd>${fact.href ? link(fact.href, fact.value) : esc(fact.value)}</dd></div>`,
                    )
                    .join("")}</dl>`
                : ""
            }
          </div>
        </section>`
      : "";

  const jobs = site.experience.length
    ? `<ol class="jobs">${site.experience
        .map(
          (job) => `<li><article>
            <p class="when">${esc(job.start)} — ${esc(job.end)}</p>
            <h3>${esc(job.title)}</h3>
            <p class="org">${esc(job.org)}${job.location ? ` · ${esc(job.location)}` : ""}</p>
            ${
              job.highlights.length
                ? `<ul>${job.highlights.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
                : ""
            }
          </article></li>`,
        )
        .join("")}</ol>`
    : '<p class="muted">No roles listed yet.</p>';

  const education = site.education.length
    ? `<div class="edu"><h3>Education</h3><ul>${site.education
        .map(
          (item) =>
            `<li><p>${esc(item.credential)}</p><p class="small muted">${esc(item.school)} · ${esc(item.year)}</p></li>`,
        )
        .join("")}</ul></div>`
    : "";

  const skills = site.skills.length
    ? `<div class="side"><h3>Skills</h3><dl>${site.skills
        .map((group) => `<div><dt>${esc(group.label)}</dt><dd>${esc(group.items.join(", "))}</dd></div>`)
        .join("")}</dl></div>`
    : "";

  const email = site.email
    ? `<li><a class="link" href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>`
    : "";

  main.innerHTML = `
    <header class="hero wrap">
      <p class="kicker rise"><span>${esc(site.location)}</span>${link(site.x.href, site.x.handle)}</p>
      <h1 class="name rise rise-2"><span lang="am">${esc(site.name)}</span></h1>
      <p class="latin rise rise-2">${esc(site.latinName)}</p>
      <span class="rule rise rise-3" aria-hidden="true"></span>
      <p class="lede rise rise-3">${esc(site.lede)}</p>
      <div class="actions rise rise-3">
        <a class="button" href="#work">See the work</a>
        <a class="link ghost" href="#resume">Read the resume</a>
      </div>
    </header>
    <div class="wrap">
      ${about}
      <section id="work" aria-labelledby="work-title">
        <div class="section-head">
          <div>
            <p class="eyebrow">Projects</p>
            <h2 id="work-title">Work</h2>
            ${site.workNote ? `<p class="note">${esc(site.workNote)}</p>` : ""}
          </div>
        </div>
        <div class="filters no-print" role="group" aria-label="Filter projects">${filters()}</div>
        <div id="project-list">${projectList()}</div>
      </section>
      <section id="resume" aria-labelledby="resume-title">
        <div class="section-head">
          <div>
            <p class="eyebrow">Resume</p>
            <h2 id="resume-title">Experience</h2>
            ${site.resumeNote ? `<p class="note">${esc(site.resumeNote)}</p>` : ""}
          </div>
          <button class="button no-print" type="button" id="print-resume">Print resume</button>
        </div>
        <div class="print-only">
          <p class="name" style="font-size:2.25rem"><span lang="am">${esc(site.name)}</span></p>
          <p class="latin">${esc(site.latinName)}</p>
          <p class="small" style="margin-top:0.75rem">${esc(site.location)}${site.email ? ` · ${esc(site.email)}` : ""} · ${esc(site.x.handle)}</p>
        </div>
        <div class="resume-grid split">
          <div>${jobs}${education}</div>
          ${skills}
        </div>
      </section>
    </div>
    <footer class="contact" id="contact">
      <div class="wrap">
        <p class="eyebrow">Contact</p>
        <h2>Say hello</h2>
        <p class="intro">${esc(site.location)}. The fastest way to reach me is on ${esc(site.x.label)}.</p>
        <ul class="contact-list">
          <li><a class="link" href="${esc(site.x.href)}" target="_blank" rel="noopener noreferrer">${esc(site.x.handle)}<span class="sr-only"> on ${esc(site.x.label)} (opens in a new tab)</span></a></li>
          ${email}
        </ul>
        <div class="fine">
          <p><span class="eth" lang="am">${esc(site.name)}</span> · ${esc(site.latinName)}</p>
          <p>${site.updated ? `Updated ${esc(site.updated)}` : ""}</p>
          <a class="link" href="#top">Back to top</a>
        </div>
      </div>
    </footer>`;

  document.querySelector("#print-resume").addEventListener("click", () => window.print());
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      document.querySelector("#project-list").innerHTML = projectList();
    });
  });
}

render();
