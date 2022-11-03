// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Glow.sol";

contract GlowTest is Test {
    Glow public glow;

    function setUp() public {
        glow = new Glow();
    }
    /*
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
*/
}
