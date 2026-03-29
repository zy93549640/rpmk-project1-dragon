import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";

const pluginsJsPath = path.resolve(process.cwd(), "js", "plugins.js");
const code = fs.readFileSync(pluginsJsPath, "utf8");

const ctx = {};
vm.createContext(ctx);
vm.runInContext(code, ctx, { filename: pluginsJsPath });

const plugins = ctx.$plugins ?? [];

const rows = plugins.map((p) => ({
  name: p?.name ?? "",
  status: !!p?.status,
  description: p?.description ?? "",
  parameters: p?.parameters ?? {},
}));

const args = new Set(process.argv.slice(2));
if (args.has("--enabled-names")) {
  const enabled = rows.filter((r) => r.status).map((r) => r.name);
  process.stdout.write(`${enabled.join("\n")}\n`);
} else if (args.has("--enabled-summary")) {
  const enabled = rows.filter((r) => r.status);
  process.stdout.write(
    JSON.stringify(
      {
        total: rows.length,
        enabled: enabled.length,
        enabledNames: enabled.map((r) => r.name),
      },
      null,
      2
    ) + "\n"
  );
} else {
  process.stdout.write(`${JSON.stringify(rows, null, 2)}\n`);
}
