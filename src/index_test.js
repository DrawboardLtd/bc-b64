import { fromHex, fromB64 } from "./index"
import { equal } from "assert"
var testData = [
  {dhex: '1c76ca36-320a-472f-b8b9-2ceb26b6a041', hex: '1c76ca36320a472fb8b92ceb26b6a041', hexs: '1c 76 ca 36 32 0a 47 2f b8 b9 2c eb 26 b6 a0 41', b64: 'HHbKNjIKRy+4uSzrJragQQ', b64Url: 'HHbKNjIKRy+4uSzrJragQQ'},
  {dhex: '4d26231b-399b-4efd-a4f7-920213a04f6c', hex: '4d26231b399b4efda4f7920213a04f6c', hexs: '4d 26 23 1b 39 9b 4e fd a4 f7 92 02 13 a0 4f 6c', b64: 'TSYjGzmbTv2k95ICE6BPbA', b64Url: 'TSYjGzmbTv2k95ICE6BPbA'},
  {dhex: '36bd108b-f65a-4853-9cd8-3c7dbb40cfd5', hex: '36bd108bf65a48539cd83c7dbb40cfd5', hexs: '36 bd 10 8b f6 5a 48 53 9c d8 3c 7d bb 40 cf d5', b64: 'Nr0Qi/ZaSFOc2Dx9u0DP1Q', b64Url: 'Nr0Qi-ZaSFOc2Dx9u0DP1Q'},
]
describe("index", () => {
  describe("#Bc64", () => {
    describe("fromHex", () => {
      function doTest (data) {
        // provide hex : expect hex, dhex, b64Url
        it(`fromHex(${data.hex}).hex => ${data.hex}`, () => {
          equal(fromHex(data.hex).hex, data.hex)
        })
        it(`fromHex(${data.hex}).dhex => ${data.dhex}`, () => {
          equal(fromHex(data.hex).dhex, data.dhex)
        })
        it(`fromHex(${data.hex}).b64Url => ${data.b64Url}`, () => {
          equal(fromHex(data.hex).b64Url, data.b64Url)
        })

        // provide dhex : expect hex, dhex, b64Url
        it(`fromHex(${data.dhex}).hex => ${data.hex}`, () => {
          equal(fromHex(data.dhex).hex, data.hex)
        })
        it(`fromHex(${data.dhex}).dhex => ${data.dhex}`, () => {
          equal(fromHex(data.dhex).dhex, data.dhex)
        })
        it(`fromHex(${data.dhex}).b64Url => ${data.b64Url}`, () => {
          equal(fromHex(data.dhex).b64Url, data.b64Url)
        })

        // provide hexs : expect hex, dhex, b64Url
        it(`fromHex(${data.hexs}).hex => ${data.hex}`, () => {
          equal(fromHex(data.hexs).hex, data.hex)
        })
        it(`fromHex(${data.hexs}).dhex => ${data.dhex}`, () => {
          equal(fromHex(data.hexs).dhex, data.dhex)
        })
        it(`fromHex(${data.hexs}).b64Url => ${data.b64Url}`, () => {
          equal(fromHex(data.hexs).b64Url, data.b64Url)
        })
      }
      testData.forEach(doTest)
    })
    describe("fromB64", () => {
      function doTest (data) {
        // provide b64 : expect hex, dhex, b64Url
        it(`fromB64(${data.b64}).hex => ${data.hex}`, () => {
          equal(fromB64(data.b64).hex, data.hex)
        })
        it(`fromB64(${data.b64}).dhex => ${data.dhex}`, () => {
          equal(fromB64(data.b64).dhex, data.dhex)
        })
        it(`fromB64(${data.b64}).b64Url => ${data.b64Url}`, () => {
          equal(fromB64(data.b64).b64Url, data.b64Url)
        })

        // provide b64Url : expect hex, dhex, b64Url
        it(`fromB64(${data.b64Url}).hex => ${data.hex}`, () => {
          equal(fromB64(data.b64Url).hex, data.hex)
        })
        it(`fromB64(${data.b64Url}).dhex => ${data.dhex}`, () => {
          equal(fromB64(data.b64Url).dhex, data.dhex)
        })
        it(`fromB64(${data.b64Url}).b64Url => ${data.b64Url}`, () => {
          equal(fromB64(data.b64Url).b64Url, data.b64Url)
        })

        // provide b64+'==' : expect hex, dhex, b64Url
        it(`fromB64(${data.b64}==).hex => ${data.hex}`, () => {
          equal(fromB64(data.b64+'==').hex, data.hex)
        })
        it(`fromB64(${data.b64}==).dhex => ${data.dhex}`, () => {
          equal(fromB64(data.b64+'==').dhex, data.dhex)
        })
        it(`fromB64(${data.b64}==).b64Url => ${data.b64Url}`, () => {
          equal(fromB64(data.b64+'==').b64Url, data.b64Url)
        })
      }
      testData.forEach(doTest)
    })
  })
})
