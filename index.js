module.exports = class Dialed {

  constructor(fn, ...assertions) {
    this.fn = fn
    this.assertions = assertions
    this.many = assertions.length
    this.failures = {
      messages: [],
      count: 0
    }
    this.colors = {red: '\x1b[31m', green: '\x1b[32m', res: '\x1b[0m'}
    this.run()
  }

  run() {
    for (let assertion of this.assertions) {
      try {
        let result = this.fn(...assertion.args)
        console.assert(
          result == assertion.expected,
          `${this.fn.name}(${assertion.args.join(', ')
          }) produced ${this.colors.red + result +
          this.colors.res}, expected ${this.colors.green
          + assertion.expected + this.colors.res}`
        )
      } catch (err) {
        this.failures.messages.push(err.message)
        this.failures.count++
      }
    }
    if (this.failures.count == 0)
      console.log(`🎄 🎁 All ${this.many} tests for ${
        this.fn.name}() ${this.colors.green}PASSED${
        this.colors.res}!`)
    else {
      console.error(`🌩 ${this.failures.count} of ${this.many
        } tests ${this.colors.red}FAILED${this.colors.res}`)
      
      for (let [i, message] of this.failures.messages.entries()) {
        console.error(`${i+1}:`, message)
      }
    }
  } // run()

  static assert(expected, ...args) {
    // return an object that represents an assertion
    return {
      args: args,
      expected: expected
    }
  } // assert()

} // Dialed class