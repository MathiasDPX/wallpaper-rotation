# Wallpaper Rotation

wallpaper-rotation has a primary script used to create a wallpaper and an extension that can modify GNOME context menu

## Script
Python script that combine two wallpaper into one, side-by-side
Cause GNOME doesn't support individual wallpaper for each screen

Dont forget to change config after the imports

The script will first pick a folder in the WALLPAPERS_DIR and then
pick 2 wallpapers from it

Example content of WALLPAPERS_DIR:
```
space/
├─ artemis-2.png
├─ apollo-11.png
kurzgesagt/
├─ black_hole.png
├─ ringed_earth.png
```

## Extension

The extension replace "Change Background" in the GNOME context menu to "Rotate Background" which trigger the script