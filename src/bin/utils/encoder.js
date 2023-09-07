const objectToList = (obj)=>  {
    const list = []
    for( let k in obj) {
        list.push(k)
        list.push(obj[k])
    }
    return list
}

module.exports = { objectToList }