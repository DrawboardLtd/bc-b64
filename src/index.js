if (!window) var window = {}
if (!window.atob) {
  var tableStr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`
  var table = tableStr.split(``)

  window.atob = base64 => {
    if (/(=[^=]+|={3,})$/.test(base64)) throw new Error(`String contains an invalid character`)
    base64 = base64.replace(/=/g, ``)
    let n = base64.length & 3
    if (n === 1) throw new Error(`String contains an invalid character`)
    for (var i = 0, j = 0, len = base64.length / 4, bin = []; i < len; ++i) {
      const a = tableStr.indexOf(base64[j++] || `A`)
      const b = tableStr.indexOf(base64[j++] || `A`)
      const c = tableStr.indexOf(base64[j++] || `A`)
      const d = tableStr.indexOf(base64[j++] || `A`)
      if ((a | b | c | d) < 0) throw new Error(`String contains an invalid character`)
      bin[bin.length] = ((a << 2) | (b >> 4)) & 255
      bin[bin.length] = ((b << 4) | (c >> 2)) & 255
      bin[bin.length] = ((c << 6) | d) & 255
    }
    return String.fromCharCode.apply(null, bin).substr(0, bin.length + n - 4)
  }

  window.btoa = bin => {
    for (var i = 0, j = 0, len = bin.length / 3, base64 = []; i < len; ++i) {
      const a = bin.charCodeAt(j++)
      const b = bin.charCodeAt(j++)
      const c = bin.charCodeAt(j++)
      if ((a | b | c) > 255) throw new Error(`String contains an invalid character`)
      base64[base64.length] = table[a >> 2] + table[((a << 4) & 63) | (b >> 4)] +
                              (isNaN(b) ? `=` : table[((b << 2) & 63) | (c >> 6)]) +
                              (isNaN(b + c) ? `=` : table[c & 63])
    }
    return base64.join(``)
  }
}

const h2b = str => {
  return window.btoa(
    String.fromCharCode.apply(
      null,
      str.replace(/\r|\n/g, ``).replace(/([\da-fA-F]{2}) ?/g, `0x$1 `).replace(/ +$/, ``).split(` `)
    )
  ).replace(/\=/g, ``)
}

const b2h = str => {
  for (var i = 0, bin = window.atob(str.replace(/[ \r\n]+$/, ``)), hex = []; i < bin.length; ++i) {
    let tmp = bin.charCodeAt(i).toString(16)
    if (tmp.length === 1) tmp = `0${ tmp }`
    hex[hex.length] = tmp
  }
  return hex.join(` `)
}

const h2dh = str => {
  let spacedHex = normalizeHex(str).split(` `)

  spacedHex.splice(10, 0, `-`)
  spacedHex.splice(8, 0, `-`)
  spacedHex.splice(6, 0, `-`)
  spacedHex.splice(4, 0, `-`)

  return spacedHex.join(``)
}

const normalizeHex = str =>
  str
    .replace(/\-/g, ``)
    .replace(/\ /g, ``)
    .replace(/\r|\n/g, ``)
    .replace(/([\da-fA-F]{2}) ?/g, `$1 `)
    .replace(/ +$/, ``)

const normalizeB64 = str =>
  str.replace(/\=/g, ``).replace(/\-/g, `/`)

const hexToPanObj = str => ({
  hex   :str.replace(/\ /g, ``),
  dhex  :h2dh(str),
  b64Url:h2b(str).replace(/\//g, `-`),
})

export const fromHex = str =>
  hexToPanObj(normalizeHex(str))

export const fromB64 = str =>
 fromHex(b2h(normalizeB64(str)))
