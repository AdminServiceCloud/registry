#!/usr/bin/env node
// ✅ Registry configuration validator: JSON Schema conformance + structural
// integrity rules from AGENTS.md. Exits non-zero on the first collected batch
// of failures so CI fails the check.
//
// Runs directly under Node.js 24+ (native TypeScript type stripping):
//   node scripts/validate.ts

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Ajv2020 } from "ajv/dist/2020.js";
import type { ValidateFunction } from "ajv/dist/2020.js";
import formatsPlugin from "ajv-formats";

// ajv-formats is CJS: at runtime module.exports and its .default are the same
// function; under nodenext typings only .default is callable.
const addFormats = formatsPlugin.default;

interface CategoryLink {
  name: string;
  title?: string;
  emoji?: string;
  description?: string;
  index: string;
}

interface PackageEntry {
  name: string;
  type: "app" | "stack";
  title?: string;
  description: string;
  source: { git?: string; url?: string; path?: string };
  tags?: string[];
}

interface RegistryIndex {
  name: string;
  title?: string;
  description?: string;
  format_version: number;
  updated_at?: string;
  categories: CategoryLink[];
}

interface CategoryFile {
  category: string;
  children?: CategoryLink[];
  packages: PackageEntry[];
}

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));

let failures = 0;
const fail = (file: string, msg: string): void => {
  failures++;
  console.error(`  ❌ ${file}: ${msg}`);
};

function loadJson(rel: string): unknown {
  let text: string;
  try {
    text = readFileSync(join(ROOT, rel), "utf8");
  } catch (e) {
    fail(rel, `cannot read file: ${(e as Error).message}`);
    return null;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    fail(rel, `invalid JSON: ${(e as Error).message}`);
    return null;
  }
}

function finish(): never {
  if (failures) {
    console.error(`\n💥 ${failures} problem(s) found`);
    process.exit(1);
  }
  console.log(`\n🎉 Registry is valid: ${visited.size} category file(s), ${packageNames.size} package(s)`);
  process.exit(0);
}

// ── 1. Compile all schemas (a schema that does not compile is itself a bug) ──
console.log("📐 Compiling schemas…");
const ajv = new Ajv2020({ allErrors: true, allowUnionTypes: true });
addFormats(ajv);

const validators = new Map<string, ValidateFunction>();
for (const name of readdirSync(join(ROOT, "schema")).filter((f) => f.endsWith(".json"))) {
  const rel = `schema/${name}`;
  const schema = loadJson(rel);
  if (!schema) continue;
  try {
    validators.set(name, ajv.compile(schema));
    console.log(`  ✅ ${rel}`);
  } catch (e) {
    fail(rel, `schema does not compile: ${(e as Error).message}`);
  }
}
if (failures) finish();

const validateRegistry = validators.get("registry.schema.json")!;
const validateCategory = validators.get("category.schema.json")!;

function checkSchema(rel: string, data: unknown, validate: ValidateFunction): boolean {
  if (!validate(data)) {
    for (const err of validate.errors ?? []) {
      fail(rel, `${err.instancePath || "/"} ${err.message}`);
    }
    return false;
  }
  return true;
}

// English-only rule: titles, descriptions and tags must not contain Cyrillic.
function checkEnglish(rel: string, where: string, value: string | undefined): void {
  if (typeof value === "string" && /[Ѐ-ӿ]/.test(value)) {
    fail(rel, `${where} must be in English, found Cyrillic: "${value}"`);
  }
}

// ── 2. Validate the root index ──
console.log("🌳 Validating registry.json…");
const registryData = loadJson("registry.json");
if (!registryData) finish();
checkSchema("registry.json", registryData, validateRegistry);
const registry = registryData as RegistryIndex;

// ── 3. Walk the category hierarchy ──
console.log("🗂️ Validating category files…");
const visited = new Set<string>(); // index paths referenced from the hierarchy
const packageNames = new Map<string, string>(); // package name -> file it was first seen in

function walkCategory(indexPath: string, expectedCategory: string, referrer: string): void {
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(indexPath)) return; // absolute URL — nothing to check locally
  if (indexPath.startsWith("/") || indexPath.includes("..")) {
    fail(referrer, `index "${indexPath}" must be a path relative to the registry root`);
    return;
  }
  if (visited.has(indexPath)) {
    fail(referrer, `index "${indexPath}" is referenced more than once`);
    return;
  }
  visited.add(indexPath);

  if (!existsSync(join(ROOT, indexPath))) {
    fail(referrer, `index "${indexPath}" does not exist`);
    return;
  }
  const data = loadJson(indexPath);
  if (!data) return;
  if (!checkSchema(indexPath, data, validateCategory)) return;
  const cat = data as CategoryFile;

  if (cat.category !== expectedCategory) {
    fail(indexPath, `category is "${cat.category}", expected "${expectedCategory}" from its position in the hierarchy`);
  }

  for (const pkg of cat.packages ?? []) {
    const seenIn = packageNames.get(pkg.name);
    if (seenIn) {
      fail(indexPath, `package "${pkg.name}" is already defined in ${seenIn} — names must be unique across the whole registry`);
    } else {
      packageNames.set(pkg.name, indexPath);
    }
    if (!pkg.source?.git && !pkg.source?.url) {
      fail(indexPath, `package "${pkg.name}": source must have "git" or "url"`);
    }
    checkEnglish(indexPath, `package "${pkg.name}" title`, pkg.title);
    checkEnglish(indexPath, `package "${pkg.name}" description`, pkg.description);
    for (const tag of pkg.tags ?? []) checkEnglish(indexPath, `package "${pkg.name}" tag`, tag);
  }

  for (const child of cat.children ?? []) {
    checkEnglish(indexPath, `child "${child.name}" title`, child.title);
    walkCategory(child.index, `${expectedCategory}/${child.name}`, indexPath);
  }
}

const rootNames = new Set<string>();
for (const entry of registry.categories ?? []) {
  if (rootNames.has(entry.name)) {
    fail("registry.json", `duplicate category name "${entry.name}"`);
  }
  rootNames.add(entry.name);
  checkEnglish("registry.json", `category "${entry.name}" title`, entry.title);
  checkEnglish("registry.json", `category "${entry.name}" description`, entry.description);
  walkCategory(entry.index, entry.name, "registry.json");
}
checkEnglish("registry.json", "registry title", registry.title);
checkEnglish("registry.json", "registry description", registry.description);

// ── 4. No orphans: every JSON file under categories/ must be reachable ──
console.log("🔗 Checking for orphan category files…");
function* jsonFiles(dir: string): Generator<string> {
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = `${dir}/${name}`;
    if (statSync(join(ROOT, rel)).isDirectory()) yield* jsonFiles(rel);
    else if (name.endsWith(".json")) yield rel;
  }
}
for (const rel of jsonFiles("categories")) {
  if (!visited.has(rel)) {
    fail(rel, "orphan file: not referenced from registry.json or any category's children");
  }
}

finish();
