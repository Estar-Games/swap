import React, { useState } from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { contractAddress, token } from 'config';
import styles from './styles.module.scss';

function Sell() {
  const [tokenForSwap, setTokenForSwap] = useState(0);
  const { address } = useGetAccountInfo();

  const oldTokens = useQuery(['balance'], () =>
    fetch(`http://localhost:1212/user/balance/${address}/ESTAR-ba1a38/2`).then(
      (res) => res.json()
    )
  );

  const newToken = useQuery(['newToken'], () =>
    fetch(`http://localhost:1212/user/balance/${address}/EST-93707f/18`).then(
      (res) => res.json()
    )
  );
  const supply = useQuery(['supply'], () =>
    fetch('http://localhost:1212/swap/supply').then((res) => res.json())
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

  if (oldTokens.isLoading || supply.isLoading || newToken.isLoading)
    return 'Loading...';
  return (
    <>
      <h1 className={styles.title}>Swap Token</h1>

      <Container className={styles.inputs}>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label className={styles.label}>Send:</Form.Label>
            <Form.Control
              placeholder='Moneda1'
              type='number'
              onChange={(e) => setTokenForSwap(Number(e.target.value))}
            />
            <Form.Label className={styles.label}>
              {oldTokens.data.status === 'SUCCESS' ? oldTokens.data.data : 0}{' '}
              your $ESTAR
            </Form.Label>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className={styles.label}>Receive:</Form.Label>
            <Form.Control
              placeholder='Moneda2'
              value={tokenForSwap}
              type='number'
              disabled
            />
            <Form.Label className={styles.label}>
              {supply.data.data} available for swap
            </Form.Label>
          </Form.Group>
          <Button
            className={styles.buttonSell}
            onClick={() => sendTransaction()}
          >
            Swap
          </Button>
        </Form>
        <h2 className='text-light'>{newToken.data.data} New tokens</h2>
      </Container>
    </>
  );
}

export default Sell;
