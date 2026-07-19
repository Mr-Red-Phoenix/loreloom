import assert from "node:assert/strict";
import test from "node:test";
import { normalizeEngineTransaction } from "./thirdwebEngine.js";

test("normalizes an Engine mined transaction", () => {
  assert.deepEqual(
    normalizeEngineTransaction({ status: "mined", transactionHash: "0xabc" }),
    { status: "mined", transactionHash: "0xabc", errorMessage: undefined }
  );
});

test("normalizes JSON-encoded Engine status payloads", () => {
  assert.deepEqual(
    normalizeEngineTransaction('{"status":"errored","errorMessage":"insufficient OKB"}'),
    { status: "errored", transactionHash: undefined, errorMessage: "insufficient OKB" }
  );
});

test("keeps unknown Engine states non-confirmable", () => {
  assert.equal(normalizeEngineTransaction({ status: "pending" }).status, "unknown");
});
