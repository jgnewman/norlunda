# Norlunda

> A (mostly) algorithmically generated conlang merging north and west Germanic linguistic features

![Norlunda flag](https://jgnewman.github.io/norlunda/assets/images/flag.svg | width=300)

This repository holds the code for the Norlunda algorithm itself as well as the code for the publicly-accessible website.

## Adding a new word to the dictionary

Because the website currently runs on Jekyll in GitHub pages, it does not make use of a database. Instead, the dictionary exists as a set of Yaml files that live in the folder `_data/dictionary`. The dictionary exists assuming an English-to-Norlunda format because we want to be able to programmatically modify Norlunda words in the future without having to change the structure of the dictionary.

There is one file per letter of the English alphabet and words are listed alphabetically by their _English definitions_. For example, the word _ergan_ is stored in `a.yml` and is alphabetized as `annoy`. To add a new word to the dictionary, simply make a new entry in the appropriate file. Here is a list of all the possible fields an entry can have and what they mean:

- **def** (a single word; required) - This is the word's canonical English definition.
- **type** (a single word; required) - This is the part of speech the word conforms to, for example noun, adjective, preposition, etc.
- **synonyms** (a list of words; optional) - Other English words that this word can represent.
- **word** (a single word; required) - This is the actual Norlunda word being defined.
- **origin** (a single word; required) - This is the PGmc origin of the Norlunda word.
- **originDef** (a word or phrase; required) - What the PGmc origin would have literally meant.
- **hypothetical** (true/false; required if true) - Whether the PGmc origin of this word is your own hypothetical reconstruction
- **irregular** (true/false; required if true) - This field should _rarely_ be true. It should be true for irregular verbs or any other words that do not follow the normal rules.
- **custom** (true/false; required if true) - A word is considered custom if it can not be auto-generated automatically by the algorithm for any reason.
- **notes** (some text; required if any of the boolean fields were true) - Allows explaining why a word should be hypothetical, irregular, or custom. Otherwise, this is a good place for any extra useful notes about the word if you have any.

## Running locally

The Norlunda algorithm can be executed independently and can also be bundled into a JS file that is used in the Norlunda website.

The algorithm is bundled with npm and esbuild while the website itself runs on Jekyll.

To test the algorithm, run `npm run word -- YOUR_WORD_HERE`. For a larger test, you can run `npm run wordlist` to see the output of a pre-set list of test words all at once.

To bundle a new version of the algorithm into the website, run `npm run build:algorithm`.

To run the site, you will need Ruby and Jekyll, then run `npm run start`.
