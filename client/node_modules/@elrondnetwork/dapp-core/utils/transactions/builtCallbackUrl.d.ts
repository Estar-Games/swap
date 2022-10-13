interface ReplyUrlType {
    callbackUrl: string;
    urlParams?: {
        [key: string]: string;
    };
}
export declare function builtCallbackUrl({ callbackUrl, urlParams }: ReplyUrlType): string;
export default builtCallbackUrl;
//# sourceMappingURL=builtCallbackUrl.d.ts.map