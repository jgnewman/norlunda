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

Things we **_don't_** want:

- ā not becoming ai under some circumstances (there is strong desire for "heim")
  - we want haitan and stain but not gain
  - to be fair, we would probably be ok with /e:/ as well
- ā becoming ai under _all_ circumstances (gān would become gain, which is undesired)
- ǣ and ē merging, because this would merge berry and bear
- ī moving anywhere other than ai (otherwise we get into unusual phonological patterns)
- o moving anywhere other than u (hond/hund, koman/kuman, etc)

What if:

- /æ:/ raises to /ø:/ giving boer=berry
- /æ/ raises to merge with /ɛ/ giving end=and, bera=barrow, bedd=bed

-
