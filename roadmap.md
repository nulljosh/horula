# Horula roadmap

v1 is live: full iOS Clock parity (see `GAPS.md`, 22 of 22). Every version below ships on its own: tested headless at 390px in light and dark, deployed with `./deploy.sh`, `CACHE` bumped in `sw.js`, tagged `horula-vN.0.0` (`clock-v1` to `v5` before the rename). Web only, no build, no dependencies, no account. Every version also closes the open `GAPS.md` round 2 lines (iOS 26 and macOS Clock) that fit it.

## v2: a floor under it

## v3: world clock you can plan with

## v4: alarms you trust

## v5: your clock, backed up

## v5.1: landing that moves

## v6: native on the App Store
- [ ] Apple Watch app: built (world clock, stopwatch, timers, face widgets), screenshots taken (apple/shots/watch-up, gitignored). Ships in 6.1 right after 6.0 is approved: embed HorulaWatch in the iOS target, bump, upload, add the Watch Ultra set, submit.

## v7: everywhere else
- [ ] Windows: installable from the Microsoft Store (packaged web app). Parked: needs Joshua's Microsoft Partner Center account.
- [ ] Linux: Flatpak and a .deb that open the same app.
- [ ] Joshua Tree: a native Horula for the Joshua Tree OS.

## v8: nightstand faces

## v9: timers that do more


## v10: every language

## v11: a clock for other pages

## v12: done right

## v13: a map of the day

## v14: the stopwatch dial, like iOS

## v15: hear it before you pick it

## v16: native in every language

## v17: tell people

## v18: the World face

## v19: the Watch catches up

## v20: the Watch gets the rest

## Gap matrix (/mobbin, 2026-10-25)
App Store screens of Alarmy, Rise, Sleep Cycle, MultiTimer, Timer+, World Clock Time Widget, timeanddate World Clock and Flip Clock, set beside ours. Skipped: ads, paywalls, sleep tracking by microphone, social, per-timer colours (blue only). One row per minor version, web and native together. 22.0.0 ships when every row is done and the apple skill's checks pass on every screen.

| v | Gap | Who has it | Size | Status |
|---|---|---|---|---|
| 21 | +1 min on a running timer | Timer+ | S | done |
| 21.1 | Your own name for a city ("Mum", "Office") | World Clock Time Widget | S | done |
| 21.2 | Count down to a date ("Vacation, 1 month 29 days") | Timer+, MultiTimer | M | done |
| 21.3 | Daylight saving dates in the city detail | timeanddate | S | done |
| 21.4 | Watch: edit an alarm (time, repeat, label, snooze) and a city detail with sunrise and sunset, like watchOS Clock | watchOS Clock | S | done |
| 21.5 | Hourly chime on the nightstand | Flip Clock | S | done |
| 21.6 | Flip digits face on the nightstand | Flip Clock | M | done |
| 21.7 | Spoken interval cues ("Rest. Up next: work") | Timer+ | S | done |
| 21.8 | Wake up check: a second ring a few minutes after you stop an alarm unless you confirm | Alarmy, Rise | M | done |
| 21.9 | Routines: named timer steps that run in order | Timer+ | M | done |
| 21.10 | Sleep sounds made on device (rain, brown noise) with a sleep timer | Alarmy, Sleep Cycle, Flip Clock | M | done |
| 21.11 | Alarm missions (solve a sum to stop) | Alarmy, Rise | L | done |

## v21: one more minute

## v21.1: your own name for a city

## v21.2: count down to a date

## v21.2.1: Liquid Glass pass

## v21.3: daylight saving dates

## v21.4: the Watch pushes like watchOS Clock

## v21.5: hourly chime

## v21.6: flip face

## v21.7 to v21.11: the rest of the matrix

## v22: the matrix is done

## v22.1: the Watch catches up

## v22.2: rain

## Ingested 2026-10-30
- [x] README needs screenshots (11-01: World Clock in light and dark from the live web app, docs/screenshots)
