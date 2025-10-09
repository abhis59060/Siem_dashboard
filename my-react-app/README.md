# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
<!-- 
my-react-app/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.jsx         ✅ (already installed)
│   │   │   ├── card.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── table.jsx
│   │   │   └── alert.jsx
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopBar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── dashboard/
│   │   │   ├── StatCards.jsx
│   │   │   ├── ThreatMap.jsx
│   │   │   ├── AlertsTable.jsx
│   │   │   ├── SecurityMetrics.jsx
│   │   │   └── SystemStatus.jsx
│   │   ├── charts/
│   │   │   ├── RealTimeChart.jsx
│   │   │   ├── ThreatTrendsChart.jsx
│   │   │   └── NetworkChart.jsx
│   │   └── animations/
│   │       ├── PulseAnimation.jsx
│   │       ├── GlowEffect.jsx
│   │       └── CounterAnimation.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx          # Main SIEM dashboard
│   │   ├── Alerts.jsx             # Security alerts page
│   │   ├── Reports.jsx            # Security reports
│   │   └── Settings.jsx           # Dashboard settings
│   ├── hooks/
│   │   ├── useRealTimeData.js     # WebSocket for live data
│   │   ├── useAnimations.js       # Animation controls
│   │   └── useDarkMode.js         # Theme switching
│   ├── data/
│   │   ├── mockData.js            # Sample SIEM data
│   │   └── apiEndpoints.js        # API configuration
│   ├── utils/
│   │   ├── formatters.js          # Data formatting
│   │   └── constants.js           # App constants
│   └── styles/
│       └── animations.css         # Custom animations
├── App.jsx                        ✅ (your current file)
├── main.jsx                       ✅ (your current file)
└── index.css                      ✅ (your current file) -->