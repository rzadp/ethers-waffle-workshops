// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * TokenSplitter
 * Splits transferred tokens
 */

contract TokenSplitter {
    IERC20 public token;

    constructor(IERC20 _token) {
        token = _token;
    }
}
