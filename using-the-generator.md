---
layout: default
permalink: /using-the-generator
---

# Using the generator

Because the Norlunda sound change algorithm contains many steps, human error is a likely occurrence when translating a word from Proto-germanic into modern Norlunda. For this reason, we have <a data-modal-trigger="generator">a generator</a> that will do most of the work for you. You can use the generator to translate a single word at a time or multiple words simultaneously by separating them with commas.

With that said, it is important to understand that the generator can not turn every possible PGmc. construction into a valid, Norlunda word.

## Lemmas

The generator (and the algorithm itself) are designed to operate solely upon PGmc _lemmas_. In other words, you are likely to get unexpected results if you attempt to run the generator on anything other than the dictionary-form of a given word. This is partly because things like prefixes and suffixes are dictated by Norlunda grammar rules, not by PGmc patterns.

For example, consider the English word _holy_. This derives from PGmc [_hailagaz_](https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hailagaz), which is a combination of the lemma _hailaz_ (whole, healthy) and the adjectival suffix _-gaz_ (which became _-y_ in modern English). If we run the generator on the word _hailagaz_, the result will be _heilg_, which is awkward and incorrect, due to the fact that the it did not come from a lemma. Instead, we should run the generator on _hailaz_ to produce _heil_, and then append the adjectival suffix specified by Norlunda grammar rules: _-ig_. This gives us the final, correct form of _heilig_.

It is true that the generator will sometimes produce a correct result when not provided a lemma. However, this process can not be trusted.

## Compound words

When creating compound words, there are two options. The first is to translate each lemma individually and then combine the results manually. This is the always the best option when the compound contains a word that has undergone some kind of grammatical alteration. As stated above, the algorithm does not know anything about the grammatical context of a word it has been given, so it is up to you to make sure you are generating Norlunda lemmas and to apply things like grammatical suffixes after the fact.

The other option is to add a **:** symbol between two lemmas, which will signal the generator to attempt creating a compound for you.

When asking the generator to create compound words, please note that it will apply a few "historical" sound change rules from the algorithm to the result. For example, long vowels will be shortened when appearing in an unstressed position or when appearing before a consonant cluster. This is meant to mimic the idea of the compound being very old and is a good technique for translating things such as Germanic names. If this technique does not produce a desirable result, feel free to translate each lemma individually and then create your compound manually from the results.

{% include prev-next.html list="docs" %}