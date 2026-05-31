# 🔥 FireShield - Single Page Application

## Premium Enterprise Fire Safety Equipment Website

A fully functional, production-ready Single Page Application (SPA) for a fire safety equipment company. Built with vanilla JavaScript, HTML5, and CSS3 - no frameworks required.

---

## ✨ Features

### 🎯 **Single Page Application**
- **No Page Reloads** - Smooth navigation between pages
- **Dynamic Content Loading** - All content loads instantly
- **Browser History Support** - Back/forward buttons work perfectly
- **Fast Performance** - Optimized for speed

### 📄 **Pages Included**
1. **Home** - Hero, categories, featured products, testimonials, brands
2. **Products** - All products with filters, search, sorting, pagination
3. **Category Pages** - Filtered products by category (8 categories)
4. **Product Details** - Full product information with specifications
5. **About Us** - Company story, mission, vision, certifications
6. **Contact** - Contact form, map, office information

### 🛠️ **Functionality**
- ✅ Live Search with instant results
- ✅ Advanced Filters (category, price, rating)
- ✅ Multiple Sort Options (name, price, popularity)
- ✅ Pagination for products
- ✅ Product Details Modal
- ✅ Contact Form with Validation
- ✅ Mobile Responsive Menu
- ✅ Smooth Scroll Animations
- ✅ Counter Animations
- ✅ Image Hover Effects

### 🎨 **Design**
- **Light Theme Only** - Professional corporate design
- **Color Palette**:
  - Primary Red: #D62828
  - Secondary Red: #E63946
  - Yellow Accent: #FFF3B0 (for highlights only)
  - Professional grays and whites
- **Premium UI** - Inspired by Honeywell, Bosch, Siemens
- **Fully Responsive** - Desktop, tablet, mobile optimized

---

## 🚀 How to Use

### **Option 1: Direct Open**
Simply open `index.html` in your web browser. That's it!

### **Option 2: Local Server (Recommended)**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

---

## 📁 File Structure

```
Fire/
├── index.html              # Main SPA file
├── script.js               # All JavaScript functionality
├── assets/
│   └── css/
│       └── main.css        # All styles
└── README.md               # This file
```

---

## 🎯 Navigation

The SPA uses a custom routing system:

```javascript
navigateTo('home')                          // Go to homepage
navigateTo('products')                      // Go to products page
navigateTo('category', 'Fire Extinguishers') // Go to category page
navigateTo('about')                         // Go to about page
navigateTo('contact')                       // Go to contact page
viewProductDetails(productId)               // View product details
```

---

## 🔧 Key Functions

### **Navigation**
- `navigateTo(page, param)` - Navigate to any page
- `renderPage()` - Render current page content

### **Products**
- `filterProducts()` - Filter products by search, category, price, rating
- `displayProducts()` - Display filtered products with pagination
- `viewProductDetails(id)` - Show product details page

### **Search**
- `toggleSearch()` - Open/close search overlay
- `performSearch()` - Search products and show results

### **Animations**
- `animateCounters()` - Animate statistics counters
- `revealOnScroll()` - Reveal elements on scroll

---

## 📊 Product Data

The application includes 12 sample products across 8 categories:
- Fire Extinguishers (3 products)
- Fire Alarm Systems (2 products)
- Fire Hydrant Systems (1 product)
- Smoke Detectors (1 product)
- Emergency Lights (1 product)
- Safety Signages (1 product)
- PPE Equipment (1 product)
- Fire Fighting Accessories (2 products)

**To add more products**, edit the `products` array in `script.js`:

```javascript
const products = [
  {
    id: 13,
    name: 'Your Product Name',
    category: 'Category Name',
    price: 2999,
    oldPrice: 3999,
    rating: 4.5,
    reviews: 100,
    image: 'image-url',
    description: 'Product description',
    features: ['Feature 1', 'Feature 2'],
    specifications: {
      'Spec 1': 'Value 1',
      'Spec 2': 'Value 2'
    },
    inStock: true,
    certified: true,
    popular: false
  }
];
```

---

## 🎨 Customization

### **Colors**
Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --red:      #D62828;  /* Primary brand color */
  --red2:     #E63946;  /* Secondary red */
  --yellow:   #FFF3B0;  /* Accent highlights */
  --text:     #2B2D42;  /* Primary text */
  --muted:    #6C757D;  /* Secondary text */
}
```

### **Categories**
Edit the `getCategoryCards()` function in `script.js` to add/remove categories.

### **Company Information**
Update contact details in the `getContactPage()` function.

---

## 📱 Responsive Breakpoints

- **Desktop**: 1280px+ (4-column grid)
- **Laptop**: 1024px-1279px (3-column grid)
- **Tablet**: 768px-1023px (2-column grid)
- **Mobile**: Below 768px (1-column grid)

---

## ✅ Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

## 🚀 Performance

- **No Framework** - Pure vanilla JavaScript
- **Lightweight** - Fast loading times
- **Optimized Images** - Using Unsplash CDN
- **Smooth Animations** - CSS transitions
- **SEO Friendly** - Semantic HTML

---

## 📝 To-Do / Future Enhancements

- [ ] Add shopping cart functionality
- [ ] Integrate with backend API
- [ ] Add user authentication
- [ ] Implement product reviews system
- [ ] Add wishlist feature
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced analytics

---

## 🤝 Support

For questions or support:
- **Email**: sales@fireshield.com
- **Phone**: 1800-123-4567

---

## 📄 License

This is a commercial website template. All rights reserved.

---

## 🎉 Credits

- **Design Inspiration**: Honeywell, Bosch, Siemens, Johnson Controls
- **Images**: Unsplash (placeholder images)
- **Fonts**: Google Fonts (Oswald, Source Sans Pro)
- **Icons**: Unicode Emoji

---
