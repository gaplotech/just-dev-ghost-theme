;(function() {
  if (typeof self === 'undefined' || !self.Prism || !self.document) {
    return
  }

  var callbacks = []
  var map = {}
  var noop = function() {}

  Prism.plugins.toolbar = {}

  /**
   * @typedef ButtonOptions
   * @property {string} text The text displayed.
   * @property {string} [url] The URL of the link which will be created.
   * @property {Function} [onClick] The event listener for the `click` event of the created button.
   * @property {string} [className] The class attribute to include with element.
   */

  /**
   * Register a button callback with the toolbar.
   *
   * @param {string} key
   * @param {ButtonOptions|Function} opts
   */
  var registerButton = (Prism.plugins.toolbar.registerButton = function(key, opts) {
    var callback

    if (typeof opts === 'function') {
      callback = opts
    } else {
      callback = function(env) {
        var element

        if (typeof opts.onClick === 'function') {
          element = document.createElement('button')
          element.type = 'button'
          element.addEventListener('click', function() {
            opts.onClick.call(this, env)
          })
        } else if (typeof opts.url === 'string') {
          element = document.createElement('a')
          element.href = opts.url
        } else {
          element = document.createElement('span')
        }

        if (opts.className) {
          element.classList.add(opts.className)
        }

        element.textContent = opts.text

        return element
      }
    }

    if (key in map) {
      console.warn('There is a button with the key "' + key + '" registered already.')
      return
    }

    callbacks.push((map[key] = callback))
  })

  /**
   * Post-highlight Prism hook callback.
   *
   * @param env
   */
  var hook = (Prism.plugins.toolbar.hook = function(env) {
    // Check if inline or actual code block (credit to line-numbers plugin)
    var pre = env.element.parentNode
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return
    }

    // Autoloader rehighlights, so only do this once.
    if (pre.parentNode.classList.contains('code-toolbar')) {
      return
    }

    // Create wrapper for <pre> to prevent scrolling toolbar with content
    var wrapper = document.createElement('div')
    wrapper.classList.add('code-toolbar')
    pre.parentNode.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    // Setup the toolbar
    var toolbar = document.createElement('div')
    toolbar.classList.add('toolbar')

    if (document.body.hasAttribute('data-toolbar-order')) {
      callbacks = document.body
        .getAttribute('data-toolbar-order')
        .split(',')
        .map(function(key) {
          return map[key] || noop
        })
    }

    callbacks.forEach(function(callback) {
      var element = callback(env)

      if (!element) {
        return
      }

      var item = document.createElement('div')
      item.classList.add('toolbar-item')

      item.appendChild(element)
      toolbar.appendChild(item)
    })

    // Add our toolbar to the currently created wrapper of <pre> tag
    wrapper.appendChild(toolbar)
  })

  registerButton('label', function(env) {
    var pre = env.element.parentNode
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return
    }

    if (!pre.hasAttribute('data-label')) {
      return
    }

    var element, template
    var text = pre.getAttribute('data-label')
    try {
      // Any normal text will blow up this selector.
      template = document.querySelector('template#' + text)
    } catch (e) {}

    if (template) {
      element = template.content
    } else {
      if (pre.hasAttribute('data-url')) {
        element = document.createElement('a')
        element.href = pre.getAttribute('data-url')
      } else {
        element = document.createElement('span')
      }

      element.textContent = text
    }

    return element
  })

  /**
   * Register the toolbar with Prism.
   */
  Prism.hooks.add('complete', hook)
})()
;(function() {
  if (typeof self === 'undefined' || !self.Prism || !self.document) {
    return
  }

  if (!Prism.plugins.toolbar) {
    console.warn('Show Languages plugin loaded before Toolbar plugin.')

    return
  }
  var languages = {
    html: 'HTML',
    xml: 'XML',
    svg: 'SVG',
    mathml: 'MathML',
    css: 'CSS',
    clike: 'C-like',
    js: 'JavaScript',
    abap: 'ABAP',
    abnf: 'Augmented Backus–Naur form',
    antlr4: 'ANTLR4',
    g4: 'ANTLR4',
    apacheconf: 'Apache Configuration',
    apl: 'APL',
    aql: 'AQL',
    arff: 'ARFF',
    asciidoc: 'AsciiDoc',
    adoc: 'AsciiDoc',
    asm6502: '6502 Assembly',
    aspnet: 'ASP.NET (C#)',
    autohotkey: 'AutoHotkey',
    autoit: 'AutoIt',
    shell: 'Bash',
    basic: 'BASIC',
    bbcode: 'BBcode',
    bnf: 'Backus–Naur form',
    rbnf: 'Routing Backus–Naur form',
    conc: 'Concurnas',
    csharp: 'C#',
    cs: 'C#',
    dotnet: 'C#',
    cpp: 'C++',
    cil: 'CIL',
    coffee: 'CoffeeScript',
    cmake: 'CMake',
    csp: 'Content-Security-Policy',
    'css-extras': 'CSS Extras',
    django: 'Django/Jinja2',
    jinja2: 'Django/Jinja2',
    'dns-zone-file': 'DNS zone file',
    'dns-zone': 'DNS zone file',
    dockerfile: 'Docker',
    ebnf: 'Extended Backus–Naur form',
    ejs: 'EJS',
    etlua: 'Embedded Lua templating',
    erb: 'ERB',
    fsharp: 'F#',
    'firestore-security-rules': 'Firestore security rules',
    ftl: 'FreeMarker Template Language',
    gcode: 'G-code',
    gdscript: 'GDScript',
    gedcom: 'GEDCOM',
    glsl: 'GLSL',
    gml: 'GameMaker Language',
    gamemakerlanguage: 'GameMaker Language',
    graphql: 'GraphQL',
    hs: 'Haskell',
    hcl: 'HCL',
    http: 'HTTP',
    hpkp: 'HTTP Public-Key-Pins',
    hsts: 'HTTP Strict-Transport-Security',
    ichigojam: 'IchigoJam',
    inform7: 'Inform 7',
    javadoc: 'JavaDoc',
    javadoclike: 'JavaDoc-like',
    javastacktrace: 'Java stack trace',
    jq: 'JQ',
    jsdoc: 'JSDoc',
    'js-extras': 'JS Extras',
    'js-templates': 'JS Templates',
    json: 'JSON',
    jsonp: 'JSONP',
    json5: 'JSON5',
    latex: 'LaTeX',
    tex: 'TeX',
    context: 'ConTeXt',
    lilypond: 'LilyPond',
    ly: 'LilyPond',
    emacs: 'Lisp',
    elisp: 'Lisp',
    'emacs-lisp': 'Lisp',
    lolcode: 'LOLCODE',
    md: 'Markdown',
    'markup-templating': 'Markup templating',
    matlab: 'MATLAB',
    mel: 'MEL',
    moon: 'MoonScript',
    n1ql: 'N1QL',
    n4js: 'N4JS',
    n4jsd: 'N4JS',
    'nand2tetris-hdl': 'Nand To Tetris HDL',
    nasm: 'NASM',
    neon: 'NEON',
    nginx: 'nginx',
    nsis: 'NSIS',
    objectivec: 'Objective-C',
    ocaml: 'OCaml',
    opencl: 'OpenCL',
    parigp: 'PARI/GP',
    objectpascal: 'Object Pascal',
    pcaxis: 'PC-Axis',
    px: 'PC-Axis',
    php: 'PHP',
    phpdoc: 'PHPDoc',
    'php-extras': 'PHP Extras',
    plsql: 'PL/SQL',
    powershell: 'PowerShell',
    properties: '.properties',
    protobuf: 'Protocol Buffers',
    py: 'Python',
    q: 'Q (kdb+ database)',
    qml: 'QML',
    jsx: 'React JSX',
    tsx: 'React TSX',
    renpy: "Ren'py",
    rest: 'reST (reStructuredText)',
    robotframework: 'Robot Framework',
    robot: 'Robot Framework',
    rb: 'Ruby',
    sas: 'SAS',
    sass: 'Sass (Sass)',
    scss: 'Sass (Scss)',
    'shell-session': 'Shell session',
    solidity: 'Solidity (Ethereum)',
    'solution-file': 'Solution file',
    sln: 'Solution file',
    soy: 'Soy (Closure Template)',
    sparql: 'SPARQL',
    rq: 'SPARQL',
    'splunk-spl': 'Splunk SPL',
    sqf: 'SQF: Status Quo Function (Arma 3)',
    sql: 'SQL',
    tap: 'TAP',
    toml: 'TOML',
    tt2: 'Template Toolkit 2',
    trig: 'TriG',
    ts: 'TypeScript',
    't4-cs': 'T4 Text Templates (C#)',
    t4: 'T4 Text Templates (C#)',
    't4-vb': 'T4 Text Templates (VB)',
    't4-templating': 'T4 templating',
    vbnet: 'VB.Net',
    vhdl: 'VHDL',
    vim: 'vim',
    'visual-basic': 'Visual Basic',
    vb: 'Visual Basic',
    wasm: 'WebAssembly',
    wiki: 'Wiki markup',
    xeoracube: 'XeoraCube',
    xojo: 'Xojo (REALbasic)',
    xquery: 'XQuery',
    yaml: 'YAML',
    yml: 'YAML'
  }

  var fileExtensionMap = {
    html: '.html',
    xml: '.xml',
    svg: '.svg',
    css: '.css',
    js: '.js',
    javascript: '.js',
    shell: '.sh',
    graphql: '.graphql',
    json: '.json',
    md: '.md',
    objectivec: '.objc',
    php: '.php',
    protobuf: '.protobuf',
    py: '.py',
    jsx: '.jsx',
    tsx: '.tsx',
    rb: '.rb',
    sass: '.sass',
    scss: '.scss',
    sql: '.sql',
    toml: '.toml',
    yaml: '.yaml',
    yml: '.yml',
    kotlin: '.kt',
    java: '.java'
  }

  Prism.plugins.toolbar.registerButton('show-language', function(env) {
    var pre = env.element.parentNode
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return
    }

    var language = languages[env.language] || env.language

    if (!language) {
      return
    }
    var element = document.createElement('h4')
    const title = language
    element.textContent = title.charAt(0).toUpperCase() + title.substring(1)
    element.classList.add('title')

    return element
  })

  Prism.plugins.toolbar.registerButton('show-gap-style', function(env) {
    var pre = env.element.parentNode
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return
    }

    var language = env.language
    var fileExt = fileExtensionMap[env.language]

    if (!language) {
      return
    }
    var element = document.createElement('a')
    element.textContent = fileExt ? `GapStyle(${fileExt})` : 'GapStyle'
    element.href = 'https://github.com/gaplo917/GapStyle'
    element.target = '_blank'

    return element
  })
})()
;(function() {
  if (typeof self === 'undefined' || !self.Prism || !self.document) {
    return
  }

  if (!Prism.plugins.toolbar) {
    console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.')

    return
  }

  var ClipboardJS = window.ClipboardJS || undefined

  if (!ClipboardJS && typeof require === 'function') {
    ClipboardJS = require('clipboard')
  }

  var callbacks = []

  if (!ClipboardJS) {
    var script = document.createElement('script')
    var head = document.querySelector('head')

    script.onload = function() {
      ClipboardJS = window.ClipboardJS

      if (ClipboardJS) {
        while (callbacks.length) {
          callbacks.pop()()
        }
      }
    }

    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js'
    head.appendChild(script)
  }

  Prism.plugins.toolbar.registerButton('copy-to-clipboard', function(env) {
    var linkCopy = document.createElement('a')
    linkCopy.textContent = 'Copy'

    if (!ClipboardJS) {
      callbacks.push(registerClipboard)
    } else {
      registerClipboard()
    }

    return linkCopy

    function registerClipboard() {
      var clip = new ClipboardJS(linkCopy, {
        text: function() {
          return env.code
        }
      })

      clip.on('success', function() {
        linkCopy.textContent = 'Copied!'

        resetText()
      })
      clip.on('error', function() {
        linkCopy.textContent = 'Press Ctrl+C to copy'

        resetText()
      })
    }

    function resetText() {
      setTimeout(function() {
        linkCopy.textContent = 'Copy'
      }, 5000)
    }
  })
})()
;(function() {
  if (typeof self === 'undefined' || !self.Prism || !self.document) {
    return
  }

  if (!Prism.plugins.toolbar) {
    console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.')

    return
  }

  var ClipboardJS = window.ClipboardJS || undefined

  if (!ClipboardJS && typeof require === 'function') {
    ClipboardJS = require('clipboard')
  }

  var callbacks = []

  if (!ClipboardJS) {
    var script = document.createElement('script')
    var head = document.querySelector('head')

    script.onload = function() {
      ClipboardJS = window.ClipboardJS

      if (ClipboardJS) {
        while (callbacks.length) {
          callbacks.pop()()
        }
      }
    }

    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js'
    head.appendChild(script)
  }

  Prism.plugins.toolbar.registerButton('copy-to-clipboard', function(env) {
    var linkCopy = document.createElement('button')
    linkCopy.textContent = 'Copy'

    if (!ClipboardJS) {
      callbacks.push(registerClipboard)
    } else {
      registerClipboard()
    }

    return linkCopy

    function registerClipboard() {
      var clip = new ClipboardJS(linkCopy, {
        text: function() {
          return env.code
        }
      })

      clip.on('success', function() {
        linkCopy.textContent = 'Copied!'

        resetText()
      })
      clip.on('error', function() {
        linkCopy.textContent = 'Press Ctrl+C to copy'

        resetText()
      })
    }

    function resetText() {
      setTimeout(function() {
        linkCopy.textContent = 'Copy'
      }, 5000)
    }
  })
})()
