import assert from "node:assert/strict";
import test from "node:test";
import type { ChapterRow, WorldRow } from "../db/types.js";
import { generateChapterImageUrl } from "./images.js";

test("chapter art generates from narrative even without a reference portrait", async () => {
  const world = { id: "world-1", reference_image_url: null, style_lock: "cinematic storybook" } as WorldRow;
  const chapter = { chapter_index: 1, scene_description: "A charged confrontation." } as ChapterRow;

  // The pipeline must not throw when no reference portrait exists — it should
  // fall back to a text-to-image provider or a placeholder instead.
  const result = await generateChapterImageUrl(world, chapter);
  assert.equal(typeof result, "string");
  assert.ok(result.length > 0);
});
