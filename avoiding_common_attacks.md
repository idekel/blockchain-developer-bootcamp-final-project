# Avoiding Common attacks
One of the project requirements is to include this describing common attacks and pitfalls are avoided

## Common attacks and pitfalls avoided

1. SWC-107:  Checks-Effects-Interactions: The withdraw method modifies the state before it transfer any either. This is the only method with an external call
2. SWC-108 State Variable Default Visibility: All state variables has explicit visibility
3. SWC-101: Integer Overflow and Underflow. openzeppelin safe math is used
4. SWC-103: Using Specific Compiler Pragma: The POS.sol file use a specific compiler pragma
5. Use Modifiers Only for Validation: Modifier are used only for validations inside POS contract