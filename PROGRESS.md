# 小小方塊 Little Cube — v0.11
Checkpoint: 2026-09-19. Continues v0.10; all earlier ZIPs preserved.

## Open / 開啟
Unzip and open index.html in a desktop browser. Pure static, no external network dependency. For GitHub Pages, use index.html as the publishing directory entry point. This package has not been published by the assistant.

## v0.11 checkpoint / 本次新增
- Slow device speech: zh-TW / en-US, default rate 0.70; choices 0.55 / 0.70 / 0.85. User enables speech explicitly; no automatic speech on reload.
- Manual read of current lesson/instruction. With step narration enabled, Next, Previous and autoplay wait for the narration before the corresponding turn. Previous explains the inverse turn.
- Voice pause/resume, stop, failure message and unsupported-browser fallback. Stop cancels pending turns and autoplay. Errors do not silently advance a move. Voice is provided by the OS/browser and quality/language availability varies.
- Moved nearby Previous/Next controls immediately below the cube cue, above longer diagrams/settings, so the user need not scroll through all explanations to turn.
- New verify-voice.cjs covers sequencing/cancellation/errors/languages/rates using mocked synthesis. Actual audible voice remains unverified until this version is uploaded and tried on the device.
- User supplied public v0.10 site: https://juliechang0520.github.io/cube-2x2/ . Desktop browser checks performed; see LIVE-QA.md. v0.11 is delivered locally, not yet uploaded by the assistant.

## v0.10 checkpoint / 本次新增
- Face-on before/after diagrams for R, U, D, F and their inverse turns, with quarter-circle direction arrows.
- Top-edge adjacency labels specify how to look at each face. The bottom view labels Front at its top edge; the upper view labels Back.
- Custom white-only plans hide unspecified colors in both diagrams. Preset diagrams show example colors and explicitly say the real cube may differ.
- Whole-cube x2 flip has separate wording and never uses a single-face arrow. Guides clear when the lesson completes or exploration opens.
- Direction diagrams are live teaching aids, not MARU GIF copies. Exact MARU visual matching remains pending.

## v0.9 checkpoint / 本次新增
- Three turn speeds: extra slow (1600 ms), slow (900 ms, default), normal (450 ms). Playback spacing follows the chosen speed; speed control is disabled during a turn.
- Save completed-step checkpoints, current lesson/custom white plan, playback speed and tracking preference in this browser. No automatic playback on reopen.
- Resume banner asks the learner to check the physical cube before resuming. Original planned white positions are saved independently of subsequent input-draft edits.
- Startup does not overwrite the saved checkpoint. Corrupt/out-of-range data is rejected. If storage is blocked/full, practice continues with a visible save-status message.
- Scope: same browser and website address. Private browsing, clearing site data, changing devices/URLs or moving a local HTML file may prevent restoration. This is not cross-device synchronization. Save is at completed moves, not midway through an animation.
- Browser/phone visual QA is still pending. Automated checks use mock DOM/storage, not a real browser.

## v0.8 checkpoint / 本次新增
- 「用我的魔方開始」：在六面展開圖標記 4 格白色，驗證白色数量及同一角塊不能有兩格白色。
- Arbitrary white-position input with explicit face orientation; nonwhite stickers shown gray, not inferred real colors.
- Shortest search for each incremental segment. Each segment ends with more whites on top and preserves the previously occupied top slots. Intermediate moves may temporarily displace whites.
- Playback pauses at segment boundaries. Previous/restart work with the generated plan. After white completion, re-match real side pairs in Layer; no assertion that the whole cube is solved.
- Usage: open index.html → practice tab → “用我的魔方開始” → mark four whites → “產生我的步驟” → Next or Play. Example loads a practice input, not your physical cube.

## Completed / 已加入
- Exploration: six faces/colors, eight corner pieces, draggable and keyboard-controlled 3D view.
- NEW: connected first-, second-, third-white-corner preset exercises (1→2→3), then a link to last-corner case lookup. These are fixed practice setups, NOT a general solver for arbitrary scrambles.
- First face: all five standardized last-corner cases plus completion check.
- First layer: zero/one/four side-pair cases and whole-cube flip.
- Yellow face: seven unsolved orientation classes and completed face; top-and-side yellow net, explicit U alignment and pause checkpoints.
- Final layer: corner permutation, final U/U'/U U alignment and full-solved check.
- Next-stage demo navigation, optional notation, previous/next, play/pause, restart.
- NEW: original site's CSS 3D Cube engine integrated, configured for eight solid cubies, 900ms turns. See ANIMATION-SOURCE.md. Lottie and unrelated original lessons not included.
- NEW: tracked corner outline on its three faces, next-turn layer highlight, clockwise/counterclockwise cue with face-relative wording, tracking toggle. Stable corner identity retained during turns.
- Responsive CSS and nearby playback controls; real visual QA still outstanding.

## Validation / 驗證
- NEW verify-directions.cjs: clockwise/counterclockwise sticker mapping for R/U/D/F, arrow direction, preview non-mutation, custom colors, whole-cube branch and completion/exploration cleanup.
- v0.10 re-ran verify-animation.cjs and verify-resume.cjs successfully.
- Static SVG arrow geometry inspected after rasterization. The scratch renderer lacks Chinese glyphs; this is not browser typography/layout validation. Real browser and phone QA remain pending.
- NEW verify-resume.cjs: reload/restore all 28 presets plus custom white plan; compare both independent sticker geometry and CSS cube state, step, speed and tracking. Verify paused restore, startup preservation, draft independence, previous/restart, corrupt records and unavailable storage.
- verify-animation.cjs re-run after v0.9: all 28 forward/reverse examples still agree.
- v0.8 exhaustive planner/pipeline results retained below; solver formulas were unchanged in v0.9.
- verify-white.cjs: enumerates all 5,670 possible four-white position patterns with one white per corner; validates completion, increasing-white checkpoints and inverse-preset reconstruction. Mock UI entry checked.
- verify-animation.cjs / verify-controls.cjs: mock DOM; original CSS 3D engine and independent sticker engine agree after EVERY forward and reverse step across 28 examples, including whole-cube flip. Intro ends at 1/2/3 white stickers with stable tracked identity. This does not test real browser rendering or physical touch.
- verify-pipeline.cjs: all 648 last-layer states (27 orientations × 24 permutations) finish solved through orientation, corner permutation and alignment while keeping the bottom layer intact. Passed again after integration.
- verify.cjs, verify-layer.cjs, verify-yellow.cjs retained for math checks.

## Remaining / 未完成
- Desktop v0.10 live rendering and selected interaction flows now checked via user-provided public URL; v0.11 voice/new layout not yet checked live. Physical mobile/touch/audio and child usability acceptance remain. No supported mobile viewport control was exposed in this browser session. Do not bypass the earlier local-data-URL security restriction.
- First-face arbitrary white-position guidance is implemented in v0.8. Child usability of the six-face input still needs real testing.
- Voice implemented in v0.11; physical-device audibility and pause/resume behavior still need acceptance. Child usability testing remains.
- Exact image-by-image MARU formula matching has not been completed. The layer-by-layer structure is retained, but case diagrams/text are original and formulas independently checked. The repeated corner swap is T-permutation, not claimed to match MARU's original GIF sequence exactly.
- User deployed v0.10 successfully. Replace its index.html with v0.11 to publish the voice update; the assistant has not modified the repository.

## Sources / 來源
Original animation retrieved from https://juliechang0520.github.io/RubiksCube/ on 2026-09-18.
Method reference pages:
https://maru.tw/2x2-beginner-tutorial-1st-layer/
https://maru.tw/2x2-beginner-tutorial-2nd-layer/
Reference text was read; earlier GIF retrieval returned 403. No claim of visual GIF verification.

## Delivery rule / 使用者要求
完成一小段 → 保存版本與進度 → 先交付檔案 → 再繼續。
Save and deliver each bounded milestone before expanding. Preserve old versions. Do not restart from scratch or present progress messages as proof of saved code.

## Next / 下一步
Obtain a permitted testable preview (for example the user's published GitHub Pages version once its actual URL is supplied), inspect desktop and mobile behavior, fix observed issues, save/deliver. Without a preview, continue only bounded independently verifiable improvements and state the QA limitation.
