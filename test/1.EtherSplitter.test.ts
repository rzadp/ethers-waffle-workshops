import {expect, use} from 'chai';
import {Contract} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import EtherSplitter from '../build/EtherSplitter.json';

use(solidity);

describe('Ether Splitter', () => {
  const [wallet, first, second, third] = new MockProvider().getWallets();
  let splitter: Contract;

  beforeEach(async () => {
    splitter = await deployContract(wallet, EtherSplitter, []);
  });

  it('Deploys correctly and has an address', async () => {
    expect(splitter.address).to.be.properAddress
  });
});
