import assert from "node:assert/strict";
import { test } from "node:test";

globalThis.location = { search: "" };
const { applyPreset, applySvtVariant, containerError, formFromProfile, getFFmpegCmd, getProfileJSON, matchesPrefix, normalizeTagKey, QUICK_PRESETS, TAG_TRACKS } = await import(
  "../web/ui/src/pages/encode-profiles/profile.ts"
);

const profile = {
  video_codec: "libsvtav1",
  svtav1_variant: "5fish",
  audio_codec: "copy",
  subtitle_mode: "copy",
  video_params: {
    preset: 4,
    crf: 28,
    keyint_seconds: 2,
    fast_decode: false,
    extra_params: "preset=6:crf=32: keyint = 240 :min-keyint=129:fast-decode=1",
  },
};

test("all-track tags use valid selectors and preserve six or more tracks", () => {
  const source = {
    ...profile,
    metadata: { "s:s:?": "language=eng", "s:s:5": "title=Sixth", "s:a:12": "title=Thirteenth" },
    disposition: { "a:0": "default", "a:1": "0", "s:?": "0", "s:0": "default", "s:2": "forced", "s:5": "forced" },
  };
  const saved = getProfileJSON(formFromProfile(source));
  assert.deepEqual(saved.disposition, { "a:0": "default", "a:1": "0", s: "0", "s:0": "default", "s:2": "forced", "s:5": "forced" });
  assert.equal(saved.metadata["s:s"], "language=eng");
  assert.equal(saved.metadata["s:s:5"], "title=Sixth");
  assert.equal(saved.metadata["s:a:12"], "title=Thirteenth");
  for (const key of ["s", "s:?", "s:5", "s:12"]) assert.ok(matchesPrefix(key, "s:"), key);
  for (const key of ["s:s", "s:s:?", "s:s:5"]) assert.ok(matchesPrefix(key, "s:s:"), key);
  for (const key of ["s:2?", "s:??", "a:5", "subtitle"]) assert.ok(!matchesPrefix(key, "s:"), key);
  assert.equal(normalizeTagKey(" s:? "), "s");
  for (const candidate of [source, saved]) {
    const command = getFFmpegCmd(candidate);
    assert.match(command, /-disposition:s 0/);
    assert.match(command, /-metadata:s:s "language=eng"/);
    assert.match(command, /-disposition:s:5 forced/);
    assert.doesNotMatch(command, /-(?:metadata|disposition):\S*\?/);
    assert.match(command, /-map '0:s\?'/);
  }
  for (let i = 0; i < 6; i++) assert.ok(TAG_TRACKS.some((option) => option.value === String(i)));
  assert.ok(TAG_TRACKS.some((option) => option.value === "custom"));
});

test("5fish survives import and export while an invalid variant is rejected", () => {
  const saved = getProfileJSON(formFromProfile(profile));
  assert.equal(saved.svtav1_variant, "5fish");
  assert.equal(saved.video_params.preset, 4);
  assert.equal(formFromProfile({
    ...profile, video_params: { ...profile.video_params, fast_decode: "false" },
  }).fastDecode, false);
  assert.throws(() => formFromProfile({ ...profile, svtav1_variant: "5Fish" }), /must be 5fish/);
  assert.throws(() => formFromProfile({ ...profile, video_codec: "libx264" }), /requires the SVT-AV1/);
});

test("5fish preview keeps MKV tracks and gives the form controls priority", () => {
  const command = getFFmpegCmd(getProfileJSON(formFromProfile(profile)));
  assert.match(command, /^\/opt\/amaterasu-5fish\/bin\/ffmpeg/);
  for (const flag of ["-map '0:v:0?'", "-map '0:a?'", "-map '0:s?'", "-map '0:t?' -c:t copy"]) {
    assert.ok(command.includes(flag), flag);
  }
  assert.match(command, /-preset 4 -crf 28/);
  assert.match(command, /\bkeyint=33\b/);
  assert.match(command, /\bmin-keyint=33\b/);
  assert.match(command, /\bfast-decode=0\b/);
  assert.doesNotMatch(command, /preset=6|crf=32|keyint=240|fast-decode=1/);
});

test("the subtitle burn-in preview selects the requested track", () => {
  const command = getFFmpegCmd({
    ...profile, subtitle_mode: "burn", metadata: { a_track: "1,0?", s_track: "2,0" },
  });
  assert.match(command, /-map '0:a:1\?'/);
  assert.match(command, /-map '0:a:0\?'/);
  assert.match(command, /subtitles=input\.mkv:si=2/);
  assert.doesNotMatch(command, /-map '0:s/);
});

test("the selected output container survives a preset and controls the preview", () => {
  const form = formFromProfile({ ...profile, container: "MP4" });
  applyPreset(form, QUICK_PRESETS[0]);
  const saved = getProfileJSON(form);
  assert.equal(saved.container, "mp4");
  const command = getFFmpegCmd(saved);
  assert.match(command, /-movflags \+faststart -tag:v:0 hvc1/);
  assert.match(command, /output\.mp4$/);
  assert.doesNotMatch(command, /-c:t copy|-cluster_time_limit/);

  assert.equal(getProfileJSON(formFromProfile(profile)).container, undefined);
  assert.equal(containerError({ ...profile, container: "webm" }), "");
  assert.match(containerError({ ...profile, container: "mov" }), /MOV requires/);
  assert.throws(() => formFromProfile({ ...profile, container: "unknown" }), /output container/);
});

test("changing SVT variants preserves quality and speed controls", () => {
  const form = formFromProfile({
    ...profile, svtav1_variant: undefined,
    video_params: { crf: 33, preset: 5, fast_decode: true, extra_params: "scm=2:enable-overlays=1" },
  });
  applySvtVariant(form, "5fish");
  const saved = getProfileJSON(form);
  assert.equal(saved.video_params.crf, 33);
  assert.equal(saved.video_params.preset, 5);
  assert.equal(saved.video_params.fast_decode, true);
  assert.equal(saved.video_params.extra_params, undefined);
  assert.match(getFFmpegCmd(saved), /lp=0/);

  applyPreset(form, QUICK_PRESETS.find(preset => preset.name === "AV1 Anime Compact"));
  assert.equal(form.svtVariant, "5fish");
  assert.equal(form.crf, 33);
  assert.equal(form.preset, "6");
});
