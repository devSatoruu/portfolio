# Aljun Agunas — Developer Portfolio

Responsive developer portfolio with four STAR case studies, original project screenshots, an ongoing project architecture artifact, education and work history, a sanitized PDF resume, email contact, and an optional animated developer-OS interface.

## Quick start

No package installation is required. Use Node.js 22 or newer for checks and the deployment helper.

```bash
node --check dist/app.js
node scripts/check-site.mjs
node scripts/check-pages.mjs
```

The source website is in `dist/`. Serve that directory with a static HTTP server. Opening the HTML directly as a local file is not supported.

## Deploy on GitHub Pages

1. Create a public GitHub repository, for example `portfolio`.
2. Put the files from this package at the repository root, including `.github/workflows/deploy-pages.yml`. Do not place them inside a second nested directory.
3. Push to the `main` branch.
4. In repository Settings → Pages, select **GitHub Actions** as the build and deployment source.
5. Run **Check and deploy portfolio** from the Actions tab if the initial push happened before Pages was enabled.
6. Wait for the workflow to succeed. Open the exact URL shown by the deployment.
7. Test that URL in a signed-out/private browser before submitting it to Brightspace.

The workflow checks the site, creates `site-build/`, and publishes that directory. It automatically handles repository subpaths, so both an account site and a `/portfolio/` project site work. No personal access token or API key belongs in this project.

Workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Push from a local computer

After extracting the package and opening a terminal in its directory:

```bash
git init -b main
git add .
git commit -m "Add developer portfolio"
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the repository URL you created. Authenticate through GitHub's normal sign-in or credential manager; do not paste a token into source files.

## Edit content

- `dist/app.js`: project data, page content, and interactions.
- `dist/style.css`: responsive layout, theme, and effects.
- `dist/assets/`: screenshots and the planned TCD architecture diagram.
- `dist/resume.pdf`: supplied resume with phone number and references page removed.
- `dist/projects/*/index.html`: direct-entry case-study pages.
- `scripts/build-pages.mjs`: deployment-path conversion; source `dist` stays usable at a root domain.

Update the visible last-updated date when making future content changes. The contact form opens the visitor's email app and does not send messages on the server.

## Final submission review

See `SUBMISSION_CHECKLIST.md`. Source checks passed, but an actual public deployment, signed-out access, and browser/mobile interaction checks must be completed before claiming submission readiness. Confirm all personal statements, particularly individual contributions to Super Maria Sisters.
