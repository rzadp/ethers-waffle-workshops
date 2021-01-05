// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * EtherSplitter
 * Splits transferred Ether
 */

contract EtherSplitter is Ownable {
    using SafeMath for uint256;
    address payable public first;
    address payable public second;

    constructor(address payable _first, address payable _second) public {
        first = _first;
        second = _second;
    }

    event Splitted(address _first, address _second, uint256 value);
    event Returned(address sender);

    function split() public payable {
        require(msg.value > 1, 'Foo');
        uint256 toTransfer = msg.value.div(2);
        first.transfer( toTransfer );
        uint256 reminder = msg.value.mod(2);
        second.transfer( toTransfer );
        emit Splitted(first, second, toTransfer);
        if(reminder > 0) {
            msg.sender.transfer(reminder);
            emit Returned(msg.sender);
        }
    }

    function setAddresses(address payable _first, address payable _second) public payable onlyOwner {
        require(_first != address(0) && _second != address(0),'Wrong address');
        first = _first;
        second = _second;
    }
}
