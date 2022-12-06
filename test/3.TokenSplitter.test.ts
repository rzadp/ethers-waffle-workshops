import {expect, use} from 'chai';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import {TokenSplitter, TokenSplitter__factory, WaffleToken, WaffleToken__factory} from '../build/types';

use(solidity);

describe('Token Splitter', () => {
  const [alice, bob, charlie, david] = new MockProvider().getWallets();
  let token: WaffleToken;
  let splitter: TokenSplitter;

  beforeEach(async () => {
    token = await deployContract(alice, WaffleToken__factory, [1000]);
    splitter = await deployContract(alice, TokenSplitter__factory, [token.address]);
  });

  it('Deploys correctly', async () => {
    expect(splitter.address).to.be.properAddress
    expect(await splitter.token()).to.be.equal(token.address)
  });
});
