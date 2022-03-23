import {expect, use} from 'chai';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import {WaffleToken, WaffleToken__factory} from '../build/types';

use(solidity);

describe('WaffleToken', () => {
  const [alice, bob] = new MockProvider().getWallets();
  let token: WaffleToken;

  beforeEach(async () => {
    token = await deployContract(alice, WaffleToken__factory, [1000]);
  });

  it('Has a proper metadata', async () => {
    expect(await token.name()).to.equal('WaffleToken');
    expect(await token.symbol()).to.equal('WFL');
    expect(await token.decimals()).to.equal(18);
  });

  it('Assigns initial balance', async () => {
    expect(await token.balanceOf(alice.address)).to.equal(1000);
  });

  it('Transfer adds amount to destination account', async () => {
    await token.transfer(bob.address, 7);
    expect(await token.balanceOf(bob.address)).to.equal(7);
  });

  it('Transfer emits event', async () => {
    await expect(token.transfer(bob.address, 7))
      .to.emit(token, 'Transfer')
      .withArgs(alice.address, bob.address, 7);
  });

  it('Can not transfer above the amount', async () => {
    await expect(token.transfer(bob.address, 1007)).to.be.reverted;
  });

  it('Can not transfer from empty account', async () => {
    const tokenFromOtherWallet = token.connect(bob);
    await expect(tokenFromOtherWallet.transfer(alice.address, 1))
      .to.be.reverted;
  });

});
