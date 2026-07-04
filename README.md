# 📦 registry — официальный реестр приложений AdminService.Cloud

Официальный реестр пакетов для [asc-daemon](../asc-daemon) и магазина приложений [AdminService.Cloud](../asc-platform). Работает как источник пакетов в духе apt: демон подключает реестр и устанавливает приложения командой `asc install <package>`.

## 🗂️ Структура

```
registry/
├── schema.json          # 📐 JSON-схема валидации манифестов
├── repositories.json    # 🌳 дерево репозиториев (источников)
└── applications.json    # 📇 индекс всех пакетов реестра
```

> 🌍 **Важно:** описания пакетов в JSON-файлах пишутся **на английском** — реестр международный. Остальная документация проекта — на русском ([регламент](../asc-platform/AGENTS.md)).

## ➕ Как добавить пакет

1. 📝 Опишите приложение манифестом `asc.yaml` (формат — в [📦 package-manager](../asc-daemon/docs/package-manager.md); примеры — в [asc-example-apps](../asc-example-apps)).
2. ✅ Проверьте манифест по `schema.json`.
3. 📇 Добавьте запись в `applications.json` (описание на английском).
4. 🔀 Откройте Pull Request — CI проверит схему автоматически.

## 🔌 Подключение реестра

```bash
asc source add https://raw.githubusercontent.com/AdminServiceCloud/registry/main
asc update
asc search nginx
```

Поддерживаются и кастомные реестры: свой `https://`-реестр, `file://`-каталог или GitHub-репозиторий с `asc.yaml` (или стеком `ascstack.yaml` — несколько приложений в одном репозитории).

## 📚 Документация и Roadmap

- [🛍️ Магазин приложений](../asc-platform/docs/features/app-store.md)
- [📦 Пакетный менеджер и формат реестра](../asc-daemon/docs/package-manager.md)
- [🎯 ROADMAP](../asc-platform/ROADMAP.md) — задачи реестра имеют префикс `REG-*`

> ⚠️ Каталог `old/` — прошлые наработки, используется как справка.
