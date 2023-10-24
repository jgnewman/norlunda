---
layout: default
permalink: /submitting-a-word
---

# Submitting a word

All of the code powering the Norlunda word generator as well as the rest of this website is currently housed at [GitHub](https://github.com/jgnewman/norlunda). For anyone unfamiliar with GitHub, you can think of it sort of like a social network for code. Using GitHub, code can be uploaded and viewed by others, and depending on how you tweak the settings, others may be given the ability to make suggestions for how the code might be changed.

To submit a new word or set of words for addition to the official Norlunda dictionary, you must first create a free GitHub account. Once your account is created, visit [the official Norlunda "code repository"](https://github.com/jgnewman/norlunda). From here you will be able to submit new words as well as report bugs you may have noticed on the website or in the word generator.

## Submission options

From the home page of the Norlunda code repository, navigate into the `_data` folder, and then into the `dictionary` folder. This folder contains a file for each letter of the English alphabet which altogether contain the full Norlunda dictionary.

Words are organized in alphabetical order by their _English definitions_. This is done so that most of the dictionary can be programmatically re-generated in the future if necessary without having to re-organize all of the files.

Clicking on any of these files will allow you to see its contents. There are two options for suggesting changes to these files. The first may be better if you are less comfortable with learning the ins and outs of GitHub. The second is ultimately better if you already understand how GitHub works or aren't afraid to learn a little bit about how code changes are suggested traditionally.

### Option 1: File an issue

At the top of the repository page is an **Issues** tab. Clicking this tab will show you a page where you can view all of the "issues" that have been filed by anyone and whether they are currently open or have been closed. In the context of GitHub, an issue is just a topic about the codebase that is up for discussion. Issues may be used for proposals, or for things like bug reports.

On the Issues page is a button labeled **New issue**. Click this button to be taken to a form where you can create a new issue. If you are making a new vocabulary proposal, please indicate that in the issue's title, for example, you might title your issue something like "New vocubulary proposal: plant names".

In the body of the issue you may include any explanatory context you like, but please format your proposed suggestions as they appear in the dictionary files. Specifically, if you were going to propose the word _apal_, your issue should contain a [markdown code block](https://www.markdownguide.org/extended-syntax/#fenced-code-blocks) containing the following:

```
- def: apple
  type: noun
  word: apal
  origin: "*aplaz"
  originDef: apple
```

See "Data fields" below for an explanation of all the possible fields you might want to include for a given word you might propose.

Once you've submitted an issue, please feel free to notify the community on [Discord](https://discord.gg/AGvmXRhscG) that you have submitted a proposal for new vocabulary. If your proposal is accepted, somebody who maintains the code on GitHub will handle adding your words to the dictionary.

### Option 2: Submit a pull request

If you are not already familiar with submitting pull requests on GitHub, this is the basic gist:

When viewing the repository home page, there should be a button near the top labeled "Fork". Clicking the down-arrow next to this button will allow you to select an option called "Create a new fork." This will create a copy (or, "fork") of this repository saved to your own GitHub account. Once you have made your own copy of the code, you will be able to make all the edits you like to that copy without any risk of breaking the original code.

Once you select "Create a new fork", you should not need to make any changes to the default configurations presented to you on the next page. Make sure you have selected "Copy the main branch only" and then click "Create fork". After just a few seconds, you should be taken to the home page of your newly forked repository.

On your repository home page, there should be a message near the top telling you whether or not your own code is up to date with all the changes that may have been made to the parent code since your fork was created. If things have gotten out of sync, simply click the "Sync fork" button to copy all of the new changes into your own fork. If things ever become so out-of-sync that they can't be fixed, you can always go into the repository settings, delete your fork, and then create a new fork of the original code.

Once your fork has been created, you are ready to start making changes. You will be able to change as many files as you like and GitHub will keep track of all the ways in which your own copy of the code has deviated from the parent copy. Navigate back down into `_data/dictionary` and select a file to modify. For instance, let's say we want to propose a new word for "night". In that case, we would click on the file called `n.yml`.

At the top of the file, we would click the button with a pencil icon to begin editing the file. Then we would add the following text to the page, making sure to keep our entries in alphabetical order:

```
- def: night
  type: noun
  word: nakt
  origin: "*nahts"
  originDef: night
```

This is a very simple entry but sometimes you may need to add an extra field or two. Please see "Data fields" below for an explanation of all the possible fields you might want to include for a given word you might propose.

Once we are happy with our changes, we can click the "Commit changes" button near the top of the page. Doing so will trigger a popup allowing us to make any notes we might feel are useful to describe how we have changed the code. By default, the commit message will say "Update n.yml" and the extended description will be blank. We can leave it like this, or add whatever text we'd like to these fields. Later, our description will be visible to anyone viewing our proposal.

For beginners, the default option labeled "Commit directly to the main branch" is fine. The other option is useful if you have decided to create "branches" of your own code, which are sort of like mini-forks that are all kept within your own account. When ready, click "commit changes", which will save the file. You may need to refresh the page to see the changes that have just been saved.

Now you are ready to submit a proposal for your changes to be merged into the main repository. Navigate back to the home page of your own repository by clicking the "Code" tab at the top of the page. You should now see a message that says "This branch is 1 commit ahead", indicating that you have made a change that does not yet exist in the main repository. Next to this message, click the "Contribute" button, followed by the "Open pull request" button.

On the page that appears, you will see some information at the top indicating that you are creating a request to merge the main branch of your repository into the main branch of the main repository it was forked from. This is called a "pull request". Below this information you should see a couple more text fields where you can describe all the changes you've made as a whole. In the title field, please indicate that your are submitting a proposal for new vocabulary. For example, you might title your pull request something like "New vocubulary proposal: plant names". You also have the option of providing any explanatory text you think might be useful.

At the bottom of the form is a button labeled "Create pull request". When you are satisfied with everything, click this button to submit the request. Notice that below the form you are able to see all of the changes that will be included in your pull request. Please note that, for new vocabulary proposals, no pull requests will be accepted if files outside of `_data/dictionary` have been modified.

Once you have clicked on "Create pull request" you will be redirected to the "Pull requests" tab of the main repository page where you will be able to view the status of your request. At this point, please feel free to notify the community on [Discord](https://discord.gg/AGvmXRhscG) that you have submitted a proposal for new vocabulary. Once it has been accepted, someone who maintains the main repository will merge it in, and your changes will automatically become live on the website within a few minutes.

## Data fields

There are three fields that must always be present on any new word submitted to the dictionary:

- `def` - This is the word's canonical English definition. Ideally this is just one word, but sometimes a two-word phrase may be necessary.
- `type` - This is the part of speech the word conforms to, for example noun, adjective, preposition, etc.
- `word` - This is the actual Norlunda word being defined.

Please note, if you are not familiar with the YAML file format, some words will have to be surrounded by quotation marks. This is only necessary if the word has a special meaning within the YAML language or can't be recognized as a normal string of text for some reason, for example the words "true" and "false", and any PGmc word beginning with "*" will need to be placed into quotations. If you are editing your files on GitHub, you will know when quotation marks are needed because a word will be highlighted in a different color from all of the other text in the file, indicating that it will not be understood as normal text without quotations.

Most words can be generated directly from a PGmc root. For any word like this, you should also include the following two fields:

- `origin` - This is the PGmc origin of the Norlunda word.
- `originDef` - This is the definition that the PGmc origin would have had. Sometimes the origin does not carry the same literal definition as its descendant words.

There are a few other fields that are not required in every case, but may be extremely important for some words. Please make sure to include them as necessary:


- `synonyms` - This is a list of other English words that the new Norlunda word can represent.
- `hypothetical` - This field is either `true` or `false`. If false, it is not necessary to include this field at all. This field indicates whether the PGmc origin of this word is your own hypothetical reconstruction.
- `irregular` - This field is either `true` or `false` and should _rarely_ be true. If false, it is not necessary to include this field at all. This field is only set to true to indicate when a verb is irregular. As of the time of this writing, Norlunda only contains two irregular verbs and both are already listed in the dictionary.
- `modal` - This field is either `true` or `false` and should only be included for verbs. If false, it is not necessary to include this field at all. This field indicates whether the verb being defined is treated as a modal verb as described in the Norlunda grammar rules.
- `custom` - This field is either `true` or `false`. If false, it is not necessary to include this field at all. A true value indicates that the word can not be auto-generated automatically by the algorithm for any reason. This would be true in the case of words that have been manually altered for grammatical reasons.
- `notes` - This is a basic text field for providing any other necessary context. This field ought to be included any time the `custom` field is set to true in order to explain why the algorithm can not generate this word and how it ought to be derived instead.

{% include prev-next.html list="docs" %}