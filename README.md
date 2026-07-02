# ⚽ GoalPulse

> Live football scores, news, and standings — all in one place.

GoalPulse is a cross-platform mobile app built with **React Native CLI**, designed to keep football fans updated with live scores, breaking news, and league standings across the world's top competitions.

---

## 📱 Screenshots

> Coming soon — add your simulator/emulator screenshots here.

---

## ✨ Features

- **Live Scores** — Real-time match scores with live minute indicator, grouped by competition
- **Football News** — Latest articles filtered by league
- **Standings** — Full league tables with form guide, goal difference, and zone indicators
- **Favorites** — Follow your teams and get personalized news
- **Bilingual** — English and Spanish support *(in progress)*
- **Dark theme** — Built for night-mode football watching

### Leagues covered
- 🏆 UEFA Champions League
- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League
- 🇪🇸 La Liga
- 🇩🇪 Bundesliga
- 🇮🇹 Serie A

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native CLI (0.76) |
| Language | TypeScript |
| Navigation | React Navigation v6 (Stack + Bottom Tabs) |
| State | Zustand |
| Data fetching | TanStack Query (React Query v5) |
| Backend | Supabase *(coming soon)* |
| HTTP | Axios |
| Ads | Google AdMob *(planned)* |

---

## 📁 Project Structure

```
GoalPulse/
├── App.tsx                          # Entry point
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx        # Auth gate
    │   ├── AuthStack.tsx            # Login / Register flow
    │   └── MainTabs.tsx             # Bottom tab navigator
    ├── screens/
    │   ├── auth/
    │   │   ├── LoginScreen.tsx
    │   │   └── RegisterScreen.tsx
    │   └── tabs/
    │       ├── NewsScreen.tsx
    │       ├── ScoresScreen.tsx
    │       ├── StandingsScreen.tsx
    │       └── FavoritesScreen.tsx
    ├── components/
    │   ├── ui/
    │   │   └── Button.tsx
    │   ├── NewsCard.tsx
    │   ├── MatchCard.tsx
    │   └── StandingRow.tsx
    ├── store/
    │   └── authStore.ts             # Zustand auth store
    ├── data/
    │   ├── mockNews.ts
    │   ├── mockMatches.ts
    │   └── mockStandings.ts
    └── constants/
        ├── colors.ts
        └── types.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- React Native CLI
- Xcode (iOS) + CocoaPods
- Android Studio (Android)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/goalpulse.git
cd goalpulse

# Install JS dependencies
npm install

# Install React Native CLI (required for autolink)
npm install -D @react-native-community/cli

# iOS — install native pods
cd ios && pod install && cd ..
```

### Running the app

```bash
# Start Metro bundler
npx react-native start

# iOS (new terminal)
npx react-native run-ios

# Android (new terminal)
npx react-native run-android
```

### Dev credentials (mock mode)

While Supabase is not yet connected, log in with any email and password `123456`.

---

## 🗺️ Roadmap

### v1.0 — MVP *(in progress)*
- [x] Project structure + navigation
- [x] Auth flow with mock data (login / register)
- [x] News feed with league filter
- [x] Live scores screen
- [x] League standings with form guide
- [x] Favorites / profile screen
- [x] Connect Supabase Auth
- [x] Connect API-Football (live scores + stats)
- [ ] Connect NewsAPI (real articles)
- [ ] Push notifications for live matches

### v1.1 — Polish
- [ ] Match detail screen
- [ ] Article reader
- [ ] Search
- [ ] Onboarding (team selection on first launch)
- [ ] i18n ES / EN

### v2.0 — Monetization
- [ ] Google AdMob integration
- [ ] GoalPulse Pro (ad-free tier)

---

## 🔑 Environment Variables

Create a `.env` file at the root (never commit this):

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
API_FOOTBALL_KEY=your_api_football_key
NEWS_API_KEY=your_newsapi_key
```

---

## 🤝 Contributing

This project is currently in active development. Feel free to open issues or submit PRs.

---

## 📄 License

MIT © GoalPulse
