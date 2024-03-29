import {expect, use} from 'chai';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import { Wallet } from 'ethers';

import {EtherSplitter, EtherSplitter__factory} from '../build/types';

use(solidity);

describe('Ether Splitter', () => {
  let alice: Wallet
  let bob: Wallet
  let charlie: Wallet
  let david: Wallet
  let provider: MockProvider
  let splitter: EtherSplitter;

  beforeEach(async () => {
    provider = new MockProvider()
    ;([alice, bob] = provider.getWallets())
    charlie = Wallet.createRandom().connect(provider)
    david = Wallet.createRandom().connect(provider)
    splitter = await deployContract(alice, EtherSplitter__factory, []);
  });

  it('Deploys correctly and has an address', async () => {
    expect(splitter.address).to.be.properAddress
  });
});
