
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  type Commitment
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getMint
} from "@solana/spl-token";
import { calculatePlatformFee } from "@/lib/fees/fees";
import { assertPositiveBalance, assertSafeRecipient } from "@/security/transaction-security";

export async function buildNativeSolPayment(input: {
  connection: Connection;
  sender: PublicKey;
  recipient: string;
  amountLamports: bigint;
  treasury: string;
  commitment?: Commitment;
}) {
  const recipient = assertSafeRecipient(input.recipient, input.sender.toBase58());
  const treasury = assertSafeRecipient(input.treasury, input.sender.toBase58());
  const feeLamports = calculatePlatformFee(input.amountLamports);
  const balance = BigInt(await input.connection.getBalance(input.sender, input.commitment ?? "confirmed"));

  assertPositiveBalance(balance, input.amountLamports, feeLamports);

  return {
    id: crypto.randomUUID(),
    amountLamports: input.amountLamports,
    feeLamports,
    netRecipientAmount: input.amountLamports,
    transaction: new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: input.sender,
        toPubkey: recipient,
        lamports: input.amountLamports
      }),
      SystemProgram.transfer({
        fromPubkey: input.sender,
        toPubkey: treasury,
        lamports: feeLamports
      })
    )
  };
}

export async function buildSplTokenPayment(input: {
  connection: Connection;
  owner: PublicKey;
  recipient: string;
  treasury: string;
  mint: string;
  amountBaseUnits: bigint;
}) {
  const recipient = assertSafeRecipient(input.recipient, input.owner.toBase58());
  const treasury = assertSafeRecipient(input.treasury, input.owner.toBase58());
  const mint = new PublicKey(input.mint);
  const mintInfo = await getMint(input.connection, mint);

  const ownerAta = await getAssociatedTokenAddress(mint, input.owner);
  const recipientAta = await getAssociatedTokenAddress(mint, recipient);
  const treasuryAta = await getAssociatedTokenAddress(mint, treasury);
  const account = await input.connection.getTokenAccountBalance(ownerAta);
  const balance = BigInt(account.value.amount);
  const feeBaseUnits = calculatePlatformFee(input.amountBaseUnits);

  assertPositiveBalance(balance, input.amountBaseUnits, feeBaseUnits);

  const transaction = new Transaction();
  if (!(await input.connection.getAccountInfo(recipientAta))) {
    transaction.add(createAssociatedTokenAccountInstruction(input.owner, recipientAta, recipient, mint));
  }
  if (!(await input.connection.getAccountInfo(treasuryAta))) {
    transaction.add(createAssociatedTokenAccountInstruction(input.owner, treasuryAta, treasury, mint));
  }

  transaction.add(
    createTransferCheckedInstruction(
      ownerAta,
      mint,
      recipientAta,
      input.owner,
      input.amountBaseUnits,
      mintInfo.decimals
    ),
    createTransferCheckedInstruction(
      ownerAta,
      mint,
      treasuryAta,
      input.owner,
      feeBaseUnits,
      mintInfo.decimals
    )
  );

  return {
    id: crypto.randomUUID(),
    amountBaseUnits: input.amountBaseUnits,
    feeBaseUnits,
    transaction
  };
}
