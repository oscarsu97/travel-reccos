# Travel Vibe Tester MVP

A beautiful, mobile-first web application for testing travel activity preferences through a Tinder-style swipe interface.

## Features

- **Mobile-First Design**: Optimized for portrait mode on mobile devices
- **Smooth Animations**: Powered by Framer Motion for fluid card transitions
- **Image Carousel**: Browse through 3 images per activity with smooth transitions
- **Session Management**: Enter tester name and track liked activities
- **Results Export**: Copy formatted results to clipboard
- **Apple-Style UI**: Clean, minimal, modern design inspired by Apple's aesthetic

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── StartScreen.jsx    # Initial screen with name input
│   ├── CardView.jsx       # Main swipe card interface
│   └── SummaryScreen.jsx  # Results and export screen
├── data/
│   └── activities.js      # Activity data constants
├── App.jsx                # Main app component
├── main.jsx               # React entry point
└── index.css              # Global styles
```

## Usage Flow

1. **Start Screen**: Enter your name to begin testing
2. **Card View**: Swipe through activities
   - Use left/right arrows to browse images
   - Press "Pass" (X) to skip
   - Press "Like" (❤️) to save the activity
3. **Summary Screen**: View results
   - See all liked activities
   - Copy results to clipboard
   - Start a new session

## Activity Data Structure

Each activity includes:
- `id`: Unique identifier
- `name`: Activity name
- `specificActivities`: Detailed description of what you'll do
- `description`: Short tagline
- `image1`, `image2`, `image3`: Image URLs

## Customization

To add more activities, edit `src/data/activities.js` and add new objects following the existing structure.

## Mobile Optimization

- Touch-optimized buttons and interactions
- No text selection or highlight on tap
- Proper viewport meta tags
- Apple mobile web app capable
- Safe area padding for notched devices

## License

MIT
# travel-reccos
