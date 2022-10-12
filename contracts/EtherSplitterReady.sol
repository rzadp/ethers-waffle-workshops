pragma solidity ^0.8.0;

/**
 * EtherSplitter
 * Splits transferred Ether
 */

contract EtherSplitterReady {
    address payable receiver1;
    address payable receiver2;

    event Splitted (address sender, uint amount);
    event RemainderReturned (address sender);

    constructor(address payable _receiver1, address payable _receiver2) {
        receiver1 = _receiver1;
        receiver2 = _receiver2;
    }

    function split () public payable {
        require(msg.value > 0, "Cannot split an empty value");
        receiver1.transfer(msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Splitted(msg.sender, msg.value);
        if (address(this).balance > 0) {
            payable(msg.sender).transfer(address(this).balance);
            emit RemainderReturned(msg.sender);
        }
    }
}
