import { config } from "../config.js";

export type EngineTransactionStatus = "queued" | "sent" | "mined" | "errored" | "cancelled" | "unknown";

export type EngineWriteResult = {
  queueId: string;
};

export type EngineTransaction = {
  status: EngineTransactionStatus;
  transactionHash?: string;
  errorMessage?: string;
};

type EnginePayload = {
  result?: unknown;
  error?: string | { message?: string };
};

export async function submitContractWrite(input: {
  contractAddress: string;
  functionName: string;
  args: Array<string | number>;
  idempotencyKey: string;
}): Promise<EngineWriteResult> {
  const engine = getEngineConfig();
  const response = await fetch(
    `${engine.url}/contract/${config.mint.chainId}/${input.contractAddress}/write?simulateTx=true`,
    {
      method: "POST",
      headers: {
        ...engine.headers,
        "content-type": "application/json",
        "x-backend-wallet-address": engine.walletAddress,
        "x-idempotency-key": input.idempotencyKey
      },
      body: JSON.stringify({ functionName: input.functionName, args: input.args })
    }
  );
  const payload = (await readJson(response)) as EnginePayload;
  const queueId = extractQueueId(payload.result);

  if (!response.ok || !queueId) {
    throw new Error(`thirdweb Engine write failed (${response.status}): ${engineError(payload)}`);
  }

  return { queueId };
}

export async function getEngineTransaction(queueId: string): Promise<EngineTransaction> {
  const engine = getEngineConfig();
  const response = await fetch(`${engine.url}/transaction/status/${encodeURIComponent(queueId)}`, {
    headers: engine.headers
  });
  const payload = (await readJson(response)) as EnginePayload;

  if (!response.ok) {
    throw new Error(`thirdweb Engine status failed (${response.status}): ${engineError(payload)}`);
  }

  return normalizeEngineTransaction(payload.result);
}

export function normalizeEngineTransaction(value: unknown): EngineTransaction {
  const raw = unwrapObject(value);
  const statusValue = typeof raw.status === "string" ? raw.status.toLowerCase() : "unknown";
  const status: EngineTransactionStatus = ["queued", "sent", "mined", "errored", "cancelled"].includes(statusValue)
    ? (statusValue as EngineTransactionStatus)
    : "unknown";
  const transactionHash = firstString(raw.transactionHash, raw.transaction_hash, raw.txHash, raw.tx_hash);
  const errorMessage = firstString(raw.errorMessage, raw.error_message, raw.error);
  return { status, transactionHash, errorMessage };
}

function getEngineConfig() {
  const url = config.mint.thirdwebEngineUrl?.replace(/\/$/, "");
  const accessToken = config.mint.thirdwebEngineAccessToken;
  const walletAddress = config.mint.thirdwebBackendWalletAddress;
  if (!url || !accessToken || !walletAddress) {
    throw new Error(
      "thirdweb Engine is not configured. Set THIRDWEB_ENGINE_URL, THIRDWEB_ENGINE_ACCESS_TOKEN, and THIRDWEB_BACKEND_WALLET_ADDRESS."
    );
  }

  return {
    url,
    walletAddress,
    headers: { authorization: `Bearer ${accessToken}` }
  };
}

function extractQueueId(result: unknown) {
  if (typeof result === "string") return result;
  const raw = unwrapObject(result);
  return firstString(raw.queueId, raw.queue_id, raw.id);
}

function unwrapObject(value: unknown): Record<string, unknown> {
  if (typeof value === "string") {
    try {
      return unwrapObject(JSON.parse(value) as unknown);
    } catch {
      return {};
    }
  }
  return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function firstString(...values: unknown[]) {
  return values.find((value): value is string => typeof value === "string" && value.length > 0);
}

function engineError(payload: EnginePayload) {
  if (typeof payload.error === "string") return payload.error;
  if (typeof payload.error?.message === "string") return payload.error.message;
  return JSON.stringify(payload);
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { error: text };
  }
}
