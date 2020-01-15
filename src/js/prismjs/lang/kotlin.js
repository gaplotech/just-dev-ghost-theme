(function (Prism) {

    var keywords = /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/;

    // based on the java naming conventions
    var className = /\b[A-Z](?:\w*[a-z]\w*)?\b/;

    Prism.languages.kotlin = Prism.languages.extend('clike', {
        'keyword': {
            // The lookbehind prevents wrong highlighting of e.g. kotlin.properties.get
            pattern: keywords,
            lookbehind: true
        },
        'function': [
            /\w+(?=\s*\()/,
            {
                pattern: /(\.)\w+(?=\s*\{)/,
                lookbehind: true
            }
        ],
        'number': /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
        'operator': /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
        'class-name': [
            className,

            // variables and parameters
            // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
            /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/
        ],
    });

    Prism.languages.insertBefore('kotlin', 'string', {
        'raw-string': {
            pattern: /("""|''')[\s\S]*?\1/,
            alias: 'string'
            // See interpolation below
        }
    });
    Prism.languages.insertBefore('kotlin', 'keyword', {
        'annotation': {
            pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
            alias: 'builtin'
        },
        'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });
    Prism.languages.insertBefore('kotlin', 'function', {
        'label': {
            pattern: /\w+@|@\w+/,
            alias: 'symbol'
        }
    });

    Prism.languages.insertBefore('kotlin', 'class-name', {
        'annotation': {
            alias: 'punctuation',
            pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
            lookbehind: true
        },
        'namespace': {
            pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(?:\.[a-z]\w*)?/,
            lookbehind: true,
            inside: {
                'punctuation': /\./,
            }
        },
        'generics': {
            pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>|<out\s+[\w\s,.&?]*>/,
            inside: {
                'class-name': className,
                'keyword': keywords,
                'punctuation': /[<>(),.:]/,
                'operator': /[?&|]/
            }
        },
        'interface': {
            pattern: /\b(?:interface)\s+\w*/,
            lookbehind: true,
            inside: {
                'class-name': className,
                'keyword': keywords,
            }
        },
        'abstract': {
            pattern: /\b(?:abstract(?:\s+class))\s+\w*/,
            lookbehind: true,
            inside: {
                'class-name': className,
                'keyword': keywords,
            }
        },
        'object': {
            pattern: /\b(?:object)\s+\w*/,
            lookbehind: true,
            inside: {
                'class-name': className,
                'keyword': keywords,
            }
        },
    });

    Prism.languages.insertBefore('kotlin', 'punctuation', {
        'property-access': {
            pattern: /(\.\s*)#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/,
            lookbehind: true
        },
        'maybe-class-name': {
            pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
            lookbehind: true
        },
    });

    Prism.languages.insertBefore('kotlin', 'constant', {
        'maybe-generic-template': {
            pattern: /T/,
            alias: 'constant',
        },
    });
    var interpolation = [
        {
            pattern: /\$\{[^}]+\}/,
            inside: {
                'delimiter': {
                    pattern: /^\$\{|\}$/,
                    alias: 'variable'
                },
                rest: Prism.languages.kotlin
            }
        },
        {
            pattern: /\$\w+/,
            alias: 'variable'
        }
    ];

    Prism.languages.kotlin['string'].inside = Prism.languages.kotlin['raw-string'].inside = {
        interpolation: interpolation
    };

}(Prism));
