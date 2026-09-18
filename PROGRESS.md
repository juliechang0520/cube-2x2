# 小小方塊 / Little Cube — v0.2
Checkpoint: 2026-09-18

## 如何開啟 / Open
直接用桌面瀏覽器開啟 index.html，不需要安裝、伺服器或網路。
Open index.html in a desktop browser; no install, server, or network required.
GitHub Pages: upload index.html to your chosen repository's publishing directory. This package has not been published to GitHub.

## 已完成 / Implemented
- Self-contained static HTML, CSS, JS; no external dependencies.
- Geometric 2×2 sticker state, animated R/U quarter turns and inverses.
- Drag/touch/keyboard viewpoint, reset viewpoint and bottom view.
- Six-color/eight-corner introduction.
- Fixed exercise setup U R U' R'; solution R U R' U'.
- Forward/backward, restart, slow playback/pause, optional notation.
- Responsive two-column desktop and stacked mobile layout.

## 還沒完成 / Not yet implemented
- Full MARU first- and second-layer lessons, case cards and general solving.
- Import/reuse of Claude site's original code: this version uses a new canvas renderer, not verified code reuse.
- Voice guidance, piece highlighting and all layer-completion demonstrations.
- GitHub publication; user retains existing repository and site.

## 接續規格 / Established requirements
Audience: five-year-old child with parent. Traditional Chinese, English support.
Keep attractive actual layer rotations, progressive learning AND direct case lookup, optional formulas, RWD, pure static GitHub Pages compatibility.
Reference animation: https://juliechang0520.github.io/RubiksCube/
Reference method:
https://maru.tw/2x2-beginner-tutorial-1st-layer/
https://maru.tw/2x2-beginner-tutorial-2nd-layer/
Before full lesson implementation, read and verify image-based algorithms and orientation against these references. This fixed demonstration is not presented as MARU's complete method.

## 下一步 / Next
1. Review the delivered interaction and animation with user.
2. Inspect original animation source and reference lesson diagrams.
3. Add one verified first-face case end-to-end; save v0.2 before expanding.
Do not restart architecture or claim prior 21 cards or exhaustive validation exist: no corresponding previous files were recovered.

## 本版驗證 / Validation
PASS: JavaScript syntax, R/U four-turn identity, move/inverse identity, exact completion of the fixed exercise. Re-run with `node verify.cjs`.
Browser UI automation was attempted but unavailable because no Chromium executable is installed. Responsive rules are implemented, but mobile/desktop visual and click testing remains unverified. Do not claim browser QA passed.

## v0.2 checkpoint / 本次更新
- Continued from v0.1, which remains unchanged.
- Added two original first-face case diagrams: last white sticker at bottom-front-right facing front or right. Non-white stickers greyed for matching.
- Added sequences D' R' D R and D F D' F', preset setup instructions, dynamic move descriptions, explicit face-versus-layer result check.
- Locked lesson and case switches during active moves.
- Case algorithms independently verified on legal matching cube states; test output in VALIDATION.txt.
- Reference pages read; original MARU GIF diagrams could not be fetched (403). These cards are independently generated and checked, NOT a claim that every MARU image has been verified.
- Chromium install attempted; download timed out. Browser UI, rendered screenshots and real-phone touch testing remain unverified. No browser QA completion claim.
- Complete first-layer and second-layer lessons, remaining case cards, animation reuse and publication remain unfinished.

## Delivery rule / 使用者指定交付規則
完成一小段 → 保存版本與進度 → 先交付下載檔案 → 再繼續。
Save and deliver each bounded milestone before further expansion. Preserve older versions. Never restart from scratch or claim progress without corresponding saved source.

## Next bounded milestone
Obtain usable browser execution or record the exact remaining blocker. Verify responsive rendering, pointer interactions and playback. Then expand the next first-face case with explicit transitions; save and deliver before expanding further.

Verified 67 matching legal states (36 front-facing, 31 right-facing). Simulated DOM initialization, case switching and forward/back controls passed; this is not browser or touch QA.
