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
    scala: 'Scala',
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
    scala: '.scala',
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

  Prism.plugins.toolbar.registerButton('soft-wrap', function(env) {
    var pre = env.element.parentNode
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return
    }

    var element = document.createElement('a')
    element.classList.add('wrap-btn')
    element.innerHTML = `<svg height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m8 38h12v-4h-12zm32-28h-32v4h32zm-6 12h-26v4h26.5c2.21 0 4 1.79 4 4s-1.79 4-4 4h-4.5v-4l-6 6 6 6v-4h4c4.41 0 8-3.59 8-8s-3.59-8-8-8z"/><path d="m0 0h48v48h-48z" fill="none"/></svg>`
    element.onclick = () => {
      const code = pre.querySelector('code')
      if (code.classList.contains('soft-wrap')) {
        code.classList.remove('soft-wrap')
        element.classList.remove('active')
      } else {
        code.classList.add('soft-wrap')
        element.classList.add('active')
      }
    }

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

    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.6/clipboard.min.js'
    head.appendChild(script)
  }

  Prism.plugins.toolbar.registerButton('copy-to-clipboard', function(env) {
    var element = document.createElement('a')
    const svgHtml = `<svg data-prefix="far" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>`
    element.classList.add('copy-btn')
    element.innerHTML = svgHtml

    if (!ClipboardJS) {
      callbacks.push(registerClipboard)
    } else {
      registerClipboard()
    }

    return element

    function registerClipboard() {
      var clip = new ClipboardJS(element, {
        text: function() {
          return env.code
        }
      })

      clip.on('success', function() {
        element.innerHTML = '✓'

        resetText()
      })
      clip.on('error', function() {
        resetText()
      })
    }

    function resetText() {
      setTimeout(function() {
        element.innerHTML = svgHtml
      }, 2000)
    }
  })
})()
