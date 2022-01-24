pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WaffleTokenReady is ERC20 {
    constructor(uint _initialBalance) ERC20("WaffleToken", "WFL") {
        _mint(msg.sender, _initialBalance);
    }
}
