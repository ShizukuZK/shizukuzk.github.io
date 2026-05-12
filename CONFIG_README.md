# Конфиг сайта — config.json

Этот файл содержит все переменные сайта, которые легко редактировать.

## Как изменить ссылку на сборку

Отредактируй `config.json` в корне проекта:

```json
{
  "modpackUrl": "https://drive.google.com/file/d/1cXLynolTsN3JiH2kj0gYYmkGCbXwNN3O/view?usp=sharing",
  "serverIp": "createaeronautics.joinserver.ru",
  "discordUrl": "https://discord.gg/y8as3d2J",
  "defaultLanguage": "en",
  "version": "1.0.0"
}
```

### Переменные:
- **`modpackUrl`** — ссылка на сборку сервера
- **`serverIp`** — IP/адрес сервера
- **`discordUrl`** — ссылка на Discord
- **`defaultLanguage`** — язык по умолчанию (en/ru)

## После редактирования

1. Сохрани файл
2. Залей изменения на GitHub (git add, git commit, git push)
3. Сайт обновится автоматически через несколько секунд

## Автоматизация (опционально)

Если хочешь автоматически загружать значения из `config.json` в вёрстку, добавь в начало скриптов в HTML:

```javascript
// Загрузить конфиг
fetch('/config.json')
  .then(r => r.json())
  .then(cfg => {
    window.CONFIG = cfg;
    // Использовать cfg.modpackUrl, cfg.serverIp и т.д.
  })
  .catch(e => console.error('Config load failed:', e));
```
