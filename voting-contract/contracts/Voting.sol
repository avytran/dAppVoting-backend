// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    address public admin;

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public votedCandidateId;
    mapping(uint256 => bool) public isDeleted;
    uint256 public candidatesCount;
    uint256 public startTime;
    uint256 public endTime;
    event Voted(address indexed voter, uint256 candidateId, string candidateName, uint256 timestamp);
    event CandidateAdded(uint256 id, string name, uint256 timestamp);
    event CandidateDeleted(uint256 id, uint256 timestamp);
    event VotingPeriodUpdated(uint256 startTime, uint256 endTime);

    constructor(uint256 _startTime, uint256 _endTime) {
        admin = msg.sender;
        startTime = _startTime;
        endTime = _endTime;
        _internalAddCandidate("Marcus Thorne");
        _internalAddCandidate("Elena Vance");
    }

    function _internalAddCandidate(string memory _name) internal {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name, block.timestamp);
    }

    function addCandidate(string memory _name) public {
        require(msg.sender == admin, "Only admin can add candidates");
        _internalAddCandidate(_name);
    }

    function deleteCandidate(uint256 _candidateId) public {
        require(msg.sender == admin, "Only admin");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid ID");
        
        isDeleted[_candidateId] = true;
        emit CandidateDeleted(_candidateId, block.timestamp);
    }

    function setVotingPeriod(uint256 _startTime, uint256 _endTime) public {
        require(msg.sender == admin, "Only admin can update");
        require(_endTime > _startTime, "End time must be after start time");
        
        startTime = _startTime;
        endTime = _endTime;
        emit VotingPeriodUpdated(_startTime, _endTime);
    }

    function vote(uint256 _candidateId) public {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Voting is not active");
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid ID");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        votedCandidateId[msg.sender] = _candidateId;

        emit Voted(msg.sender, _candidateId, candidates[_candidateId].name, block.timestamp);
    }

    function isElectionOver() public view returns (bool) {
        return block.timestamp > endTime;
    }
}