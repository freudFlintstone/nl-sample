import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-listbox';
import './list-item.js'
import '../shared-styles.js';

/**
 * `list-page` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ListPage extends PolymerElement {
  static get properties() {
    return {
      items: {
        type: Array,
        value: () => { return [] }
      }
    }
  }

  static get template() {
    return html`
      <style>
        paper-listbox {
          --paper-listbox-background-color: transparent;
        }
      </style>
      <style include="shared-styles"></style>
      <paper-listbox>
        <template is="dom-repeat" items="{{items}}">
          <list-item summary=[[item]] on-request-full-content="_getContent" on-blur="_closeItem"></list-item>
        </template>
      </paper-listbox>
    `;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }

  _getContent(e) {
    const target = e.currentTarget
    // Simulating server request delay and response data assignment
    setTimeout(() => {
      target.setContent([1, 2, 3])
    }, 500);
  }

  _closeItem (e) {
    const target = e.currentTarget
    target.close()
  }
}

customElements.define('list-page', ListPage);