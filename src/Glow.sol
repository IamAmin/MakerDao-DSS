// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/*
is this

               3|B<- shoving through contracts without testing
        (_)/    


 smart contract development?
*/

interface ChainLog {
    function getAddress(bytes32 _key) external view returns (address);
}

interface Gusd {
    function balanceOf(address _owner) external view returns (uint256);

    function approve(address _addr) external returns (bool);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool);
}

interface GusdPsm {
    function sellGem(address usr, uint256 gemAmt) external;
}

interface Dai {
    function balanceOf(address) external returns (uint256);

    function approve(address usr, uint256 wad) external returns (bool);

    function transferFrom(
        address src,
        address dst,
        uint256 wad
    ) external returns (bool);
}

interface DaiJoin {
    function dai() external view returns (address);

    function join(address, uint256) external;
}

interface Vat {}

contract Glow {
    DaiJoin public immutable daiJoin;
    Dai public immutable dai;
    Gusd public immutable gusd;
    GusdPsm public immutable gusdPsm;
    address public immutable vow;

    event Glowed(uint256 amount);

    constructor(
        address daiJoin_,
        address gusd_,
        address gusdJoin_,
        address gusdPsm_,
        address vow_
    ) {
        daiJoin = DaiJoin(daiJoin_);
        dai = Dai(DaiJoin(daiJoin_).dai());
        gusd = Gusd(gusd_);
        gusdPsm = GusdPsm(gusdPsm_);
        vow = vow_;
        Dai(DaiJoin(daiJoin_).dai()).approve(daiJoin_, uint256(2**256 - 1));
        gusd.approve(gusdJoin_);
    }

    function glow(uint256 wad) public {
        gusd.transferFrom(msg.sender, address(this), wad);
        uint256 gusdBalance = gusd.balanceOf(address(this));
        gusdPsm.sellGem(address(this), gusdBalance);
        uint256 daiBalance = dai.balanceOf(address(this));
        daiJoin.join(vow, daiBalance);
        emit Glowed(daiBalance);
    }
}
