# \<third-task\>

## The approach

### Server pagination

I took the simplest, more straightforward approach. The [main
element](src/third-task-app/third-task-app.js) stores a cursor as
`currentLastItem`, which is sent in the body value `starting_after`, and updated
everytime a new request is successful. I haven't implemented some of the details
that would be necessary in a production version, like setting the initial
cursor, keeping track of the total items, or allowing to change pagination
parameters in any way.

The request is implemented using the fetch API, but for the mockup, there's a
simple simulation of the flow, including random errors, so the UI behavior can be observed.

### UI implementation

Like with the second task, some of the code presented here would be isolated in
more components in a normal application. But this is a one element example, and
using paper elements, so the main element is all there is. I did, however,
choose to implement the entire "pull to load" behavior in a separate element,
[`pull-to-action-container`](src/elements/pull-to-action-container.js), and
that's the part I'm explaining here.

> A quick observation: A proper implementation would include mouse events, which
> means a lot more code to avoid conflicting behavior. But in the interest of
> simplicity, I only dealt with the events dedicated to mobile devices. Please,
> use the **dev-tools** in your browser with a mobile preset to test.  

To achieve the desired effect, I added event listeners for `touchstart`,
`touchmove`, `touchend`. 

The first one only stores the vertical position of the
interaction start. 

The `touchmove` handler updates the spinner position, using the distance of
current drag position to the start point, and the styles, always inside a
requestAnimationFrame call, to avoid performance issues. It will check if a
chekpoint is reached, to trigger an event requesting action and change the loading `flag`.

The last handler just resets properties and styles. It checks the `loading` flag
to decide on it being a cancelling drag, by not reaching the trigger checkpoint,
or a full reset.

