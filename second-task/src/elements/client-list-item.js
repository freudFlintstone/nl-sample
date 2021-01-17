import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * `client-list-item` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ClientListItem extends PolymerElement  {
  static get properties() {
    return {
      client: {
        type: Object,
        value: () => { return {} }
      }
    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          box-sizing: border-box;
          width:100%;
        }

        :host(.iron-selected) {
          border-right: 3px solid var(--app-primary-color);
        }

        .circle {
          text-transform: capitalize;
        }

        .name {
          color: var(--app-primary-color);
        }

        .info {
          margin-left: auto;
          margin-right: 3px;
          color: var(--google-grey-500);
        }
      </style>
      <paper-icon-item>
        <div class="circle" slot="item-icon">[[_firstLetter(client.name)]]</div>
        <div class="name">[[client.name]]</div>
        <small class="info">[[client.info]]</small>
      </paper-icon-item>
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

  _firstLetter (s) {
    return s.substring(0, 1)
  }
}

customElements.define('client-list-item', ClientListItem);  