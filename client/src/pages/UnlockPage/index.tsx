import React from 'react';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton
} from '@elrondnetwork/dapp-core/UI';
import { routeNames } from 'routes';

export const UnlockRoute: () => JSX.Element = () => {
  const { isLoggedIn } = useGetLoginInfo();

  React.useEffect(() => {
    if (isLoggedIn) {
      window.location.href = routeNames.sale;
    }
  }, [isLoggedIn]);

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center'>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
            <h4 className='mb-4'>Login</h4>
            <p className='mb-4'>pick a login method</p>

            <ExtensionLoginButton
              callbackRoute={routeNames.sale}
              loginButtonText={'Extension'}
            />
            <WebWalletLoginButton
              callbackRoute={routeNames.sale}
              loginButtonText={'Web wallet'}
            />
            <LedgerLoginButton
              loginButtonText={'Ledger'}
              callbackRoute={routeNames.sale}
              className={'test-class_name'}
            />
            <WalletConnectLoginButton
              callbackRoute={routeNames.sale}
              loginButtonText={'Maiar'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
