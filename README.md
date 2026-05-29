# Adventure Aura

Adventure Aura is a responsive travel and adventure website built with React, TypeScript, Vite, and CSS. It presents destination packages, adventure categories, search-driven package discovery, and a frontend booking flow using local project images.

The project is designed as a frontend portfolio application. Booking and contact actions are simulated in the browser and do not connect to a payment gateway, email service, or production backend.

## Features

- Responsive travel landing page with hero, adventure categories, packages, contact section, and footer
- Destination package cards for Manali, Goa, Delhi, Jaipur, Kerala, and Darjeeling
- Search overlay for filtering destination packages
- Booking modal with travel date, traveler count, guide option, coupon logic, and receipt-style confirmation
- Local promo code flow using `AURA15`
- Contact form state handling with frontend confirmation
- Local image assets stored in `public/images`
- No runtime dependency on remote image or font CDNs

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Motion animations
- Lucide React icons

## Project Structure

```text
src/App.tsx                  Main React application and UI logic
src/index.css                Global styles
src/style.css                Travel website styling
public/images/               Local destination and adventure images
package.json                 Project scripts and dependencies
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

- This is a frontend demo project.
- Booking confirmation is generated locally for UI demonstration.
- Contact form submission only updates frontend state.
- Images are stored locally so the project can run without depending on external image URLs.

## Author

Rohan Thakare
