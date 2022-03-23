import {expect, use} from 'chai';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import {EtherSplitter, EtherSplitter__factory} from '../build/types';

use(solidity);

describe('Ether Splitter', () => {
  const [alice, bob, charlie, david] = new MockProvider().getWallets();
  let splitter: EtherSplitter;

  beforeEach(async () => {
    splitter = await deployContract(alice, EtherSplitter__factory, []);
  });

  it('Deploys correctly and has an address', async () => {
    expect(splitter.address).to.be.properAddress
  });
});
