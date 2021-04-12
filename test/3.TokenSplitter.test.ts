import {expect, use} from 'chai';
import {Contract} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import TokenSplitter from '../build/TokenSplitter.json';
import WaffleToken from '../build/WaffleToken.json';

use(solidity);

describe('Token Splitter', () => {
  const [alice, bob, charlie, david] = new MockProvider().getWallets();
  let token: Contract;
  let splitter: Contract;

  beforeEach(async () => {
    token = await deployContract(alice, WaffleToken, [1000]);
    splitter = await deployContract(alice, TokenSplitter, [token.address]);
  });

  it('Deploys correctly', async () => {
    expect(splitter.address).to.be.properAddress
    expect(await splitter.token()).to.be.equal(token.address)
  });
});
