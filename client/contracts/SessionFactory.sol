// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Session.sol";

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
