/* eslint-disable @typescript-eslint/no-unused-vars */

import './App.css'
import ExampleOfUse from './features/use'
import ExampleOfUseActionState from './features/useActionState'
import ExampleOfUseTransition from './features/useTransition'

function App() {

  return (
    <main>
     <h1>React 19 is here! 🎊</h1>
      {/* <ExampleOfUse /> */}
      {/* <ExampleOfUseTransition /> */}
      <ExampleOfUseActionState />
    </main>
  )
}

export default App
