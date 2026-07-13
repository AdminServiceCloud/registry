# 🤝 CONTRIBUTING — как участвовать в развитии реестра

Спасибо за интерес к проекту! Этот документ описывает правила участия в развитии официального реестра приложений AdminService.Cloud.

> 🌍 **Язык:** Русский · [🇬🇧 English version](../../CONTRIBUTING.md)

## 🚀 Быстрый старт

```bash
git clone https://github.com/AdminServiceCloud/registry
cd registry
npm install
npm run validate    # проверки схем и структуры — обязательны перед PR
```

Требования: Node.js 24+ (только для валидации — сам реестр это обычный JSON; валидатор написан на TypeScript и исполняется Node нативно).

## 📦 Что можно принести

- **Новые пакеты** — самый частый вклад: запись в файле категории со ссылкой на манифест `asc.yaml` / `asc.stack.yaml` в вашем репозитории. Шаги — в [README](README.md#-как-добавить-пакет); есть и [шаблон issue](https://github.com/AdminServiceCloud/registry/issues/new/choose) для заявки на пакет.
- **Новые категории / подкатегории** — файл в `categories/` плюс ссылка `index` из `registry.json` (или из `children` родительской категории).
- **Исправления схем и тулинга** — `schema/`, `scripts/validate.ts`, CI.

## 📏 Правила реестра

Полный регламент — [AGENTS.md](../../AGENTS.md); главное:

- 🌍 Все `title` / `description` / `tags` в JSON-файлах — **на английском** (реестр международный).
- 📐 Каждый файл обязан валидироваться своей схемой: `registry.json` → `registry.schema.json`, файлы категорий → `category.schema.json`.
- 🔗 Никаких файлов-сирот: каждый файл категории должен быть достижим из `registry.json` или `children` родителя.
- 🆔 Имена пакетов уникальны **во всём реестре**, не только внутри категории.
- 🧭 Поле `category` файла соответствует его позиции в иерархии (например, `web/cms`).
- 🔄 Изменение формата реестра = обновление схем, повышение `format_version` в `registry.json` и синхронизация дока [📦 package-manager](../../../asc-daemon/docs/package-manager.md).

## 🔀 Процесс изменений

1. Для нового пакета или категории сначала откройте issue (шаблоны прилагаются) — возможно, он уже запланирован; задачи реестра ведутся в [ROADMAP](../../../asc-platform/ROADMAP.md) с префиксом `REG-*`.
2. Сделайте форк и ветку от `main`: `feat/…`, `fix/…`, `docs/…`.
3. Внесите изменение и запустите локально `npm run validate`.
4. Откройте Pull Request в `main` по шаблону. CI должен быть зелёным.

## 📝 Коммиты

Только английский, [Conventional Commits](https://www.conventionalcommits.org/): `feat`, `fix`, `docs`, `ci`, `chore`, … — например, `feat: index postgres package in databases`.

## ⚙️ CI (GitHub Actions)

`ci.yml` — на каждый PR и push в `main`: `npm run validate` проверяет все файлы по JSON-схемам и структурным правилам выше (целостность ссылок, сироты, уникальность имён, описания только на английском).

## 📄 Лицензия

Проект распространяется по [лицензии MIT](../../LICENSE): можно распространять, изменять и использовать коммерчески, но **указание авторства обязательно** — Omar El Sayed ([@statebyte](https://github.com/statebyte)), проект AdminService.Cloud, [Anytecture Software](https://anytecture.com). Отправляя PR, вы соглашаетесь лицензировать свой вклад на тех же условиях.
