# 二階交付驗證 / 2×2 delivery verification

日期 / Date: 2026-09-19
線上網址 / Live URL: https://juliechang0520.github.io/cube-2x2/
實際上線版本 / Observed version: v0.10
本次交付 / Package: v0.11 (not uploaded by assistant)

## 已完成 / Verified

- Live desktop Chrome: home page and 3D cube render; Chinese/English text and before/after direction diagrams visible.
- Practice: four-move autoplay finishes; Next disabled at completion.
- Reload displays Resume; resuming retains finished state; Previous returns to step 3/4 and correct U-prime instruction.
- Custom input rejects zero whites with an explanatory message; example loads four whites and generates a plan.
- Normal-speed custom playback pauses with two whites on top; second Play reaches white-face completion.
- v0.11 automated: speech waits before turns, .70 default and .55 option, zh-TW/en-US, pause/resume, cancellation, errors, inverse-step narration, no-speech operation.
- v0.11 regression: 28 preset animation/state comparisons, restore tests, direction-diagram tests pass.
- Error log sample contained browser-extension metadata errors, not site-source errors; this sample is not a guarantee of zero errors.

## 未驗收 / Not yet verified

- v0.11 rendering and real audible speech: deployed site still v0.10.
- Phone hardware, iOS/Android voice availability, touch interactions, narrow-screen layout. Desktop browser capability did not expose viewport/device emulation. No claim of mobile testing.
- Child comprehension of six-face white entry and direction diagrams.
- Exact MARU GIF image-by-image equivalence. Reference article text was re-read; GIF fetch was unsupported by the web reader. Existing independently verified formulas differ from MARU's image sequence. Stage structure is referenced; original GIFs were not copied.

## 實機驗收步驟 / Device acceptance steps

1. Update index.html and confirm visible v0.11.
2. On desktop and phone: enable voice, choose .55, read current instructions. Confirm audible Traditional Chinese and no clipped words.
3. Next: narration finishes before animation. Pause/resume voice. Stop during narration: the pending move must not run. Disable voice: normal steps still work.
4. Complete a few steps and reload. Resume only if the real cube still matches; confirm step retained.
5. On phone: input four white stickers, inspect every face, rotate view, operate Next without accidental page movement; check that labels and controls are reachable without horizontal clipping.

Reference articles:
- https://maru.tw/2x2-beginner-tutorial-1st-layer/
- https://maru.tw/2x2-beginner-tutorial-2nd-layer/

## 三階接續 / 3×3 continuation

User wants to proceed to 3×3 after 2×2 delivery/acceptance. Retain the visual system, slow narration, controls and checkpoints. 3×3 requires center/edge/corner distinction, white cross, first layer, second-layer edges and last-layer cases; do not merely change n=2 to n=3 and claim teaching is complete. No 3×3 implementation has been delivered in this package.
