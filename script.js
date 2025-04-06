const products = [
    { name: "Pain au chocolat / Pão amassado", score: 8.5, country: "fr" },
    { name: "Miojo de pata(coada)", score: 7.5, country: "net" },
    { name: "Bombom da Kinder", score: 7.5, country: "ger" },
    { name: "Chorizo (aka plural de patrão, aka macadâmia ??) ", score: 8.5, country: "fr" },
    { name: "Bala vermelha ", score: 8.0, country: "pol" },
    { name: "Miojo \"Ostry\" ", score: 8.0, country: "pol" },
    { name: "Chocoate Bruno Mars ", score: 8.7, country: "ger" },
];

const countryImages = {
    "pol": "images/pol.png",
    "net": "images/net.png",
    "ger": "images/ger.png",
    "fr" : "images/fr.png"
};

function getColor(score) {
    if (score < 6) return "red";
    if (score < 8) return "yellow";
    return "green";
}

const grid = document.getElementById("scoreGrid");

products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.className = "flag";
    img.src = countryImages[product.country] || "images/placeholder.png";
    img.alt = product.country;

    const details = document.createElement("div");
    details.className = "details";

    const name = document.createElement("div");
    name.textContent = product.name;

    const score = document.createElement("div");
    score.className = `score ${getColor(product.score)}`;
    score.textContent = product.score.toFixed(1);

    details.appendChild(name);
    details.appendChild(score);
    card.appendChild(img);
    card.appendChild(details);

    grid.appendChild(card);
});

// === STATS ===
const statsContainer = document.getElementById("statistics");

function computeStats(products) {
  const perCountry = {};
  const total = products.length;
  const totalScore = products.reduce((sum, p) => sum + p.score, 0);

  products.forEach(({ country, score }) => {
    if (!perCountry[country]) {
      perCountry[country] = { count: 0, totalScore: 0 };
    }
    perCountry[country].count += 1;
    perCountry[country].totalScore += score;
  });

  const stats = [];

  // Per-country stats first
  for (const country in perCountry) {
    const data = perCountry[country];
    const avg = data.totalScore / data.count;
    stats.push({
      country,
      title: "Products",
      value: data.count
    });
    stats.push({
      country,
      title: "Avg Score",
      value: avg.toFixed(2),
      color: getColor(avg)
    });
  }

  // Total stats at the end
  stats.push({
    title: "Total products",
    value: total
  });

  stats.push({
    title: "Total average score",
    value: (totalScore / total).toFixed(2),
    color: getColor(totalScore / total)
  });

  return stats;
}

function renderStats(stats) {
  stats.forEach(stat => {
    const card = document.createElement("div");
    card.className = "stat-card";

    let flagHTML = "";
    if (stat.country) {
      const imgSrc = countryImages[stat.country] || "images/placeholder.png";
      flagHTML = `<img class="flag" src="${imgSrc}" alt="${stat.country}" />`;
    }

    const valueClass = stat.color ? `stat-value ${stat.color}` : "";

    card.innerHTML = `
      ${flagHTML}
      <span>${stat.title}:</span> <strong class="${valueClass}">${stat.value}</strong>
    `;
    statsContainer.appendChild(card);
  });
}

const stats = computeStats(products);
renderStats(stats);