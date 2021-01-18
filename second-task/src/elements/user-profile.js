import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

/**
 * `user-profile` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class UserProfile extends PolymerElement {
  static get properties() {
    return {
      userName: {
        type: String,
        value: ''
      }
    };
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          color: white;
        }

        .avatar {
          display: block;
          margin: 20px 10px 10px;
        }

        .avatar iron-icon{
          --iron-icon-height: 48px;
          --iron-icon-width: 48px;
          vertical-align: unset;
        }

        paper-item {
          width: 100%;
          font-size: 0.8em;
        }

        paper-icon-button {
          margin-left: auto;
        }
      </style>
      <div class="circle avatar"><iron-icon icon="account-circle"></iron-icon></div>
      <paper-item bottom-item>
        Welcome back, [[userName]]
        <paper-icon-button icon="arrow-drop-down"></paper-icon-button>
      </paper-item>
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

customElements.define('user-profile', UserProfile);