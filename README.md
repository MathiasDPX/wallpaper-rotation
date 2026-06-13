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