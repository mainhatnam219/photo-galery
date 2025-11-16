# 📸 Photo Gallery - Lorem Picsum

A modern, responsive React application that displays photos from the Lorem Picsum API with infinite scroll and detailed photo views.


### API Integration (1 point)
✅ Successfully fetches data from Lorem Picsum API  
✅ Handles loading states with spinner indicators  
✅ Handles error states with user-friendly messages and retry functionality

### Photo Grid/List Display (2 points)
✅ Displays photos in responsive grid (1-4 columns based on screen size)  
✅ Shows photo thumbnails with author information  
✅ Hover effects and smooth transitions  
✅ Optimized with lazy loading

### Infinite Scroll (1 point)
✅ Automatically loads more photos on scroll  
✅ Uses Intersection Observer API for efficient scroll detection  
✅ Shows loading indicator when fetching new photos  
✅ Handles end of list gracefully  
✅ Pagination with 30 photos per page

### Photo Details View (2 points)
✅ Full-size image display  
✅ Shows photo title/ID  
✅ Displays author name with avatar  
✅ Includes photo description  
✅ Shows image dimensions and metadata  
✅ Download and external link buttons

### Routing and Navigation (1 point)
✅ `/photos` - Photo list page  
✅ `/photos/:id` - Individual photo detail page  
✅ `/` - Redirects to `/photos`  
✅ Back navigation from detail to list

### Styling and Responsiveness (1 point)
✅ Modern, clean design  
✅ Tailwind CSS for consistent styling  
✅ Fully responsive (mobile, tablet, desktop)  
✅ Smooth animations and transitions  
✅ Gradient backgrounds and shadows

### Code Quality (1 point)
✅ Well-organized component structure  
✅ Comprehensive code comments and JSDoc  
✅ Reusable components (LoadingSpinner, ErrorMessage, PhotoCard)  
✅ React best practices and hooks  
✅ Clean, readable code

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "/Users/mainhatnam/Documents/2025 - 2026 FIT/Web Application/Week 8"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
Week 8/
├── src/
│   ├── components/
│   │   ├── PhotoList.jsx       # Main photo grid with infinite scroll
│   │   ├── PhotoCard.jsx       # Individual photo card component
│   │   ├── PhotoDetail.jsx     # Photo detail view
│   │   ├── LoadingSpinner.jsx  # Loading indicator component
│   │   └── ErrorMessage.jsx    # Error display component
│   ├── services/
│   │   └── api.js              # API service functions
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles with Tailwind
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints Used

- `GET https://picsum.photos/v2/list?page={page}&limit={limit}` - Fetch photo list
- `GET https://picsum.photos/id/{id}/info` - Fetch photo details
- `GET https://picsum.photos/id/{id}/{width}/{height}` - Get photo image

## Key Features Implementation

### Infinite Scroll
Uses the Intersection Observer API to detect when the user scrolls near the bottom of the page, automatically triggering the next page load.

### Error Handling
Comprehensive error handling with try-catch blocks and user-friendly error messages with retry functionality.

### Responsive Design
Mobile-first approach using Tailwind's responsive utilities:
- Mobile: 1 column
- Tablet: 2 columns  
- Desktop: 3-4 columns

### Performance Optimization
- Lazy loading for images
- Efficient state management
- Optimized re-renders with useCallback
- Image dimension optimization

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/photo-gallery",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## License

This project is created for educational purposes as part of the Web Application Development course.

## Author

- GitHub: [@mainhatnam219](https://github.com/mainhatnam219)

## Acknowledgments

- Photos provided by [Lorem Picsum](https://picsum.photos/)
- Original photos from [Unsplash](https://unsplash.com/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
