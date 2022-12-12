# Changelog

## 0.4.2

# Fix
* update timestamp every time new fetch is called

## 0.4.1

### Fix
* change order when calling notification (before store update)

## 0.4.0

### Features
* change time stamp format to text
* add latest review text on notification

### Fix
* on logout, disable auto start setting (this is bound to login)
* add link to user on domain
* update `text-ellipsis` for review list

## 0.3.0

### Features
* you can now toggle the theme

### Fix
* add space at bottom to show complete review list
* change styling to look like github
* on logout, delete all store data
* add animation for loading state

## 0.2.0
### Features
* rework application from react to svelte (reduce bundle size)
* add `settings` fetch interval (define how long between updating review list)

## 0.1.1
* remove allow all in tauri config

## 0.1.0
### Initial Release 🚀
* system tray icon (+ review count on mac)
* auto launch (only mac right now)
* list reviews and link out
* fetch interval 6s (future feature to set this in settings)
