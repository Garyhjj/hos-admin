import Axios from 'axios'

const prefix = '/lookup/'

const files = {
    Mapping: prefix + 'map.xlsx'
}

export function getMapping () {
    return getLookup(files.Mapping)
}

export function getLookup (path) {
    return Axios.get(path, { responseType: 'blob' }).then(res => res.data)
}
