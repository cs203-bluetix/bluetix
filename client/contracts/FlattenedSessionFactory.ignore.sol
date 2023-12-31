// Sources flattened with hardhat v2.17.3 https://hardhat.org

// SPDX-License-Identifier: GPL-3.0 AND MIT AND UNLICENSED

// File @openzeppelin/contracts/utils/Context.sol@v4.9.3

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v4.9.3

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


// File contracts/ISeatedFactory.sol

// Original license: SPDX_License_Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface ISeatedFactory{
    // Add any unique functions or properties specific to seating NFTs here
    function addSeatedNft(uint _eventId, uint _sessionId, string memory _section, uint _supply, uint _startPrice, uint _priceCap, uint _startSeat, string memory _event) external returns(address);

    function getSectionAddress(uint _eventId, string memory _section) external view returns(address);

}


// File contracts/IStandingFactory.sol

// Original license: SPDX_License_Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IStandingFactory{
    // Add any unique functions or properties specific to seating NFTs here
    function addStandingNft(uint _eventId, uint _sessionId, string memory _section, uint _supply, uint _startPrice, uint _priceCap, string memory _event) external returns(address);
    function getStandingSections(uint _eventId) external view returns(address);
}


// File contracts/Session.sol

// Original license: SPDX_License_Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract Session is Ownable {
    mapping(string=>address) public sectionToAddress;
    string[] public sections;
    IStandingFactory private standingFactory;
    ISeatedFactory private seatedFactory;
    address sessionFactory;
    string public eventName;
    uint public sessionId; 

    constructor(
        address _standingFactory,
        address _seatedFactory,
        address _sessionFactory,
        uint _eventId, 
        uint[] memory _supply,
        string[] memory _section,
        uint[] memory _startPrice,
        uint _sessionId,
        uint _priceCap,
        uint[] memory _startSeats,
        string memory _eventName
    ){
        standingFactory = IStandingFactory(_standingFactory);
        seatedFactory = ISeatedFactory(_seatedFactory);
        sessionFactory = _sessionFactory;
        eventName = _eventName;
        addStandingNFTContract(_eventId,_sessionId,_section[0],_supply[0],_startPrice[0],_priceCap,_eventName);
        addSeatedNFTContract(_eventId,_sessionId,_section,_supply,_startPrice,_priceCap,_startSeats,_eventName);
    }

    function addStandingNFTContract(
        uint _eventId, 
        uint _sessionId, 
        string memory _section,
        uint _supply,
        uint _startPrice,
        uint _priceCap,
        string memory _eventName) public onlyOwner{
            address standingInstance = standingFactory.addStandingNft(_eventId, _sessionId, _section, _supply, _startPrice, _priceCap, _eventName);
            sectionToAddress[_section] = standingInstance;
            sections.push(_section);
    }

     function addSeatedNFTContract(
        uint _eventId, 
        uint _sessionId, 
        string[] memory _section,
        uint[] memory _supply,
        uint[] memory _startPrice,
        uint _priceCap,
        uint[] memory _startSeats,
        string memory _eventName) public onlyOwner{
            uint length = _section.length;
            for(uint i = 1; i < length ;i++){
                address seatedInstance = seatedFactory.addSeatedNft(_eventId, _sessionId, _section[i], _supply[i], _startPrice[i], _priceCap, _startSeats[i], _eventName);
                sectionToAddress[_section[i]]=seatedInstance;
                sections.push(_section[i]);
            }
    }

    function getSections() public view returns(string[] memory){
        return sections;
    }

    function getSectionToAddress(string memory _section) public view returns(address){
        return sectionToAddress[_section];
    }

    function getAllSectionsAddress() public view returns(address[] memory){
        address[] memory tempAddresses = new address[](sections.length);
        for(uint i = 0; i<sections.length;i++){
            tempAddresses[i] = sectionToAddress[sections[i]];
        }
        return tempAddresses;
    }
    
}


// File contracts/SessionFactory.sol

// Original license: SPDX_License_Identifier: GPL-3.0
pragma solidity ^0.8.9;
contract SessionFactory is Ownable {
    uint[] public sessionsId;
    mapping(uint => address) public sessionToAddress;
    uint internal eventId;
    uint numSessions;
    string internal eventName;
    uint[] internal supplyPerSection;
    string[] internal sections;
    uint[] internal sessionId;
    uint[] internal startPrice;
    uint internal priceCap;
    uint[] internal startSeats;

    constructor(
        address _standingFactory,
        address _seatedFactory,
        uint _eventId,
        uint _numSessions,
        uint[] memory _sessionId,
        string[] memory _section,
        uint[] memory _supplyPerSection,
        uint[] memory _startPrice,
        uint _priceCap,
        uint[] memory _startSeats,
        string memory _eventName
    ) {
        eventId = _eventId;
        numSessions = _numSessions;
        supplyPerSection = _supplyPerSection;
        sections = _section;
        sessionId = _sessionId;
        startPrice = _startPrice;
        priceCap = _priceCap;
        startSeats = _startSeats;
        eventName = _eventName;
        createSession(
            _standingFactory,
            _seatedFactory,
            address(this),
            _eventId,
            _supplyPerSection,
            _section,
            _startPrice,
            _sessionId,
            _priceCap,
            _startSeats,
            _eventName
        );
    }

    function createSession(
        address _standingFactory,
        address _seatedFactory,
        address _sessionFactory,
        uint _eventId,
        uint[] memory _supplyPerSection,
        string[] memory _section,
        uint[] memory _startPrice,
        uint[] memory _sessionId,
        uint _priceCap,
        uint[] memory _startSeats,
        string memory _eventName
    ) public onlyOwner {
        for (uint i = 0; i < numSessions; i++) {
            Session sessionInstance = new Session(
                _standingFactory,
                _seatedFactory,
                _sessionFactory,
                _eventId,
                _supplyPerSection,
                _section,
                _startPrice,
                _sessionId[i],
                _priceCap,
                _startSeats,
                _eventName
            );
            sessionToAddress[_sessionId[i]] = address(sessionInstance);
            sessionsId.push(_sessionId[i]);
        }
    }

    function getSessionsId() public view returns (uint[] memory) {
        return sessionsId;
    }

    function getSessionAddresses(
        uint _sessionId
    ) public view returns (address) {
        require(
            sessionToAddress[_sessionId] != address(0),
            "Session ID does not exist"
        );
        return sessionToAddress[_sessionId];
    }

    function getSectionAddressesFromSession(
        uint _sessionId
    ) public view returns (address[] memory) {
        require(
            getSessionAddresses(_sessionId) != address(0),
            "Session ID does not exist"
        );
        Session session = Session(getSessionAddresses(_sessionId));
        return session.getAllSectionsAddress();
    }
}
