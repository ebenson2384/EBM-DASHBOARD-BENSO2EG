# 🚀 GitHub Deployment Instructions

## Deploy Your EBM Dashboard to GitHub Pages

Follow these steps to make your dashboard accessible online at: `https://yourusername.github.io/EBM-Dashboard/`

---

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in top-right → **"New repository"**
3. Configure repository:
   - **Repository name:** `EBM-Dashboard`
   - **Description:** "Evidence-Based Management Dashboard: Communication → Engagement → Performance Analysis"
   - **Visibility:** Choose **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README (you already have one)
4. Click **"Create repository"**

---

## Step 2: Connect Local Repository to GitHub

Copy the commands from GitHub's "push an existing repository" section, or run these (replace `YOUR-USERNAME`):

```bash
cd /Users/ethanbenson/Documents/EBM-Dashboard

# Set your remote repository (REPLACE YOUR-USERNAME!)
git remote add origin https://github.com/YOUR-USERNAME/EBM-Dashboard.git

# Verify remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example if your GitHub username is "ethanbenson":**
```bash
git remote add origin https://github.com/ethanbenson/EBM-Dashboard.git
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/EBM-Dashboard`
2. Click **"Settings"** tab (top menu)
3. Scroll down to **"Pages"** in left sidebar
4. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **"Save"**
6. Wait 1-2 minutes for deployment
7. Your dashboard will be live at: `https://YOUR-USERNAME.github.io/EBM-Dashboard/`

---

## Step 4: Verify Deployment

1. Visit your GitHub Pages URL: `https://YOUR-USERNAME.github.io/EBM-Dashboard/`
2. Check that:
   - ✅ Dashboard loads with all styling
   - ✅ All 5 tabs are accessible
   - ✅ Clicking content boxes opens modals
   - ✅ All 405,090 characters of content display
   - ✅ Effect sizes are visible in Scientific Sources

---

## Step 5: Update Repository Link in Dashboard

Once deployed, update the GitHub link in your dashboard:

**Edit `index.html` line 287:**

Change:
```html
<a href="https://github.com/yourusername/EBM-Dashboard" class="github-link" target="_blank">
```

To (with YOUR actual username):
```html
<a href="https://github.com/YOUR-USERNAME/EBM-Dashboard" class="github-link" target="_blank">
```

Then commit and push the update:
```bash
git add index.html
git commit -m "Update GitHub repository link"
git push
```

---

## 🔄 Making Updates After Initial Deployment

Whenever you edit content files:

```bash
# 1. Regenerate dashboard data
python3 generate_dashboard_data.py

# 2. Stage changes
git add .

# 3. Commit with descriptive message
git commit -m "Update evidence content"

# 4. Push to GitHub (automatically updates GitHub Pages)
git push
```

GitHub Pages will automatically rebuild (takes 1-2 minutes).

---

## 📊 What Gets Deployed

Your repository includes:
- ✅ `index.html` - Main dashboard (interactive HTML)
- ✅ `dashboard_content.js` - All 405,090 characters of evidence
- ✅ `load_content.js` - Content loading functions
- ✅ All 18 content `.txt` files in `/content` folder
- ✅ All documentation (README.md, DASHBOARD_GUIDE.md, etc.)
- ✅ Python scripts (for regenerating data)

**NOT deployed (excluded by `.gitignore`):**
- ❌ Large data files (.zip, .xlsx)
- ❌ Python cache files
- ❌ System files (.DS_Store)

---

## 🎓 For Submission

Include this URL in your assignment submission:

**Live Dashboard:** `https://YOUR-USERNAME.github.io/EBM-Dashboard/`

**Source Code:** `https://github.com/YOUR-USERNAME/EBM-Dashboard`

Your professor can:
- View your interactive dashboard online
- See all 10+ peer-reviewed effect sizes in the Scientific Sources section
- Explore all 13 evidence files via modal viewer
- Review your code on GitHub
- Verify 100% completion status

---

## ✅ Quick Checklist

Before submitting:
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub (`git push` successful)
- [ ] GitHub Pages enabled in Settings
- [ ] Dashboard loads at your GitHub Pages URL
- [ ] All content displays correctly (test clicking content boxes)
- [ ] Effect sizes visible in Scientific Sources
- [ ] GitHub link in dashboard points to your actual repository
- [ ] Repository is PUBLIC (required for GitHub Pages)

---

## 🆘 Troubleshooting

**Problem:** "Repository not found" when pushing
- **Solution:** Double-check repository URL; ensure you replaced `YOUR-USERNAME`

**Problem:** GitHub Pages shows 404 error
- **Solution:** Wait 2-3 minutes for initial build; check that "main" branch is selected in Settings → Pages

**Problem:** Dashboard loads but content doesn't display
- **Solution:** Check browser console (F12); ensure `dashboard_content.js` exists; run `python3 generate_dashboard_data.py` and push again

**Problem:** Styling looks broken on GitHub Pages
- **Solution:** All CSS is embedded in `index.html` so this shouldn't happen; try hard refresh (Cmd+Shift+R)

---

## 🎉 Success!

Once deployed, anyone can view your Evidence-Based Management Dashboard with all peer-reviewed effect sizes, FEVS data analysis, and comprehensive evidence appraisal!

**Share your URL:** `https://YOUR-USERNAME.github.io/EBM-Dashboard/`
