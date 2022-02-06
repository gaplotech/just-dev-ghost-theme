import 'prismjs'
import './plugin/normalize-whitespace'
import './plugin/toolbar'
import './plugin/autolinker'
import './plugin/linehighlight'
import '../ghostcards'
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

Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
  'remove-initial-line-feed': true,
  'tabs-to-spaces': 2
})

Prism.manual = true

export default Prism
