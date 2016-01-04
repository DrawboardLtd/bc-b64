if (!window) var window = {};
if (!window.atob) {
  var tableStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var table = tableStr.split('');

  window.atob = function (base64) {
    if (/(=[^=]+|={3,})$/.test(base64)) throw new Error('String contains an invalid character');
    base64 = base64.replace(/=/g, '');
    var n = base64.length & 3;
    if (n === 1) throw new Error('String contains an invalid character');
    for (var i = 0, j = 0, len = base64.length / 4, bin = []; i < len; ++i) {
      var a = tableStr.indexOf(base64[j++] || 'A');
      var b = tableStr.indexOf(base64[j++] || 'A');
      var c = tableStr.indexOf(base64[j++] || 'A');
      var d = tableStr.indexOf(base64[j++] || 'A');
      if ((a | b | c | d) < 0) throw new Error('String contains an invalid character');
      bin[bin.length] = ((a << 2) | (b >> 4)) & 255;
      bin[bin.length] = ((b << 4) | (c >> 2)) & 255;
      bin[bin.length] = ((c << 6) | d) & 255;
    }
    return String.fromCharCode.apply(null, bin).substr(0, bin.length + n - 4);
  };

  window.btoa = function (bin) {
    for (var i = 0, j = 0, len = bin.length / 3, base64 = []; i < len; ++i) {
      var a = bin.charCodeAt(j++);
      var b = bin.charCodeAt(j++);
      var c = bin.charCodeAt(j++);
      if ((a | b | c) > 255) throw new Error('String contains an invalid character');
      base64[base64.length] = table[a >> 2] + table[((a << 4) & 63) | (b >> 4)] +
                              (isNaN(b) ? '=' : table[((b << 2) & 63) | (c >> 6)]) +
                              (isNaN(b + c) ? '=' : table[c & 63]);
    }
    return base64.join('');
  };
}

var h2b = (str) => {
  return window.btoa(
    String.fromCharCode.apply(
      null,
      str.replace(/\r|\n/g, '').replace(/([\da-fA-F]{2}) ?/g, '0x$1 ').replace(/ +$/, '').split(' ')
    )
  ).replace(/\=\=/g, '');
}

var b2h = (str) => {
  for (var i = 0, bin = window.atob(str.replace(/[ \r\n]+$/, '')), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = '0' + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join(' ');
}

var dh2b = (hex) => {
  hex = hex.replace(/\-/g, '').match(/.{1,2}/g).join(' '); // fix hex formatting before conversion
  return h2b(hex).replace(/\=\=/g, '').replace(/\//g, '-'); // convert to b64, tweak b64 formatting for use in a URL
}

var b2dh = (b64) => {
  b64 = b64.replace(/\-/g, '/');
  var spacedHex = b2h(b64).split(' ');
  spacedHex.splice(10, 0, '-');
  spacedHex.splice(8, 0, '-');
  spacedHex.splice(6, 0, '-');
  spacedHex.splice(4, 0, '-');
  return spacedHex.join('');
}

var h2dh = (str) => {
  str = normalizeHex(str)
  var spacedHex = str.split(' ');
  spacedHex.splice(10, 0, '-');
  spacedHex.splice(8, 0, '-');
  spacedHex.splice(6, 0, '-');
  spacedHex.splice(4, 0, '-');
  return spacedHex.join('');
}

var normalizeHex = (str) => {
  return str
    .replace(/\-/g, '')
    .replace(/\ /g, '')
    .replace(/\r|\n/g, '')
    .replace(/([\da-fA-F]{2}) ?/g, '$1 ')
    .replace(/ +$/, '')
}

var normalizeB64 = (str) => {
  return str.replace(/\=/g, '').replace(/\-/g, '/')
}

var hexToPanObj = (str) => {
  return {
    hex: str.replace(/\ /g, ''),
    dhex: h2dh(str),
    b64Url: h2b(str).replace(/\//g, '-')
  }
}

var fromHex = (str) => {
  return hexToPanObj(normalizeHex(str))
}

var fromB64 = (str) => {
  return fromHex(b2h(normalizeB64(str)))
}

export var Bc64 = {
  h2b: (str) => {
    console.warn('`h2b` is deprecated as a public method of base64Service. See `fromHex` instead.')
    return h2b(str)
  },
  b2h: (str) => {
    console.warn('`b2h` is deprecated as a public method of base64Service. See `fromB64` instead.')
    return b2h(str)
  },
  dh2b: (str) => {
    console.warn('`dh2b` is deprecated as a public method of base64Service. See `fromHex` instead.')
    return dh2b(str)
  },
  b2dh: (str) => {
    console.warn('`b2dh` is deprecated as a public method of base64Service. See `fromB64` instead.')
    return b2dh(str)
  },
  fromHex,
  fromB64,
}
