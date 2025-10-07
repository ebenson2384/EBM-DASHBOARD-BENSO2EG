ADD_AN_IMAGE_HERE

This folder is for image assets used by the dashboard.

Current configuration: the dashboard now uses a dynamic Unsplash image for the background.

Why Unsplash?
- The CSS points to: https://source.unsplash.com/1600x900/?basketball,dramatic
- This delivers a high-quality, dramatic basketball-themed photo without requiring a local asset.

Licensing note
- Unsplash photos are free to use under the Unsplash license, which is permissive for commercial and non-commercial use.
- However, photos of identifiable people may raise personality/publicity concerns for commercial uses. If you plan to publish this dashboard publicly or commercially and the subject is a public figure (e.g., LeBron James), obtain appropriate rights or use generic basketball imagery instead.

If you'd rather keep a local image, add it to this folder and update `index.html` to point to `assets/lebron.jpg`.

If you want a different theme or a specific Unsplash search term, tell me (for example: `lebron`, `nba`, `basketball player`, `stadium night`), and I'll pick a tuned URL and adjust overlay strength for the best look.

Edge collar image sources used in the dashboard (dynamic Unsplash queries):
- Top: https://source.unsplash.com/1200x200/?basketball,stadium
- Bottom: https://source.unsplash.com/1200x200/?dunk,action
- Left: https://source.unsplash.com/400x1200/?jr-smith,basketball
- Right: https://source.unsplash.com/400x1200/?nba,player

These are dynamic links to Unsplash search results; refreshes may load different photos matching the query. If you want fixed images, download and place them in `assets/` and I'll update the CSS to reference local files.
