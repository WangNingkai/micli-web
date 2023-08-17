export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
export const trim = (str: string, charlist: any) => {
  let whitespace = [
    ' ',
    '\n',
    '\r',
    '\t',
    '\f',
    '\x0b',
    '\xa0',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200a',
    '\u200b',
    '\u2028',
    '\u2029',
    '\u3000',
  ].join('')
  let l = 0
  let i = 0
  str += ''
  if (charlist) {
    whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
  }
  l = str.length
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i)
      break
    }
  }
  l = str.length
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1)
      break
    }
  }
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}

export const rtrim = (str: string, charlist: any) => {
  charlist = !charlist
    ? ' \\s\u00A0'
    : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '\\$1')
  const re = new RegExp('[' + charlist + ']+$', 'g')
  return (str + '').replace(re, '')
}

export const ltrim = (str: string, charlist: any) => {
  charlist = !charlist
    ? ' \\s\u00A0'
    : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
  const re = new RegExp('^[' + charlist + ']+', 'g')
  return (str + '').replace(re, '')
}
