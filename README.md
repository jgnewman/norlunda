# norlunda

An algorithmically generated conlang merging north and west Germanic linguistic features

This is still a work in progress but to run things for now you need node.js and npm. Then you can run the script by passing in a Proto-Germanic word like this:

```
npm start -- wrītaną
```

You will get output telling you the generated Norlunda word as well as how the word changed with each step in the process.

## Todo

- handle `ww` as in triwwiz. there appears to be a bug in z-loss

The language current lacks any diphthongs but has no shortage of vowels. Currently we have:

```
a, æ, e, i, o, ø, u, y
ā, ǣ, ē, ī, ō, _, ū, ȳ

Note, ø is theoretically in there, but maybe not actually.
```

Some words as they currently stand:

```
dag - day
hātan - to be called

???
bǣr - berry

???
hēm - home

bindan - to bind
rītan - to write

hond - dog
bōk - book

???
???

???
ūt - out

gyldan - to gild
dȳtsh - dutch / native language
```

Idea: yy becomes au (maybe uu does too).

Beyond that, 2 options:

1. /e:/ becomes /ai/, /a:/ becomes /e:/. So we'd have /folkhaim/ and /he:tan/. This would leave us with no more long a.
2. Or /a:/ becomes /ai/ which also leaves us with no long a
