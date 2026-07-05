# 🤖 AGENTS.md — Регламент репозитория registry

Правила для агентов и разработчиков. Общий регламент проекта — [../asc-platform/AGENTS.md](../asc-platform/AGENTS.md), здесь — специфика реестра.

## 🌍 Язык

- **Все описания в JSON-файлах реестра — на английском** (реестр международный): `description`, `title`, теги.
- README и прочая документация репозитория — на русском, с emoji.

## 🗂️ Структура и правила изменения

- Корневой индекс — `registry.json`; категории — `categories/<тема>.json`; подкатегории — вложенные каталоги (`categories/web/cms.json`). Схемы — в `schema/`.
- **Каждый файл обязан валидироваться своей схемой**: `registry.json` → `registry.schema.json`, файлы категорий → `category.schema.json`.
- Новая категория: добавь файл в `categories/` **и** запись со ссылкой `index` в `registry.json` (или в `children` родительской категории для подкатегории). Файлов-сирот без ссылки из иерархии быть не должно.
- Типы пакетов: `app` (одиночный `asc.yaml`) и `stack` (`asc.stack.yaml`). Имя пакета уникально **во всём реестре**, не только в категории.
- Меняя формат реестра — обнови схемы в `schema/`, подними `format_version` в `registry.json` и синхронизируй док [📦 package-manager](../asc-daemon/docs/package-manager.md).

## 🗺️ Задачи

- Задачи — в [ROADMAP](../asc-platform/ROADMAP.md), префикс `REG-*`; статусы `[PLANING 📝]` / `[IN_PROGRESS 🔧]` / `[DONE ✅]` / `[BLOCKED ⛔]`.
- Каталог `old/` — только справка. Рабочие файлы реестра — в корне.
