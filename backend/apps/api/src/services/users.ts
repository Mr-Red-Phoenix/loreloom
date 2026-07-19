import { z } from "zod";
import { getSupabaseAdmin } from "../db/supabase.js";
import type { UserRow } from "../db/types.js";
import { HttpError } from "../http/errors.js";

const walletSchema = z.string().trim().regex(/^0x[a-fA-F0-9]{40}$/, "Wallet address must be an EVM address.");

export function normalizeWalletAddress(walletAddress: string) {
  return walletSchema.parse(walletAddress).toLowerCase();
}

export async function getOrCreateUser(walletAddress: string): Promise<UserRow> {
  const normalized = normalizeWalletAddress(walletAddress);
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("users")
    .upsert({ wallet_address: normalized }, { onConflict: "wallet_address" })
    .select("*")
    .single();

  if (error || !data) {
    throw new HttpError(500, error?.message ?? "Could not create user.");
  }

  return data as UserRow;
}
