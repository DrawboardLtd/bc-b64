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

var _h2b = (str) => {
  return window.btoa(
    String.fromCharCode.apply(
      null,
      str.replace(/\r|\n/g, '').replace(/([\da-fA-F]{2}) ?/g, '0x$1 ').replace(/ +$/, '').split(' ')
    )
  ).replace(/\=/g, '');
}

var _b2h = (str) => {
  for (var i = 0, bin = window.atob(str.replace(/[ \r\n]+$/, '')), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = '0' + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join(' ');
}

var _h2dh = (str) => {
  str = _normalizeHex(str)
  var spacedHex = str.split(' ');
  spacedHex.splice(10, 0, '-');
  spacedHex.splice(8, 0, '-');
  spacedHex.splice(6, 0, '-');
  spacedHex.splice(4, 0, '-');
  return spacedHex.join('');
}

var _normalizeHex = (str) => {
  return str
    .replace(/\-/g, '')
    .replace(/\ /g, '')
    .replace(/\r|\n/g, '')
    .replace(/([\da-fA-F]{2}) ?/g, '$1 ')
    .replace(/ +$/, '')
}

var _normalizeB64 = (str) => {
  return str.replace(/\=/g, '').replace(/\-/g, '/')
}

var _hexToPanObj = (str) => {
  return {
    hex: str.replace(/\ /g, ''),
    dhex: _h2dh(str),
    b64Url: _h2b(str).replace(/\//g, '-')
  }
}

export var fromHex = (str) => {
  return _hexToPanObj(_normalizeHex(str))
}

export var fromB64 = (str) => {
  return fromHex(_b2h(_normalizeB64(str)))
}
