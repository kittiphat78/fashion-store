# Fashion Co. - E-Commerce SaaS Platform

A production-ready SaaS e-commerce website for clothing and footwear, built with Next.js 16, React 19, and TypeScript.

## 🎯 Features

- **Modern & Clean Design**: Minimal design with a professional color palette
- **Fully Responsive**: Mobile-first approach with responsive grid layouts
- **Type-Safe**: Built with TypeScript for better development experience
- **Performance Optimized**: Server-side rendering, optimized images, and efficient bundle sizes
- **DRY Architecture**: Reusable components and centralized data management
- **Accessible**: WCAG compliant with proper ARIA labels and semantic HTML

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page with hero and featured products
│   ├── layout.tsx              # Root layout with Header & Footer
│   ├── globals.css             # Global styles and design system
│   ├── products/
│   │   └── page.tsx            # Products listing page
│   ├── promotions/
│   │   └── page.tsx            # Promotions and offers page
│   ├── reviews/
│   │   └── page.tsx            # Customer reviews page
│   └── contact/
│       └── page.tsx            # Contact form page
│
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Site footer
│   ├── ProductCard.tsx         # Reusable product card
│   ├── SectionTitle.tsx        # Reusable section heading
│   └── Button.tsx              # Reusable button component
│
└── lib/
    └── constants.ts            # Centralized data and configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Available Commands

```bash
# Development
npm run dev           # Start development server

# Production
npm run build         # Build for production
npm run start         # Start production server

# Linting
npm run lint          # Run ESLint
```

## 🎨 Design System

### Color Palette

- **Black**: `#111111` (Primary)
- **White**: `#FFFFFF` (Background)
- **Gray**: `#888888` (Secondary)
- Full gray scale from `#f9f9f9` to `#1a1a1a`

### CSS Variables

All colors, spacing, shadows, and transitions are defined as CSS variables in `globals.css`:

```css
--color-black: #111111;
--color-white: #ffffff;
--spacing-md: 16px;
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

### Typography

- **Font Family**: System fonts (optimized for all platforms)
- **Line Height**: 1.6 (improved readability)
- **Font Weight Scale**: 400, 500, 600, 700

## 🧩 Components Documentation

### Button Component

```tsx
<Button
  href="/products"
  variant="primary" | "secondary" | "outline"
  size="sm" | "md" | "lg"
  fullWidth={false}
  onClick={() => {}}
>
  Click Me
</Button>
```

### ProductCard Component

```tsx
<ProductCard
  id={1}
  name="Product Name"
  price={999}
  originalPrice={1299}
  images="/image.jpg"
  discount={25}
  rating={4.8}
  reviews={124}
/>
```

### SectionTitle Component

```tsx
<SectionTitle
  title="Section Title"
  subtitle="Optional subtitle"
  centered={true}
/>
```

## 📊 Data Management

All mock data is centralized in `src/lib/constants.ts`:

- `navigationItems` - Menu links
- `products` - Product list with pricing and ratings
- `promotions` - Current offers and discounts
- `reviews` - Customer testimonials
- `socialLinks` - Social media links
- `contactInfo` - Business contact information

To update data, simply edit the constants file and the entire app will reflect changes.

## 🔄 Reusable Patterns

### Using map() for Lists

Instead of writing components multiple times, use `map()` to render from data:

```tsx
{products.map((product) => (
  <ProductCard key={product.id} {...product} />
))}
```

### CSS Variables for Theming

```css
/* In your styles */
color: var(--color-black);
padding: var(--spacing-md);
box-shadow: var(--shadow-lg);
```

### Conditional Rendering

```tsx
{discount > 0 && <div className="badge">-{discount}%</div>}
```

## 🎯 Performance Optimizations

1. **Server Components**: Most components render on the server
2. **Image Optimization**: Using Next.js Image component (when images are added)
3. **Code Splitting**: Pages are automatically code-split
4. **CSS Optimization**: Tailwind CSS purges unused styles
5. **Minimal Dependencies**: Kept dependencies lightweight

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

Tailwind CSS breakpoints are used throughout for responsive design.

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators for all interactive elements
- Proper heading hierarchy
- Color contrast compliance

## 🔐 Security Considerations

- No sensitive data in client-side code
- Form data ready for backend validation
- CSP headers can be configured in `next.config.ts`

## 📈 Scalability

The project structure is designed for easy scaling:

1. **Add New Pages**: Create new folders in `src/app/`
2. **Add Components**: Create reusable components in `src/components/`
3. **Add Data**: Update `src/lib/constants.ts`
4. **Connect Backend**: Replace mock data with API calls

## 🛠️ Development Tips

1. **Live Reload**: Changes are automatically reflected
2. **TypeScript**: Errors caught during development
3. **Tailwind CSS**: Use utility classes for styling
4. **Component Props**: Use TypeScript interfaces for type safety

## 📝 Examples

### Adding a New Page

1. Create folder: `src/app/new-page/`
2. Create file: `src/app/new-page/page.tsx`
3. Add navigation link to `constants.ts`
4. The route is automatically available at `/new-page`

### Adding a New Component

1. Create file: `src/components/NewComponent.tsx`
2. Export as default
3. Import and use in pages

### Styling

Use Tailwind CSS classes combined with CSS variables:

```tsx
className="text-black bg-white p-[var(--spacing-md)] shadow-[var(--shadow-lg)]"
```

## 📦 Dependencies

- **Next.js**: React framework for production
- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

```bash
npm run build
npm run start
```

## 📄 License

This project is ready for commercial use.

## 👨‍💻 Author

Built as a professional SaaS template for e-commerce businesses.

---

**Live Preview**: Ready to be deployed and used in production.
**Build Time**: Optimized for fast builds and deployments.
**Bundle Size**: Minimal dependencies for better performance.
