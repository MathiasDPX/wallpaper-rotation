from random import sample, choice
from PIL import Image
from glob import glob
import os


WALLPAPERS_DIR = "/home/mathias/Pictures/Wallpapers"
OUTPUT_WALLPAPER = "/home/mathias/Pictures/wallpaper.png"
SCREEN_SIZE = (2560, 1440)
RESAMPLING_FILTER = Image.Resampling.BICUBIC


themes = glob(WALLPAPERS_DIR + "/*")
theme = choice(themes)

wallpapers = glob(theme + "/*")

choosenWallpapers = sample(wallpapers, 2)

wallpaperLeft = Image.open(choosenWallpapers[0])
wallpaperRight = Image.open(choosenWallpapers[1])

wallpaperLeft = wallpaperLeft.resize(SCREEN_SIZE, RESAMPLING_FILTER)
wallpaperRight = wallpaperRight.resize(SCREEN_SIZE, RESAMPLING_FILTER)

wallpaper = Image.new('RGBA', (SCREEN_SIZE[0] * 2, SCREEN_SIZE[1]))

wallpaper.paste(wallpaperLeft)
wallpaper.paste(wallpaperRight, (SCREEN_SIZE[0], 0))

wallpaperLeftName = os.path.basename(choosenWallpapers[0])
wallpaperRightName = os.path.basename(choosenWallpapers[1])
themeName = os.path.basename(theme)

print(f"Picked {wallpaperLeftName} and {wallpaperRightName} from {themeName}")

#wallpaper.show()
wallpaper.save(open(OUTPUT_WALLPAPER, 'wb+'))