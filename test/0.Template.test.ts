import {expect, use} from 'chai';
import {Contract} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import Template from '../build/Template.json';

use(solidity);

describe('Template', () => {
  const provider = new MockProvider()
  const [wallet] = provider.getWallets();
  let contract: Contract;

  beforeEach(async () => {
    contract = await deployContract(wallet, Template, []);
  });

  it('Deploys correctly and has an address', async () => {
    expect(contract.address).to.be.properAddress
  });

  it('Calls a function', async () => {
    await contract.myFunction();
  });

  it('Transfers ether to the contract', async () => {
    expect(await provider.getBalance(contract.address)).to.eq(0)
    await contract.myFunction({value: 123});
    expect(await provider.getBalance(contract.address)).to.eq(123)
  });

  it('Adds unsafely', async () => {
    const result = await contract.unsafeSubstraction();
    console.log(`1 - 2 in unsafe math is ${result.toString()}`)
  });

  it('Throws on safe add', async () => {
    await expect(contract.safeSubstraction()).to.be.reverted;
  });
});
 