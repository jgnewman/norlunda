'į̄'

module.exports = (word) => {
  return word
    .replace(/ą̄/g, 'ā')  
    .replace(/į̄/g, 'į')
    .replace(/į̄/g, 'į') // This is not the same character as the above long, nasal i
    .replace(/ǫ̂/g, 'ǭ')
    .replace(/ų̄/g, 'ų')
}