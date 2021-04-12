import {expect, use} from 'chai';
import {Contract} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import EtherSplitter from '../build/EtherSplitter.json';

use(solidity);

describe('Ether Splitter', () => {
  const [alice, bob, charlie, david] = new MockProvider().getWallets();
  let splitter: Contract;

  beforeEach(async () => {
    const contractConstructorArgs: any[] = []
    splitter = await deployContract(alice, EtherSplitter, contractConstructorArgs);
  });

  it('Deploys correctly and has an address', async () => {
    expect(splitter.address).to.be.properAddress
  });
});
