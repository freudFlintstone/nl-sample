import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-tabs/paper-tabs.js'
import '@polymer/paper-tabs/paper-tab.js'
import '../elements/smartguides-view.js'

/**
 * `client-details` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ClientDetails extends PolymerElement {
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
      <style>
        :host {
          display: block;
          height: 100vh;
        }

        paper-tabs {
          --paper-tabs-selection-bar-color: var(--app-primary-color);
          position: sticky;
          top: 128px;
          background-color: white;
          z-index: 2;
          @apply --shadow-elevation-2dp;
        }

        paper-tab {
          --paper-tab-ink: var(--app-primary-color-light);
        }

        iron-pages, iron-pages section {
          display: block;
          box-sizing: border-box;
          height: calc(100vh - 64px - 180px - 48px);
        }

        iron-pages section {
          padding: 10px;
        }
      </style>

        <template is="dom-if" if="{{client.name}}">          
          <paper-tabs selected="{{detailPage}}" fallback-selection="4" scrollable="[[narrow]]">
            <paper-tab>Overview</paper-tab>
            <paper-tab>Client's Profile</paper-tab>
            <paper-tab>Family & Contacts</paper-tab>
            <paper-tab>Pets</paper-tab>
            <paper-tab>Smartguides</paper-tab>
            <paper-tab>Vault</paper-tab>
          </paper-tabs>
          
          <iron-pages selected="{{detailPage}}">
            <section><h2>Overview</h2></section>
            <section><h2>Client's Profile</h2></section>
            <section><h2>Family & Contacts</h2></section>
            <section><h2>Pets</h2></section>
            <smartguides-view></smartguides-view>
            <section><h2>Vault</h2></section>
          </iron-pages>          
      </template>
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
}

customElements.define('client-details', ClientDetails);