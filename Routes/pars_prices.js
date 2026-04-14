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

function expandRoutes(row, busRoutes, tramRoutes) {
  const results = [];

  // ТРАМВАИ
  if (row.rawRoute.startsWith("ТМ")) {
    // Извлекаем все числа из строки (например, "ТМ 2, 3, 4, 56, 7, 8, 11, 12" -> ["2","3","4","56","7","8","11","12"])
    let numbers = row.rawRoute.replace("ТМ", "").match(/\d+/g) || [];

    // Исправляем конкретную проблему: если есть "56", разбиваем на "5" и "6"
    const fixedNumbers = [];
    numbers.forEach(num => {
      if (num === "56") {
        fixedNumbers.push("5", "6");
      } else {
        fixedNumbers.push(num);
      }
    });

    // Убираем возможные дубликаты (на случай, если 5 и 6 уже были отдельно)
    const uniqueNumbers = [...new Set(fixedNumbers)];

    uniqueNumbers.forEach(num => {
      results.push({
        route: num,
        transport: "tram",
        carrier: row.carrier,
        phones: row.phones,
        emails: row.emails,
        inn: row.inn,
        routeName: tramRoutes[num] || null   // если название не найдено, останется null
      });
    });

    return results;
  }

  // АВТОБУСЫ (без изменений)
  results.push({
    route: row.rawRoute,
    transport: "bus",
    carrier: row.carrier,
    phones: row.phones,
    emails: row.emails,
    inn: row.inn,
    routeName: busRoutes[row.rawRoute] || null
  });

  return results;
}

(async () => {
  try {
    const carriers = await parseCarriers();

    const busRoutes = await parseRoutes(BUS_ROUTES_URL);
    const tramRoutes = await parseRoutes(TRAM_ROUTES_URL);

    const result = [];

    carriers.forEach(row => {
      result.push(...expandRoutes(row, busRoutes, tramRoutes));
    });

    fs.writeFileSync(
      "routes.json",
      JSON.stringify(result, null, 2),
      "utf8"
    );

    console.log("✅ routes.json создан (с исправлением для 56 трамвая)");
    process.exit(0);
  } catch (e) {
    console.error("❌ Ошибка:", e.message);
  }
})();