# Design Pattern Decisions
One of the project requirements is to include this describing Design Pattern Decisions 

## Design Pattern Decisions taken
1. Inheritance and Interfaces: The POS contract uses safemath to avoid int overflow problems and Extent Ownable from openzeppelin
2. Access Control Design Patterns: POS contract uses Ownable to restrict access to certain functions of the Contract