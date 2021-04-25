pragma solidity ^0.6.0;

/**
 * EtherSplitter
 * Splits transferred Ether
 */

import "@openzeppelin/contracts/math/SafeMath.sol";

contract EtherSplitter {
    using SafeMath for uint256;

    address payable public firstAddr;
    address payable public secondAddr;

    constructor(address payable _firstAddr, address payable _secondAddr)
        public
    {
        firstAddr = _firstAddr;
        secondAddr = _secondAddr;
    }

    function spliter() public payable {
        require(msg.value >= 1, "You must send eth");
        uint256 value = msg.value;

        uint256 splitBalance = value.div(2);
        if (value != splitBalance.mul(2)) {
            msg.sender.transfer(value - splitBalance.mul(2));
        }

        firstAddr.transfer(splitBalance);
        secondAddr.transfer(splitBalance);
    }
}
