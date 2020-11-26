import * as XLSX from 'xlsx'

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function readExcel (file) {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        /* read workbook */
        const bstr = e.target.result
        let res
        try {
          const wb = XLSX.read(bstr, { type: 'binary' })
          /* grab first sheet */
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          /* save data */
          res = XLSX.utils.sheet_to_json(ws, {
            header: 1,
            defval: ''
          })
        } catch (e) {
          reject(e)
        }
        if (!res) {
          return
        }
        if (res.length < 2) {
          resolve([])
        } else {
          resolve(res)
        }
      }
      reader.readAsBinaryString(file)
    }
  })
}

export function toExcel (
  name,
  header,
  data
) {
  data.unshift(header)
  const ws = XLSX.utils.aoa_to_sheet(data)

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  XLSX.writeFile(wb, `${name}.xlsx`)
}
