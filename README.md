### 0x order verification tool

Users of the 0x protocol (0xproject.com) are required to sign 'order hashes' in their browser. This may be using metamask for example. It is currently difficult for user's to be certain that the hash they are signing is indeed the data that they expected.

This tool allows users to manually verify that the 0x generated order hash they are signing with their private key is in fact the json conforming to the 0x order schema that they expected, and that it has not been tampered with by any malicious parties.

### Usage

![Alt text](/screenshot/img.png?raw=true "The verification tool")

1. Copy a 0x json order from Ethfinex exchange portal or other source (this should provided before request to sign with Metamask). This order format is human readable and fields accuracy should be checked.
2. Paste the order into the first box in the tool.
3. Copy the hash Metamask asks you to sign and paste into the second box.
4. Press verify to receive a confirmation that the hash is valid.
5. Sign using metamask.

### Longer term solutions

This tool is a short term solution to improve user security, but it is hoped that soon there will be more secure and user friendly alternatives: https://github.com/ethereum/EIPs/pull/712
