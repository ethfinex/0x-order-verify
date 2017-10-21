### 0x order verification tool

Users of the 0x protocol (0xproject.com) are required to sign 'order hashes' in their browser. This may be using metamask for example. It is currently difficult for user's to be certain that the hash they are signing is indeed the data that they expected.

This tool allows users to manually verify that the 0x generated order hash they are signing with their private key is in fact the json conforming to the 0x order schema that they expected, and that it has not been tampered with by any malicious parties.

### Usage

![Alt text](/screenshot/img.jpg?raw=true "The verification tool")

Copy a provided, human readable, 0x json order into the first box, and the hash proposed to be signed into the second text box.

Press verify to receive a confirmation that the hash is valid.

### Longer term solutions

This tool is a short term solution to improve user security, but it is hoped that soon there will be more secure and user friendly alternatives: https://github.com/ethereum/EIPs/pull/712
