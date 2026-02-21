# Deployment Guide for CollegeGate (collegegate.in)

This guide will help you deploy your CollegeGate application to your InfinityFree hosting account for your domain `collegegate.in`.

## Prerequisites

1.  **Node.js Installed**: You need Node.js installed on your computer to build the project.
2.  **InfinityFree Account**: You should have access to your InfinityFree control panel and file manager (or FTP).
3.  **Domain Name**: `collegegate.in` (Ensure this is added to your InfinityFree account as an Addon Domain or Parked Domain).

## Step 1: Build the Application

Open your terminal in the project directory and run the following command:

```bash
npm run build
```

This will create a `dist` folder in your project root. This folder contains the optimized, production-ready files for your website.

## Step 2: Prepare for Upload

1.  Locate the `dist` folder created in the previous step.
2.  Inside `dist`, you will see files like `index.html`, `assets/`, etc.
3.  (Optional) Zip the contents of the `dist` folder for easier upload, or upload files individually.

## Step 3: Upload to InfinityFree

1.  Log in to your InfinityFree account.
2.  Go to the **File Manager** for your hosting account.
3.  Navigate to the `htdocs` folder. This is the public folder for your website.
    *   If you have set up `collegegate.in` as an Addon Domain, look for a folder named `collegegate.in/htdocs`.
4.  **Delete** the default `index2.html` or any placeholder files inside the target `htdocs` folder.
5.  **Upload** all the files and folders from your local `dist` folder into the `htdocs` folder.
    *   `index.html` should be directly inside `htdocs`.
    *   The `assets` folder should be directly inside `htdocs`.

## Step 4: Verify Deployment

1.  Open your browser and visit `http://collegegate.in`.
2.  You should see your CollegeGate application running!
3.  Navigate around to ensure all pages work. Since we use `HashRouter`, refreshing pages should work fine without server configuration.

## Making it an "App" (PWA)

We have already included a `manifest.json` file in the build. This allows users to "install" your website as an app on their mobile devices.

1.  When users visit `collegegate.in` on Chrome (Android) or Safari (iOS), they can tap "Add to Home Screen".
2.  This will install the CollegeGate icon on their device, and it will launch like a native app.

## Troubleshooting

*   **Blank Page**: Check the browser console (F12 > Console) for errors. Ensure `index.html` is in the root of `htdocs`.
*   **404 on Refresh**: If you switch to `BrowserRouter` later, you'll need a `.htaccess` file. With `HashRouter` (current setup), this shouldn't be an issue.
*   **Images Missing**: Ensure all assets were uploaded correctly to the `assets` folder.
