# dCloud Vertical Toolbox UI
This is the website UI code for the dCloud Vertical Toolbox. It allows users to
log in and view, create, or modify vertical configs for use with the dCloud
Cumulus demo website and dCloud CC mobile app.

## Installation
```sh
git clone https://gitlab.com/dcloud-collab/vertical-toolbox-ui.git
cd vertical-toolbox-ui
npm install
```

## Build/Run in Development
```sh
npm run dev
```

## Build/Run in Production
Copy files to your www/html folder (or wherever you have your web server pointing to).
```sh
npm run build
cp vertical-toolbox-ui/dist/* /var/www/html/
```
