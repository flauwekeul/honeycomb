declare const Benchmark: any

export const createSuite = () => {
  const suite = new Benchmark.Suite()
  const runButton = document.createElement('button')

  suite.on('start', function () {
    console.clear()
  })
  suite.on('cycle', function (event) {
    console.log(`${event.target}`)
  })
  suite.on('complete', function () {
    console.log(`Fastest: ${this.filter('fastest').map('name')}`)
  })

  runButton.type = 'button'
  runButton.innerHTML = 'Run benchmark'
  runButton.style.margin = '20px 0'
  runButton.addEventListener('click', () => {
    runButton.disabled = true
    runButton.innerHTML = 'Running benchmark…'
    suite.run({ async: true })
    suite.on('complete', function () {
      runButton.disabled = false
      runButton.innerHTML = 'Run benchmark'
    })
  })
  document.body.prepend(runButton)

  return suite
}
