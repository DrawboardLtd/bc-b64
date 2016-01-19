import { fromHex, fromB64 } from "./index"
import { equal } from "assert"
var testData = [
  {
    dhex:   '1c76ca36-320a-472f-b8b9-2ceb26b6a041',
    hex:    '1c76ca36320a472fb8b92ceb26b6a041',
    hexs:   '1c 76 ca 36 32 0a 47 2f b8 b9 2c eb 26 b6 a0 41',
    b64:    'HHbKNjIKRy+4uSzrJragQQ',
    b64Url: 'HHbKNjIKRy+4uSzrJragQQ'
  }, {
    dhex:   '4d26231b-399b-4efd-a4f7-920213a04f6c',
    hex:    '4d26231b399b4efda4f7920213a04f6c',
    hexs:   '4d 26 23 1b 39 9b 4e fd a4 f7 92 02 13 a0 4f 6c',
    b64:    'TSYjGzmbTv2k95ICE6BPbA',
    b64Url: 'TSYjGzmbTv2k95ICE6BPbA'
  }, {
    dhex:   '36bd108b-f65a-4853-9cd8-3c7dbb40cfd5',
    hex:    '36bd108bf65a48539cd83c7dbb40cfd5',
    hexs:   '36 bd 10 8b f6 5a 48 53 9c d8 3c 7d bb 40 cf d5',
    b64:    'Nr0Qi/ZaSFOc2Dx9u0DP1Q',
    b64Url: 'Nr0Qi-ZaSFOc2Dx9u0DP1Q'
  }, {
    dhex:   'e29a2862-58be-5441-4386-73e35d982954da4fb7c4960cd0aecfe4c0804228f281',
    hex:    'e29a286258be5441438673e35d982954da4fb7c4960cd0aecfe4c0804228f281',
    hexs:   'e2 9a 28 62 58 be 54 41 43 86 73 e3 5d 98 29 54 da 4f b7 c4 96 0c d0 ae cf e4 c0 80 42 28 f2 81',
    b64:    '4pooYli+VEFDhnPjXZgpVNpPt8SWDNCuz+TAgEIo8oE',
    b64Url: '4pooYli+VEFDhnPjXZgpVNpPt8SWDNCuz+TAgEIo8oE'
  }, {
    dhex:   'e29a2862-58be-5441-4386-73e35d982954da4fb7c4960cd0aecff4c0804228f281',
    hex:    'e29a286258be5441438673e35d982954da4fb7c4960cd0aecff4c0804228f281',
    hexs:   'e2 9a 28 62 58 be 54 41 43 86 73 e3 5d 98 29 54 da 4f b7 c4 96 0c d0 ae cf f4 c0 80 42 28 f2 81',
    b64:    '4pooYli+VEFDhnPjXZgpVNpPt8SWDNCuz/TAgEIo8oE',
    b64Url: '4pooYli+VEFDhnPjXZgpVNpPt8SWDNCuz-TAgEIo8oE'
  },
]
describe("index", () => {
  describe("#Bc64", () => {
    describe("fromHex", () => {
      function doTest (data) {
        // provide hex : expect hex, dhex, b64Url
        it(`fromHex(hex).hex}`, () => {
          equal(fromHex(data.hex).hex, data.hex)
        })
        it(`fromHex(hex).dhex`, () => {
          equal(fromHex(data.hex).dhex, data.dhex)
        })
        it(`fromHex(hex).b64Url`, () => {
          equal(fromHex(data.hex).b64Url, data.b64Url)
        })

        // provide dhex : expect hex, dhex, b64Url
        it(`fromHex(dhex).hex`, () => {
          equal(fromHex(data.dhex).hex, data.hex)
        })
        it(`fromHex(dhex).dhex`, () => {
          equal(fromHex(data.dhex).dhex, data.dhex)
        })
        it(`fromHex(dhex).b64Url`, () => {
          equal(fromHex(data.dhex).b64Url, data.b64Url)
        })

        // provide hexs : expect hex, dhex, b64Url
        it(`fromHex(hexs).hex`, () => {
          equal(fromHex(data.hexs).hex, data.hex)
        })
        it(`fromHex(hexs).dhex`, () => {
          equal(fromHex(data.hexs).dhex, data.dhex)
        })
        it(`fromHex(hexs).b64Url`, () => {
          equal(fromHex(data.hexs).b64Url, data.b64Url)
        })
      }
      testData.forEach(doTest)
    })
    describe("fromB64", () => {
      function doTest (data) {
        // provide b64 : expect hex, dhex, b64Url
        it(`fromB64(b64).hex`, () => {
          equal(fromB64(data.b64).hex, data.hex)
        })
        it(`fromB64(b64).dhex`, () => {
          equal(fromB64(data.b64).dhex, data.dhex)
        })
        it(`fromB64(b64).b64Url`, () => {
          equal(fromB64(data.b64).b64Url, data.b64Url)
        })

        // provide b64Url : expect hex, dhex, b64Url
        it(`fromB64(b64Url).hex`, () => {
          equal(fromB64(data.b64Url).hex, data.hex)
        })
        it(`fromB64(b64Url).dhex`, () => {
          equal(fromB64(data.b64Url).dhex, data.dhex)
        })
        it(`fromB64(b64Url).b64Url`, () => {
          equal(fromB64(data.b64Url).b64Url, data.b64Url)
        })

        // provide b64+'==' : expect hex, dhex, b64Url
        it(`fromB64(b64+'==').hex`, () => {
          equal(fromB64(data.b64+'==').hex, data.hex)
        })
        it(`fromB64(b64+'==').dhex`, () => {
          equal(fromB64(data.b64+'==').dhex, data.dhex)
        })
        it(`fromB64(b64+'==').b64Url`, () => {
          equal(fromB64(data.b64+'==').b64Url, data.b64Url)
        })
      }
      testData.forEach(doTest)
    })
  })
})
