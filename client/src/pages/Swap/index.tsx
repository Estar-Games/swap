import React, { useState } from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {
  contractAddress,
  microservice,
  newTokenIdentifier,
  token
} from 'config';
import styles from './styles.module.scss';

function Sell() {
  const [tokenForSwap, setTokenForSwap] = useState(0);
  const { address } = useGetAccountInfo();
  const [showError, setShowError] = useState(false);

  const oldTokens = useQuery(['balance'], () =>
    fetch(`${microservice}/user/balance/${address}/${token}/2`).then((res) =>
      res.json()
    )
  );

  const newToken = useQuery(['newToken'], () =>
    fetch(
      `${microservice}/user/balance/${address}/${newTokenIdentifier}/18`
    ).then((res) => res.json())
  );
  const supply = useQuery(['supply'], () =>
    fetch(`${microservice}/swap/supply`).then((res) => res.json())
  );

  const numHex = (s: number) => {
    const test = new BigNumber(s, 10);
    let a = test.toString(16);
    if (a.length % 2 > 0) {
      a = '0' + a;
    }
    return a;
  };

  function strHex(s: string) {
    let a = '';
    for (let i = 0; i < s.length; i++) {
      a = a + numHex(s.charCodeAt(i));
    }
    return a;
  }
  function handleChangeValue(e: any) {
    console.log(Number(e.target.value) <= supply.data.data);
    if (
      Number(e.target.value) > 0 &&
      Number(e.target.value) <= supply.data.data
    ) {
      setTokenForSwap(Number(e.target.value));
      setShowError(false);
    } else {
      setShowError(true);
    }
  }
  const sendTransaction = async () => {
    await sendTransactions({
      transactions: [
        {
          value: '0',
          gasLimit: 6000000,
          data: btoa(
            'ESDTTransfer' +
              '@' +
              strHex(token) +
              '@' +
              numHex(tokenForSwap * 100) +
              '@' +
              strHex('SwapToken')
          ),
          receiver: contractAddress
        }
      ]
    });
  };

  const burnTokens = async () => {
    console.log(oldTokens.data.data);
    await sendTransactions({
      transactions: [
        {
          value: '0',
          gasLimit: 6000000,
          data: btoa(
            'ESDTLocalBurn' +
              '@' +
              strHex(token) +
              '@' +
              numHex(Number(oldTokens.data.data) * 100)
          ),
          receiver: address
        }
      ]
    });
  };

  if (oldTokens.isLoading || supply.isLoading || newToken.isLoading)
    return 'Loading...';
  return (
    <>
      <h1 className={styles.title}>Swap Token</h1>
      {address ===
        'erd19wjjxty40r6356r5mzjf2fmg8we2gxzshltunntk5tg45pl35r7ql8yzym' && (
        <Button
          style={{
            width: '200px',
            display: 'block',
            margin: '0 auto',
            marginBottom: '20px'
          }}
          onClick={() => burnTokens()}
        >
          BURN
        </Button>
      )}

      <Container className={styles.inputs}>
        <Form>
          {oldTokens.data.data === 0 ? (
            <span className={styles.textError}>You don&apos;t have $ESTAR</span>
          ) : null}
          <Form.Group>
            <Form.Label className={styles.label}>Send:</Form.Label>
            <Form.Control
              min='1'
              placeholder='Enter amount'
              type='number'
              onChange={(e) => handleChangeValue(e)}
              className={showError === true ? styles.error : ''}
              disabled={oldTokens.data.data === 0 ? true : false}
            />
            <Form.Label
              className={
                oldTokens.data.data > 0 ? styles.value : styles.textError
              }
            >
              {oldTokens.data.status === 'SUCCESS' ? oldTokens.data.data : 0}
              <span className={styles.labelText}> your $ESTAR</span>
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
              placeholder='Moneda2'
              value={tokenForSwap}
              type='number'
              disabled
            />
            <Form.Label
              className={
                oldTokens.data.data > 0 ? styles.value : styles.textError
              }
            >
              {supply.data.data ? supply.data.data : 0}
              <span className={styles.labelText}> available for swap</span>
            </Form.Label>
          </Form.Group>
          <Button
            className={showError === false ? styles.buttonSell : ''}
            onClick={() => sendTransaction()}
            disabled={
              showError || oldTokens.data.data === 0 || tokenForSwap === 0
                ? true
                : false
            }
          >
            Swap
          </Button>
          <Button
            className={showError === false ? styles.buttonSell : ''}
            onClick={() => setTokenForSwap(oldTokens.data.data)}
            disabled={
              showError || (oldTokens.data.data === 0) === true ? true : false
            }
            style={{ marginLeft: '15px' }}
          >
            Add all
          </Button>
        </Form>
        <h2 className={styles.newTokens} style={{ marginTop: '20px' }}>
          OWNED NEW $ESTAR:{' '}
          <span className={styles.tokensValue}>{newToken.data.data}</span>
        </h2>
      </Container>
    </>
  );
}

export default Sell;
