# Liityntäpysäköinti UI

Real-time parking availability monitoring for HSL (Helsinki Region Transport) Park & Ride facilities.

Built with **React 19**, **Radix UI**, and **Tailwind CSS v4**.

🌐 [liityntapysakointi.fi](https://www.liityntapysakointi.fi)

## Features

- 🚗 Real-time parking availability data from Fintraffic API
- ⭐ Favorites system - star your most-used parking facilities
- 📱 Fully responsive design optimized for mobile use
- 🔄 Auto-refresh every minute with localStorage caching
- ⚡ Electric vehicle charging spot information
- 🎨 Modern, accessible UI with HSL-inspired theme

## Development

```bash
cd react-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
cd react-app
npm run build
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Radix UI** - Accessible component primitives
- **Tailwind CSS v4** - Styling
- **Apollo Client** - GraphQL client
- **React Router** - Navigation
- **dayjs** - Date formatting

## Data Source

Parking data is provided by [Fintraffic](https://parking.fintraffic.fi/) via GraphQL API.
