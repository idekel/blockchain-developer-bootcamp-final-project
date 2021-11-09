# Avoiding Common attacks
One of the project requirements is to include this describing common attacks and pitfalls are avoided

## Common attacks and pitfalls avoided

1. Using Specific Compiler Pragma: The POS.sol file use a specific compiler pragma
2. Use Modifiers Only for Validation: Modifier are used only for validations inside POS contract
3. Checks-Effects-Interactions: The withdraw method modifies the state before it transfer any either 