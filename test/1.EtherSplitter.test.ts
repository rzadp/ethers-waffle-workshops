import {expect, use} from 'chai';
import {Contract} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import EtherSplitter from '../build/EtherSplitter.json';

use(solidity);

const addressZero = '0x0000000000000000000000000000000000000000'

describe('Ether Splitter', () => {
  const [wallet, first, second, third] = new MockProvider().getWallets();
  let splitter: Contract, splitterWithThird: Contract;

  beforeEach(async () => {
    splitter = await deployContract(wallet, EtherSplitter, [first.address, second.address]);

    splitterWithThird = splitter.connect(third)
  });

  it('Deploys correctly and has an address', async () => {
    expect(splitter.address).to.be.properAddress
  });

  it('Sets first split address', async () => {
    expect(await splitter.first()).to.be.properAddress
  })

  it('Sets second split address', async () => {
    expect(await splitter.second()).to.be.properAddress
  })

  it('splits evenly', async () => {
    const firstBalance = await first.getBalance()
    const secondBalance = await first.getBalance()

    await splitter.split({value: 2})
    const firstAfter = await first.getBalance()
    const secondAfter = await second.getBalance()
    expect( firstAfter.sub(firstBalance) ).to.equal(1)
    expect( secondAfter.sub(secondBalance) ).to.equal(1)
  })

  it('splits evenly with odd number', async () => {
    const firstBalance = await first.getBalance()
    const secondBalance = await first.getBalance()

    expect(await splitter.provider.getBalance(splitter.address)).to.eq(0)

    await splitter.split({value: 3})
    const firstAfter = await first.getBalance()
    const secondAfter = await second.getBalance()
    expect( firstAfter.sub(firstBalance) ).to.equal(1)
    expect( secondAfter.sub(secondBalance) ).to.equal(1)

    expect(await splitter.provider.getBalance(splitter.address)).to.eq(0)
  })

  it('Reverts for 1', async () => {
    await expect( splitter.split({value: 1})).to.be.revertedWith('Foo')
  })

  it('Reverts for 0', async () => {
    await expect( splitter.split({value: 0})).to.be.revertedWith('Foo')
  })

  it('Emits splitted event', async () => {
    await expect( splitter.split({value: 2}) )
      .to.emit( splitter, 'Splitted' )
      .withArgs( first.address, second.address, 1 );
  })

  it('Emits returned event', async () => {
    await expect( splitter.split({value: 3}) )
      .to.emit( splitter, 'Returned' )
      .withArgs( wallet.address );
  })

  it('does not emit returned event when even split', async () => {
    await expect( splitter.split({value: 2}) )
      .to.not.emit( splitter, 'Returned' );
  })

  describe('setAddresses', () => {
    it('Callable by owner', async () => {
      await expect( splitter.setAddresses(first.address, third.address) ).to.be.not.reverted
      expect(await splitter.second()).to.equal(third.address);
    } );

    it('Reverts for first invalid address', async () => {
      await expect( splitter.setAddresses(addressZero, third.address) ).to.be.revertedWith('Wrong address')
    } );

    it('Reverts for second invalid address', async () => {
      await expect( splitter.setAddresses(third.address, addressZero) ).to.be.revertedWith('Wrong address')
    } );
    
    it('Not callable by not owner', async () => {
      await expect( splitterWithThird.setAddresses(first.address, third.address) ).to.be.revertedWith('Ownable: caller is not the owner')
    } );
  });
});
