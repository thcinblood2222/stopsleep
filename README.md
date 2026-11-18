# Что, если не спать 7 дней?

Девяностосекундный научно-популярный 2D-мультфильм с элементами психологического хоррора. React, SVG, TypeScript и Remotion.

## Запуск

Требуются Node.js 24 и npm.

```sh
npm ci
npm run audio
npm run dev
```

В Studio доступны композиции `StopSleep` (1080×1920) и `StopSleepPreview` (720×1280). Обе — 30 fps, 2700 кадров. Музыка и эффекты собраны на независимых дорожках. Передайте `--props='{"music":false,"sfx":true}'` или `--props='{"music":true,"sfx":false}'` к команде рендера для раздельной настройки.

## Экспорт

```sh
npm run check
npm run check-assets
npm run preview
npm run storyboard
npm run render
node scripts/verify.mjs final
```

Результаты лежат в `out/`. Preview в GitHub Actions запускается при push в main, на pull request и вручную. Final Render можно запускать вручную, указав число параллельных процессов и, при необходимости, диапазон кадров. Диапазоны нужны для проверки фрагментов. В полном рендере автоматически проверяются размер кадра, FPS, число кадров и аудиодорожка.

## Исходники

- В `src/scenes/` восемь независимо редактируемых сцен.
- В `src/components/` риг, мимика, фоны, мозг, нейроны и анимируемая инфографика. В `public/assets/` — самостоятельные SVG для работы в редакторе.
- В `src/data/timeline.ts` — границы сцен и общие для изображения и звука метки. `npm run audio -- --table` детерминированно собирает WAV и обновляет таблицу эффектов. Для рендера не нужны внешние ассеты.

[Текст диктора](docs/narration.md) · [Таблица SFX](docs/sfx-cues.md) · [Научные источники](docs/scientific-notes.md)
