# 小小方塊 Little Cube — v0.4
Checkpoint: 2026-09-18. Continues v0.3; all earlier versions preserved.

## Open / 開啟
Unzip, then open index.html in a desktop browser. No installation or network dependencies. Upload index.html to your chosen GitHub Pages publishing directory for a public website; this version has NOT been published.
解壓縮後開啟 index.html。純靜態單檔，尚未上傳 GitHub。

## Current implementation / 已完成
- Interactive geometric 2×2 with drag, touch pointer handlers and keyboard view controls.
- Exploration of six colors, six faces, eight corners; optional move notation.
- Four-move warm-up, FIVE standardized cases for the last white corner of the first face, and a face-complete checkpoint.
- Cases: bottom-front-right white front/right/down; top-front-right white right/front.
- Preparation instructions: three white stickers up, missing corner at top-front-right; rotate only D to position a bottom-layer target at bottom-front-right.
- Original schematic cards grey out non-white stickers; downward case adds a bottom-view diagram.
- Exact intermediate D alignment and automatic playback pauses before the next case.
- Variable-length sequences, previous/next, restart, pause/resume; duplicate controls directly below the cube for mobile convenience.
- Responsive desktop columns and mobile stacking implemented.

## Evidence / 驗證
Run node verify.cjs and node verify-controls.cjs.
Math tests: quarter-turn identity and inverses; seven presets; 149 matching legal states across the five cases, including transition orientation and final white-face completion. Coverage [36,31,28,25,29]. Tests do not establish a full solver or full lesson coverage.
Mock DOM tests: initialization, seven case selections, forward/reverse, completion guards, all three checkpoint pauses and resumes. This is not a real browser test.

## Browser status / 瀏覽器測試限制
v0.1/v0.2 local Chromium missing; download attempt timed out.
v0.3 cloud Browser skill successfully connected through node_repl, but navigation to the local HTML data URL was explicitly denied by browser URL security policy. No workaround attempted. Real browser rendering, mobile viewport screenshots and actual-phone touch testing remain UNVERIFIED. Do not repeat blocked navigation or claim these checks passed. A future permitted preview route must be established before real browser QA.

## Not completed / 尚未完成
- Guided first one/two/three corner practice; highlighted individual corner tracking.
- First-layer side matching and whole-cube flip are implemented in v0.4 (see below).
- Second-layer orientation/permutation cases, full progressive lessons, voice.
- Original Claude animation code integration. Current renderer is independently written Canvas, not claimed to reuse Claude code.
- GitHub deployment and real-device QA.
The first-face case library assumes three whites already on top; it is not a complete cube-solving course.

## Sources and scope / 參考與界線
Reference animation: https://juliechang0520.github.io/RubiksCube/
Method references:
https://maru.tw/2x2-beginner-tutorial-1st-layer/
https://maru.tw/2x2-beginner-tutorial-2nd-layer/
Reference text was read in v0.2. GIF retrieval returned 403. Current cards and texts are original; algorithms and transitions independently checked in the state engine, not a claim that original GIFs were visually verified.

## Delivery rule / 使用者指定
完成一小段 → 保存版本與進度 → 先交付檔案 → 再繼續。
Preserve older versions. Deliver each bounded milestone before expanding. Never restart from scratch. Do not claim old reports of 21 complete cards/tests were recovered.

## Next bounded milestone / 下一步
Next: add second-layer orientation cases with a complete case map, explicit holding direction, and transitions. Save/deliver the next milestone before expanding further. Browser restrictions remain unresolved.

## v0.4 completed / 本版完成
- Separate First Face and First Layer groups, preserving all earlier cases.
- One matching pair: hold it on LEFT, white up; use the repeated corner-swap algorithm.
- No matching pairs: swap, U U to align, pause, repeat swap.
- Four matching pairs: completed-layer check.
- x2 whole-cube flip demonstration, including reverse-step control.
- Full-color diagrams plus four labeled side-pair strips.
- The swap used here is independently verified T-permutation: R U R' U' R' F R R U' R' U' R U R' F'. It has NOT been visually matched to the original MARU GIF sequence; do not claim exact formula equivalence to that source. Layer-by-layer structure is retained.

## v0.4 verification
- All 24 top-corner permutations: 4 zero-pair states, 16 one-pair states, 4 already matched states; appropriate setup and algorithms complete the layer.
- Whole-cube flip puts all white stickers below; its inverse restores the state.
- 149 matching first-face states and transition checks retained.
- Eleven UI examples, forward/reverse, completion guards and four playback checkpoint pause/resume paths passed mock-DOM tests.
- Real browser rendering and actual phone testing remain unverified; prior URL-policy restriction is unchanged. No further blocked browser attempts made.
