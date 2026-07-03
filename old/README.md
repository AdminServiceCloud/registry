# 📦 AdminServiceCloud Registry

Официальный реестр приложений для AdminServiceCloud Runtime. Этот репозиторий содержит централизованный список всех доступных приложений, которые можно установить через ASC.

## 📋 Описание

Registry - это централизованный репозиторий, который содержит манифест всех доступных приложений для AdminServiceCloud Runtime. Каждое приложение в реестре имеет полную информацию о своем расположении, описании, категории и тегах.

## 🚀 Быстрый старт

### Добавление Registry как sourcelist

Чтобы использовать официальный реестр приложений, добавьте его в список sourcelist:

```bash
asc sourcelist add https://raw.githubusercontent.com/AdminServiceCloud/Registry/main/applications.json
```

Или для системного использования (требуются права root):

```bash
sudo asc sourcelist add https://raw.githubusercontent.com/AdminServiceCloud/Registry/main/applications.json --system
```

**Важно:** Используйте URL формата `https://raw.githubusercontent.com/...` для прямого доступа к файлу. URL формата `https://github.com/.../blob/...` не поддерживается.

После добавления обновите индекс реестра:

```bash
asc sourcelist update
```

### Просмотр доступных приложений

После обновления вы можете искать и устанавливать приложения:

```bash
# Поиск приложений
asc app search nginx

# Установка приложения
asc app install nginx
```

## 📝 Формат applications.json

Файл `applications.json` содержит список всех доступных приложений в следующем формате:

```json
{
  "$schema": "https://raw.githubusercontent.com/AdminServiceCloud/Registry/main/applications.json-schema",
  "version": "1.0.0",
  "name": "asc-official-repositories",
  "description": "Официальный реестр доступных приложений для AdminServiceCloud Runtime",
  "last_updated": "2024-01-01T00:00:00Z",
  "applications": [
    {
      "id": "nginx",
      "name": "Nginx",
      "repository": "github",
      "repo": "nginx/nginx",
      "path": "asc/applications/nginx.yaml",
      "description": "Высокопроизводительный веб-сервер и обратный прокси-сервер",
      "category": "web-server",
      "tags": ["web", "proxy", "http", "https"]
    }
  ],
  "repositories": [
    "system-utilites",
    "ai-models",
    "databases",
    "models"
  ]
}
```

### Поля приложения

- **id** (обязательно) - Уникальный идентификатор приложения (только латинские буквы, цифры, дефисы и подчеркивания)
- **name** (обязательно) - Название приложения
- **repository** (обязательно) - Тип репозитория: `github` или `gitlab`
- **repo** (обязательно) - Путь к репозиторию в формате `owner/repo`
- **path** (обязательно) - Путь к файлу манифеста приложения в репозитории (должен заканчиваться на `.yaml` или `.yml`)
- **description** (обязательно) - Описание приложения
- **category** (обязательно) - Категория приложения (см. список категорий ниже)
- **tags** (обязательно) - Массив тегов для поиска и фильтрации

### Поле repositories

- **repositories** (обязательно) - Массив названий других репозиториев (только латинские буквы, цифры, дефисы и подчеркивания)

### Категории приложений

Доступные категории:
- `web-server` - Веб-серверы
- `database` - Базы данных
- `runtime` - Среды выполнения
- `cache` - Системы кэширования
- `message-queue` - Очереди сообщений
- `monitoring` - Мониторинг
- `logging` - Логирование
- `security` - Безопасность
- `development` - Инструменты разработки
- `automation` - Автоматизация
- `other` - Прочее

## ✅ Валидация

Все изменения в `applications.json` должны соответствовать схеме `applications.json-schema`. Схема проверяет:

- Правильность структуры JSON
- Наличие всех обязательных полей
- Корректность форматов данных
- Уникальность идентификаторов приложений
- Соответствие значений категорий и типов репозиториев допустимым значениям

### Проверка валидности

Вы можете проверить валидность файла с помощью различных инструментов:

```bash
# Используя ajv-cli
npm install -g ajv-cli
ajv validate -s applications.json-schema -d applications.json

# Используя Python
pip install jsonschema
python -m jsonschema applications.json-schema applications.json
```

## 🤝 Как добавить приложение

1. **Создайте манифест приложения** в репозитории приложения (см. [Daemon/appspecs/README.md](../Daemon/appspecs/README.md))

2. **Добавьте запись в applications.json**:
   - Откройте `applications.json`
   - Добавьте новую запись в массив `applications`
   - Убедитесь, что `id` уникален
   - Заполните все обязательные поля

3. **Проверьте валидность**:
   - Убедитесь, что JSON валиден
   - Проверьте соответствие схеме `applications.json-schema`

4. **Создайте Pull Request**:
   - Создайте ветку для ваших изменений
   - Внесите изменения
   - Создайте Pull Request с описанием добавляемого приложения

## 🏢 Как добавить репозиторий

Для того чтобы ваш репозиторий был добавлен в число официальных и дефолтных по умолчанию, вы должны отправить Pull Request с добавлением вашего репозитория **от официального GitHub аккаунта**.

### Процесс добавления репозитория:

1. **Подготовьте репозиторий**:
   - Убедитесь, что ваш репозиторий соответствует стандартам AdminServiceCloud
   - Репозиторий должен содержать валидные манифесты приложений

2. **Добавьте запись в repositories.json**:
   - Откройте `repositories.json`
   - Добавьте название вашего репозитория в массив `repositories`
   - Название должно содержать только латинские буквы, цифры, дефисы и подчеркивания
   - Убедитесь, что название уникально

3. **Создайте Pull Request от официального GitHub аккаунта**:
   - Важно: PR должен быть создан от официального GitHub аккаунта организации или проекта
   - Создайте ветку для ваших изменений
   - Внесите изменения в `repositories.json`
   - Создайте Pull Request с подробным описанием добавляемого репозитория
   - Укажите URL репозитория и его назначение

4. **Ожидайте проверки**:
   - После создания PR ваше предложение будет рассмотрено командой AdminServiceCloud
   - После одобрения репозиторий будет добавлен в список официальных и дефолтных

## 📚 Дополнительная информация

- [Документация по манифестам приложений](../Daemon/appspecs/README.md)
- [Документация ASC Daemon](../Daemon/README.md)
- [Команды CLI](../Daemon/docs/en/COMMANDS.md)

## 📄 Лицензия

MIT

## 👤 Автор

AdminServiceCloud Development Team & Community

