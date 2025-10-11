# Van Houten Solutions - Jekyll Website

Professionele Jekyll website voor Van Houten Solutions - WordPress specialist voor startende ondernemers in Noord-Brabant.

## 🚀 Live Website
- **Production:** https://vanhoutensolutions.nl
- **GitHub Pages:** https://vanhoutenbos.github.io/Wordpress-website-bv

## 🛠️ Tech Stack
- **Framework:** Jekyll 4.3.2
- **Styling:** SCSS/CSS3
- **Fonts:** Inter (headings) + Open Sans (body)
- **Hosting:** GitHub Pages
- **Deployment:** GitHub Actions

## 📱 Features
- ✅ Responsive design (mobile-first)
- ✅ V-shaped hero section (matches logo)
- ✅ SEO optimized with structured data
- ✅ Instagram-focused CTA strategy
- ✅ Portfolio showcase
- ✅ Performance optimized
- ✅ Accessibility compliant

## 🎨 Design System

### Colors
```scss
--primary-color: #[LOGO_COLOR]; // To be extracted from logo
--secondary-color: #[LOGO_ACCENT]; 
--text-dark: #1F2937;
--background: #FFFFFF;
```

### Typography
- **Headings:** Inter (Google Fonts)
- **Body:** Open Sans (Google Fonts)
- **Responsive:** Fluid typography with clamp()

### Layout
- **Container max-width:** 1280px
- **Breakpoints:** 640px, 768px, 1024px, 1280px
- **Grid:** CSS Grid + Flexbox

## 📄 Site Structure

### Pages
1. **Home** (`/`) - Hero + testimonials + services preview
2. **Aanbod** (`/aanbod/`) - €899 package + USPs + add-ons
3. **Mijn Aanpak** (`/hoe-werk-ik/`) - Process flow & werkwijze
4. **Portfolio** (`/portfolio/`) - Case studies & live examples
5. **Over Mij** (`/over-mij/`) - 10+ year experience + personal story
6. **Onderhoud** (`/onderhoud/`) - €49-99 maintenance packages
7. **Contact** (`/contact/`) - Instagram focus + TransIP affiliate

### Collections
- `_portfolio/` - Portfolio case studies
- `_services/` - Service pages

## 🔧 Development

### Local Setup
```bash
cd src
bundle install
bundle exec jekyll serve --livereload
```

### Build
```bash
cd src
bundle exec jekyll build
```

### Deploy
- **Automatic:** Push to main branch triggers GitHub Actions
- **Manual:** Run workflow from GitHub Actions tab

## 📊 SEO Strategy

### Primary Keywords
- "webdesigner breda"
- "webdesigner noord-brabant" 
- "wordpress website"
- "wat kost een website laten maken"
- "professionele website"

### Content Strategy
- Local SEO (Noord-Brabant focus)
- Price transparency (€899 exact match)
- AI/WordPress learning USPs
- Portfolio-driven social proof

## 🎯 Business Goals

### Primary CTAs
1. **Instagram DM** - Main conversion path
2. **Portfolio View** - Trust building
3. **Process Info** - Education

### Key Messages
- €899 transparent pricing
- 6-week delivery guarantee
- AI tools for self-management
- Personal service via Instagram

## 📱 Content Strategy

### Homepage Sections
1. **Hero** - V-shaped background + value prop
2. **Social Proof** - Client testimonials
3. **Services** - What you get for €899
4. **Portfolio** - Recent work examples
5. **CTA** - Instagram contact

### SEO Content
- Blog ready (Jekyll native)
- Structured data implemented
- Meta tags optimized
- Local business schema

## 🚀 Performance

### Optimization
- ✅ Modern CSS (CSS Grid, Flexbox)
- ✅ Optimized images
- ✅ Minimal JavaScript
- ✅ Font loading optimization
- ✅ Critical CSS inlined

### Lighthouse Goals
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔗 Integrations

### Analytics
- Google Analytics 4 (via Jekyll SEO)
- Schema.org structured data
- Instagram link tracking

### External Services
- TransIP affiliate links
- Instagram contact integration
- Google Fonts (preloaded)

## 📦 Deployment

### GitHub Actions Workflow
1. **Trigger:** Push to main branch
2. **Build:** Jekyll site compilation
3. **Deploy:** GitHub Pages automatic deployment
4. **Domain:** Custom domain (vanhoutensolutions.nl)

### Environment Variables
```yaml
JEKYLL_ENV: production
```

## 🎨 Customization

### Logo Integration
- Header logo: `/assets/images/Text-Color-PNG.png`
- Footer logo: `/assets/images/Logo-Color-PNG.png`
- Favicon: Generated from logo

### Color Updates
1. Extract hex codes from logo
2. Update `assets/css/main.scss` variables
3. Test contrast ratios for accessibility

## 📞 Support

### Contact Info
- **Instagram:** [vanhoutensolutions](https://instagram.com/vanhoutensolutions)
- **Business:** Van Houten Solutions
- **Location:** Noord-Brabant, Nederland

---

**Built with ❤️ using Jekyll • Hosted on GitHub Pages • Optimized for conversion**