import React, { useState } from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { useQuery } from '@tanstack/react-query';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { contractAddress, microservice } from 'config';
import styles from './styles.module.scss';

function Sell() {
  const [tokenForBuy, setTokenForBuy] = useState(0);
  const [egldForSpend, setEgldForSpend] = useState(0);
  const { address, account } = useGetAccountInfo();
  const [showError, setShowError] = useState(false);

  const tokenBought = useQuery(
    ['bought'],
    () =>
      fetch(`${microservice}/sale/bought/${address}`).then((res) => res.json()),
    { refetchInterval: 2000 }
  );

  const supply = useQuery(
    ['supply'],
    () => fetch(`${microservice}/sale/supply`).then((res) => res.json()),
    { refetchInterval: 2000 }
  );

  function handleChangeValue(e: any) {
    if (
      Number(e.target.value) > -1 &&
      Number(e.target.value) <= supply.data.data &&
      Number(e.target.value) <= account.balance / 1000000000000000000
    ) {
      setTokenForBuy(Number(e.target.value * 14500));
      setEgldForSpend(e.target.value);
      setShowError(false);
    } else {
      setShowError(true);
    }
  }
  const sendTransaction = async () => {
    await sendTransactions({
      transactions: [
        {
          value: egldForSpend * 1000000000000000000,
          gasLimit: 6000000,
          data: btoa('buy'),
          receiver: contractAddress
        }
      ]
    });
  };

  if (supply.isLoading || tokenBought.isLoading) return 'Loading...';
  return (
    <>
      <h1 className={styles.title}>BUY $ESTAR</h1>
      <h5 className={styles.subtitle}>1 EGLD = 14.500 $ESTAR</h5>

      <Container className={styles.inputs}>
        <Form>
          <Form.Group>
            <Form.Label className={styles.label}>Send:</Form.Label>
            <Form.Control
              min='1'
              placeholder='Enter amount'
              value={egldForSpend && egldForSpend}
              type='number'
              onChange={(e) => handleChangeValue(e)}
              className={showError === true ? styles.error : ''}
              disabled={
                account.balance / 1000000000000000000 === 0 ? true : false
              }
            />
            <Form.Label>
              <span
                className={
                  account.balance / 1000000000000000000 > 0
                    ? styles.value
                    : styles.textError
                }
              >
                {account.balance / 1000000000000000000 === 0
                  ? 'You do not have EGLD!'
                  : (account.balance / 1000000000000000000).toFixed(3) +
                    ' EGLD'}
              </span>
            </Form.Label>
          </Form.Group>
          {showError === true ? (
            <span className={styles.textError}>
              Please check the values you passed in!
            </span>
          ) : null}
          <Form.Group className='mb-1'>
            <Form.Label className={styles.label}>Receive:</Form.Label>
            <Form.Control
              value={
                tokenForBuy
                  ? Intl.NumberFormat('de-DE').format(tokenForBuy)
                  : egldForSpend
                  ? (egldForSpend * 14500).toFixed(3)
                  : 0
              }
              type='number'
              disabled
            />
            <Form.Label
              className={
                account.balance / 1000000000000000000 > 0
                  ? styles.value
                  : styles.textError
              }
            >
              {supply.data.data
                ? Intl.NumberFormat('de-DE').format(supply.data.data)
                : 0}
              <span className={styles.labelText}> ESTAR available</span>
            </Form.Label>
          </Form.Group>
          <Button
            className={showError === false ? styles.buttonSell : ''}
            onClick={() => sendTransaction()}
            disabled={
              showError ||
              account.balance / 1000000000000000000 === 0 ||
              egldForSpend === 0
                ? true
                : false
            }
          >
            Swap
          </Button>
          <Button
            className={showError === false ? styles.buttonSell : ''}
            onClick={() =>
              setEgldForSpend(
                Number((account.balance / 1000000000000000000).toFixed(3))
              )
            }
            disabled={
              showError ||
              (account.balance / 1000000000000000000 === 0) === true
                ? true
                : false
            }
            style={{ marginLeft: '15px' }}
          >
            Add all
          </Button>
        </Form>
        <h2 className={styles.newTokens} style={{ marginTop: '20px' }}>
          $ESTAR BOUGHT:
          <span className={styles.tokensValue}>
            {' '}
            {Intl.NumberFormat('de-DE').format(tokenBought.data.data)}
          </span>
        </h2>
      </Container>
    </>
  );
}

export default Sell;
