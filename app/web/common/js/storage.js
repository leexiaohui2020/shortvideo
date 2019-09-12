class Storage {
  constructor(name) {
    this.name = name
    try {
      this.cache = JSON.parse(localStorage[name])
    } catch (e) {
      this.cache = {}
    }
  }

  getItem(name, value) {
    if (name in this.cache) return this.cache[name]
    return value
  }

  setItem(name, value) {
    this.cache[name] = value
    this._save()
  }

  rmvItem(name) {
    delete this.cache[name]
    this._save()
  }

  _save() {
    localStorage[this.name] = JSON.stringify(this.cache)
  }
}

export default EASY_ENV_IS_BROWSER ? new Storage(location.origin) : null
