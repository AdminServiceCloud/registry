<!--
Thanks for contributing to the AdminService.Cloud registry!
Most PRs add or update a package entry. Keep the PR focused. See AGENTS.md.
-->

## 📋 Summary

<!-- What does this PR do? e.g. "Add nginx to categories/web.json" -->

## 🧩 Type of change

- [ ] ➕ Add a package (`app` or `stack`)
- [ ] ✏️ Update an existing package (version, description, metadata)
- [ ] 🗂️ Add / change a category or subcategory
- [ ] 📐 Change registry format / JSON schemas
- [ ] 📝 Documentation
- [ ] 🐛 Fix (broken link, invalid entry, etc.)

## 📦 Package details (for add/update)

- Package name (unique across the whole registry):
- Type: `app` / `stack`
- Category file: `categories/<topic>.json`
- Manifest (`asc.yaml` / `asc.stack.yaml`) source repo:

## ✅ Checklist

- [ ] All descriptions in JSON files are in **English** (the registry is international).
- [ ] The package name is **unique across the entire registry**, not just the category.
- [ ] Every changed file validates against its schema (`registry.json` → `registry.schema.json`, category files → `category.schema.json`, manifests → `asc.schema.json` / `asc.stack.schema.json`).
- [ ] No orphan files: any new category is referenced from `registry.json` (or a parent category's `children`).
- [ ] The referenced manifest exists and validates; the package installs (`asc install <name>`) once the daemon is available.
- [ ] If the registry format changed: schemas in `schema/` updated, `format_version` bumped in `registry.json`, and the [package-manager doc](../asc-daemon/docs/package-manager.md) synced.
- [ ] Commits follow Conventional Commits.

## 🔗 Related

<!-- Roadmap task (REG-*), related issue, or upstream app repo. -->

- Roadmap task: REG-
- Closes #

## 📌 Notes

<!-- Anything else reviewers should know. -->
