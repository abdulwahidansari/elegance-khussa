Put the hero loop here as `khussa1.mp4` (the hero reads /videos/khussa1.mp4).
Until the file exists the hero shows the ivory/champagne gradient instead.

Recommended export for a smooth loop (needs ffmpeg):
ffmpeg -i khussa1.mp4 -an -vf "scale=-2:1080,fps=30" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart khussa1-web.mp4
Rename khussa1-web.mp4 to khussa1.mp4. Aim for under about 6 MB.
