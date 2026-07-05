import { useMemo } from "react";
import type { TransactionStatus } from "@/types/transaction";
import { buildTimeline } from "@/lib/transactionSimulator";

export function useTransactionTimeline(status: TransactionStatus = "draft") {
  return useMemo(() => buildTimeline(status), [status]);
}
