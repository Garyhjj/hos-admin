import {
  CHILD_MAPPING
} from '@/store/mutation-types'
import {
  getMapping
} from '@/api/lookup'
import {
  readExcel
} from '@/utils/util'

const child = {
  state: {
    mapping: null
  },
  mutations: {
    [CHILD_MAPPING]: (state, val) => {
      state.mapping = val
    }
  },
  actions: {
    getMapping ({
      commit
    }) {
      return getMapping().then(d => readExcel(d)).then(res => {
        if (Array.isArray(res)) {
          const mapping = {}
          const props = res.shift().map(p => trim(p))
          res.forEach(l => {
            if (Array.isArray(l)) {
              l.forEach((r, idx) => {
                const p = props[idx]
                if (p) {
                  (mapping[p] = mapping[p] || []).push(trim(r))
                }
              })
            }
          })
          if (Object.keys(mapping).length > 0) {
            commit(CHILD_MAPPING, mapping)
            return mapping
          }
        }
        return null
      })
    }
  }
}

function trim (s) {
    return typeof s === 'string' ? s.trim() : s
}

export default child
