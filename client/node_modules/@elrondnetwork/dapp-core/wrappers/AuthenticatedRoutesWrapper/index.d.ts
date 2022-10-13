import React from 'react';
import { RouteType } from 'types';
declare const AuthenticatedRoutesWrapper: ({ children, routes, unlockRoute, onRedirect }: {
    children: React.ReactNode;
    routes: RouteType[];
    unlockRoute: string;
    onRedirect?: ((unlockRoute?: string) => void) | undefined;
}) => JSX.Element | null;
export default AuthenticatedRoutesWrapper;
//# sourceMappingURL=index.d.ts.map