import {expect, use} from 'chai';
import {deployContract, solidity, defaultAccounts} from 'ethereum-waffle';
import {WaffleToken, WaffleToken__factory} from '../build/types';
import {providers, Wallet} from 'ethers'

use(solidity);

const ENDPOINT = 'http://localhost:8545/'
const PRIVATE_KEY = defaultAccounts[0].secretKey

/**
 * Use with `start-ganache` script.
 */

describe('Deployment', () => {
  let provider: providers.BaseProvider
  let token: WaffleToken;
  let deployer: Wallet

  before(() => {
    provider = new providers.JsonRpcProvider(ENDPOINT)
    deployer = new Wallet(PRIVATE_KEY, provider)
  })

  beforeEach(async () => {
    token = await deployContract(deployer, WaffleToken__factory, [1000]);
    console.log(`Contract deployed on address: ${token.address}`)
  });

  it('Deploys correctly', async () => {
    expect(token.address).to.be.properAddress
    expect(await token.symbol()).to.be.equal('WFL')
  });
});
