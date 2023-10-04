(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/consonants.js
  var require_consonants = __commonJS({
    "src/consonants.js"(exports, module) {
      var pgmcConsonants = ["b", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "\xFE", "w", "z"];
      var allConsonants = [...pgmcConsonants, "v", "x"];
      var pgmcApproximants = ["j", "l", "r", "w"];
      var pgmcNonApproximants = pgmcConsonants.filter((c) => !pgmcApproximants.includes(c));
      var pgmcStops = ["b", "d", "g", "k", "p", "t"];
      var pgmcNonStops = pgmcConsonants.filter((c) => !pgmcStops.includes(c));
      var pgmcNasals = ["m", "n"];
      var pgmcNonNasals = pgmcConsonants.filter((c) => !pgmcNasals.includes(c));
      var pgmcFricatives = ["f", "h", "s", "\xFE", "z"];
      var pgmcNonFricatives = pgmcConsonants.filter((c) => !pgmcFricatives.includes(c));
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
        pgmcFricatives,
        pgmcNonFricatives,
        pgmcVelars,
        pgmcNonVelars
      };
    }
  });

  // src/vowels.js
  var require_vowels = __commonJS({
    "src/vowels.js"(exports, module) {
      var baseVowels = ["a", "\xE6", "e", "i", "o", "\xF8", "u", "y"];
      var nasalVowels = ["\u0105", "0", "e\u0328", "i\u0328", "\u01EB", "1", "u\u0328", "2"];
      var allShortVowels = [...baseVowels, ...nasalVowels];
      var longVowels = ["\u0101", "\u01E3", "\u0113", "\u012B", "\u014D", "\u0153", "\u016B", "\u0233"];
      var longNasalVowels = ["a\u0304\u0328", "\xE6\u0304\u0328", "e\u0304\u0328", "i\u0304\u0328", "\u01ED", "3", "u\u0304\u0328", "4"];
      var allLongVowels = [...longVowels, ...longNasalVowels];
      var overlongVowels = ["\xE2", "5", "\xEA", "\xEE", "\xF4", "6", "\xFB", "\u0177"];
      var overlongNasalVowels = ["7", "8", "e\u0302\u0328", "9", "o\u0302\u0328", "@", "&", ";"];
      var allOverlongVowels = [...overlongVowels, ...overlongNasalVowels];
      var singularVowels = [
        ...allShortVowels,
        ...allLongVowels,
        ...allOverlongVowels
      ];
      var allNasalVowels = [...nasalVowels, ...longNasalVowels, ...overlongNasalVowels];
      var shortBackVowels = ["a", "o", "u"];
      var iMutators = ["i", "\u012B", "j"];
      var iMutationMap = {
        "a": "\xE6",
        "o": "\xF8",
        "u": "y"
      };
      var variantMap = {
        "a": ["a", "\u0105", "\u0101", "a\u0304\u0328", "\xE2", "7"],
        "\xE6": ["\xE6", "0", "\u01E3", "\xE6\u0304\u0328", "5", "8"],
        "e": ["e", "e\u0328", "\u0113", "e\u0304\u0328", "\xEA", "e\u0302\u0328"],
        "i": ["i", "i\u0328", "\u012B", "i\u0304\u0328", "\xEE", "9"],
        "o": ["o", "o\u0328", "\u014D", "\u01ED", "\xF4", "o\u0302\u0328"],
        "\xF8": ["\xF8", "1", "\u0153", "3", "6", "@"],
        "u": ["u", "u\u0328", "\u016B", "u\u0304\u0328", "\xFB", "&"],
        "y": ["y", "2", "\u0233", "4", "\u0177", ";"]
      };
      var aMutators = [...variantMap.a, ...variantMap["\xE6"], ...variantMap.o];
      var shortVowelVariantOf = (vowel) => {
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
        return "";
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
        return "";
      };
      module.exports = {
        baseVowels,
        nasalVowels,
        allShortVowels,
        longVowels,
        longNasalVowels,
        allLongVowels,
        overlongVowels,
        overlongNasalVowels,
        allOverlongVowels,
        singularVowels,
        allNasalVowels,
        shortBackVowels,
        iMutators,
        iMutationMap,
        variantMap,
        aMutators,
        shortVowelVariantOf,
        longVowelVariantOf
      };
    }
  });

  // src/utils.js
  var require_utils = __commonJS({
    "src/utils.js"(exports, module) {
      var {
        allConsonants,
        pgmcApproximants,
        pgmcNonApproximants,
        pgmcStops,
        pgmcNasals,
        pgmcFricatives
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
      var isNonApproximantApproximantCluster = (a, b) => {
        return pgmcNonApproximants.includes(a) && pgmcApproximants.includes(b);
      };
      var isDoubleStopCluster = (a, b) => {
        return `${a}${b}` !== "kt" && pgmcStops.includes(a) && pgmcStops.includes(b) && a !== b;
      };
      var isNasalEndingCluster = (a, b) => {
        return isConsonant(a) && pgmcNasals.includes(b);
      };
      var isHCluster = (a, b) => {
        return `${a}${b}` !== "ht" && isConsonant(a) && isConsonant(b) && (a === "h" || b === "h");
      };
      var isUncomfortableConsonantCluster = (a, b) => {
        return isNonApproximantApproximantCluster(a, b) || isDoubleStopCluster(a, b) || isNasalEndingCluster(a, b) || isHCluster(a, b);
      };
      var containsUncomfortableConsonantCluster = (word) => {
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
          if (isTrackingCluster && isUncomfortableConsonantCluster(letter, nextLetter)) {
            containsCluster = true;
            break;
          }
        }
        return containsCluster;
      };
      var endsWithUncomfortableConsonantCluster = (word) => {
        const [_, cluster] = separateFinalConsonants(word);
        return containsUncomfortableConsonantCluster(cluster);
      };
      var fixUncomfortableEndCluster = (word) => {
        return allButLastOf(word) + "a" + lastOf(word);
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
        isUncomfortableConsonantCluster,
        containsUncomfortableConsonantCluster,
        endsWithUncomfortableConsonantCluster,
        fixUncomfortableEndCluster
      };
    }
  });

  // src/syllableize.js
  var require_syllableize = __commonJS({
    "src/syllableize.js"(exports, module) {
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

  // src/iMutation.js
  var require_iMutation = __commonJS({
    "src/iMutation.js"(exports, module) {
      var syllableize = require_syllableize();
      var { separateInitialConsonants, getVowelGroups, lastOf, firstOf } = require_utils();
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
      module.exports = (word) => {
        const syllables = syllableize(word);
        return syllables.map((syllable, index) => {
          const nextSyllable = syllables[index + 1];
          if (!nextSyllable)
            return syllable;
          return iMutate(syllable, nextSyllable);
        }).join("");
      };
    }
  });

  // src/aMutation.js
  var require_aMutation = __commonJS({
    "src/aMutation.js"(exports, module) {
      var { aMutators } = require_vowels();
      var { separateInitialConsonants, firstOf, lastOf, getVowelGroups, separateFinalConsonants } = require_utils();
      var syllableize = require_syllableize();
      var containsAMutator = (syllable) => {
        const [_, rest] = separateInitialConsonants(syllable);
        return aMutators.includes(firstOf(rest));
      };
      var shortVowelPosition = (shortVowel, syllable) => {
        const maybeMutatable = lastOf(getVowelGroups(syllable));
        if (!maybeMutatable || maybeMutatable.vowel !== shortVowel)
          return -1;
        return maybeMutatable.position;
      };
      var mutateU = (syllable, nextSyllable) => {
        if (!containsAMutator(nextSyllable))
          return syllable;
        const position = shortVowelPosition("u", syllable);
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
        const position = shortVowelPosition("i", syllable);
        if (position === -1)
          return syllable;
        if (jBlocksMutation(syllable, nextSyllable))
          return syllable;
        return `${syllable.slice(0, position)}${"e"}${syllable.slice(position + 1)}`;
      };
      var mutateE = (syllable, nextSyllable) => {
        if (!containsAMutator(nextSyllable))
          return syllable;
        const position = shortVowelPosition("e", syllable);
        if (position === -1)
          return syllable;
        if (!nasalClusterTriggersMutation(syllable, nextSyllable))
          return syllable;
        return `${syllable.slice(0, position)}${"i"}${syllable.slice(position + 1)}`;
      };
      module.exports = (word) => {
        const syllables = syllableize(word);
        return syllables.map((syllable, index) => {
          const nextSyllable = syllables[index + 1];
          if (!nextSyllable)
            return syllable;
          const phase1 = mutateU(syllable, nextSyllable);
          const phase2 = mutateI(phase1, nextSyllable);
          const phase3 = mutateE(phase2, nextSyllable);
          return phase3;
        }).join("");
      };
    }
  });

  // src/gemination.js
  var require_gemination = __commonJS({
    "src/gemination.js"(exports, module) {
      var { lastOf, isConsonant, separateFinalVowels, separateFinalConsonants } = require_utils();
      var { allShortVowels } = require_vowels();
      var geminate = (word) => {
        return word.split("").reduce((result, char, index, charList) => {
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
      };
      module.exports = (word) => {
        const phase1 = geminate(word);
        return phase1;
      };
    }
  });

  // src/vowelLaxing.js
  var require_vowelLaxing = __commonJS({
    "src/vowelLaxing.js"(exports, module) {
      var { pgmcFricatives, pgmcVelars } = require_consonants();
      var syllableize = require_syllableize();
      var {
        lastOf,
        allButLastOf,
        endsWithUncomfortableConsonantCluster,
        isConsonant,
        isVowel,
        fixUncomfortableEndCluster,
        separateInitialConsonants,
        firstOf,
        containsVowels,
        separateFinalConsonants,
        separateFinalVowels
      } = require_utils();
      var {
        baseVowels,
        longVowels,
        nasalVowels,
        longNasalVowels,
        overlongVowels,
        overlongNasalVowels,
        shortVowelVariantOf,
        longVowelVariantOf
      } = require_vowels();
      var shortRegex = new RegExp(`(${baseVowels.join("|")})`, "g");
      var overlongRegex = new RegExp(`(${overlongVowels.join("|")})`, "g");
      var overlongNasalRegex = new RegExp(`(${overlongNasalVowels.join("|")})`, "g");
      var nasalRegex = new RegExp(`(${nasalVowels.join("|")})`, "g");
      var longNasalRegex = new RegExp(`(${longNasalVowels.join("|")})`, "g");
      var relaxOverlongs = (word) => {
        const syllables = syllableize(word);
        return syllables.map((syllable, index) => {
          const nextSyllable = syllables[index + 1] ?? "";
          let newSyllable = syllable;
          if (overlongRegex.test(nextSyllable) || overlongNasalRegex.test(nextSyllable)) {
            newSyllable = syllable.replace(shortRegex, (_, p1) => longVowelVariantOf(p1)).replace(nasalRegex, (_, p1) => longVowelVariantOf(p1));
          }
          return newSyllable.replace(overlongRegex, (_, p1) => longVowelVariantOf(p1)).replace(overlongNasalRegex, (_, p1) => longVowelVariantOf(p1));
        }).join("");
      };
      var monophthongize = (word) => {
        const newWord = word.replace(/ai/g, "\u0101").replace(/(au|ou)/g, "\u014D").replace(/eu/g, "\u012B").replace(/iu/g, "\u0233");
        const matchIw = newWord.match(/iw/);
        return matchIw && isConsonant(newWord.charAt(matchIw.index + 2)) ? newWord.replace(/iw/, "\u0233") : newWord;
      };
      var mergeInfinitives = (word) => {
        const newWord = word.replace(/(ijaną|janą|aną|ōną)$/, "an");
        if (!/ną$/.test(newWord))
          return newWord;
        const withoutSuffix = newWord.slice(0, -2);
        const [stem, finalVowels] = separateFinalVowels(withoutSuffix);
        const hasPrecedingLongVowel = longVowels.includes(finalVowels) || longNasalVowels.includes(finalVowels);
        return hasPrecedingLongVowel ? stem + shortVowelVariantOf(finalVowels) + "han" : withoutSuffix + "han";
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
        if (/ij(ō|ǭ)$/.test(word))
          return word.replace(/ij(ō|ǭ)$/, !containsVowels(word.slice(0, -3)) ? "\u012B" : "");
        if (/w(ō|ǭ)$/.test(word))
          return word.replace(/w(ō|ǭ)$/, isConsonant(word.slice(-3)[0]) ? "a" : "");
        if (/j(ō|ǭ)$/.test(word))
          return word.replace(/j(ō|ǭ)$/, isConsonant(word.slice(-3)[0]) ? "a" : "");
        if (/(ō|ǭ)$/.test(word))
          return word.replace(/(ō|ǭ)$/, pgmcVelars.includes(word.slice(-2)[0]) ? "a" : "");
        if (/wij(o|ǫ)$/.test(word))
          return word.replace(/wij(o|ǫ)$/, isVowel(word.slice(-5)[0]) ? "wa" : "a");
        if (/ij(o|ǫ)$/.test(word))
          return word.replace(/ij(o|ǫ)$/, "");
        if (/w(o|ǫ)$/.test(word))
          return word.replace(/w(o|ǫ)$/, "");
        if (/j(o|ǫ)$/.test(word))
          return lengthenFinalSylShortVowel(word.replace(/j(o|ǫ)$/, ""));
        if (/(ǫ|o)$/.test(word))
          return word.replace(/(ǫ|o)$/, "a");
        if (/wij(ā|ą̄)$/.test(word))
          return word.replace(/wij(ā|ą̄)$/, isConsonant(word.slice(-5)[0]) ? "a" : "");
        if (/ij(ā|ą̄)$/.test(word))
          return word.replace(/ij(ā|ą̄)$/, !containsVowels(word.slice(0, -3)) ? "\u012B" : "");
        if (/w(ā|ą̄)$/.test(word))
          return word.replace(/w(ā|ą̄)$/, !containsVowels(word.slice(0, -2)) ? "\u0101" : "");
        if (/j(ā|ą̄)$/.test(word))
          return word.replace(/j(ā|ą̄)$/, "");
        if (/(ā|ą̄)$/.test(word))
          return word.replace(/(ā|ą̄)$/, "");
        if (/wij(a|ą)$/.test(word))
          return word.replace(/wij(a|ą)$/, isConsonant(word.slice(-5)[0]) ? "a" : "");
        if (/ij(a|ą)$/.test(word))
          return word.replace(/ij(a|ą)$/, "");
        if (/w(a|ą)$/.test(word))
          return word.replace(/w(a|ą)$/, !containsVowels(word.slice(0, -2)) ? "\u0101" : "");
        if (/j(a|ą)$/.test(word))
          return lengthenFinalSylShortVowel(word.replace(/j(a|ą)$/, ""));
        if (/(ą|a)$/.test(word))
          return word.replace(/(ą|a)$/, "");
        if (/(į|į̄)$/.test(word))
          return word.replace(/(į|į̄)$/, "a");
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
      var handleUncomfortableEndCluster = (word) => {
        if (!endsWithUncomfortableConsonantCluster(word))
          return word;
        return fixUncomfortableEndCluster(word);
      };
      var shortenPreClusterLongVowels = (word) => {
        let newWord = "";
        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          if (longVowels.includes(char) || longNasalVowels.includes(char)) {
            const [followingConsonants, _] = separateInitialConsonants(word.slice(i + 1));
            const consLength = followingConsonants.length;
            if (consLength >= 2) {
              newWord += shortVowelVariantOf(char);
              let newConsonants = followingConsonants;
              const firstConsIsFricative = pgmcFricatives.includes(followingConsonants[0]);
              if (firstConsIsFricative) {
                newConsonants = firstOf(newConsonants) + newConsonants.slice(2);
                if (newConsonants.length === 1) {
                  newConsonants = newConsonants + newConsonants;
                }
              }
              newWord += newConsonants;
              i += consLength;
              continue;
            }
          }
          newWord += char;
        }
        return newWord;
      };
      module.exports = (word) => {
        const phase1 = monophthongize(word);
        const phase2 = relaxOverlongs(phase1);
        const phase3 = mergeInfinitives(phase2);
        const phase4 = reduceVowelBasedSuffixes(phase3);
        const phase5 = denasalize(phase4);
        const phase6 = handleUncomfortableEndCluster(phase5);
        const phase7 = shortenPreClusterLongVowels(phase6);
        return phase7;
      };
    }
  });

  // src/zLoss.js
  var require_zLoss = __commonJS({
    "src/zLoss.js"(exports, module) {
      var {
        allButLastOf,
        lastOf,
        isConsonant,
        endsWithUncomfortableConsonantCluster,
        fixUncomfortableEndCluster
      } = require_utils();
      var dropFinalZ = (word) => {
        const lastChar = lastOf(word);
        const nextToLastChar = lastOf(allButLastOf(word));
        if (lastChar === "s" && nextToLastChar !== "s" && isConsonant(nextToLastChar))
          return word.slice(0, -1);
        if (/iwaz$/.test(word))
          return word.replace(/iwaz$/, "a");
        if (/ijaz$/.test(word))
          return word.replace(/ijaz$/, "");
        if (/waz$/.test(word))
          return word.replace(/waz$/, isConsonant(word.slice(-4)[0]) ? "a" : "");
        if (/az$/.test(word))
          return word.replace(/az$/, "");
        if (/iwiz$/.test(word))
          return word.replace(/iwiz$/, isConsonant(word.slice(-5)[0]) ? "a" : "");
        if (/iz$/.test(word))
          return word.replace(/iz$/, "");
        if (/uz$/.test(word))
          return word.replace(/uz$/, "");
        return word;
      };
      var fixRemainingZAndHs = (word) => {
        return word.replace(/z/g, "r").replace(/hs/, "ks");
      };
      var handleUncomfortableEndCluster = (word) => {
        if (!endsWithUncomfortableConsonantCluster(word))
          return word;
        return fixUncomfortableEndCluster(word);
      };
      module.exports = (word) => {
        const phase1 = dropFinalZ(word);
        const phase2 = fixRemainingZAndHs(phase1);
        const phase3 = handleUncomfortableEndCluster(phase2);
        return phase3;
      };
    }
  });

  // src/wgHardening.js
  var require_wgHardening = __commonJS({
    "src/wgHardening.js"(exports, module) {
      var { lastOf, firstOf, isVowel } = require_utils();
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
      module.exports = (word) => {
        const phase1 = hardenDW(word);
        return phase1;
      };
    }
  });

  // src/syllableReduction.js
  var require_syllableReduction = __commonJS({
    "src/syllableReduction.js"(exports, module) {
      var syllableize = require_syllableize();
      var {
        firstOf,
        lastOf,
        isVowel,
        separateFinalVowels,
        allButLastOf,
        isConsonant
      } = require_utils();
      var { longVowelVariantOf } = require_vowels();
      var shortenThreeSyllablesPlus = (word) => {
        const syllables = syllableize(word);
        if (syllables.length < 3)
          return word;
        const firstSyllable = firstOf(syllables);
        const secondSyllable = syllables[1];
        const lastSyllable = lastOf(syllables);
        const firstConsOfSecondSyllable = firstOf(secondSyllable);
        const [lastSyllPrefix, finalVowels] = separateFinalVowels(lastSyllable);
        const lastConsOfLastSyllable = lastOf(lastSyllPrefix);
        return firstSyllable + firstConsOfSecondSyllable + lastConsOfLastSyllable + finalVowels;
      };
      var softConsToLongVowel = (word) => {
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
      var fixDoubleStops = (word) => {
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
        return newWord;
      };
      module.exports = (word) => {
        const phase1 = shortenThreeSyllablesPlus(word);
        const phase2 = softConsToLongVowel(phase1);
        const phase3 = fixDoubleStops(phase2);
        return phase3;
      };
    }
  });

  // src/shiftFricatives.js
  var require_shiftFricatives = __commonJS({
    "src/shiftFricatives.js"(exports, module) {
      var { pgmcFricatives, pgmcStops } = require_consonants();
      var {
        firstOf,
        lastOf,
        isVowel,
        isConsonant
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
          if (char === "d" && pgmcFricatives.includes(nextChar)) {
            return result + "t";
          }
          return result + char;
        }, "");
      };
      var fPlusFricativeToF = (word) => {
        return word.split("").reduce((result, char) => {
          const prevChar = lastOf(result);
          if (pgmcFricatives.includes(char) && prevChar === "f" && char !== "f") {
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
      module.exports = (word) => {
        const phase1 = bToV(word);
        const phase2 = bToF(phase1);
        const phase3 = dToT(phase2);
        const phase4 = fPlusFricativeToF(phase3);
        const phase5 = gsAndKsToX(phase4);
        const phase6 = dropInitialH(phase5);
        const phase7 = hToK(phase6);
        const phase8 = thornToD(phase7);
        const phase9 = skToSh(phase8);
        const phase10 = dropInitialW(phase9);
        const phase11 = wToV(phase10);
        return phase11;
      };
    }
  });

  // src/modernization.js
  var require_modernization = __commonJS({
    "src/modernization.js"(exports, module) {
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
        containsVowels
      } = require_utils();
      var { baseVowels, longVowels, longVowelVariantOf, shortVowelVariantOf } = require_vowels();
      var { pgmcNasals, pgmcApproximants } = require_consonants();
      var shortRegex = new RegExp(`(${baseVowels.join("|")})`, "g");
      var longPlusWRegex = new RegExp(`(${longVowels.join("|")})w`, "g");
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
      var isNasalOrApproximant = (char) => {
        return pgmcNasals.includes(char) || pgmcApproximants.includes(char);
      };
      var shiftVowels = (word) => {
        return word.replace(/a$/, (_, __, src) => containsVowels(src.slice(0, -1)) ? "a" : "aa").replace(/æ/g, "e").replace(/i/g, "i").replace(/y/g, "u").replace(/ā/g, (_, index, src) => !!src[index + 1] ? "ei" : "aa").replace(/ǣ/g, "oe").replace(/ē/g, "ee").replace(/ī/g, "ie").replace(/ō/g, (_, index, src) => isNasalOrApproximant(src[index + 1]) ? "oe" : "o").replace(/[ūȳ]/g, "au");
      };
      module.exports = (word) => {
        const phase1 = dropWAndModVowels(word);
        const phase2 = tryToShortenSecondSyllable(phase1);
        const phase3 = shiftFricatives(phase2);
        const phase4 = shiftVowels(phase3);
        return phase4;
      };
    }
  });

  // src/massageOutliers.js
  var require_massageOutliers = __commonJS({
    "src/massageOutliers.js"(exports, module) {
      var outlierMap = {
        "kweman\u0105": "kuman\u0105"
      };
      module.exports = (word) => {
        return outlierMap[word] || word;
      };
    }
  });

  // src/index.js
  var require_src = __commonJS({
    "src/index.js"(exports, module) {
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
      var init = (baseWord) => {
        const normalizedWord = baseWord.toLowerCase().replace(/^\*/, "");
        const steps = [];
        steps.push({
          step: "Massage Known Outliers",
          result: massageOutliers(normalizedWord)
        });
        steps.push({
          step: "I-Mutation",
          result: iMutation(lastOf(steps).result)
        });
        steps.push({
          step: "A-Mutation",
          result: aMutation(lastOf(steps).result)
        });
        steps.push({
          step: "Gemination",
          result: gemination(lastOf(steps).result)
        });
        steps.push({
          step: "Vowel Laxing",
          result: vowelLaxing(lastOf(steps).result)
        });
        steps.push({
          step: "Z-Loss",
          result: zLoss(lastOf(steps).result)
        });
        steps.push({
          step: "West-Germanic Hardening",
          result: wgHardening(lastOf(steps).result)
        });
        steps.push({
          step: "Syllable Reduction",
          result: syllableReduction(lastOf(steps).result)
        });
        steps.push({
          step: "Modernization",
          result: modernization(lastOf(steps).result)
        });
        return steps;
      };
      typeof window !== "undefined" && (window.norlunda = init);
      module.exports = init;
    }
  });
  require_src();
})();