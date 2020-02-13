;(function(Prism) {
  var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/

  // based on the java naming conventions
  var className = /\b[A-Z](?:\w*[a-z]\w*)?\b/

  Prism.languages.java = Prism.languages.extend('clike', {
    'class-name': [
      className,
      // variables and parameters
      // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
      /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/
    ],
    keyword: keywords,
    function: [
      Prism.languages.clike.function,
      {
        pattern: /(::)[a-z_]\w*/,
        lookbehind: true
      }
    ],
    number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: true
    }
  })

  Prism.languages.insertBefore('java', 'keyword', {
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  })

  Prism.languages.insertBefore('java', 'punctuation', {
    'property-access': {
      pattern: /(\.\s*)#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/,
      lookbehind: true
    },
    'maybe-class-name': {
      pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
      lookbehind: true
    }
  })

  Prism.languages.insertBefore('java', 'string', {
    'triple-quoted-string': {
      // http://openjdk.java.net/jeps/355#Description
      pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
      greedy: true,
      alias: 'string'
    }
  })

  Prism.languages.insertBefore('java', 'class-name', {
    annotation: {
      alias: 'punctuation',
      pattern: /(^|[^.])@\w+/,
      lookbehind: true
    },
    namespace: {
      pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(?:\.[a-z]\w*)+/,
      lookbehind: true,
      inside: {
        punctuation: /\./
      }
    },
    generics: {
      pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
      inside: {
        'class-name': className,
        keyword: keywords,
        punctuation: /[<>(),.:]/,
        operator: /[?&|]/
      }
    }
  })
})(Prism)
;(function(Prism) {
  var javaDocLike = (Prism.languages.javadoclike = {
    parameter: {
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,
      lookbehind: true
    },
    keyword: {
      // keywords are the first word in a line preceded be an `@` or surrounded by curly braces.
      // @word, {@word}
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
      lookbehind: true
    },
    punctuation: /[{}]/
  })

  Prism.languages.insertBefore('java', 'comment', {
    'doc-comment': {
      pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
      lookbehind: true,
      alias: 'comment',
      inside: javaDocLike
    }
  })
})(Prism)
