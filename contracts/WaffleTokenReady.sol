pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WaffleTokenReady is ERC20 {
    constructor(uint _initialBalance) ERC20("WaffleToken", "WFL") public {
        _mint(msg.sender, _initialBalance);
    }
}
