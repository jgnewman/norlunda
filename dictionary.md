---
layout: default
permalink: /dictionary
---

# Dictionary

The content on this page is currently experimental. Full dictionary coming soon...


{% assign eng2nor = '' | split: '' %}

{% for wordArr in site.data.dictionary %}
  {% for word in wordArr %}
    {% if word.first %}
      {% assign eng2nor = eng2nor | concat: word %}
    {% endif %}
  {% endfor %}
{% endfor %}

{% assign nor2eng = eng2nor | sort: 'word' %}

{% for word in nor2eng %}
  <div class="word-entry" markdown="1" >

  {% if word.synonyms.first or word.notes.size > 0 %}{: .mb-0 }{% endif %}
  **{{ word.word }}** ({{ word.type }}) - {% if word.type == 'verb' %}_to_ {% endif %} _{{ word.def }}_

  {% if word.synonyms.first %}- Synonyms: {{ word.synonyms | sort | join: ', ' }}{% endif %}
  {% if word.notes.size > 0 %}- {{ word.notes }}{% endif %}
  
  </div>
{% endfor %}

{% include prev-next.html list="navigation" %}