// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SwissCheese is ERC20 {
    constructor() ERC20("SwissCheese", "SWC") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }

    function mintSwc(uint256 amount) public {
        _mint(msg.sender,amount);
    }
}
