pragma solidity ^0.6.0;

/**
 * EtherSplitter
 * Splits transferred Ether
 */

import "@openzeppelin/contracts/math/SafeMath.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract EtherSplitter is Ownable {
    using SafeMath for uint256;

    address payable public firstAddr;
    address payable public secondAddr;

    constructor(address payable _firstAddr, address payable _secondAddr)
        public
    {
        firstAddr = _firstAddr;
        secondAddr = _secondAddr;
    }

    function spliter() public payable onlyOwner {
        require(msg.value >= 1, "You must send eth");
        uint256 value = msg.value;

        uint256 splitBalance = value.div(2);
        if (value != splitBalance.mul(2)) {
            emit remainderReturned();
            msg.sender.transfer(value - splitBalance.mul(2));
        }

        firstAddr.transfer(splitBalance);
        secondAddr.transfer(splitBalance);

        emit foundsSplit(firstAddr, secondAddr, splitBalance);
    }

    event foundsSplit(
        address firstAddr,
        address secondAddr,
        uint256 splitBalance
    );
    event remainderReturned();
}
