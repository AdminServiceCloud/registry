# 🤝 CONTRIBUTING — how to contribute to the registry

Thank you for your interest in the project! This document describes the rules for contributing to the official AdminService.Cloud application registry.

> 🌍 Русская версия: [docs/russian/CONTRIBUTING.md](docs/russian/CONTRIBUTING.md)

## 🚀 Quick start

```bash
git clone https://github.com/AdminServiceCloud/registry
cd registry
npm install
npm run validate    # schema + structure checks — mandatory before a PR
```

Requirements: Node.js 20+ (only for validation — the registry itself is plain JSON).

## 📦 What you can contribute

- **New packages** — the most common contribution: an entry in a category file pointing to an `asc.yaml` / `asc.stack.yaml` manifest in your repository. Steps — in the [README](README.md#-how-to-add-a-package); there is also an [issue template](https://github.com/AdminServiceCloud/registry/issues/new/choose) to request a package.
- **New categories / subcategories** — a file in `categories/` plus an `index` link from `registry.json` (or from the parent's `children`).
- **Schema and tooling fixes** — `schema/`, `scripts/validate.mjs`, CI.

## 📏 Registry rules

The full rulebook is [AGENTS.md](AGENTS.md); the essentials:

- 🌍 All `title` / `description` / `tags` values in JSON files are **in English** (the registry is international).
- 📐 Every file must validate against its schema: `registry.json` → `registry.schema.json`, category files → `category.schema.json`.
- 🔗 No orphan files: every category file is referenced from `registry.json` or a parent's `children`.
- 🆔 Package names are unique **across the whole registry**, not just within a category.
- 🧭 A category file's `category` field matches its position in the hierarchy (e.g. `web/cms`).
- 🔄 Changing the registry format = updating the schemas, bumping `format_version` in `registry.json`, and syncing the [📦 package-manager](../asc-daemon/docs/package-manager.md) doc.

## 🔀 Change workflow

1. For a new package or category, open an issue first (templates are provided) — it may already be planned; registry tasks live in the [ROADMAP](../asc-platform/ROADMAP.md) under the `REG-*` prefix.
2. Fork, create a branch off `main`: `feat/…`, `fix/…`, `docs/…`.
3. Make the change and run `npm run validate` locally.
4. Open a Pull Request against `main` using the template. CI must be green.

## 📝 Commits

English only, [Conventional Commits](https://www.conventionalcommits.org/): `feat`, `fix`, `docs`, `ci`, `chore`, … — e.g. `feat: index postgres package in databases`.

## ⚙️ CI (GitHub Actions)

`ci.yml` — on every PR and push to `main`: `npm run validate` checks all files against the JSON Schemas and the structural rules above (link integrity, orphans, name uniqueness, English-only descriptions).

## 📄 License

The project is distributed under the [MIT license](LICENSE): you may distribute, modify and use it commercially, but **attribution is mandatory** — Omar El Sayed ([@statebyte](https://github.com/statebyte)), the AdminService.Cloud project, [Anytecture Software](https://anytecture.com). By submitting a PR you agree to license your contribution under the same terms.
