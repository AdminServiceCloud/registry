# 📦 registry — официальный реестр приложений AdminService.Cloud

> 🌍 **Язык:** Русский · [🇬🇧 English version](../../README.md)

Официальный реестр пакетов для [asc-daemon](../../../asc-daemon) и магазина приложений [AdminService.Cloud](../../../asc-platform). Работает как источник пакетов в духе apt: демон подключает реестр и устанавливает приложения командой `asc install <package>`.

## 🗂️ Структура реестра

Реестр — **иерархия JSON-файлов**: корневой индекс ссылается на файлы категорий, категории могут ссылаться на дочерние подкатегории. Это позволяет разбивать большой реестр на сколько угодно файлов.

```
registry/
├── registry.json               # 🌳 корневой индекс: метаданные + ссылки на категории
├── categories/
│   ├── databases.json          # 🗄️ базы данных
│   ├── ai.json                 # 🧠 AI-модели и inference
│   ├── bots.json               # 🤖 боты
│   ├── game-servers.json       # 🎮 игровые серверы
│   ├── system-utilities.json   # 🔧 системные утилиты
│   ├── web.json                # 🌐 веб (ссылается на дочернюю web/cms.json)
│   └── web/
│       └── cms.json            # 🌐 подкатегория: CMS
└── schema/
    ├── registry.schema.json      # 📐 схема корневого индекса
    ├── category.schema.json      # 📐 схема файла категории
    ├── asc.schema.json           # 📐 схема манифеста приложения asc.yaml
    ├── asc.stack.schema.json     # 📐 схема манифеста стека asc.stack.yaml
    └── asc.settings.schema.json  # 📐 схема настроек приложения asc.settings.yaml
```

### 🌳 Иерархия

- `registry.json` → список категорий, у каждой — поле `index` со ссылкой на файл категории (относительный путь или URL).
- Файл категории → пакеты (`packages`) + необязательные дочерние подкатегории (`children` → свои index-файлы).
- Категории — по темам: `databases`, `ai`, `bots`, `game-servers`, `system-utilities`, `web` и т.д.; новые темы добавляются в `registry.json`.

### 📦 Два типа пакетов

| Тип | Манифест | Что это |
|---|---|---|
| `app` | `asc.yaml` | Одиночное приложение (docker / native / utility) |
| `stack` | `asc.stack.yaml` | Стек из нескольких приложений (например, WordPress + MySQL) |

> 🌍 **Важно:** все описания в JSON-файлах реестра — **на английском** (реестр международный). Остальная документация проекта постепенно переводится на английский ([регламент](../../AGENTS.md)).

## ➕ Как добавить пакет

1. 📝 Опишите приложение манифестом `asc.yaml` (или стек — `asc.stack.yaml`) в своём репозитории. Формат — [📦 package-manager](../../../asc-daemon/docs/package-manager.md), схемы — в [schema/](../../schema/), примеры — в [asc-example-apps](../../../asc-example-apps).
2. ✅ Проверьте манифест по схеме (`asc.schema.json` / `asc.stack.schema.json`).
3. 📇 Добавьте запись в файл подходящей категории `categories/<тема>.json` (тип `app` или `stack`, описание на английском).
4. 🔀 Откройте Pull Request — CI проверит все файлы по схемам.

## 🔌 Подключение реестра

```bash
asc source add https://raw.githubusercontent.com/AdminServiceCloud/registry/main
asc update
asc search nginx
```

Поддерживаются и кастомные реестры: свой `https://`-реестр с таким же `registry.json`, `file://`-каталог или GitHub-репозиторий с `asc.yaml` / `asc.stack.yaml` в корне.

## 📚 Документация и Roadmap

- [🛍️ Магазин приложений](../../../asc-platform/docs/features/app-store.md)
- [📦 Пакетный менеджер и формат реестра](../../../asc-daemon/docs/package-manager.md)
- [🎯 ROADMAP](../../../asc-platform/ROADMAP.md) — задачи реестра имеют префикс `REG-*`
- [🤖 Регламент репозитория](../../AGENTS.md)
- [🤝 CONTRIBUTING](CONTRIBUTING.md) — как участвовать (пакеты, категории, схемы)
- [🤝 Кодекс поведения](CODE_OF_CONDUCT.md)
- [📄 Лицензия — MIT](../../LICENSE) с обязательным указанием авторства

> ⚠️ Каталог `old/` — прошлые наработки, используется как справка.
