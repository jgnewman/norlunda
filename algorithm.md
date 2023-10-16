---
layout: default
permalink: /algorithm
---

{: .mb-0 }
# Norlunda algorithm

{: .byline }
Updated 2023.10.11

When we’ve settled on a Proto-Germanic lemma that will serve as the basis for a new word in Norlunda, we apply a system of sound changes as described here to create a new word. Because this algorithm is designed to simulate 2,000 years of incremental change, there are many steps and it is important to follow each step *in order*.

Some of the sections below make use of terms that need to be defined. Whenever one of these terms is mentioned for the first time, it is marked with a superscript number which refers to a definition placed at the end of the section.

While it is possible to run through this algorithm by hand, there are enough steps that human error is likely. To avoid this problem, the algorithm has been automated.

> **A note about compound words**
>
> Creating a compound word from PGmc roots and then running the compound through the algorithm can sometimes yield unintended results. For semantic clarity, the recommended approach is to translate roots individually and then form compounds from translated roots. Here is an example:
>
> The Norlunda word for “strawberry” is derived from the roots _*erþō_ and _*bazją_. On their own, each root can be translated to _erd_ and _boer_, thus allowing you to create the compound _erdboer_. If you were to try translating the full compound _*erþbazją_, not only would you be required to know how to deal with PGmc suffixes when forming compounds in the first place, but the result would be _erdfoer_, based on a rule that turns **⟨b⟩** into **⟨f⟩**, which should not be applied in the case of compound words. But the algorithm, when automated, can not know whether the input you’ve given it comprises a compound word so it will give you a result assuming it is a real lemma.

## Phase 1: Massage Known Outliers

{: .mb-8 }
There are a few words that historically break the rules. A good example of this is _*kwemaną_ (to come). This word loses its **⟨w⟩** in all modern Germanic languages, however similar loss does not occur in other words of the same structure. So to begin, we identify these outliers, and massage them into a form that yields a more expected result. The outliers are as follows (and will be appended as we discover others):
- _bagmaz_ → _baumaz_
  - Change of **⟨ag⟩** to **⟨au⟩** is non-standard
- _kwemaną_ → _kumaną_
  - Loss of **⟨w⟩** is non-standard
- _nurþrą_ → _nurþą_
  - Loss of the second **⟨r⟩** is non-standard
- _sunþrą_ → _sūþą_
  - Loss of the second **⟨r⟩** is non-standard
- _wōdanaz_ → _wudanaz_
  - Designed to conform to the common, modern retention of **⟨o⟩** which, in all modern cases, is a learned borrowing from older language stages. Examples: In English, the Great Vowel Shift would have raised _Woden_ to _Wooden_ and Middle High German has _Wüetung_, which should not have yielded modern _Wotan_.

## Phase 2: Sanitize Phonology

{: .mb-8 }
For the sake of automating this algorithm, there are some sounds in Proto-Germanic that are traditionally spelled with certain letters that can not be easily represented as single-character strings in high-level code. Before proceeding, these characters should be replaced with machine-recognizable, single-character strings. In human speak, swap out the following characters for the listed equivalents.

- `ą̄`  →  `ā`
- `į̄`  →  `į`
- `ǫ̂`  →  `ǭ`
- `ų̄`  →  `ų`

## Phase 3: I-Mutation

{: .mb-8 }
Short back vowels are fronted when followed in the next syllable by a vowel beginning with **/i, j/**. Example: _*bazją_ → _*bæzją_.
- /ɑ/ → /æ/
- /o/ → /ø/ (theoretically possible but may never actually occur)
- /u/ → /y/

## Phase 4: A-Mutation

Short **/u/** is lowered to **/o/** when followed in the next syllable by a vowel beginning with **⟨ɑ, æ, o⟩**<sup>1</sup>. Example: _*gulþą_ → _*golþą_.

{: .mb-8 }
Short **/i/** is lowered to **/e/** when followed in the next syllable by a vowel beginning with **⟨ɑ, æ, o⟩** unless **/j/** occurs between **/i/** and the low vowel. Examples:
- _*wiraz_ → _*weraz_
- _*gylþijaną_ → does not change

Short **/e/** is raised to **/i/** when a consonant cluster beginning with **/m, n/** occurs between **/e/** and low vowels **⟨ɑ, æ, o⟩**. Example: _*swemmaną_ → _*swimmaną_.

Long **/eː/** is lowered and backed to **/ɔː/** when followed in the next syllable by a vowel beginning with **/oː, oːː, õː/**. Example: _*mēnōþs_ → _*mānōþs_.

> 1. **⟨ɑ, æ, o⟩** - Brackets indicate that any version of the vowel counds (i.e., short, long, or nasal).

## Phase 5: Gemination

{: .mb-8 }
All single consonants (except **/r, w, z/**) are **doubled** when preceded by a short vowel and followed by **/j/**. When this happens, the **/j/** is also lost. If the resulting word ends with **⟨nną⟩**, the final **⟨ą⟩** is dropped. Examples:
- _*hæbjaną_ → _*hæbbaną_
- _*kynją_ → _*kynn_

When a 3-letter consonant cluster begins with a **fricative**<sup>1</sup> and ends with a **bilabial**<sup>2</sup>, the middle consonant is dropped and the fricative is doubled. Example: _*blōstmô_ → _*blōssmô_.

> 1. **fricative consonant** - any of the following:  **⟨f, h, s, þ, z⟩**
> 2. **bilabial consonant** - any of the following: **⟨b, m, p⟩**

## Phase 6: Vowel Laxing

{: .mb-8 }
All diphthongs and some vowel clusters involving **/h, j/** are monophthongized.
- /ɑih, ɑi/ → /ɑː/
- /anh/ → /ɑː/
- /ɑuh, ɑu/ → /uː/
- /ɑuh, ɑu, ouh, ou/ → /oː/
- /ænh, enh/ → /eː/
- /ehu, euh, eu, ewu, ew/ → /iː/
- /eːɑ/ (usually spelled **⟨ēa⟩**)  → /ɑː/
- /eːõː/ (usually spelled **⟨ēǭ⟩**) → /ɑː/
- /iuh, iu/ → /yː/
- /iw/ before a consonant → /yː/
- /jː/ (usually spelled **⟨jj⟩**) → /j/
- /oːu/ (usually spelled **⟨ōu⟩**)  → /oː/

All overlong vowels become regular long vowels. A short vowel in the preceding syllable is lengthened to compensate. Example: _*awô_ → _*āwō_.

{: .mb-8 }
All infinitive suffixes merge as shown below. If the new infinitive suffix **-an** follows a vowel, it becomes **-han**. If that preceding vowel was **/ɑː/**, it is shortened to **/ɑ/**. Example: _*gāną_ → _*gahan_. (Note that this step should not be applied to non-verbs.)
- wijaną → **/ɑn/**
- ijaną → **/ɑn/**
- janą → **/ɑn/**
- hwaną → **/ɑn/**
- waną → **/ɑn/**
- āną → **/ɑn/**
- aną → **/ɑn/**
- ōną → **/ɑn/**
- oną → **/ɑn/**
- ną → **/ɑn/**

{: .mb-8 }
All word-final, vowel-based endings are reduced into simpler forms.
- wijō, wijǭ → **/wɑ/** if after a vowel, otherwise **/ɑ/**
- hijō, wijǭ → **/ɑ/**
- ijō, ijǭ → **/iː/** if these are the only vowels in the word, otherwise drop
- wō, wǭ → **/wɑ/** if after a vowel, otherwise drop
- jō, jǭ → drop
- ō, ǭ → **/ɑ/** if after a **velar consonant**<sup>1</sup>, otherwise drop
- wijo, wijǫ → **/wɑ/** if after a vowel, otherwise **/ɑ/**
- ijo, ijǫ → drop
- wo, wǫ → drop
- jo, jǫ → drop
- ǫ, o → drop
- wijā, wiją̄ → **/wɑ/** if after a vowel, otherwise **/ɑ/**
- ijā, iją̄ → **/iː/** if these are the only vowels in the word, otherwise **/ɑ/**
- wā, wą̄ → **/wɑː/** if these are the only vowels in the word, otherwise drop
- jā, ją̄ → drop
- ā, ą̄ → **/ɑː/** if these are the only vowels in the word, otherwise drop
- wija, wiją → **/wɑ/** if after a vowel, otherwise **/ɑ/**
- ija, iją → drop
- wa, wą → **/ɑː/** if these are the only vowels in the word, otherwise drop
- ja, ją → **/jɑ/** if these are the only vowels in the word, otherwise drop
- ą, a → drop
- į → **/ɑ/**
- i → drop
- u → **/ɑ/**
- w → drop if after a vowel and lengthen a preceding short vowel to compensate

All remaining nasal vowels are de-nasalized.

Both of the clusters **⟨lz⟩** and **⟨zl⟩**, are replaced by **⟨ll⟩**. Example: _*trozl_ → _*troll_.

When either of the clusters **⟨mf⟩** or **⟨nf⟩** are word-terminal, the first consonant in the cluster is dropped. If the cluster is preceded by a short vowel, the vowel is lengthened. Example: _*fimf_ → _*fīf_.

If a word ends in an **uncomfortable consonant cluster**<sup>2</sup>, then **/ɑ/** is added between them. Example: _*woldr_ → _*woldar_.

> 1. **velar consonant** - **⟨g, k⟩**, and **⟨h⟩** when not word-initial
> 2. **uncomfortable consonant cluster** - An uncomfortable consonant cluster will be intuitive to most native-Germanic-speaking people, however for the purposes of clarity, this is defined as any two different consonants **other than** the following: _ds, dt, þs, þt, ft, gd, gþ, gs, hs, ht, ks, kt, lb, ld, lþ, lf, lg, lk, ln, lp, ls, lt, lv, lz, mp, nd, nþ, ng, nk, ns, nt, ps, rb, rd, rþ, rf, rg, rk, rm, rn, rp, rs, rt, rv, rz, sk, sp, st, ts_.

## Phase 7: Z-Loss

{: .mb-8 }
Word-final **/s/** following a consonant other than **⟨h⟩** is dropped (as in _*fōts_ → _*fōt_). Word-final **/z/**-suffixes are also dropped or reduced as defined below.
- iwaz → **/ɑ/**
- ijaz → **/iː/** if these are the only vowels in the word, otherwise drop
- waz → **/ɑ/** if after a consonant, otherwise drop
- az → drop unless there are no other vowels in the word
- iwiz → **/ɑ/** if after a consonant, otherwise drop
- īz → **/iː/**
- iz → drop unless there are no other vowels in the word
- ūz → **/uː/**
- uz → drop unless there are no other vowels in the word

All instances of **/hs/** become **/ks/**. All remaining instances of **/z/** become **/r/** and a preceding short vowel is lengthened as a result. Example: _*bæz_ → _*bǣr_.

If a word ends in an **uncomfortable consonant cluster**, then **/ɑ/** is added between them.

## Phase 8: West-Germanic Hardening

When **/ðw/** (spelled **⟨dw⟩** in standardized PGmc) occurs between vowels, the **/ð/** is dropped. Example: _*fedwor_ → _*fewor_.

All remaining instances of **/ð/** become **/d/**. (The sound **/ð/** is already spelled **⟨d⟩** in standardized PGmc so this rule may not require any action.)

## Phase 9: Syllable Reduction

Long vowels are shortened when followed by a consonant cluster. Example: _*blōssam_ → _*blossam_.

{: .mb-8 }
When a root word (prior to the infinitive suffix **-an**) has more than two syllables, everything between the first consonant of the second syllable and the last consonant of the last syllable is dropped. Example:
- In the word _*hagatyss_, the cluster **⟨atys⟩** is dropped, yielding _*hags_.

Verbs that end with a short vowel followed by **/nan/** drop that initial short vowel. Example: _*maganan_ → _*magnan_.

When **/w/** occurs between two vowels, the whole cluster merges into a single, long vowel determined by the first vowel in the cluster. Example: _*slawan_ → _*slān_.

{: .mb-8 }
Some consonant clusters involving **stop consonants**<sup>1</sup> are smoothed into simpler clusters or into single long consonants as follows.
- dg → gg
- tg → kk
- ngt → nt

> 1. **stop consonant** - any of the following: **⟨b, d, g, k, p, t⟩**

## Phase 10: Modernization

{: .mb-8 }
Some word-final combinations of a vowel plus /w/ are reduced as follows:
- /æːw/ → /øːn/ (Example: _*frǣw_ from PGmc. _*frawjô_ → /frøːn/)
- /æw/ → /au/ (Example: _*fræw_ from PGmc. _*frawjǭ_ → /frau/)

Word-final **/w/** is dropped after a vowel. If the vowel was short, it is lengthened to compensate. All other long vowels followed by **/w/** are shortened.

{: .mb-8 }
In multi-syllable roots (prior to the infinitive suffix **-an**), the vowel in the second syllable is dropped if it is followed by a consonant and if the result does not yield an **uncomfortable consonant cluster** at the end of the word. Examples:
- _*hæled_ → _*hæld_

The first syllable in every word (apart from grammatical prefixes) is always stressed. All long vowels in unstressed syllables shorten. Example: _*lindīn_ → _*lindin_.

{: .mb-8 }
Various consonants become africated or are otherwise affected by the presence of fricatives as follows:
Short (non-doubled) **/b/** after a vowel becomes **/v/**
- **/b/** after a consonant other than **/b/** becomes **/f/**
- **/d/** before a **fricative** becomes **/t/**
- **/f/** plus another **fricative** merges into **/f/**
- **/gs/** and **/ks/** merge into **/ks/** (spelled **⟨x⟩**)
- Word-initial **/h/** before a consonant is dropped
- **/h/** before a consonant besides **/l, r/** becomes **/k/**
- **/θ/** (usually spelled **⟨þ⟩**) becomes **/d/**
- **/sk/** becomes **/ʃ/** (spelled **⟨sh⟩**) before vowels and stop consonants
- **/sk/** becomes **/ʃ/** after **/t/**
- Word-initial **/w/** before a consonant is dropped
- All remaining **/w/** becomes **/v/**

When a consonant cluster contains a doubled consonant plus another consonant, one of the double consonants is dropped. Example: _*mēndd_ → _*mēnd._

{: .mb-8 }
Some vowels do a little shifting and settling.
- **/ɑu/**  →  **/aʊ/**, spelled **⟨au⟩**
- **/ɑ/** after **/j/**  → no change, spelled **⟨a⟩**
- **/ɑ/** when word-final and the only vowel in the word  →  **/ɔː/**, spelled **⟨aa⟩**
- **/ɑ/**  → **/a/**, spelled **⟨a⟩**
- **/æ, e/**  →  **/ɛ/**, spelled **⟨e⟩**
- **/i/**  →  **/ɪ/**, spelled **⟨i⟩**
- **/o/**  →  no change, spelled **⟨o⟩**
- **/ø/**  →  is raised to **/ɪ/**, spelled **⟨i⟩**
- **/u/**  →  no change, spelled **⟨u⟩**
- **/y/**  →  **/u/**, spelled **⟨u⟩**
- **/ɑː/** when word-final  →  **/ɔː/**, spelled **⟨aa⟩**
- **/ɑː/**  →  **/aɪ/**, spelled **⟨ei⟩**
- **/æː/**  →  **/øː/**, spelled **⟨œ⟩** or **⟨oe⟩**
- **/eː/**  →  no change, spelled **⟨ee⟩**
- **/iː/**  →  no change, spelled **⟨ie⟩**
- **/oː/** before an **approximant**<sup>1</sup>  →  **/øː/**, spelled **⟨œ⟩** or **⟨oe⟩**
- **/oː/** in any other case  →  **/u/**, spelled **⟨u⟩**
- **/øː/**  →  no change, spelled **⟨œ⟩** or **⟨oe⟩**
- **/ɔː/** →  no change, spelled **⟨aa⟩**
- **/uː, yː/**  →  **/aʊ/**, spelled **⟨au⟩**

Word-terminal **/aɪr/** becomes **/eːr/** spelled **⟨eer⟩**.

> 1. **approximant consonant** - any of the following: **⟨l, r, w, j⟩**

## Phase 11: Retrofit Old Compounds

Once a few roots have been converted from Proto-Germanic into Norlunda, it may be necessary to combine them to create a compound word. In most cases, simply combining the results is sufficient. However, when there is evidence that the compound should have existed in earlier language stages (such as in the case of common Germanic personal names), then the following rules should be applied after combining the roots together:

Re-apply pre-cluster vowel shortening. Specifically, long vowels are shortened when followed by a consonant cluster. Example: _Riekhard_ → _Rikhard_.

In any consonant cluster containing a doubled consonant plus at least one other consonant, the doubled consonant becomes single. Example: _Villhelm_ → _Vilhelm_.
