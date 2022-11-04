// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Glow.sol";

interface Faucet {
    function gulp(address gem) external;
}

// Goerli Chainlog: 0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F
// Goerli faucet: 0xa473CdDD6E4FAc72481dc36f39A409D86980D187
// Goerli GUSD: 0x67aef79654d8f6cf44fdc08949c308a4f6b3c45b
// Goerli GUSD PSM: 0x3b2dbe6767fd8b4f8334ce3e8ec3e2df8ab3957b
// Goerli GUSD Join: 0x4115fda246e2583b91ad602213f2ac4fc6e437ca
// Goerli DAI: 0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844
// Goerli DAI Join: 0x6a60b7070befb2bfc964f646efdf70388320f4e0
// Goerli VOW: 0x23f78612769b9013b3145E43896Fa1578cAa2c2a
// Goerli VAT: 0xb966002ddaa2baf48369f5015329750019736031

// Mainnet GUSD: 0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd
// Mainnet GUSD PSM: 0x204659B2Fd2aD5723975c362Ce2230Fba11d3900
// Mainnet GUSD Join: 0xe29A14bcDeA40d83675aa43B72dF07f649738C8b
// Mainnet DAI: 0x6B175474E89094C44Da98b954EedeAC495271d0F
// Mainnet DAI Join: 0x9759A6Ac90977b93B58547b4A71c78317f391A28
// Mainnet VOW: 0xA950524441892A31ebddF91d3cEEFa04Bf454466
// Mainnet VAT: 0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B

// Goerli constructor args: 0x6a60b7070befb2bfc964f646efdf70388320f4e0, 0x67aef79654d8f6cf44fdc08949c308a4f6b3c45b, 0x4115fda246e2583b91ad602213f2ac4fc6e437ca, 0x3b2dbe6767fd8b4f8334ce3e8ec3e2df8ab3957b, 0x23f78612769b9013b3145E43896Fa1578cAa2c2a
// Mainnet constructor args: 0x9759A6Ac90977b93B58547b4A71c78317f391A28 0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd 0xe29A14bcDeA40d83675aa43B72dF07f649738C8b 0x204659B2Fd2aD5723975c362Ce2230Fba11d3900 0xA950524441892A31ebddF91d3cEEFa04Bf454466

/// @notice We need to test that we can generate GUSD from a fauchet, mint DAI against it, then join to the surplus buffer
contract GlowTest is Test {
    Glow public glow;
    Faucet public faucet;

    function setUp() public {
        //glow = new Glow();
        //Faucet(0xa473CdDD6E4FAc72481dc36f39A409D86980D187).gulp(0x67aef79654d8f6cf44fdc08949c308a4f6b3c45b);
    }

    /// @dev Tests that GUSD can convert to Dai through the PSM vault
    function testConvertGusd() public {
        assertEq(true, false);
    }

    /// @dev Tests that Dai can be sent to the surplus buffer through Dai join

    /*
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
*/
}
