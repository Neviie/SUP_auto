const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const CARRIERS_URL = "https://gortransperm.ru/info/carriers/";
const BUS_ROUTES_URL = "https://www.m.gortransperm.ru/routes-list/0/";
const TRAM_ROUTES_URL = "https://www.m.gortransperm.ru/routes-list/2/";

async function parseCarriers() {
  const { data } = await axios.get(CARRIERS_URL);
  const $ = cheerio.load(data);

  const rows = [];

  $("#myTable tbody tr").each((_, row) => {
    const tds = $(row).find("td");

    const rawRoute = $(tds[0]).text().trim();
    const carrier = $(tds[1]).text().trim();

    const phones = $(tds[2])
      .html()
      ?.split("<br>")
      .map(v => v.replace(/<[^>]+>/g, "").trim())
      .filter(Boolean) || [];

    const emails = $(tds[3])
      .html()
      ?.split("<br>")
      .map(v => v.replace(/<[^>]+>/g, "").trim())
      .filter(Boolean) || [];

    const inn = $(tds[4]).text().trim();

    rows.push({ rawRoute, carrier, phones, emails, inn });
  });

  return rows;
}

async function parseRoutes(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const routes = {};

  $("li a").each((_, el) => {
    const full = $(el).text().trim();
    if (!full.includes(",")) return;

    const number = full.split(",")[0].trim();
    routes[number] = full;
  });

  return routes;
}

function expandRoutes(row, allRoutes) {
  const results = [];

  // ТРАМВАИ
  if (row.rawRoute.startsWith("ТМ")) {
    const numbers = row.rawRoute
      .replace("ТМ", "")
      .split(",")
      .map(n => n.trim());

    numbers.forEach(num => {
      results.push({
        route: num,
        transport: "tram",
        carrier: row.carrier,
        phones: row.phones,
        emails: row.emails,
        inn: row.inn,
        routeName: allRoutes[num] || null
      });
    });

    return results;
  }

  // АВТОБУСЫ (1, 1А, 300Т и т.п.)
  results.push({
    route: row.rawRoute,
    transport: "bus",
    carrier: row.carrier,
    phones: row.phones,
    emails: row.emails,
    inn: row.inn,
    routeName: allRoutes[row.rawRoute] || null
  });

  return results;
}

(async () => {
  try {
    const carriers = await parseCarriers();

    const busRoutes = await parseRoutes(BUS_ROUTES_URL);
    const tramRoutes = await parseRoutes(TRAM_ROUTES_URL);
    const allRoutes = { ...busRoutes, ...tramRoutes };

    const result = [];

    carriers.forEach(row => {
      result.push(...expandRoutes(row, allRoutes));
    });

    fs.writeFileSync(
      "routes.json",
      JSON.stringify(result, null, 2),
      "utf8"
    );

    console.log("✅ routes.json создан (автобусы + трамваи)");
    process.exit(0);
  } catch (e) {
    console.error("❌ Ошибка:", e.message);
  }
})();
