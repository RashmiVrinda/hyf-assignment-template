# Portfolio Review & Reflection (Advanced)

---

# Part A: Improvements

## 1) Fixed broken profile image loading (Local + GitHub Pages)

**Problem:**  
My profile picture was not loading because the project folder name and file path were mismatched. Additionally, GitHub Pages serves files differently compared to Live Server. Even after updating the image path, it still did not display.

**Fix:**  
I ensured that `profile.jpg` was placed in the same folder as `index.html` and used the correct relative path:

<img src="profile.jpg" alt="Rashmi Das" class="profile-img">

After pushing the changes, I performed a hard refresh (Cmd + Shift + R) to clear the browser cache.

**Result:**  
The image now loads correctly both locally and on GitHub Pages.

---

## 2) Improved Portfolio Navigation and Interaction

- Implemented smooth scrolling using JavaScript.
- Added active state highlighting for sidebar navigation icons.
- Ensured that each navigation link corresponds to an existing section:
  - #about
  - #services
  - #projects
  - #contact

This made the portfolio more interactive and professional.

---

## 3) Replaced Placeholder Links with Real Professional Links

Initially, the HTML contained placeholder links such as:

href="#"

I replaced them with real links:

- Live Game Project: https://foundation-project-memory-game.onrender.com/
- GitHub Profile: https://github.com/RashmiVrinda

This improved the functionality and professionalism of the portfolio.

---

# Part A: ASCII Diagram (Project Structure)

Portfolio (GitHub Pages)
│
├── index.html
│   ├── nav-sidebar (icon navigation)
│   ├── profile-sidebar
│   │    ├── profile image + online status
│   │    ├── LinkedIn + GitHub links
│   │    ├── personal information (location, email)
│   │    ├── skill bars
│   │    └── CV download link
│   └── main-content (scroll container)
│        ├── #about (hero section)
│        ├── #services
│        ├── #projects (live demo + GitHub repo + research post)
│        ├── #contact (email and links)
│        └── footer (dynamic year)
│
├── styles.css
│   ├── CSS variables (theme colors)
│   ├── grid layout and responsive design
│   ├── card, button, and skill bar styling
│   └── dark mode overrides
│
├── script.js
│   ├── dynamic footer year
│   ├── theme toggle (stored in localStorage)
│   ├── smooth scrolling within main-content
│   └── active navigation highlight (IntersectionObserver)
│
├── profile.jpg
└── My_CV_2026.pdf

---

# Three Learnings from Part A

## 1) Small Issues Can Appear Complex

AI suggested multiple solutions for the image path issue, but the real problem was browser caching. Performing a hard refresh (Cmd + Shift + R) solved the issue. This taught me that not all issues are code-related; sometimes they are environment-related.

---

## 2) Debugging Is Easier When Using Commands

Using terminal commands helped me verify everything:
- pwd to confirm the working directory
- ls to confirm files exist
- git log to verify commits
- Inspect/DevTools to check for 404 errors

This structured debugging approach reduced confusion.

---

## 3) Better Structure Improves Scalability

Adding proper section IDs and navigation logic made the portfolio easier to extend. The smooth scrolling and active navigation make the site behave more like a real application rather than a static page.

---

# Part B: Ethical Issues and Mitigations

## 1) Risk: Over-Reliance on AI Code

**Issue:**  
AI helped generate JavaScript logic. If I copy code without understanding it, I may struggle to maintain or debug it later.

**Mitigation:**  
I will test changes step-by-step and ensure I understand what each part of the code does (e.g., why IntersectionObserver is used, why defer is important, and how the scroll container works).

---

## 2) Risk: Security Mistakes in AI-Generated Code

**Issue:**  
Using target="_blank" without rel="noopener noreferrer" can expose the site to tab-nabbing attacks.

**Mitigation:**  
I will always include rel="noopener noreferrer" for external links and review basic security practices
.

---

## 3) Risk: Incorrect Advice Due to Missing Context

**Issue:**  
AI suggestions can be generally correct but incorrect for my specific setup. Confusion between my HYF repository and Portfolio repository caused path-related issues.

**Mitigation:**  
Before applying changes, I will:
- Check repository with git remote -v
- Confirm working directory with pwd
- Verify file existence with ls -l
- Test deployed URLs directly on GitHub Pages

This reduces mistakes caused by assumptions.