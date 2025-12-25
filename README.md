# 🎨 TextBehind - AI-Powered Thumbnail Creator

A modern, free-to-use web application for creating stunning YouTube thumbnails and social media graphics with automatic background removal and customizable text overlays positioned behind your images.

![TextBehind Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

### 🖼️ Image Processing
- **Drag & Drop Upload** - Intuitive file upload with visual feedback
- **AI Background Removal** - Automatic background removal using @imgly/background-removal
- **Multi-Format Support** - JPG, PNG, WebP, SVG (up to 10MB)
- **Smart SVG Handling** - Automatic detection with appropriate processing

### 📝 Text Customization
- **Multiple Text Elements** - Add unlimited text overlays
- **500+ Google Fonts** - Extensive font library with live preview
- **Advanced Typography** - Font size, weight, color, opacity, rotation
- **Precise Positioning** - Pixel-perfect text placement
- **Text Effects** - Shadows, foreground/background layering
- **Letter Spacing** - Fine-tune text appearance

### 🎛️ Image Controls
- **Brightness & Contrast** - Real-time image adjustments
- **Background Opacity** - Control image transparency
- **Live Preview** - Instant canvas updates

### 🔄 Productivity Features
- **Undo/Redo System** - Full history with 50-state memory
- **Keyboard Shortcuts** - Ctrl+Z (Undo), Ctrl+Y (Redo), Ctrl+S (Download)
- **Auto-Save** - Automatic draft recovery on page reload
- **Duplicate Elements** - Quick text element duplication
- **Batch Operations** - Delete, copy, and manage multiple elements

### 🎯 User Experience
- **Responsive Design** - Optimized for desktop and mobile
- **Error Boundaries** - Graceful error handling with recovery options
- **Toast Notifications** - Real-time feedback for all operations
- **Accessibility** - WCAG 2.1 compliant with ARIA labels
- **No Authentication** - Free to use without sign-up

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/textbehind.git
   cd textbehind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features and hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations

### UI Components
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible primitives
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications

### Image Processing
- **@imgly/background-removal** - AI-powered background removal
- **Canvas API** - Real-time image composition
- **WebFont Loader** - Dynamic font loading

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Turbopack** - Fast bundling

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (root)/            # Root layout group
│   │   ├── layout.tsx     # Root layout with navigation
│   │   └── text-behind/   # Main editor page
│   │       └── page.tsx   # Editor component
│   ├── actions/           # Server actions
│   ├── fonts.ts          # Google Fonts list (500+)
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Main app layout
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── thumbnail-creator.tsx  # Main editor component
│   ├── dropzone.tsx      # File upload component
│   ├── font-picker.tsx   # Font selection component
│   └── ErrorBoundary.tsx # Error handling component
├── hooks/                # Custom React hooks
└── lib/                  # Utilities
```

## 🎮 Usage Guide

### Basic Workflow

1. **Upload Image**
   - Drag and drop or click to browse
   - Supports JPG, PNG, WebP, SVG (max 10MB)
   - Automatic background removal (except SVG)

2. **Add Text**
   - Click "New Text" to add text elements
   - Customize font, size, color, position
   - Use sliders for precise adjustments

3. **Adjust Image**
   - Fine-tune brightness and contrast
   - Control background opacity
   - Real-time preview updates

4. **Export**
   - Click "Download" or press Ctrl+S
   - High-quality PNG output
   - Filename includes timestamp

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Z` | Undo last action |
| `Ctrl + Y` | Redo last action |
| `Ctrl + S` | Download image |

### Text Element Controls

- **Content** - Edit text directly
- **Font Family** - Choose from 500+ Google Fonts
- **Font Size** - 10px to 400px range
- **Font Weight** - 100 to 900 weight
- **Color** - Hex codes or color picker
- **Opacity** - 0% to 150% transparency
- **Rotation** - -180° to 180° rotation
- **Position** - X/Y coordinates (0-100%)
- **Letter Spacing** - -20px to 50px spacing
- **Shadow** - Toggle black text shadow
- **Layer** - Text above/below image

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Widget (optional)
NEXT_PUBLIC_WIDGET_PROJECT_ID=9
```

### Customization

#### Adding New Fonts
Edit `src/app/fonts.ts` to add more Google Fonts:

```typescript
export const ALL_FONTS = [
  'Inter',
  'Roboto',
  'Your Custom Font',
  // ... more fonts
];
```

#### Styling
Modify `src/app/globals.css` for custom themes:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more CSS variables */
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel --prod
   ```

2. **Environment Variables**
   - Add environment variables in Vercel dashboard
   - Configure custom domain if needed

### Other Platforms

- **Netlify**: `npm run build` → Deploy `out/` folder
- **Railway**: Connect GitHub repository
- **Docker**: Use provided Dockerfile

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Add proper error handling and loading states
- Include accessibility attributes (ARIA labels)
- Test on multiple devices and browsers
- Update documentation for new features

## 🐛 Troubleshooting

### Common Issues

**Background removal fails**
- Check image format (SVG not supported)
- Ensure file size under 10MB
- Try different image or refresh page

**Fonts not loading**
- Check internet connection
- Clear browser cache
- Verify Google Fonts availability

**Canvas not rendering**
- Disable browser extensions
- Check console for errors
- Try different browser

**Performance issues**
- Reduce image size before upload
- Limit number of text elements
- Close other browser tabs

### Error Recovery

The app includes comprehensive error handling:
- **Error Boundaries** - Graceful component error recovery
- **Auto-Save** - Automatic work preservation
- **Toast Notifications** - Clear error messages
- **Retry Mechanisms** - Built-in retry for failed operations

## 📊 Performance

### Optimization Features

- **Code Splitting** - Lazy loading of components
- **Image Optimization** - Efficient canvas rendering
- **Font Loading** - On-demand Google Fonts loading
- **Memory Management** - Automatic cleanup of resources
- **Caching** - Browser caching for static assets

### Benchmarks

- **First Load** - < 2s on 3G connection
- **Background Removal** - 2-5s depending on image size
- **Canvas Rendering** - Real-time updates (60fps)
- **Memory Usage** - < 100MB for typical usage

## 🔒 Privacy & Security

- **No Data Collection** - No user data stored on servers
- **Local Processing** - All editing happens in browser
- **No Authentication** - No personal information required
- **Secure Uploads** - Client-side file validation
- **HTTPS Only** - Secure connection required

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **@imgly/background-removal** - AI background removal
- **shadcn/ui** - Beautiful UI components
- **Radix UI** - Accessible component primitives
- **Vercel** - Hosting and deployment
- **Google Fonts** - Typography library

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/textbehind/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/textbehind/discussions)
- **Twitter**: [@its_tossi](https://twitter.com/its_tossi)
- **LinkedIn**: [Tosif Raza](https://www.linkedin.com/in/tosif-raza-247471205/)

---

<div align="center">

**Made with ❤️ by [Tosif Raza](https://github.com/yourusername)**

[⭐ Star this repo](https://github.com/yourusername/textbehind) • [🐛 Report Bug](https://github.com/yourusername/textbehind/issues) • [✨ Request Feature](https://github.com/yourusername/textbehind/issues)

</div>