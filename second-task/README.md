# \<second-task\>

## The approach

For this example, I used the full starter-kit app template. The most important
aspect is that there are nested _app-drawer-layout_ elements, in essence.
Responsiveness is driven by the use of two properties: `narrow` and `large`,
which correspond to 640px and 1024px breakpoints. `narrow` is provided by
_app-drawer-layout_ , and `large`. Because the main header spans the entire
viewport and polymer's standard layout doesn't, the outer shell is
_app-header-layout_, and the menu button needs to be managed directly, taking
advantage of two-way-binding properties.


The [my-view1](second-task/src/my-view1.js) component contains the nested drawer layout.
There are custom elements for:
- Profile component in main drawer
- Nested view [client-details](second-task/src/elements/client-details.js)
- list item for the clients drawer list [client-list-item](second-task/src/elements/client-list-item.js)
- The smartguides page [smartguides-view](second-task/src/elements/smartguides-view.js)

There are several opportunities for encapsulating more code in this
implementation. I skipped that optimization step for time constraints and the
fact that it is a mockup. 
