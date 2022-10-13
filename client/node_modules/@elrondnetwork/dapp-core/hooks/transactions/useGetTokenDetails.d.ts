interface TokenOptionType {
    tokenLabel: string;
    tokenDenomination: number;
    tokenAvatar: string;
    error?: string;
}
export declare function useGetTokenDetails({ tokenId }: {
    tokenId: string;
}): TokenOptionType;
export default useGetTokenDetails;
//# sourceMappingURL=useGetTokenDetails.d.ts.map