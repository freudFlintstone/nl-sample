# \<first-task\>

## The approach

This uses the polymer-starter-kit simple application boilerplpate, for
simplicity. Also, the general layout has nothing special about it. The shell
component, `first-task-app`, has some example data and imports the `list-page`
element, which would be responsible for the list data management. In turn, that
element renders a list of  [`list-item`](src/elements/list-item.js) elements, which have the actual transition
implementation.

My implementation follows this sequence: 
- Clicking the summary version of the item runs a local method that will make the `this.loading` flag true, and fire an event
- The parent listens to the event and fetches the detailed data
- The parent calls `setContent` on the target item, passing as an argument the full data
- The setContent function sets the local `expand` flag, which is the condition for the dom-if templates that alternate the two layouts

The elements are styled and used a simple fade animation instead of the scale
transition in the guidelines example. That was meant to be placeholder setup,
which I used to validate the layout and the transition beahvior coupled with the
dom-if templates.

## Evaluation

This could have been done in a tigher way by using the polymer observers and the
notify config for the properties involved. However, while working on that
strategy, I encountered an odd bug: After the second time you alternate between
states, the property is changed without having any input, which results in the
expanded layout just flashing for a split second. It does not happen if we click
on each item alternately, which points to a possible problem with the instances
of the same element in dom-repeat. 

Because I saw in debugging that at least one event was behaving funny, I decided
to dump that approach. To be honest, it felt like I was a bit rusty with polymer
and it would be easier to use something that doesn't rely so much on the
features they dropped after polymer 3 (two-way-binding). 

Well, after rewriting, the bug persists. In hindsight, I chose a path which doesn't look very good now. Polymer has
some issues with caching and property updates running twice that might be the
root to the bugs that showed up in my code.

