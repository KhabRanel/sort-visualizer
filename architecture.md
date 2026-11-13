# Архитектура приложения «Визуализатор алгоритмов сортировки»

Тема курсовой работы: «Разработка визуализатора алгоритмов сортировки с пошаговой анимацией и сравнением производительности с использованием языка JavaScript».

Приложение работает целиком в браузере: сервер, база данных и авторизация не нужны.

## 1. Структура проекта

Репозиторий содержит два проекта:

| Проект | Папка | Назначение |
|---|---|---|
| Библиотека общих компонентов | `ui-library/` | Переиспользуемые UI-компоненты без бизнес-логики: кнопка, карточка, выпадающий список, ползунок, счётчик и столбчатая диаграмма массива. Собирается в `dist/` и подключается к приложению как npm-пакет |
| Основное приложение | `app/` | SPA на React: страницы, маршрутизация, алгоритмы сортировки, генерация данных, анимация и сравнение производительности |

```
sort-visualizer/
├── README.md
├── architecture.md
├── mvp.md
├── .gitignore
├── docs/screenshots/          # скриншоты для README
├── ui-library/
│   ├── package.json
│   ├── eslint.config.js
│   ├── jest.config.ts
│   ├── tsconfig.json
│   ├── vite.config.ts         # сборка в режиме библиотеки + генерация .d.ts
│   └── src/
│       ├── index.ts           # публичный API библиотеки
│       ├── setupTests.ts
│       ├── ArrayBars/         # ArrayBars.tsx, ArrayBars.css, ArrayBars.test.tsx
│       ├── Button/            # Button.tsx, Button.module.css, Button.test.tsx
│       ├── Card/              # Card.tsx, Card.css, Card.test.tsx
│       ├── Select/            # Select.tsx, Select.css, Select.test.tsx
│       ├── Slider/            # Slider.tsx, Slider.css, Slider.test.tsx
│       └── Stat/              # Stat.tsx, Stat.css, Stat.test.tsx
└── app/
    ├── package.json
    ├── eslint.config.js
    ├── jest.config.ts
    ├── tsconfig.json, tsconfig.app.json, tsconfig.node.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── main.tsx           # точка входа, подключение роутера и стилей
        ├── router.tsx         # описание маршрутов
        ├── index.css          # общие стили приложения
        ├── setupTests.ts
        ├── algorithms/
        │   ├── types.ts       # типы: AlgorithmInfo, SortStep, SortFunction
        │   ├── registry.ts    # список алгоритмов и их характеристики
        │   └── registry.test.ts
        ├── utils/
        │   ├── generateArray.ts      # генерация массивов разного вида
        │   └── generateArray.test.ts
        ├── components/
        │   ├── Layout/Layout.tsx
        │   ├── Header/Header.tsx
        │   ├── ControlPanel/ControlPanel.tsx
        │   ├── StepCounters/StepCounters.tsx
        │   └── ComparisonTable/ComparisonTable.tsx
        └── pages/
            ├── HomePage/HomePage.tsx
            ├── AlgorithmsPage/AlgorithmsPage.tsx
            ├── VisualizerPage/VisualizerPage.tsx
            ├── ComparePage/ComparePage.tsx
            └── NotFoundPage/NotFoundPage.tsx
```

## 2. Используемые библиотеки

Версии указаны так, как они записаны в `package.json`. В скобках указаны версии, которые установлены сейчас.

### Зависимости приложения (`app`)

| Библиотека | Версия | Назначение |
|---|---|---|
| react | ^19.3.0 (19.3.1) | Построение пользовательского интерфейса из компонентов |
| react-dom | ^19.3.0 (19.3.1) | Отрисовка React-компонентов в браузере |
| react-router | ^7.18.5 (7.18.5) | Клиентская маршрутизация: страницы, вложенные маршруты, параметры URL |
| @sort-visualizer/ui-library | file:../ui-library | Собственная библиотека общих компонентов |

У библиотеки `ui-library` `react` и `react-dom` указаны как `peerDependencies` (^19.3.0). Их предоставляет приложение.

### Инструменты разработки (оба проекта)

| Библиотека | Версия | Назначение |
|---|---|---|
| typescript | ~5.9.3 (5.9.3) | Язык разработки, проверка типов |
| vite | ^7.1.7 (7.3.8) | Dev-сервер и сборка |
| @vitejs/plugin-react | ^5.0.4 (5.2.0) | Поддержка JSX и Fast Refresh в Vite |
| vite-plugin-dts | ^5.1.2 (5.1.2) | Генерация `.d.ts` при сборке библиотеки (только `ui-library`) |
| eslint | ^9.36.0 (9.39.5) | Статический анализ кода |
| @eslint/js, typescript-eslint | ^9.36.0, ^8.45.0 | Базовые правила ESLint и правила для TypeScript |
| eslint-plugin-import | ^2.32.0 | Порядок импортов |
| eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh | ^7.37.5, ^7.1.1, ^0.5.7 | Правила для React и хуков |
| globals | ^17.13.0 | Глобальные переменные браузера для ESLint |
| jest | ^30.2.0 (30.5.2) | Запуск модульных тестов |
| ts-jest | ^29.4.5 (29.4.15) | Компиляция TypeScript для Jest |
| jest-environment-jsdom | ^30.2.0 | Эмуляция браузера в тестах |
| @testing-library/react, @testing-library/jest-dom, @testing-library/user-event | ^16.3.0, ~6.9.1, ^14.6.1 | Тестирование компонентов |
| identity-obj-proxy | ^3.0.0 | Заглушка для CSS-модулей в тестах |
| @types/react, @types/react-dom, @types/jest, @types/node | ^19.3.0, ^19.3.0, ^30.0.0, ^26.6.4 | Типы TypeScript |

Сторонние UI-библиотеки не используются. Все элементы интерфейса взяты из собственной библиотеки `ui-library`. Диаграмма массива нарисована обычными блоками `div` без библиотек графиков.

## 3. Компоненты

### Библиотека `ui-library`

| Компонент | Props | Назначение |
|---|---|---|
| `Button` | `variant`, `size`, `type`, `disabled`, `onClick`, `children` | Кнопка: запуск, пауза, шаг, сброс, переходы |
| `Card` | `title`, `children`, `className` | Карточка-контейнер с необязательным заголовком |
| `Select` | `label`, `value`, `options`, `disabled`, `onChange` | Выпадающий список с подписью (вид исходных данных, алгоритм) |
| `Slider` | `label`, `value`, `min`, `max`, `step`, `disabled`, `onChange` | Ползунок с подписью и текущим значением (размер массива, скорость) |
| `Stat` | `label`, `value` | Числовой показатель с подписью (счётчики сравнений и перестановок) |
| `ArrayBars` | `values`, `states`, `height` | Массив в виде столбчатой диаграммы. Высота столбца пропорциональна значению, состояние столбца (`compare`, `swap`, `sorted`) выделяется цветом |

Компоненты библиотеки ничего не знают об алгоритмах сортировки: они получают данные только через props. Поэтому их легко тестировать и переиспользовать.

### Приложение `app`

| Компонент / модуль | Назначение |
|---|---|
| `Layout` | Общий каркас страницы: шапка, область для вложенного маршрута (`<Outlet />`), подвал |
| `Header` | Шапка с навигацией по разделам (`NavLink` подсвечивает активный раздел) |
| `ControlPanel` | Панель управления визуализацией: кнопки «Старт», «Пауза», «Шаг», «Сброс», «Новый массив», выбор вида данных, размера массива и скорости |
| `StepCounters` | Счётчики сравнений и перестановок во время анимации |
| `ComparisonTable` | Таблица результатов сравнения: число сравнений, перестановок и время для каждого алгоритма |
| `HomePage` | Главная страница: описание приложения и переходы к разделам |
| `AlgorithmsPage` | Список шести алгоритмов с их сложностью и ссылками на визуализацию |
| `VisualizerPage` | Пошаговая визуализация выбранного алгоритма |
| `ComparePage` | Сравнение производительности всех алгоритмов на одном массиве |
| `NotFoundPage` | Страница 404 |
| `algorithms/registry.ts` | Справочник алгоритмов: идентификатор, название, сложность, память, устойчивость. Функция `findAlgorithm` |
| `algorithms/types.ts` | Типы `AlgorithmInfo`, `SortStep` (один шаг анимации), `SortFunction` (алгоритм как функция-генератор шагов) |
| `utils/generateArray.ts` | Генерация массива заданного размера и вида: случайный, отсортированный, обратный, почти отсортированный |

## 4. Маршрутизация

Маршруты описаны в `app/src/router.tsx` с помощью `createBrowserRouter` из `react-router`. Все страницы вложены в общий макет `Layout`.

| Маршрут | Страница | Описание |
|---|---|---|
| `/` | `HomePage` | Главная (index-маршрут) |
| `/algorithms` | `AlgorithmsPage` | Список алгоритмов |
| `/algorithms/:algorithmId` | `VisualizerPage` | Визуализация алгоритма. Страница с параметром `algorithmId`: `bubble`, `selection`, `insertion`, `merge`, `quick`, `heap`. Для неизвестного идентификатора показывается сообщение «Алгоритм не найден» |
| `/compare` | `ComparePage` | Сравнение производительности |
| `*` | `NotFoundPage` | Любой другой адрес |

Вложенность:

```
/ (Layout)
├── index        → HomePage
├── algorithms   → AlgorithmsPage
├── algorithms/:algorithmId → VisualizerPage
├── compare      → ComparePage
└── *            → NotFoundPage
```

Защищённых маршрутов нет: приложение не использует учётные записи, все страницы доступны без входа.

## 5. Использование библиотеки общих компонентов

1. Библиотека подключена к приложению как локальная зависимость: в `app/package.json` указано `"@sort-visualizer/ui-library": "file:../ui-library"`.
2. Библиотека собирается командой `npm run build` в `ui-library/dist`: файл `index.js` (ES-модуль), типы `index.d.ts` и стили `index.css`. React в сборку не включается (`external`), его предоставляет приложение.
3. Стили библиотеки один раз подключаются в `app/src/main.tsx`: `import '@sort-visualizer/ui-library/style.css'`.
4. Компоненты импортируются по имени пакета, например `import { ArrayBars, Card } from '@sort-visualizer/ui-library'`. Где они используются:
   - `HomePage`: `Card`, `Button`;
   - `AlgorithmsPage`: `Card`;
   - `VisualizerPage`: `ArrayBars`, `Card`;
   - `ControlPanel`: `Button`, `Select`, `Slider`;
   - `StepCounters`: `Stat`;
   - `ComparePage`: `Button`, `Card`.
5. В `app/vite.config.ts` указано `resolve.dedupe: ['react', 'react-dom']`, чтобы приложение и библиотека использовали один экземпляр React.
