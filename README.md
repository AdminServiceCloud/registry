# 📦 registry — the official AdminService.Cloud application registry

> 🌍 **Language:** English · [🇷🇺 Русская версия](docs/russian/README.md)

The official package registry for [asc-daemon](../asc-daemon) and the [AdminService.Cloud](../asc-platform) app store. It works like an apt source: the daemon connects a registry and installs applications with `asc install <package>`.

## 🗂️ Registry structure

The registry is a **hierarchy of JSON files**: the root index references category files, and categories may reference child subcategories. This lets a large registry be split across any number of files.

```
registry/
├── registry.json               # 🌳 root index: metadata + links to categories
├── categories/
│   ├── databases.json          # 🗄️ databases
│   ├── ai.json                 # 🧠 AI models & inference
│   ├── bots.json               # 🤖 bots
│   ├── game-servers.json       # 🎮 game servers
│   ├── system-utilities.json   # 🔧 system utilities
│   ├── web.json                # 🌐 web (references the child web/cms.json)
│   └── web/
│       └── cms.json            # 🌐 subcategory: CMS
└── schema/
    ├── registry.schema.json      # 📐 root index schema
    ├── category.schema.json      # 📐 category file schema
    ├── asc.schema.json           # 📐 asc.yaml application manifest schema
    ├── asc.stack.schema.json     # 📐 asc.stack.yaml stack manifest schema
    └── asc.settings.schema.json  # 📐 asc.settings.yaml application settings schema
```

### 🌳 Hierarchy

- `registry.json` → a list of categories, each with an `index` field linking to the category file (relative path or URL).
- A category file → packages (`packages`) + optional child subcategories (`children` → their own index files).
- Categories are by topic: `databases`, `ai`, `bots`, `game-servers`, `system-utilities`, `web`, etc.; new topics are added to `registry.json`.

### 📦 Two package types

| Type | Manifest | What it is |
|---|---|---|
| `app` | `asc.yaml` | A single application (docker / native / utility) |
| `stack` | `asc.stack.yaml` | A stack of several applications (e.g. WordPress + MySQL) |

> 🌍 **Important:** all descriptions in the registry's JSON files are in **English** (the registry is international). See the [contribution rules](AGENTS.md).

## ➕ How to add a package

1. 📝 Describe the application with an `asc.yaml` manifest (or a stack with `asc.stack.yaml`) in your repository. Format — [📦 package-manager](../asc-daemon/docs/package-manager.md), schemas — in [schema/](schema/), examples — in [asc-example-apps](../asc-example-apps).
2. ✅ Validate the manifest against its schema (`asc.schema.json` / `asc.stack.schema.json`).
3. 📇 Add an entry to the appropriate category file `categories/<topic>.json` (type `app` or `stack`, description in English).
4. 🔀 Open a Pull Request — CI validates all files against the schemas.

## 🔌 Connecting the registry

```bash
asc source add https://raw.githubusercontent.com/AdminServiceCloud/registry/main
asc update
asc search nginx
```

Custom registries are also supported: your own `https://` registry with the same `registry.json`, a `file://` directory, or a GitHub repository with an `asc.yaml` / `asc.stack.yaml` at its root.

## 📚 Documentation and roadmap

- [🛍️ App store](../asc-platform/docs/features/app-store.md)
- [📦 Package manager and registry format](../asc-daemon/docs/package-manager.md)
- [🎯 ROADMAP](../asc-platform/ROADMAP.md) — registry tasks use the `REG-*` prefix
- [🤖 Repository process](AGENTS.md)

> ⚠️ The `old/` directory holds earlier work and is kept for reference only.
