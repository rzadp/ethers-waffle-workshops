pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WaffleToken is IERC20 {
    string public constant name = "WaffleToken";
    string public constant symbol = "WFL";
    uint8 public constant decimals = 18;

    mapping(address => uint) balances;

    constructor(uint _initialBalance) public {

    }

    function totalSupply() external view override returns (uint256) {
        revert('Not Implemented');
    }

    function balanceOf(address account) external view override returns (uint256) {
        revert('Not Implemented');
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        revert('Not Implemented');
    }

    function allowance(address owner, address spender) external override view returns (uint256) {
        revert('Not Implemented');
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        revert('Not Implemented');
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        revert('Not Implemented');
    }

}
