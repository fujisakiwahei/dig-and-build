import { createClient } from "microcms-js-sdk";
import fs from "fs";
import path from "path";

const env = fs.readFileSync(path.resolve(".env"), "utf-8");
const vars = Object.fromEntries(env.split("\n").filter(Boolean).map(l => {
  const [k, ...rest] = l.split("=");
  return [k.trim(), rest.join("=").trim()];
}));

const client = createClient({
  serviceDomain: vars.MICROCMS_SERVICE_DOMAIN,
  apiKey: vars.MICROCMS_API_KEY,
});

for (const ep of ["articles", "categories", "prefectures", "areas"]) {
  try {
    const res = await client.get({ endpoint: ep, queries: { limit: 2 } });
    console.log(`=== ${ep} ===`);
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.log(`=== ${ep} ERROR ===`, e.message);
  }
}
