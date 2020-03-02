import 'prismjs'
import './plugin/toolbar'
import './plugin/autolinker'
import './plugin/linenumber'
import './plugin/linehighlight'
import './lang/bash'
import './lang/docker'
import './lang/git'
import './lang/java'
import './lang/javascript'
import './lang/json'
import './lang/jsx'
import './lang/kotlin'
import './lang/sql'
import './lang/swift'
import './lang/typescript'
import './lang/scala'

requestAnimationFrame(() => {
  Prism.highlightAll(true)
})
