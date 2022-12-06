import {use} from 'chai';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';

import {WaffleToken, WaffleToken__factory} from '../build/types';

use(solidity);

describe('WaffleToken', () => {
  const [alice] = new MockProvider().getWallets();
  let token: WaffleToken;

  beforeEach(async () => {
    token = await deployContract(alice, WaffleToken__factory, [1000]);
  });
});