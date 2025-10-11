# GitHub Pages Deployment Setup

## Changes Made

### 1. Fixed GitHub Actions Workflow
The workflow file `.github/workflows/jekyll.yml` has been updated to work with the actual repository structure:

**Changes:**
- Removed `working-directory: '${{ github.workspace }}/src'` from Ruby setup (line 38)
- Updated build command to run from root directory instead of `cd src` (lines 43-45)
- Changed artifact upload path from `src/_site` to `_site` (line 51)

### 2. Added Custom Domain Support
Created `CNAME` file with content: `www.vanhoutensolutions.nl`

This file tells GitHub Pages to serve your site at your custom domain.

### 3. Added .gitignore
Created `.gitignore` to exclude build artifacts and dependencies:
- `_site/` (Jekyll build output)
- `.bundle/`, `vendor/` (Ruby dependencies)
- `.jekyll-cache/`, `.sass-cache/` (Jekyll cache)
- `node_modules/` (if using npm)
- `*.gem`, `*.log` (Ruby artifacts)

## GitHub Configuration Required

To complete the setup, you need to configure GitHub Pages in your repository settings:

### Step 1: Enable GitHub Pages
1. Go to your repository: https://github.com/vanhoutenbos/vanhoutensolutions-website
2. Click on **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 2: Configure Custom Domain DNS
You need to configure DNS records for your domain `www.vanhoutensolutions.nl`:

**Option A: Using CNAME (Recommended for www subdomain)**
Add a CNAME record pointing to: `vanhoutenbos.github.io`

**DNS Settings:**
```
Type: CNAME
Name: www
Value: vanhoutenbos.github.io
```

**Option B: Using A Records (if you want apex domain)**
If you also want `vanhoutensolutions.nl` (without www) to work, add these A records:
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

And for www subdomain:
```
Type: CNAME
Name: www
Value: vanhoutenbos.github.io
```

### Step 3: Verify Custom Domain
1. In GitHub Settings → Pages
2. Under **Custom domain**, enter: `www.vanhoutensolutions.nl`
3. Click **Save**
4. Wait for DNS check to complete (can take a few minutes to hours)
5. Once verified, enable **Enforce HTTPS** for secure connections

## How It Works

When you push to the `main` or `master` branch:
1. GitHub Actions automatically triggers the workflow
2. Jekyll builds your site with production environment variables
3. The built site is uploaded as an artifact
4. GitHub Pages deploys the artifact to your custom domain
5. Site becomes available at `https://www.vanhoutensolutions.nl`

## Workflow Features

- ✅ Triggers on push to main/master branch
- ✅ Can be manually triggered from GitHub Actions tab
- ✅ Builds with `JEKYLL_ENV=production`
- ✅ Uses proper baseurl from GitHub Pages configuration
- ✅ Only deploys on main/master branch (PRs only build)
- ✅ Prevents concurrent deployments
- ✅ Custom domain support via CNAME

## Testing

After merging this PR and configuring DNS:
1. Push a change to the main branch
2. Go to Actions tab to watch the build
3. Once complete, visit https://www.vanhoutensolutions.nl
4. Verify all pages load correctly
5. Check that HTTPS is working (may take time for certificate)

## Troubleshooting

**If the workflow fails:**
- Check the Actions tab for error messages
- Verify Gemfile and _config.yml are in the repository root
- Ensure GitHub Pages is enabled in repository settings

**If DNS doesn't resolve:**
- DNS changes can take up to 48 hours to propagate
- Use `dig www.vanhoutensolutions.nl` to check DNS status
- Verify CNAME record points to `vanhoutenbos.github.io`

**If HTTPS doesn't work:**
- GitHub needs to issue a certificate after DNS verification
- This can take a few hours after DNS is configured
- Don't enable "Enforce HTTPS" until certificate is issued
