# norlunda

An algorithmically generated conlang merging north and west Germanic linguistic features

This is still a work in progress but to run things for now you need node.js and npm. Then you can run the script by passing in a Proto-Germanic word like this:

```
npm start -- wrītaną
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

- y could restore back to u
- ū could shorten to u (but this is long across the board)

Idea: yy becomes au (maybe uu does too).

Beyond that, 2 options:

1. /e:/ becomes /ai/, /a:/ becomes /e:/. So we'd have /folkhaim/ and /he:tan/. This would leave us with no more long a.
2. Or /a:/ becomes /ai/ which also leaves us with no long a
