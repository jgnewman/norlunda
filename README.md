# norlunda

An algorithmically generated conlang merging north and west Germanic linguistic features

This is still a work in progress but to run things for now you need node.js and npm. Then you can run the script by passing in a Proto-Germanic word like this:

```
npm run word -- wrītaną
```

You will get output telling you the generated Norlunda word as well as how the word changed with each step in the process.

## Todo

The language current lacks any diphthongs but has no shortage of vowels. Currently we have:

```
a, æ, e, i, o, ø, u, y
ā, ǣ, ē, ī, ō, _, ū, ȳ
```

> Note, ø is extremely rare if it occurs at all given that PGmc does not seem to have any(?) short /o/ in i-mutative positions. In that case it may be safe to merge pretty much anything into the position of short ø if we wanted to. In our algorithm as it stands, long ō does not get i-mutated so there should be no occurrences of a long /ø:/.
>
> Also, short /u/ is always either i-mutated to /y/ or a-mutated to /o/ so it never occurs.

Some words as they currently stand:

```
dag - day
hātan - to be called

bæk - back
bǣr - berry

bed - bed
hēm - home

bindan - to bind
rītan - to write

hond - dog
bōk - book

N/A
N/A

N/A
ūt - out

gyldan - to gild
dȳtsh - dutch / native language
```

Ideas:

Desired vowel phonology:

a, ɔ, ɛ, e:, ɪ, i:, o, ø, u, y, ai, au

Actual phonology:

a, a:, æ, æ:, e, e:, i, i:, o, o:, u:, y, y:

Feedback:

> it would be the most logical for ū and ȳ to be dipthongs
> ā and ǣ are rather suitable canadites for becoming ai and au
> based off of the fact of norlunda follows the IPA shifts going downwards or upwards

```
i/y----------------u
  \  ɪ/ʏ        ʊ  |
  e/ø              o
     \      ə      |
      ɛ/œ          ɔ
        æ          |
          a--------ɑ
```

What if:

- a stays a (dag)
- æ merges to a (habban)
- e shelves into ɛ
- i shelves into ɪ
- o does not change
- no u ?
- y does not change or shelves into ø (gyldan, goeldan)

- a: becomes ɔ or diphthongizes to ai (haatan, folkhaam; heitan, folkheim)
- æ: becomes ø or merges to e: (boer, beer)
- e: does not change
- i: does not change or diphthongizes to ai (rietan)
  - There's no need for this to happen. Nothing's pushing it and it's not pulling anything.
- u:
- y:

1. something

- /a/ [a] dag
- /a:/ -> /au/ [au] folkhaum
- /æ/ ?
- /ǣ/ ?
- /e/ -> /ɛ/ [e] bed
- /e:/ [ee]
- /o/ [o]
- /o:/ -> /ʊ/ [u]
- /u/ appears from /o:/
- /u:/ [uu]
- /y/ -> /ø/ [oe]
- /y:/ -> /ai/ [ei]

2. something else

- /a/
- /a:/
- /æ/
- /ǣ/
- /e/
- /e:/
- /o/
- /o:/
- /u/
- /u:/
- /y/
- /y:/

To fix:

- iskaz is a suffix meaning "ish". We don't need a rule for that right? Why does it turn theudo into thiudiskaz?
-
