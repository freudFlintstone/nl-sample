import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../elements/list-page.js'
import '../shared-styles.js'
/**
 * @customElement
 * @polymer
 */
class FirstTaskApp extends PolymerElement {
  static get properties() {
    return {
      listItems: {
        type: Array,
        value: () => { return [
          { people: 'John, Ana', title: 'Message title', description: 'A snippet of the content.', time: '10 min ago' },
          { people: 'Mark, Sarah, Adrian', title: 'New Message', description: 'Yet another piece of content.', time: '3h ago' },
        ]}
      }      
    };
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background: whitesmoke;
          height: 100vh;
        }

        .container {
          max-width: 1000px;
          margin: auto;
        }
      </style>
      <h2>Implementing an animated expanding list-item </h2>
      <div class="container">
        <list-page items="[[listItems]]"></list-page>
      </div>
    `;
  }
  
}

window.customElements.define('first-task-app', FirstTaskApp);
