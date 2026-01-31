# Travel Vibe Tester - Research Edition

A sophisticated, mobile-first research tool for collecting deep qualitative feedback on travel activities through an intuitive Tinder-style swipe interface with comprehensive feedback modals.

## Features

### Core Experience
- **Mobile-First Design**: Optimized for portrait mode on mobile devices
- **Smooth Animations**: Powered by Framer Motion for fluid card transitions
- **Image Carousel**: Browse through 3 images per activity with smooth transitions
- **Activity Badges**: Visual indicators for crowd level and physical effort

### Research Capabilities
- **Deep Feedback Collection**: Intercepts every swipe to collect WHY users made that choice
- **Dark Mode Modal**: Beautiful bottom-sheet feedback form
- **Multi-dimensional Data**:
  - Experience level (done before?)
  - Vibe tags (8 presets + custom tags)
  - Structured dislike reasons
  - Open-text feedback
- **Expandable Results**: Review all feedback with collapsible cards
- **Comprehensive Export**: Copy detailed formatted research report

### User Experience
- **Session Management**: Enter tester name and track all interactions
- **Apple-Style UI**: Clean, minimal, modern design
- **Thumb-Friendly**: Large tap targets and bottom-sheet interactions

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
│   ├── StartScreen.jsx      # Initial screen with name input
│   ├── CardView.jsx         # Main swipe card interface with badges
│   ├── FeedbackModal.jsx    # Deep feedback collection modal
│   └── SummaryScreen.jsx    # Detailed results with expandable cards
├── data/
│   └── activities.js        # 27 activities with crowd/effort data
├── App.jsx                  # Main app with feedback data flow
├── main.jsx                 # React entry point
└── index.css                # Global styles + dark mode
```

## Usage Flow

1. **Start Screen**: Enter your name to begin testing
2. **Card View**: Swipe through activities
   - View crowd level and physical effort badges
   - Use left/right arrows to browse 3 images
   - Press "Pass" (X) or "Like" (❤️)
3. **Feedback Modal**: Provide deep insights (intercepts every swipe)
   - Indicate if you've done it before
   - Select vibe tags (or add custom)
   - For likes: explain why you like it
   - For passes: select reasons + add comments
4. **Summary Screen**: View comprehensive results
   - Expand cards to see detailed feedback
   - Separate sections for liked vs passed
   - Copy formatted research report
   - Start a new session

## Activity Data Structure

Each activity includes:
- `id`: Unique identifier
- `name`: Activity name
- `specificActivities`: Detailed description of what you'll do
- `description`: Short tagline
- `crowdLevel`: Low, Medium, High, or Extreme
- `physicalEffort`: Low, Medium, or High
- `image1`, `image2`, `image3`: Image URLs

## Feedback Data Structure

Each result captures:
- Activity details
- Status (Liked or Pass)
- Feedback object:
  - `hasDoneBefore`: boolean
  - `vibes`: array of tags
  - `whyLike`: open text (for likes)
  - `whyDislike`: array of reasons (for passes)
  - `additionalComments`: open text (for passes)

## Customization

To add more activities, edit `src/data/activities.js` and add new objects following the existing structure.

## Mobile Optimization

- Touch-optimized buttons and interactions
- No text selection or highlight on tap
- Proper viewport meta tags
- Apple mobile web app capable
- Safe area padding for notched devices

## Documentation

See [UPGRADE_NOTES.md](./UPGRADE_NOTES.md) for detailed technical documentation of the research upgrade features.

## License

MIT
# travel-reccos
