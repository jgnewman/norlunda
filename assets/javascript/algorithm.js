(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // algorithm/consonants.js
  var require_consonants = __commonJS({
    "algorithm/consonants.js"(exports, module) {
      var pgmcConsonants = ["b", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "\xFE", "w", "z"];
      var allConsonants = [...pgmcConsonants, "v", "x"];
      var pgmcApproximants = ["j", "l", "r", "w"];
      var pgmcNonApproximants = pgmcConsonants.filter((c) => !pgmcApproximants.includes(c));
      var pgmcStops = ["b", "d", "g", "k", "p", "t"];
      var pgmcNonStops = pgmcConsonants.filter((c) => !pgmcStops.includes(c));
      var pgmcNasals = ["m", "n"];
      var pgmcNonNasals = pgmcConsonants.filter((c) => !pgmcNasals.includes(c));
      var fricatives = ["f", "h", "s", "\xFE", "v", "z"];
      var nonFricatives = pgmcConsonants.filter((c) => !fricatives.includes(c));
      var bilabials = ["m", "p", "b"];
      var nonBilabials = pgmcConsonants.filter((c) => !bilabials.includes(c));
      var pgmcVelars = ["g", "k", "h"];
      var pgmcNonVelars = pgmcConsonants.filter((c) => !pgmcVelars.includes(c));
      module.exports = {
        pgmcConsonants,
        allConsonants,
        pgmcApproximants,
        pgmcNonApproximants,
        pgmcStops,
        pgmcNonStops,
        pgmcNasals,
        pgmcNonNasals,
        fricatives,
        nonFricatives,
        bilabials,
        nonBilabials,
        pgmcVelars,
        pgmcNonVelars
      };
    }
  });

  // algorithm/vowels.js
  var require_vowels = __commonJS({
    "algorithm/vowels.js"(exports, module) {
      var baseVowels = ["a", "\xE6", "e", "i", "o", "\xF8", "u", "y"];
      var nasalVowels = ["\u0105", "\u0119", "\u012F", "\u01EB", "\u0173"];
      var allShortVowels = [...baseVowels, ...nasalVowels];
      var longVowels = ["\u0101", "\u01E3", "\u0113", "\u012B", "\u014D", "\u0153", "\u016B", "\u0233", "\u0254"];
      var longNasalVowels = ["\u01ED"];
      var allLongVowels = [...longVowels, ...longNasalVowels];
      var overlongVowels = ["\xE2", "\xEA", "\xEE", "\xF4", "\xFB", "\u0177"];
      var singularVowels = [
        ...allShortVowels,
        ...allLongVowels,
        ...overlongVowels
      ];
      var allNasalVowels = [...nasalVowels, ...longNasalVowels];
      var shortBackVowels = ["a", "o", "u"];
      var iMutators = ["i", "\u012B", "j"];
      var iMutationMap = {
        "a": "\xE6",
        "o": "\xF8",
        "u": "y"
      };
      var variantMap = {
        "a": ["a", "\u0105", "\u0101", "\xE2"],
        "\xE6": ["\xE6", "\u01E3"],
        "e": ["e", "\u0119", "\u0113", "\xEA"],
        "i": ["i", "\u012F", "\u012B", "\xEE"],
        "o": ["o", "o\u0328", "\u014D", "\u01ED", "\xF4"],
        "\xF8": ["\xF8", "\u0153"],
        "u": ["u", "\u0173", "\u016B", "\xFB"],
        "y": ["y", "\u0233", "\u0177"]
      };
      var aMutators = [...variantMap.a, ...variantMap["\xE6"], ...variantMap.o];
      var longOMutators = ["\u014D", "\xF4", "\u01ED"];
      var shortVowelVariantOf = (vowel) => {
        if (vowel === "\u0254")
          return "o";
        if (variantMap.a.includes(vowel))
          return "a";
        if (variantMap["\xE6"].includes(vowel))
          return "\xE6";
        if (variantMap.e.includes(vowel))
          return "e";
        if (variantMap.i.includes(vowel))
          return "i";
        if (variantMap.o.includes(vowel))
          return "o";
        if (variantMap["\xF8"].includes(vowel))
          return "\xF8";
        if (variantMap.u.includes(vowel))
          return "u";
        if (variantMap.y.includes(vowel))
          return "y";
        return "a";
      };
      var longVowelVariantOf = (vowel) => {
        if (variantMap.a.includes(vowel))
          return "\u0101";
        if (variantMap["\xE6"].includes(vowel))
          return "\u01E3";
        if (variantMap.e.includes(vowel))
          return "\u0113";
        if (variantMap.i.includes(vowel))
          return "\u012B";
        if (variantMap.o.includes(vowel))
          return "\u014D";
        if (variantMap["\xF8"].includes(vowel))
          return "\u0153";
        if (variantMap.u.includes(vowel))
          return "\u016B";
        if (variantMap.y.includes(vowel))
          return "y";
        return "\u0101";
      };
      module.exports = {
        baseVowels,
        nasalVowels,
        allShortVowels,
        longVowels,
        longNasalVowels,
        allLongVowels,
        overlongVowels,
        singularVowels,
        allNasalVowels,
        shortBackVowels,
        iMutators,
        iMutationMap,
        variantMap,
        aMutators,
        longOMutators,
        shortVowelVariantOf,
        longVowelVariantOf
      };
    }
  });

  // algorithm/utils.js
  var require_utils = __commonJS({
    "algorithm/utils.js"(exports, module) {
      var {
        allConsonants,
        pgmcApproximants,
        pgmcNonApproximants,
        pgmcStops,
        pgmcNasals
      } = require_consonants();
      var { singularVowels } = require_vowels();
      var lastOf = (arr) => arr[arr.length - 1];
      var firstOf = (arr) => typeof arr === "string" ? arr[0] ?? "" : arr[0];
      var allButLastOf = (arr) => arr.slice(0, -1);
      var reverse = (list) => {
        if (typeof list === "string") {
          return list.split("").reverse().join("");
        } else {
          return list.reverse();
        }
      };
      var beginsWithVowel = (word) => {
        return singularVowels.includes(firstOf(word));
      };
      var beginsWithConsonant = (word) => {
        return allConsonants.includes(firstOf(word));
      };
      var endsWithVowel = (word) => {
        return singularVowels.includes(lastOf(word));
      };
      var endsWithConsonant = (word) => {
        return allConsonants.includes(lastOf(word));
      };
      var isVowel = (letter) => {
        return singularVowels.includes(letter);
      };
      var isConsonant = (letter) => {
        return allConsonants.includes(letter);
      };
      var containsVowels = (word) => {
        return word.split("").some(isVowel);
      };
      var containsConsonants = (word) => {
        return word.split("").some(isConsonant);
      };
      var separateInitialVowels = (word) => {
        if (isConsonant(firstOf(word)))
          return ["", word];
        let vowels = "";
        let rest = word;
        while (rest.length && isVowel(firstOf(rest))) {
          vowels += firstOf(rest);
          rest = rest.slice(1);
        }
        return [vowels, rest];
      };
      var separateFinalVowels = (word) => {
        if (isConsonant(lastOf(word)))
          return [word, ""];
        let vowels = "";
        let rest = word;
        while (rest.length && isVowel(lastOf(rest))) {
          vowels = lastOf(rest) + vowels;
          rest = rest.slice(0, -1);
        }
        return [rest, vowels];
      };
      var separateInitialConsonants = (word) => {
        if (isVowel(firstOf(word)))
          return ["", word];
        let consonants = "";
        let rest = word;
        while (rest.length && isConsonant(firstOf(rest))) {
          consonants += firstOf(rest);
          rest = rest.slice(1);
        }
        return [consonants, rest];
      };
      var separateFinalConsonants = (word) => {
        if (isVowel(lastOf(word)))
          return [word, ""];
        let consonants = "";
        let rest = word;
        while (rest.length && isConsonant(lastOf(rest))) {
          consonants = lastOf(rest) + consonants;
          rest = rest.slice(0, -1);
        }
        return [rest, consonants];
      };
      var getVowelGroups = (word) => {
        const groups = [];
        let isTrackingPosition = false;
        let currentPosition = 0;
        let currentGroup = "";
        for (let i = 0; i < word.length; i++) {
          const letter = word[i];
          if (isVowel(letter)) {
            if (!isTrackingPosition) {
              isTrackingPosition = true;
              currentPosition = i;
            }
            currentGroup += letter;
          } else {
            isTrackingPosition = false;
            if (currentGroup)
              groups.push({ position: currentPosition, vowel: currentGroup });
            currentGroup = "";
          }
        }
        if (currentGroup)
          groups.push({ position: currentPosition, vowel: currentGroup });
        return groups;
      };
      var removeVowels = (word) => {
        return word.split("").filter(isConsonant).join("");
      };
      var removeConsonants = (word) => {
        return word.split("").filter(isVowel).join("");
      };
      var isUncomfortableEndCluster = (a, b) => {
        return a && b && a !== b && !/^(d[st]|þ[st]|ft|g[dþs]|hs|ht|k[st]|l[bdþfgkmnpstvz]|mp|n[dþgkst]|ps|r[bdþfgkmnpstvz]|s[kpt]|ts)$/.test(a + b);
      };
      var containsUncomfortableEndCluster = (word) => {
        let containsCluster = false;
        let isTrackingCluster = false;
        for (let i = 0; i < word.length; i++) {
          const letter = word[i];
          const nextLetter = word[i + 1];
          if (isConsonant(letter)) {
            if (!isTrackingCluster) {
              isTrackingCluster = true;
            }
          } else {
            isTrackingCluster = false;
          }
          if (isTrackingCluster && isUncomfortableEndCluster(letter, nextLetter)) {
            containsCluster = true;
            break;
          }
        }
        return containsCluster;
      };
      var endsWithUncomfortableConsonantCluster = (word) => {
        const [_, cluster] = separateFinalConsonants(word);
        return containsUncomfortableEndCluster(cluster);
      };
      var fixUncomfortableEndCluster = (word) => {
        return allButLastOf(word) + "a" + lastOf(word);
      };
      var runPhases = (word, context, phaseFnArray, log = false) => {
        const result = phaseFnArray.reduce((resultList, phaseFn) => {
          return [...resultList, phaseFn(resultList.length ? lastOf(resultList) : word, context)];
        }, []);
        if (log) {
          console.log(result.reduce((map, word2, i) => {
            map[`Phase ${i + 1}`] = word2;
            return map;
          }, {}), context);
        }
        return lastOf(result);
      };
      module.exports = {
        lastOf,
        firstOf,
        allButLastOf,
        reverse,
        beginsWithVowel,
        beginsWithConsonant,
        endsWithVowel,
        endsWithConsonant,
        isVowel,
        isConsonant,
        containsVowels,
        containsConsonants,
        separateInitialVowels,
        separateFinalVowels,
        separateInitialConsonants,
        separateFinalConsonants,
        getVowelGroups,
        removeVowels,
        removeConsonants,
        endsWithUncomfortableConsonantCluster,
        fixUncomfortableEndCluster,
        runPhases
      };
    }
  });

  // algorithm/syllableize.js
  var require_syllableize = __commonJS({
    "algorithm/syllableize.js"(exports, module) {
      var { separateInitialVowels, separateInitialConsonants, containsVowels } = require_utils();
      var getVowelConsonantChunk = (word) => {
        const [vowels, rest] = separateInitialVowels(word);
        const [consonants, remainder] = separateInitialConsonants(rest);
        if (!consonants.length)
          return [vowels, rest];
        if (consonants.length === 1) {
          return containsVowels(remainder) ? [vowels, consonants + remainder] : [vowels + consonants, remainder];
        }
        return [vowels + consonants[0], consonants.slice(1) + remainder];
      };
      var getInitialSyllable = (word) => {
        const [initialConsonants, rest] = separateInitialConsonants(word);
        const [vowelConsonantChunk, remainder] = getVowelConsonantChunk(rest);
        return [initialConsonants + vowelConsonantChunk, remainder];
      };
      var syllableize = (word, syllables = []) => {
        if (!word)
          return syllables;
        const [initialSyllable, remainder] = getInitialSyllable(word);
        if (!containsVowels(remainder)) {
          return [...syllables, initialSyllable + remainder];
        }
        return syllableize(remainder, [...syllables, initialSyllable]);
      };
      module.exports = syllableize;
    }
  });

  // algorithm/iMutation.js
  var require_iMutation = __commonJS({
    "algorithm/iMutation.js"(exports, module) {
      var syllableize = require_syllableize();
      var { separateInitialConsonants, getVowelGroups, lastOf, firstOf, runPhases } = require_utils();
      var { shortBackVowels, iMutators, iMutationMap } = require_vowels();
      var shortBackVowelPosition = (syllable) => {
        const maybeMutatable = lastOf(getVowelGroups(syllable));
        if (!maybeMutatable || maybeMutatable.vowel.length > 1)
          return -1;
        if (!shortBackVowels.includes(maybeMutatable.vowel))
          return -1;
        return maybeMutatable.position;
      };
      var containsIMutator = (syllable) => {
        const [initialConsonants, rest] = separateInitialConsonants(syllable);
        return /j/.test(initialConsonants) || iMutators.includes(firstOf(rest));
      };
      var iMutate = (syllable, nextSyllable) => {
        if (!containsIMutator(nextSyllable))
          return syllable;
        const position = shortBackVowelPosition(syllable);
        if (position === -1)
          return syllable;
        const letter = syllable[position];
        const mutatedLetter = iMutationMap[letter];
        return `${syllable.slice(0, position)}${mutatedLetter}${syllable.slice(position + 1)}`;
      };
      var handleIMutation = (word) => {
        const syllables = syllableize(word);
        return syllables.map((syllable, index) => {
          const nextSyllable = syllables[index + 1];
          if (!nextSyllable)
            return syllable;
          return iMutate(syllable, nextSyllable);
        }).join("");
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [handleIMutation]);
      };
    }
  });

  // algorithm/aMutation.js
  var require_aMutation = __commonJS({
    "algorithm/aMutation.js"(exports, module) {
      var { aMutators, longOMutators } = require_vowels();
      var syllableize = require_syllableize();
      var {
        separateInitialConsonants,
        firstOf,
        lastOf,
        getVowelGroups,
        separateFinalConsonants,
        runPhases
      } = require_utils();
      var containsAMutator = (syllable) => {
        const [_, rest] = separateInitialConsonants(syllable);
        return aMutators.includes(firstOf(rest));
      };
      var containsLongOMutator = (syllable) => {
        const [_, rest] = separateInitialConsonants(syllable);
        return longOMutators.includes(firstOf(rest));
      };
      var vowelPosition = (shortVowel, syllable) => {
        const maybeMutatable = lastOf(getVowelGroups(syllable));
        if (!maybeMutatable || maybeMutatable.vowel !== shortVowel)
          return -1;
        return maybeMutatable.position;
      };
      var mutateU = (syllable, nextSyllable) => {
        if (!containsAMutator(nextSyllable))
          return syllable;
        const position = vowelPosition("u", syllable);
        if (position === -1)
          return syllable;
        return `${syllable.slice(0, position)}${"o"}${syllable.slice(position + 1)}`;
      };
      var jBlocksMutation = (syllable, nextSyllable) => {
        const [_, finalConsonantsInSyllable] = separateFinalConsonants(syllable);
        const [initialConsonantsInNextSyllable] = separateInitialConsonants(nextSyllable);
        return /j/.test(finalConsonantsInSyllable + initialConsonantsInNextSyllable);
      };
      var nasalClusterTriggersMutation = (syllable, nextSyllable) => {
        const [_, finalConsonantsInSyllable] = separateFinalConsonants(syllable);
        const [initialConsonantsInNextSyllable] = separateInitialConsonants(nextSyllable);
        const combinedConsonants = finalConsonantsInSyllable + initialConsonantsInNextSyllable;
        return combinedConsonants.length > 1 && /^(m|n)/.test(combinedConsonants);
      };
      var mutateI = (syllable, nextSyllable) => {
        if (!containsAMutator(nextSyllable))
          return syllable;
        const position = vowelPosition("i", syllable);
        if (position === -1)
          return syllable;
        if (jBlocksMutation(syllable, nextSyllable))
          return syllable;
        return `${syllable.slice(0, position)}${"e"}${syllable.slice(position + 1)}`;
      };
      var mutateShortE = (syllable, nextSyllable) => {
        if (!containsAMutator(nextSyllable))
          return syllable;
        const position = vowelPosition("e", syllable);
        if (position === -1)
          return syllable;
        if (!nasalClusterTriggersMutation(syllable, nextSyllable))
          return syllable;
        return `${syllable.slice(0, position)}${"i"}${syllable.slice(position + 1)}`;
      };
      var mutateLongE = (syllable, nextSyllable) => {
        if (!containsLongOMutator(nextSyllable))
          return syllable;
        const position = vowelPosition("\u0113", syllable);
        if (position === -1)
          return syllable;
        return `${syllable.slice(0, position)}${"\u0254"}${syllable.slice(position + 1)}`;
      };
      var handleAMutation = (word) => {
        const syllables = syllableize(word);
        return syllables.map((syllable, index) => {
          const nextSyllable = syllables[index + 1];
          if (!nextSyllable)
            return syllable;
          const phase1 = mutateU(syllable, nextSyllable);
          const phase2 = mutateI(phase1, nextSyllable);
          const phase3 = mutateShortE(phase2, nextSyllable);
          const phase4 = mutateLongE(phase3, nextSyllable);
          return phase4;
        }).join("");
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [handleAMutation]);
      };
    }
  });

  // algorithm/gemination.js
  var require_gemination = __commonJS({
    "algorithm/gemination.js"(exports, module) {
      var { fricatives, bilabials } = require_consonants();
      var { lastOf, isConsonant, separateFinalVowels, separateFinalConsonants, runPhases } = require_utils();
      var { allShortVowels } = require_vowels();
      var geminateJTriggers = (word) => {
        const geminated = word.split("").reduce((result, char, index, charList) => {
          const nextChar = charList[index + 1];
          const curCharIsJ = char === "j";
          const nextCharIsJ = nextChar === "j";
          if (curCharIsJ) {
            const [_2, endConsonants] = separateFinalConsonants(result);
            const lastCons = lastOf(endConsonants);
            const nextToLastCons = endConsonants[endConsonants.length - 2];
            if (isConsonant(lastCons) && nextToLastCons === lastCons)
              return result;
            return result + char;
          }
          if (!isConsonant(char) || char === "r" || char === "w" || char === "z" || !nextCharIsJ)
            return result + char;
          const [_, prevVowels] = separateFinalVowels(result);
          if (prevVowels.length > 1 || !allShortVowels.includes(lastOf(prevVowels)))
            return result + char;
          return result + char + char;
        }, "");
        if (/nną$/.test(geminated))
          return geminated.replace(/nną$/, "nn");
        return geminated;
      };
      var geminateFricativeClusters = (word) => {
        let newWord = "";
        for (let i = 0; i < word.length; i++) {
          const curChar = word[i];
          const nextChar = word[i + 1];
          const thirdChar = word[i + 2];
          if (fricatives.includes(curChar) && isConsonant(nextChar) && bilabials.includes(thirdChar)) {
            newWord += curChar + curChar + thirdChar;
            i += 2;
          } else {
            newWord += curChar;
          }
        }
        return newWord;
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [
          geminateJTriggers,
          geminateFricativeClusters
        ]);
      };
    }
  });

  // algorithm/vowelLaxing.js
  var require_vowelLaxing = __commonJS({
    "algorithm/vowelLaxing.js"(exports, module) {
      var { pgmcVelars } = require_consonants();
      var syllableize = require_syllableize();
      var {
        lastOf,
        allButLastOf,
        endsWithUncomfortableConsonantCluster,
        isConsonant,
        isVowel,
        fixUncomfortableEndCluster,
        containsVowels,
        separateFinalConsonants,
        separateFinalVowels,
        runPhases
      } = require_utils();
      var {
        baseVowels,
        longVowels,
        nasalVowels,
        longNasalVowels,
        overlongVowels,
        longVowelVariantOf
      } = require_vowels();
      var shortRegex = new RegExp(`(${baseVowels.join("|")})`, "g");
      var overlongRegex = new RegExp(`(${overlongVowels.join("|")})`, "g");
      var nasalRegex = new RegExp(`(${nasalVowels.join("|")})`, "g");
      var longNasalRegex = new RegExp(`(${longNasalVowels.join("|")})`, "g");
      var relaxOverlongs = (word) => {
        const syllables = syllableize(word);
        return syllables.map((syllable, index) => {
          const nextSyllable = syllables[index + 1] ?? "";
          let newSyllable = syllable;
          if (overlongRegex.test(nextSyllable)) {
            newSyllable = syllable.replace(shortRegex, (_, p1) => longVowelVariantOf(p1)).replace(nasalRegex, (_, p1) => longVowelVariantOf(p1));
          }
          return newSyllable.replace(overlongRegex, (_, p1) => longVowelVariantOf(p1));
        }).join("");
      };
      var monophthongize = (word) => {
        const newWord = word.replace(/aih?/g, "\u0101").replace(/anh/g, "\u0101").replace(/auh?/g, "\u0254").replace(/ouh?/g, "\u014D").replace(/[æe]nh/, "\u0113").replace(/(ehu|euh|eu|ewu|ew)/g, "\u012B").replace(/ēa/g, "\u0101").replace(/ēǭ/g, "\u0101").replace(/iuh?/g, "\u0233").replace(/jj/g, "j").replace(/ōu/g, "\u014D");
        const matchIw = newWord.match(/iw/);
        return matchIw && isConsonant(newWord.charAt(matchIw.index + 2)) ? newWord.replace(/iw/, "\u0233") : newWord;
      };
      var reduceInfSuffixes = (word) => {
        const patterns = [/wijaną$/, /ijaną$/, /janą$/, /hwaną$/, /waną$/, /āną$/, /aną$/, /ōną$/, /oną$/, /ną$/];
        for (const pattern of patterns) {
          const truncated = word.replace(pattern, "");
          if (!containsVowels(truncated))
            continue;
          if (word !== truncated)
            return truncated + "an";
        }
        return word;
      };
      var mergeInfinitives = (word, context) => {
        if (context.isFalseVerb)
          return word;
        const newWord = reduceInfSuffixes(word);
        if (newWord === word)
          return newWord;
        const stem = newWord.slice(0, -2);
        if (!isVowel(lastOf(stem)))
          return newWord;
        if (lastOf(stem) === "\u0101")
          return allButLastOf(stem) + "ahan";
        return stem + "han";
      };
      var finalSylHasShortVowel = (word) => {
        const prevSyllable = lastOf(syllableize(word));
        const [syllPrefix] = separateFinalConsonants(prevSyllable);
        const [_, vowelCluster] = separateFinalVowels(syllPrefix);
        return baseVowels.includes(vowelCluster);
      };
      var lengthenFinalSylShortVowel = (word) => {
        if (!finalSylHasShortVowel(word))
          return word;
        const syllables = syllableize(word);
        const lastSyllable = lastOf(syllables);
        const restSyllables = allButLastOf(syllables);
        return restSyllables.join("") + lastSyllable.replace(shortRegex, (_, p1) => longVowelVariantOf(p1));
      };
      var reduceVowelBasedSuffixes = (word) => {
        if (/wij(ō|ǭ)$/.test(word))
          return word.replace(/wij(ō|ǭ)$/, isVowel(word.slice(-5)[0]) ? "wa" : "a");
        if (/hij(ō|ǭ)$/.test(word))
          return word.replace(/hij(ō|ǭ)$/, "a");
        if (/ij(ō|ǭ)$/.test(word))
          return word.replace(/ij(ō|ǭ)$/, !containsVowels(word.slice(0, -3)) ? "\u012B" : "");
        if (/w(ō|ǭ)$/.test(word))
          return word.replace(/w(ō|ǭ)$/, isVowel(word.slice(-3)[0]) ? "wa" : "");
        if (/j(ō|ǭ)$/.test(word))
          return word.replace(/j(ō|ǭ)$/, "");
        if (/(ō|ǭ)$/.test(word))
          return word.replace(/(ō|ǭ)$/, pgmcVelars.includes(word.slice(-2)[0]) ? "a" : "");
        if (/wij(o|ǫ)$/.test(word))
          return word.replace(/wij(o|ǫ)$/, isVowel(word.slice(-5)[0]) ? "wa" : "a");
        if (/ij(o|ǫ)$/.test(word))
          return word.replace(/ij(o|ǫ)$/, "");
        if (/w(o|ǫ)$/.test(word))
          return word.replace(/w(o|ǫ)$/, "");
        if (/j(o|ǫ)$/.test(word))
          return word.replace(/j(o|ǫ)$/, "");
        if (/(ǫ|o)$/.test(word))
          return word.replace(/(ǫ|o)$/, "");
        if (/wijā$/.test(word))
          return word.replace(/wijā$/, isVowel(word.slice(-5)[0]) ? "wa" : "a");
        if (/ijā$/.test(word))
          return word.replace(/ijā$/, !containsVowels(word.slice(0, -3)) ? "\u012B" : "");
        if (/wā$/.test(word))
          return word.replace(/wā$/, !containsVowels(word.slice(0, -2)) ? "v\u0101" : "");
        if (/jā$/.test(word))
          return word.replace(/jā$/, "");
        if (/ā$/.test(word))
          return word.replace(/ā$/, !containsVowels(word.slice(0, -1)) ? "\u0101" : "");
        if (/wij(a|ą)$/.test(word))
          return word.replace(/wij(a|ą)$/, isVowel(word.slice(-5)[0]) ? "wa" : "a");
        if (/ij(a|ą)$/.test(word))
          return word.replace(/ij(a|ą)$/, "");
        if (/w(a|ą)$/.test(word))
          return word.replace(/w(a|ą)$/, !containsVowels(word.slice(0, -2)) ? "\u0101" : "");
        if (/j(a|ą)$/.test(word))
          return word.replace(/j(a|ą)$/, !containsVowels(word.slice(0, -2)) ? "ja" : "");
        if (/(ą|a)$/.test(word))
          return word.replace(/(ą|a)$/, "");
        if (/į$/.test(word))
          return word.replace(/į$/, "a");
        if (/i$/.test(word))
          return word.replace(/i$/, "");
        if (/u/.test(word))
          return word.replace(/u$/, "a");
        if (/w$/.test(word))
          return isVowel(word.slice(-2)[0]) ? lengthenFinalSylShortVowel(word.replace(/w$/, "")) : word;
        return word;
      };
      var denasalize = (word) => {
        return word.replace(nasalRegex, (_, p1) => baseVowels[nasalVowels.indexOf(p1)]).replace(longNasalRegex, (_, p1) => longVowels[longNasalVowels.indexOf(p1)]);
      };
      var handleLZ = (word) => {
        return word.replace(/(lz|zl)/g, "ll");
      };
      var fixTerminalMfNf = (word) => {
        return word.replace(/.(mf|nf)$/, () => {
          const precedingChar = lastOf(word.slice(0, -2));
          return baseVowels.includes(precedingChar) ? longVowelVariantOf(precedingChar) + "f" : precedingChar + "f";
        });
      };
      var handleUncomfortableEndCluster = (word) => {
        if (!endsWithUncomfortableConsonantCluster(word))
          return word;
        return fixUncomfortableEndCluster(word);
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [
          monophthongize,
          relaxOverlongs,
          mergeInfinitives,
          reduceVowelBasedSuffixes,
          denasalize,
          handleLZ,
          fixTerminalMfNf,
          handleUncomfortableEndCluster
        ]);
      };
    }
  });

  // algorithm/zLoss.js
  var require_zLoss = __commonJS({
    "algorithm/zLoss.js"(exports, module) {
      var {
        allButLastOf,
        lastOf,
        isConsonant,
        endsWithUncomfortableConsonantCluster,
        fixUncomfortableEndCluster,
        runPhases,
        containsVowels
      } = require_utils();
      var { baseVowels, longVowelVariantOf } = require_vowels();
      var dropFinalZ = (word) => {
        const lastChar = lastOf(word);
        const nextToLastChar = lastOf(allButLastOf(word));
        if (lastChar === "s" && nextToLastChar !== "s" && nextToLastChar !== "h" && isConsonant(nextToLastChar))
          return word.slice(0, -1);
        if (/iwaz$/.test(word))
          return word.replace(/iwaz$/, "a");
        if (/ijaz$/.test(word))
          return word.replace(/ijaz$/, !containsVowels(word.slice(0, -4)) ? "\u012B" : "");
        if (/waz$/.test(word))
          return word.replace(/waz$/, isConsonant(word.slice(-4)[0]) ? "a" : "");
        if (/az$/.test(word))
          return word.replace(/az$/, containsVowels(word.slice(0, -2)) ? "" : "az");
        if (/iwiz$/.test(word))
          return word.replace(/iwiz$/, isConsonant(word.slice(-5)[0]) ? "a" : "");
        if (/īz$/.test(word))
          return word.replace(/īz$/, "\u012B");
        if (/iz$/.test(word))
          return word.replace(/iz$/, containsVowels(word.slice(0, -2)) ? "" : "iz");
        if (/ūz$/.test(word))
          return word.replace(/ūz$/, "\u016B");
        if (/uz$/.test(word))
          return word.replace(/uz$/, containsVowels(word.slice(0, -2)) ? "" : "uz");
        return word;
      };
      var fixRemainingZAndHs = (word) => {
        return word.replace(/hs/, "ks").replace(/[^z]?z/g, (matchedText) => {
          const [preZ] = matchedText.split("");
          return baseVowels.includes(preZ) ? longVowelVariantOf(preZ) + "r" : preZ + "r";
        });
      };
      var handleUncomfortableEndCluster = (word) => {
        if (!endsWithUncomfortableConsonantCluster(word))
          return word;
        return fixUncomfortableEndCluster(word);
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [
          dropFinalZ,
          fixRemainingZAndHs,
          handleUncomfortableEndCluster
        ]);
      };
    }
  });

  // algorithm/wgHardening.js
  var require_wgHardening = __commonJS({
    "algorithm/wgHardening.js"(exports, module) {
      var { lastOf, firstOf, isVowel, runPhases } = require_utils();
      var hardenDW = (word) => {
        const pieces = word.split(/dw/);
        return pieces.map((piece, index) => {
          const nextPiece = pieces[index + 1];
          if (!nextPiece)
            return piece;
          const lastOfCurrent = lastOf(piece);
          const firstOfNext = firstOf(nextPiece);
          if (!isVowel(lastOfCurrent) || !isVowel(firstOfNext))
            return piece;
          return piece + "w";
        }).join("");
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [hardenDW]);
      };
    }
  });

  // algorithm/syllableReduction.js
  var require_syllableReduction = __commonJS({
    "algorithm/syllableReduction.js"(exports, module) {
      var syllableize = require_syllableize();
      var {
        firstOf,
        lastOf,
        isVowel,
        separateFinalVowels,
        allButLastOf,
        isConsonant,
        runPhases,
        separateInitialConsonants
      } = require_utils();
      var { longVowelVariantOf, shortVowelVariantOf, baseVowels, longVowels, longNasalVowels } = require_vowels();
      var shortenPreClusterLongVowels = (word) => {
        let newWord = "";
        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          if (longVowels.includes(char) || longNasalVowels.includes(char)) {
            const [followingConsonants, _] = separateInitialConsonants(word.slice(i + 1));
            const consLength = followingConsonants.length;
            if (consLength >= 2) {
              newWord += shortVowelVariantOf(char);
              newWord += followingConsonants;
              i += consLength;
              continue;
            }
          }
          newWord += char;
        }
        return newWord;
      };
      var shortenThreeSyllablesPlus = (word) => {
        const [hasInfinitive, root] = word.endsWith("an") ? [true, word.slice(0, -2)] : [false, word];
        const syllables = syllableize(root);
        if (syllables.length < 3)
          return word;
        const firstSyllable = firstOf(syllables);
        const secondSyllable = syllables[1];
        const lastSyllable = lastOf(syllables);
        const firstConsOfSecondSyllable = firstOf(secondSyllable);
        const [lastSyllPrefix, finalVowels] = separateFinalVowels(lastSyllable);
        const lastConsOfLastSyllable = lastOf(lastSyllPrefix);
        const result = firstSyllable + firstConsOfSecondSyllable + lastConsOfLastSyllable + finalVowels;
        return hasInfinitive ? result + "an" : result;
      };
      var shortenLongVerbEndings = (word) => {
        if (!/nan$/.test(word))
          return word;
        const prefix = word.slice(0, -3);
        if (!baseVowels.includes(lastOf(prefix)))
          return word;
        return allButLastOf(prefix) + "nan";
      };
      var medialWToLongVowel = (word) => {
        let trackingChange = false;
        return word.split("").reduce((result, char, index, charList) => {
          const nextChar = charList[index + 1];
          const nextCharIsVowel = isVowel(nextChar);
          if (trackingChange && isVowel(char)) {
            if (!nextCharIsVowel) {
              trackingChange = false;
            }
            return result;
          }
          if (char !== "w")
            return result + char;
          const prevChar = lastOf(result);
          if (!isVowel(prevChar) || !nextCharIsVowel)
            return result + char;
          trackingChange = true;
          const [_, prevVowel] = separateFinalVowels(result);
          if (prevVowel.length > 1)
            return result;
          return allButLastOf(result) + longVowelVariantOf(prevVowel);
        }, "");
      };
      var fixStopClusters = (word) => {
        let newWord = "";
        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          const nextChar = word[i + 1];
          const thirdChar = word[i + 2];
          if (char === "d" && nextChar === "g" && !isConsonant(thirdChar)) {
            newWord += "gg";
            i++;
          } else if (char === "t" && nextChar === "g" && !isConsonant(thirdChar)) {
            newWord += "kk";
            i++;
          } else {
            newWord += char;
          }
        }
        return newWord.replace(/ngt/g, "nt");
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [
          shortenPreClusterLongVowels,
          shortenThreeSyllablesPlus,
          shortenLongVerbEndings,
          medialWToLongVowel,
          fixStopClusters
        ]);
      };
    }
  });

  // algorithm/shiftFricatives.js
  var require_shiftFricatives = __commonJS({
    "algorithm/shiftFricatives.js"(exports, module) {
      var { fricatives, pgmcStops } = require_consonants();
      var {
        firstOf,
        lastOf,
        isVowel,
        isConsonant,
        runPhases
      } = require_utils();
      var bToV = (word) => {
        return word.split("").reduce((result, char, index, charList) => {
          const prevChar = lastOf(result);
          const nextChar = charList[index + 1];
          if (char === "b" && nextChar !== "b" && isVowel(prevChar)) {
            return result + "v";
          }
          return result + char;
        }, "");
      };
      var bToF = (word) => {
        return word.split("").reduce((result, char) => {
          const prevChar = lastOf(result);
          if (char === "b" && isConsonant(prevChar) && prevChar !== "b") {
            return result + "f";
          }
          return result + char;
        }, "");
      };
      var dToT = (word) => {
        return word.split("").reduce((result, char, index, charList) => {
          const nextChar = charList[index + 1];
          if (char === "d" && fricatives.includes(nextChar)) {
            return result + "t";
          }
          return result + char;
        }, "");
      };
      var fPlusFricativeToF = (word) => {
        return word.split("").reduce((result, char) => {
          const prevChar = lastOf(result);
          if (fricatives.includes(char) && prevChar === "f" && char !== "f") {
            return result;
          }
          return result + char;
        }, "");
      };
      var gsAndKsToX = (word) => {
        return word.replace(/(g|k)s/g, "x");
      };
      var dropInitialH = (word) => {
        if (firstOf(word) === "h" && isConsonant(word[1]))
          return word.slice(1);
        return word;
      };
      var hToK = (word) => {
        return word.split("").reduce((result, char, index, charList) => {
          const nextChar = charList[index + 1];
          if (char === "h" && isConsonant(nextChar) && !/[lr]/.test(nextChar)) {
            return result + "k";
          }
          return result + char;
        }, "");
      };
      var thornToD = (word) => {
        return word.replace(/þ/g, "d");
      };
      var skToSh = (word) => {
        return word.split("").reduce((result, char, index, charList) => {
          const prevChar = lastOf(result);
          const nextChar = charList[index + 1];
          if (prevChar === "s" && char === "k" && (isVowel(nextChar) || pgmcStops.includes(nextChar))) {
            return result + "h";
          }
          return result + char;
        }, "").replace(/tsk/g, "tsh");
      };
      var dropInitialW = (word) => {
        if (firstOf(word) === "w" && isConsonant(word[1]))
          return word.slice(1);
        return word;
      };
      var wToV = (word) => {
        return word.replace(/w/g, "v");
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [
          bToV,
          bToF,
          dToT,
          fPlusFricativeToF,
          gsAndKsToX,
          dropInitialH,
          hToK,
          thornToD,
          skToSh,
          dropInitialW,
          wToV
        ]);
      };
    }
  });

  // algorithm/modernization.js
  var require_modernization = __commonJS({
    "algorithm/modernization.js"(exports, module) {
      var syllableize = require_syllableize();
      var shiftFricatives = require_shiftFricatives();
      var {
        isVowel,
        firstOf,
        lastOf,
        allButLastOf,
        removeVowels,
        separateFinalConsonants,
        separateInitialConsonants,
        separateFinalVowels,
        endsWithUncomfortableConsonantCluster,
        containsVowels,
        runPhases,
        isConsonant
      } = require_utils();
      var { baseVowels, longVowels, longVowelVariantOf, shortVowelVariantOf } = require_vowels();
      var { pgmcApproximants } = require_consonants();
      var shortRegex = new RegExp(`(${baseVowels.join("|")})`, "g");
      var longPlusWRegex = new RegExp(`(${longVowels.join("|")})w`, "g");
      var handleWBasedEndDiphthongs = (word) => {
        return word.replace(/ǣw$/, "\u0153").replace(/æw/, "au");
      };
      var dropWAndModVowels = (word) => {
        let newWord = word;
        const nextToLastCharIsVowel = isVowel(lastOf(allButLastOf(word)));
        if (/w$/.test(newWord) && nextToLastCharIsVowel) {
          newWord = allButLastOf(newWord);
          const [_, finalVowels] = separateFinalVowels(newWord);
          if (finalVowels.length === 1 && baseVowels.includes(finalVowels)) {
            newWord = newWord.replace(shortRegex, (_2, p1) => longVowelVariantOf(p1));
          }
        }
        return newWord.replace(longPlusWRegex, (_, p1) => shortVowelVariantOf(p1) + "w");
      };
      var tryToShortenSecondSyllable = (word) => {
        const hasInfinitiveSuffix = word.endsWith("an");
        const syllables = syllableize(word.replace(/an$/, ""));
        if (syllables.length < 2)
          return word;
        const secondSyllable = syllables[1];
        const thirdSyllable = syllables[2] ?? "";
        const [_, endCons] = separateFinalConsonants(secondSyllable);
        const [beginCons, __] = separateInitialConsonants(thirdSyllable);
        if (!endCons.length && !beginCons.length)
          return word;
        const newWord = firstOf(syllables) + removeVowels(secondSyllable) + syllables.slice(2).join("");
        if (endsWithUncomfortableConsonantCluster(newWord))
          return word;
        return newWord + (hasInfinitiveSuffix ? "an" : "");
      };
      var shortenUnstressedLongVowels = (word) => {
        const syllables = syllableize(word);
        return firstOf(syllables) + syllables.slice(1).map((syllable) => {
          return syllable.replace(/ā/g, "a").replace(/ē/g, "e").replace(/ī/g, "i").replace(/ō/g, "o").replace(/œ/g, "\xF8").replace(/ɔ/g, "a").replace(/ū/g, "u").replace(/ȳ/g, "y");
        }).join("");
      };
      var undoubleConsonants = (word) => {
        let newWord = "";
        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          const nextChar = word[i + 1];
          const thirdChar = word[i + 2];
          if (isConsonant(char) && isConsonant(nextChar) && isConsonant(thirdChar) && (char === nextChar || nextChar === thirdChar)) {
            newWord += char === nextChar ? char + thirdChar : char + nextChar;
            i += 2;
          } else {
            newWord += char;
          }
        }
        return newWord;
      };
      var shiftVowels = (word) => {
        return word.replace(/au/g, "au").replace(/j?a$/, (_, __, src) => {
          const stem = src.slice(0, -1);
          return lastOf(stem) === "j" ? "ja" : containsVowels(stem) ? "a" : "aa";
        }).replace(/a/g, "a").replace(/æ/g, "e").replace(/e/g, "e").replace(/i/g, "i").replace(/o/g, "o").replace(/ø/g, "i").replace(/y/g, "u").replace(/ā/g, (_, index, src) => !!src[index + 1] ? "ei" : "aa").replace(/ǣ/g, "oe").replace(/ē/g, "ee").replace(/ī/g, "ie").replace(/ō/g, (_, index, src) => pgmcApproximants.includes(src[index + 1]) ? "oe" : "u").replace(/œ/g, "oe").replace(/ɔ/g, "aa").replace(/[ūȳ]/g, "au");
      };
      var fixTerminalAir = (word) => {
        return word.replace(/eir$/, "eer");
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [
          handleWBasedEndDiphthongs,
          dropWAndModVowels,
          tryToShortenSecondSyllable,
          shortenUnstressedLongVowels,
          shiftFricatives,
          undoubleConsonants,
          shiftVowels,
          fixTerminalAir
        ]);
      };
    }
  });

  // algorithm/massageOutliers.js
  var require_massageOutliers = __commonJS({
    "algorithm/massageOutliers.js"(exports, module) {
      var { runPhases } = require_utils();
      var outlierMap = {
        // Change of ag to au is non-standard
        "bagmaz": "baumaz",
        // Loss of the w is non-standard
        "kweman\u0105": "kuman\u0105",
        // Loss of the second r is non-standard
        "nur\xFEr\u0105": "nur\xFE\u0105",
        // Loss of n and r are non-standard
        "sun\xFEr\u0105": "s\u016B\xFE\u0105",
        // Retention of <o> rather than change to <u> is the result of
        // this word being borrowed back in from earlier literature in all
        // modern W.G. languages. Note, for instance, that Middle High German
        // had Wüetung which should not have yielded modern Wotan. 
        "w\u014Ddanaz": "wudanaz"
      };
      var massageOutliers = (word) => {
        return outlierMap[word] || word;
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [massageOutliers]);
      };
    }
  });

  // algorithm/sanitizePhonology.js
  var require_sanitizePhonology = __commonJS({
    "algorithm/sanitizePhonology.js"(exports, module) {
      var { runPhases } = require_utils();
      var sanitize = (word) => {
        return word.replace(/ą̄/g, "\u0101").replace(/į̄/g, "\u012F").replace(/į̄/g, "\u012F").replace(/ǫ̂/g, "\u01ED").replace(/ų̄/g, "\u0173");
      };
      module.exports = (word, context) => {
        return runPhases(word, context, [sanitize]);
      };
    }
  });

  // algorithm/falseVerbs.js
  var require_falseVerbs = __commonJS({
    "algorithm/falseVerbs.js"(exports, module) {
      module.exports = [
        "akran\u0105",
        "aljan\u0105",
        "bain\u0105",
        "barn\u0105",
        "baukn\u0105",
        "bragn\u0105",
        "faikn\u0105",
        "gaman\u0105",
        "garn\u0105",
        "herzn\u0105",
        "h\u014Dn\u0105",
        "hurn\u0105",
        "\u012Bsarn\u0105",
        "kitt\u012Bn\u0105",
        "kurn\u0105",
        "laihn\u0105",
        "lakan\u0105",
        "laun\u0105",
        "l\u012Bn\u0105",
        "magin\u0105",
        "main\u0105",
        "mulkn\u0105",
        "ragin\u0105",
        "rahn\u0105",
        "razn\u0105",
        "regn\u0105",
        "skarn\u0105",
        "streun\u0105",
        "sw\u012Bn\u0105",
        "taikn\u0105",
        "teun\u0105",
        "tin\u0105",
        "t\u016Bn\u0105",
        "w\u0113pn\u0105",
        "w\u012Bn\u0105",
        "wulkan\u0105",
        "wulkn\u0105"
      ];
    }
  });

  // algorithm/index.js
  var require_algorithm = __commonJS({
    "algorithm/index.js"(exports, module) {
      var { lastOf } = require_utils();
      var iMutation = require_iMutation();
      var aMutation = require_aMutation();
      var gemination = require_gemination();
      var vowelLaxing = require_vowelLaxing();
      var zLoss = require_zLoss();
      var wgHardening = require_wgHardening();
      var syllableReduction = require_syllableReduction();
      var modernization = require_modernization();
      var massageOutliers = require_massageOutliers();
      var sanitizePhonology = require_sanitizePhonology();
      var falseVerbs = require_falseVerbs();
      var init = (baseWord) => {
        const normalizedWord = baseWord.toLowerCase().replace(/^\*/, "");
        const context = {};
        const steps = [];
        if (falseVerbs.includes(normalizedWord)) {
          context.isFalseVerb = true;
        }
        steps.push({
          step: "Massage Known Outliers",
          result: massageOutliers(normalizedWord, context)
        });
        steps.push({
          step: "Sanitize Phonology",
          result: sanitizePhonology(lastOf(steps).result, context)
        });
        steps.push({
          step: "I-Mutation",
          result: iMutation(lastOf(steps).result, context)
        });
        steps.push({
          step: "A-Mutation",
          result: aMutation(lastOf(steps).result, context)
        });
        steps.push({
          step: "Gemination",
          result: gemination(lastOf(steps).result, context)
        });
        steps.push({
          step: "Vowel Laxing",
          result: vowelLaxing(lastOf(steps).result, context)
        });
        steps.push({
          step: "Z-Loss",
          result: zLoss(lastOf(steps).result, context)
        });
        steps.push({
          step: "West-Germanic Hardening",
          result: wgHardening(lastOf(steps).result, context)
        });
        steps.push({
          step: "Syllable Reduction",
          result: syllableReduction(lastOf(steps).result, context)
        });
        steps.push({
          step: "Modernization",
          result: modernization(lastOf(steps).result, context)
        });
        return steps;
      };
      typeof window !== "undefined" && (window.norlunda = init);
      module.exports = init;
    }
  });
  require_algorithm();
})();
