[ ![Codeship Status for DrawboardLtd/bc-maybe](https://codeship.com/projects/e9cd5800-91a6-0133-050f-4e9fb4b2d645/status?branch=master)](https://codeship.com/projects/124648)

bc-64 provides methods to translate base64 strings to hexadecimal (and back).

# Install

```
npm install --save bc-64
```

# Import

If using es2015 `import`:
```javascript
import Bc64 from 'bc-64'
```

Otherwise, include `node_modules/bc-64/dist/bc-64.min.js` in your project using your method of choice, and it'll be available on the global variable `Bc64`.

# Usage

Main methods are `fromHex` and `fromB64`. Each returns an object with the following properties:

* hex: hexadecimal with no white space or dashes
* dhex: hexadecimal formatted with dashes like 8-4-4-12 e.g. `1c76ca36-320a-472f-b8b9-2ceb26b6a041`
* b64Url: url-friendly base64 (`==` removed, and `/` replaced with `-`)

```javascript
Bc64.fromHex('36bd108b-f65a-4853-9cd8-3c7dbb40cfd5')
// or
Bc64.fromHex('36 bd 10 8b f6 5a 48 53 9c d8 3c 7d bb 40 cf d5')
// or
Bc64.fromHex('36bd108bf65a48539cd83c7dbb40cfd5')
// or
Bc64.fromB64('Nr0Qi/ZaSFOc2Dx9u0DP1Q')
// or
Bc64.fromB64('Nr0Qi/ZaSFOc2Dx9u0DP1Q==')
// or
Bc64.fromB64('Nr0Qi-ZaSFOc2Dx9u0DP1Q')
```

all of which return:
```javascript
{
  hex: '36bd108bf65a48539cd83c7dbb40cfd5',
  dhex: '36bd108b-f65a-4853-9cd8-3c7dbb40cfd5',
  b64Url: 'Nr0Qi-ZaSFOc2Dx9u0DP1Q'
}
```
