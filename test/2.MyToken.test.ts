import {expect, use} from 'chai';
import {Contract} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import MyToken from '../build/MyToken.json';

use(solidity);

describe.skip('MyToken', () => {
  const [alice, bob] = new MockProvider().getWallets();
  let token: Contract;

  beforeEach(async () => {
    token = await deployContract(alice, MyToken, [1000]);
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
