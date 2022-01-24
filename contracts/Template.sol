pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Template is Ownable {
    using SafeMath for uint256;

    constructor() {
    }

    function myFunction() public payable {

    }

    function unsafeSubstraction() public pure returns(uint) {
        unchecked {
            uint base = 1;
            return base - 2;
        }
    }

    function safeSubstraction() public pure returns(uint) {
        unchecked {
            uint base = 1;
            return base.sub(2);
        }
    }
}
