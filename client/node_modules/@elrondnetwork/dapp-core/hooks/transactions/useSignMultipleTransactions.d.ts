import { Transaction } from '@elrondnetwork/erdjs';
import { ActiveLedgerTransactionType, MultiSignTxType } from 'types';
export interface UseSignMultipleTransactionsPropsType {
    egldLabel: string;
    address: string;
    verifyReceiverScam?: boolean;
    transactionsToSign?: Transaction[];
    onCancel: () => void;
    onSignTransaction: (transaction: Transaction) => Promise<Transaction>;
    onTransactionsSignSuccess: (transactions: Transaction[]) => void;
    onTransactionsSignError: (errorMessage: string) => void;
}
declare type DeviceSignedTransactions = Record<number, Transaction>;
export interface UseSignMultipleTransactionsReturnType {
    allTransactions: MultiSignTxType[];
    onSignTransaction: () => void;
    onNext: () => void;
    onPrev: () => void;
    onAbort: () => void;
    waitingForDevice: boolean;
    isLastTransaction: boolean;
    currentStep: number;
    signedTransactions?: DeviceSignedTransactions;
    currentTransaction: ActiveLedgerTransactionType | null;
}
export declare function useSignMultipleTransactions({ transactionsToSign, egldLabel, address, verifyReceiverScam, onCancel, onSignTransaction, onTransactionsSignError, onTransactionsSignSuccess }: UseSignMultipleTransactionsPropsType): UseSignMultipleTransactionsReturnType;
export default useSignMultipleTransactions;
//# sourceMappingURL=useSignMultipleTransactions.d.ts.map