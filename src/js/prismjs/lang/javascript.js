;(function(Prism) {
  Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
      Prism.languages.clike['class-name'],
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: true
      }
    ],
    keyword: [
      {
        pattern: /((?:^|})\s*)(?:catch|finally)\b/,
        lookbehind: true
      },
      {
        pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|declare|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|of|package|private|protected|public|return|set|static|string|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: true
      }
    ],
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
  })

  Prism.languages.javascript[
    'class-name'
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/

  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\[\r\n])+\/[gimyus]{0,6}(?=\s*(?:$|[\r\n,.;})\]]))/,
      lookbehind: true,
      greedy: true
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    'function-variable': {
      pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: 'function'
    },
    parameter: [
      {
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: true,
        inside: Prism.languages.javascript
      },
      {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: true,
        inside: Prism.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|declare|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|of|package|private|protected|public|return|set|static|string|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: true,
        inside: Prism.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  })

  Prism.languages.insertBefore('javascript', 'class-name', {
    annotation: {
      alias: 'punctuation',
      pattern: /(^|[^.])@\w+/,
      lookbehind: true
    }
  })

  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: true,
      inside: {
        'template-punctuation': {
          pattern: /^`|`$/,
          alias: 'string'
        },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: true,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\${|}$/,
              alias: 'punctuation'
            },
            rest: Prism.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    }
  })

  Prism.languages.insertBefore('javascript', 'function-variable', {
    'method-variable': {
      pattern: RegExp('(\\.\\s*)' + Prism.languages.javascript['function-variable'].pattern.source),
      lookbehind: true,
      alias: ['function-variable', 'method', 'function', 'property-access']
    }
  })

  Prism.languages.insertBefore('javascript', 'function', {
    method: {
      pattern: RegExp('(\\.\\s*)' + Prism.languages.javascript['function'].source),
      lookbehind: true,
      alias: ['function', 'property-access']
    }
  })

  Prism.languages.insertBefore('javascript', 'constant', {
    'known-class-name': [
      {
        // standard built-ins
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
        pattern: /\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|(?:Weak)?(?:Set|Map)|WebAssembly)\b/,
        alias: 'class-name'
      },
      {
        // errors
        pattern: /\b(?:[A-Z]\w*)Error\b/,
        alias: 'class-name'
      }
    ]
  })

  Prism.languages.javascript['keyword'].unshift(
    {
      pattern: /\b(?:as|default|export|from|import)\b/,
      alias: 'module'
    },
    {
      pattern: /\bnull\b/,
      alias: ['null', 'nil']
    },
    {
      pattern: /\bundefined\b/,
      alias: 'nil'
    }
  )

  Prism.languages.insertBefore('javascript', 'operator', {
    spread: {
      pattern: /\.{3}/,
      alias: 'operator'
    },
    arrow: {
      pattern: /=>/,
      alias: 'operator'
    }
  })

  Prism.languages.insertBefore('javascript', 'punctuation', {
    'property-access': {
      pattern: /(\.\s*)#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/,
      lookbehind: true
    },
    'maybe-class-name': {
      pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
      lookbehind: true
    },
    dom: {
      // this contains only a few commonly used DOM variables
      pattern: /\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b/,
      alias: 'variable'
    },
    console: {
      pattern: /\bconsole(?=\s*\.)/,
      alias: 'class-name'
    }
  })

  Prism.languages.insertBefore('javascript', 'class-name', {
    interface: {
      pattern: /\b(?:interface)\s+\w*/,
      lookbehind: true,
      inside: {
        'class-name': Prism.languages.javascript['class-name'],
        keyword: /interface/
      }
    },
    'anonymous-function': {
      pattern: /\b(?:new\s+function)/,
      inside: {
        keyword: /new\s+function/
      }
    }
  })

  // add 'maybe-class-name' to tokens which might be a class name
  var maybeClassNameTokens = ['function', 'function-variable', 'method', 'method-variable', 'property-access']

  for (var i = 0; i < maybeClassNameTokens.length; i++) {
    var token = maybeClassNameTokens[i]
    var value = Prism.languages.javascript[token]

    // convert regex to object
    if (Prism.util.type(value) === 'RegExp') {
      value = Prism.languages.javascript[token] = {
        pattern: value
      }
    }

    // keep in mind that we don't support arrays

    var inside = value.inside || {}
    value.inside = inside

    inside['maybe-class-name'] = /^[A-Z][\s\S]*/
  }
})(Prism)
;(function(Prism) {
  var templateString = Prism.languages.javascript['template-string']

  // see the pattern in prism-javascript.js
  var templateLiteralPattern = templateString.pattern.source
  var interpolationObject = templateString.inside['interpolation']
  var interpolationPunctuationObject = interpolationObject.inside['interpolation-punctuation']
  var interpolationPattern = interpolationObject.pattern.source

  /**
   * Creates a new pattern to match a template string with a special tag.
   *
   * This will return `undefined` if there is no grammar with the given language id.
   *
   * @param {string} language The language id of the embedded language. E.g. `markdown`.
   * @param {string} tag The regex pattern to match the tag.
   * @returns {object | undefined}
   * @example
   * createTemplate('css', /\bcss/.source);
   */
  function createTemplate(language, tag) {
    if (!Prism.languages[language]) {
      return undefined
    }

    return {
      pattern: RegExp('((?:' + tag + ')\\s*)' + templateLiteralPattern),
      lookbehind: true,
      greedy: true,
      inside: {
        'template-punctuation': {
          pattern: /^`|`$/,
          alias: 'string'
        },
        'embedded-code': {
          pattern: /[\s\S]+/,
          alias: language
        }
      }
    }
  }

  Prism.languages.javascript['template-string'] = [
    // styled-jsx:
    //   css`a { color: #25F; }`
    // styled-components:
    //   styled.h1`color: red;`
    createTemplate(
      'css',
      /\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/
        .source
    ),

    // html`<p></p>`
    // div.innerHTML = `<p></p>`
    createTemplate('html', /\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source),

    // svg`<path fill="#fff" d="M55.37 ..."/>`
    createTemplate('svg', /\bsvg/.source),

    // md`# h1`, markdown`## h2`
    createTemplate('markdown', /\b(?:md|markdown)/.source),

    // gql`...`, graphql`...`, graphql.experimental`...`
    createTemplate('graphql', /\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source),

    // vanilla template string
    templateString
  ].filter(Boolean)

  /**
   * Returns a specific placeholder literal for the given language.
   *
   * @param {number} counter
   * @param {string} language
   * @returns {string}
   */
  function getPlaceholder(counter, language) {
    return '___' + language.toUpperCase() + '_' + counter + '___'
  }

  /**
   * Returns the tokens of `Prism.tokenize` but also runs the `before-tokenize` and `after-tokenize` hooks.
   *
   * @param {string} code
   * @param {any} grammar
   * @param {string} language
   * @returns {(string|Token)[]}
   */
  function tokenizeWithHooks(code, grammar, language) {
    var env = {
      code: code,
      grammar: grammar,
      language: language
    }
    Prism.hooks.run('before-tokenize', env)
    env.tokens = Prism.tokenize(env.code, env.grammar)
    Prism.hooks.run('after-tokenize', env)
    return env.tokens
  }

  /**
   * Returns the token of the given JavaScript interpolation expression.
   *
   * @param {string} expression The code of the expression. E.g. `"${42}"`
   * @returns {Token}
   */
  function tokenizeInterpolationExpression(expression) {
    var tempGrammar = {}
    tempGrammar['interpolation-punctuation'] = interpolationPunctuationObject

    /** @type {Array} */
    var tokens = Prism.tokenize(expression, tempGrammar)
    if (tokens.length === 3) {
      /**
       * The token array will look like this
       * [
       *     ["interpolation-punctuation", "${"]
       *     "..." // JavaScript expression of the interpolation
       *     ["interpolation-punctuation", "}"]
       * ]
       */

      var args = [1, 1]
      args.push.apply(args, tokenizeWithHooks(tokens[1], Prism.languages.javascript, 'javascript'))

      tokens.splice.apply(tokens, args)
    }

    return new Prism.Token('interpolation', tokens, interpolationObject.alias, expression)
  }

  /**
   * Tokenizes the given code with support for JavaScript interpolation expressions mixed in.
   *
   * This function has 3 phases:
   *
   * 1. Replace all JavaScript interpolation expression with a placeholder.
   *    The placeholder will have the syntax of a identify of the target language.
   * 2. Tokenize the code with placeholders.
   * 3. Tokenize the interpolation expressions and re-insert them into the tokenize code.
   *    The insertion only works if a placeholder hasn't been "ripped apart" meaning that the placeholder has been
   *    tokenized as two tokens by the grammar of the embedded language.
   *
   * @param {string} code
   * @param {object} grammar
   * @param {string} language
   * @returns {Token}
   */
  function tokenizeEmbedded(code, grammar, language) {
    // 1. First filter out all interpolations

    // because they might be escaped, we need a lookbehind, so we use Prism
    /** @type {(Token|string)[]} */
    var _tokens = Prism.tokenize(code, {
      interpolation: {
        pattern: RegExp(interpolationPattern),
        lookbehind: true
      }
    })

    // replace all interpolations with a placeholder which is not in the code already
    var placeholderCounter = 0
    /** @type {Object<string, string>} */
    var placeholderMap = {}
    var embeddedCode = _tokens
      .map(function(token) {
        if (typeof token === 'string') {
          return token
        } else {
          var interpolationExpression = token.content

          var placeholder
          while (code.indexOf((placeholder = getPlaceholder(placeholderCounter++, language))) !== -1) {}
          placeholderMap[placeholder] = interpolationExpression
          return placeholder
        }
      })
      .join('')

    // 2. Tokenize the embedded code

    var embeddedTokens = tokenizeWithHooks(embeddedCode, grammar, language)

    // 3. Re-insert the interpolation

    var placeholders = Object.keys(placeholderMap)
    placeholderCounter = 0

    /**
     *
     * @param {(Token|string)[]} tokens
     * @returns {void}
     */
    function walkTokens(tokens) {
      for (var i = 0; i < tokens.length; i++) {
        if (placeholderCounter >= placeholders.length) {
          return
        }

        var token = tokens[i]

        if (typeof token === 'string' || typeof token.content === 'string') {
          var placeholder = placeholders[placeholderCounter]
          var s = typeof token === 'string' ? token : /** @type {string} */ (token.content)

          var index = s.indexOf(placeholder)
          if (index !== -1) {
            ++placeholderCounter

            var before = s.substring(0, index)
            var middle = tokenizeInterpolationExpression(placeholderMap[placeholder])
            var after = s.substring(index + placeholder.length)

            var replacement = []
            if (before) {
              replacement.push(before)
            }
            replacement.push(middle)
            if (after) {
              var afterTokens = [after]
              walkTokens(afterTokens)
              replacement.push.apply(replacement, afterTokens)
            }

            if (typeof token === 'string') {
              tokens.splice.apply(tokens, [i, 1].concat(replacement))
              i += replacement.length - 1
            } else {
              token.content = replacement
            }
          }
        } else {
          var content = token.content
          if (Array.isArray(content)) {
            walkTokens(content)
          } else {
            walkTokens([content])
          }
        }
      }
    }
    walkTokens(embeddedTokens)

    return new Prism.Token(language, embeddedTokens, 'language-' + language, code)
  }

  /**
   * The languages for which JS templating will handle tagged template literals.
   *
   * JS templating isn't active for only JavaScript but also related languages like TypeScript, JSX, and TSX.
   */
  var supportedLanguages = {
    javascript: true,
    js: true,
    typescript: true,
    ts: true,
    jsx: true,
    tsx: true
  }
  Prism.hooks.add('after-tokenize', function(env) {
    if (!(env.language in supportedLanguages)) {
      return
    }

    /**
     * Finds and tokenizes all template strings with an embedded languages.
     *
     * @param {(Token | string)[]} tokens
     * @returns {void}
     */
    function findTemplateStrings(tokens) {
      for (var i = 0, l = tokens.length; i < l; i++) {
        var token = tokens[i]

        if (typeof token === 'string') {
          continue
        }

        var content = token.content
        if (!Array.isArray(content)) {
          if (typeof content !== 'string') {
            findTemplateStrings([content])
          }
          continue
        }

        if (token.type === 'template-string') {
          /**
           * A JavaScript template-string token will look like this:
           *
           * ["template-string", [
           *     ["template-punctuation", "`"],
           *     (
           *         An array of "string" and "interpolation" tokens. This is the simple string case.
           *         or
           *         ["embedded-code", "..."] This is the token containing the embedded code.
           *                                  It also has an alias which is the language of the embedded code.
           *     ),
           *     ["template-punctuation", "`"]
           * ]]
           */

          var embedded = content[1]
          if (content.length === 3 && typeof embedded !== 'string' && embedded.type === 'embedded-code') {
            // get string content
            var code = stringContent(embedded)

            var alias = embedded.alias
            var language = Array.isArray(alias) ? alias[0] : alias

            var grammar = Prism.languages[language]
            if (!grammar) {
              // the embedded language isn't registered.
              continue
            }

            content[1] = tokenizeEmbedded(code, grammar, language)
          }
        } else {
          findTemplateStrings(content)
        }
      }
    }

    findTemplateStrings(env.tokens)
  })

  /**
   * Returns the string content of a token or token stream.
   *
   * @param {string | Token | (string | Token)[]} value
   * @returns {string}
   */
  function stringContent(value) {
    if (typeof value === 'string') {
      return value
    } else if (Array.isArray(value)) {
      return value.map(stringContent).join('')
    } else {
      return stringContent(value.content)
    }
  }
})(Prism)

Prism.languages.js = Prism.languages.javascript
;(function(Prism) {
  var javascript = Prism.languages.javascript

  var type = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}/.source
  var parameterPrefix = '(@(?:param|arg|argument|property)\\s+(?:' + type + '\\s+)?)'

  Prism.languages.jsdoc = {
    parameter: {
      // @param {string} foo - foo bar
      pattern: RegExp(parameterPrefix + /[$\w\xA0-\uFFFF.]+(?=\s|$)/.source),
      lookbehind: true,
      inside: {
        punctuation: /\./
      }
    },
    keyword: {
      // keywords are the first word in a line preceded be an `@` or surrounded by curly braces.
      // @word, {@word}
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
      lookbehind: true
    },
    punctuation: /[{}]/
  }

  Prism.languages.insertBefore('jsdoc', 'keyword', {
    'optional-parameter': {
      // @param {string} [baz.foo="bar"] foo bar
      pattern: RegExp(parameterPrefix + /\[[$\w\xA0-\uFFFF.]+(?:=[^[\]]+)?\](?=\s|$)/.source),
      lookbehind: true,
      inside: {
        parameter: {
          pattern: /(^\[)[$\w\xA0-\uFFFF.]+/,
          lookbehind: true,
          inside: {
            punctuation: /\./
          }
        },
        code: {
          pattern: /(=)[\s\S]*(?=\]$)/,
          lookbehind: true,
          inside: javascript,
          alias: 'language-javascript'
        },
        punctuation: /[=[\]]/
      }
    },
    'class-name': [
      {
        pattern: RegExp('(@[a-z]+\\s+)' + type),
        lookbehind: true,
        inside: {
          punctuation: /[.,:?=<>|{}()[\]]/
        }
      },
      {
        pattern: /(@(?:augments|extends|class|interface|memberof!?|this)\s+)[A-Z]\w*(?:\.[A-Z]\w*)*/,
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      }
    ],
    example: {
      pattern: /(@example\s+)[^@]+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
      lookbehind: true,
      inside: {
        code: {
          pattern: /^(\s*(?:\*\s*)?).+$/m,
          lookbehind: true,
          inside: javascript,
          alias: 'language-javascript'
        }
      }
    }
  })

  Prism.languages.insertBefore('javascript', 'comment', {
    'doc-comment': {
      pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
      lookbehind: true,
      alias: 'comment',
      inside: Prism.languages.jsdoc
    }
  })
})(Prism)
