import { getFinder, getInserter } from 'libs/utils/zod'
import { Mapper } from '../../generic/models/Mapper'
import { getLanguageUid, Language, LanguageOptional, LanguageSchema } from '../models/Language'

export const allLanguages: Language[] = []

export const addLanguage = getInserter('Language', LanguageSchema, getLanguageUid, allLanguages)

export const findLanguage = getFinder(getLanguageUid, allLanguages)

export const mapLanguageD = <T>(mapper: Mapper<Language, T>) => (language: LanguageOptional) => mapper({
  transpiledTo: [],
  ...language,
})

export const addLanguageD = mapLanguageD(addLanguage)

export const JavaScript = addLanguageD({
  url: 'https://en.wikipedia.org/wiki/JavaScript',
  hasHygienicMacros: false,
  hasGoodIDESupport: true,
  hasGarbageCollector: true,
  isMemorySafe: true,
})

export const TypeScript = addLanguageD({
  url: 'https://en.wikipedia.org/wiki/TypeScript',
  hasHygienicMacros: false,
  hasGoodIDESupport: true,
  hasGarbageCollector: true,
  isMemorySafe: true,
})

export const Python = addLanguageD({
  url: 'https://en.wikipedia.org/wiki/Python_(programming_language)',
  hasHygienicMacros: false,
  isMemorySafe: true,
})

export const Rust = addLanguageD({
  url: 'https://en.wikipedia.org/wiki/Rust_(programming_language)',
  hasHygienicMacros: true,
  hasGoodIDESupport: true,
  hasGarbageCollector: false,
  isMemorySafe: true,
  notes: `
    * "Just clone everything when you are starting out to get around the borrow checker."
      * Or use Box, or Arc
  `,
})

export const Go = addLanguageD({
  url: 'https://go.dev/',
  hasHygienicMacros: false,
  isMemorySafe: true,
})

export const Haskell = addLanguageD({
  url: 'https://en.wikipedia.org/wiki/Haskell_(programming_language)',
  hasHygienicMacros: null, // not sure if Template Haskell is hygienic
  isMemorySafe: true,
})

export const CLang = addLanguageD({
  url: 'https://en.wikipedia.org/wiki/C_(programming_language)',
  hasHygienicMacros: false,
  isMemorySafe: false,
})

export const Java = addLanguageD({
  url: 'https://en.wikipedia.org/wiki/Java_(programming_language)',
  hasHygienicMacros: null,
  isMemorySafe: true,
})

/**
 * Apalache: symbolic model checker for TLA+ - https://github.com/informalsystems/apalache
 * Shiviz: interactive communication graphs from distributed system execution logs - https://bestchai.bitbucket.io/shiviz/
 * Spectacle: embedded specification language & model checker in Haskell - https://github.com/awakesecurity/spectacle (looks undeveloped)
 */
export const TLAPlus = addLanguageD({
  url: 'https://github.com/tlaplus/tlaplus',
  hasHygienicMacros: false,
  isMemorySafe: true,
})

export const Solidity = addLanguageD({
  url: 'https://docs.soliditylang.org/en/latest/',
  hasHygienicMacros: false,
  isMemorySafe: true,
})

export const CSharp = addLanguageD({
  url: 'https://en.wikipedia.org/wiki/C_Sharp_(programming_language)',
  hasHygienicMacros: null,
  isMemorySafe: true,
})

export const Julia = addLanguageD({
  url: 'https://julialang.org/',
  hasHygienicMacros: true,
  isMemorySafe: true,
  notes: `
    Pros:
    * Macros
    
    Cons:
    * Sources
      * https://viralinstruction.com/posts/badjulia/
      * https://yuri.is/not-julia/
      * https://danluu.com/julialang/
    * Summaries (todo)
      * Bugs in the core language + packages
  `,
})

export const Elixir = addLanguageD({
  url: 'https://elixir-lang.org/',
  hasHygienicMacros: true,
  isMemorySafe: true,
  notes: `
    * Has [LiveView](https://hexdocs.pm/phoenix_live_view/welcome.html)
  `,
})

export const HVM = addLanguageD({
  url: 'https://github.com/Kindelia/HVM',
  hasHygienicMacros: false,
  isMemorySafe: true,
})

export const Kind2 = addLanguageD({
  url: 'https://github.com/Kindelia/Kind2',
  hasHygienicMacros: null,
  isMemorySafe: true,
})

export const Clojure = addLanguageD({
  url: 'https://clojure.org/',
  hasHygienicMacros: null,
  isMemorySafe: true,
})

export const CommonLisp = addLanguageD({
  url: 'https://common-lisp.net/',
  hasHygienicMacros: null,
  isMemorySafe: true,
})

export const Swift = addLanguageD({
  url: 'https://developer.apple.com/swift/',
  hasHygienicMacros: null,
  isMemorySafe: true,
})

export const Lean4 = addLanguageD({
  url: 'https://leanprover.github.io/lean4/doc/',
  hasHygienicMacros: true,
  isMemorySafe: true,
})

export const Racket = addLanguageD({
  url: 'https://racket-lang.org/',
  hasHygienicMacros: null,
  isMemorySafe: true,
  notes: `
    * Language-oriented programming
    * [Language-oriented programming book](https://beautifulracket.com/)
  `,
})

export const PureScript = addLanguageD({
  url: 'https://www.purescript.org/',
  hasHygienicMacros: false,
  isMemorySafe: true,
})

export const Dafny = addLanguageD({
  url: 'https://github.com/dafny-lang/dafny',
  hasHygienicMacros: false,
  isMemorySafe: true,
  transpiledTo: [CSharp, Java, JavaScript, Go],
  notes: `
    * Dafny is a verification-ready programming language
    
    Pros:
    
    * "Dafny is the most commonly used tools in the [VerifyThis!] competition" ([source](https://ece.uwaterloo.ca/~agurfink/ece653/assets/pdf/W12-FormalMethodTools.pdf))
    * "... it required several person-months to implement and verify a generic doubly-linked list library in F*, while it required only three hours to do so in Dafny. Dafny was better able to handle multiple heap updates ..." ([source](https://eprint.iacr.org/2020/114.pdf))
    * "I chose to verify everything in Dafny, since it’s arguably the simplest and most lightweight IP verification language." ([source](https://www.hillelwayne.com/post/theorem-prover-showdown/))
    
    Cons:
    
    * [LiquidHaskell specs are shorter](https://ucsd-progsys.github.io/liquidhaskell-blog/2019/10/20/why-types.lhs/)
  `,
})

/**
 * TODO: This is not a language, it's a framework for Coq
 */
export const Verdi = addLanguageD({
  url: 'https://verdi.uwplse.org/',
  hasHygienicMacros: false,
  isMemorySafe: true,
  notes: `
    * Specification language
    * Verdi is developed using the Coq proof assistant, and systems are extracted to OCaml for execution. Verdi systems, including a fault-tolerant key-value store, achieve comparable performance to unverified counterparts.
  `,
})

export const Ivy = addLanguageD({
  url: 'https://github.com/kenmcmil/ivy',
  hasHygienicMacros: false,
  isMemorySafe: true,
  notes: `
    * IVy is a research tool intended to allow interactive development of protocols and their proofs of correctness and to provide a platform for developing and experimenting with automated proof techniques.
  `,
})

export const PLang = addLanguageD({
  url: 'https://github.com/p-org/P',
  hasHygienicMacros: null,
  isMemorySafe: true,
  transpiledTo: [CLang, CSharp],
  notes: `
    * Formal Modeling and Analysis of Distributed (Event-Driven) Systems
    * P is currently being used extensively inside Amazon (AWS) for analysis of complex distributed systems
  `,
})

/**
 * TODO: Not a language but an extension for Haskell
 */
export const LiquidHaskell = addLanguageD({
  url: 'https://ucsd-progsys.github.io/liquidhaskell/',
  hasHygienicMacros: false,
  isMemorySafe: true,
  notes: `
    Pros:
  
    * [LiquidHaskell code is shorter than Dafny code](https://ucsd-progsys.github.io/liquidhaskell-blog/2019/10/20/why-types.lhs/)
  `,
})
