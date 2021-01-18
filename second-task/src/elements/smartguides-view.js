import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item/paper-item.js'
import '@polymer/paper-button/paper-button.js'
// import '@polymer/paper-toast/paper-toast.js'
import '@polymer/paper-fab/paper-fab.js'
import '@polymer/paper-listbox/paper-listbox.js'
/**
 * `smartguides-view` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class SmartguidesView extends PolymerElement {
  static get properties() {
    return {

    }
  }

  static get template() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        paper-listbox {
          margin: 20px;
          border-radius: 4px;
          padding: 10px;
          @apply --shadow-elevation-2dp;
        }


        paper-listbox paper-item {
          height: 40px;
        }

        paper-listbox paper-item.header {
          color: var(--paper-grey-600);
          border-bottom: 1px solid var(--google-grey-300)
        }

        paper-fab {
          position: absolute;
          bottom: 24px;
          right: 24px;
          background-color: var(--app-primary-color)
        }


        /* Could not make paper-toast render in the right place. If parent
        element is not the active item in iron-pages, paper-toast.fit() can't
        update the position correctly. Using as styled paper-item as a workaround.
        */
        .fake-toast {
          display: flex;
          align-items: center;
          padding: 0 10px;
          font-size: 0.9em;
          font-weight: bold;
          margin: 20px;
          border-radius: 4px;
          background-color: #323232;
          color: #f1f1f1;
          @apply --shadow-elevation-2dp;
        }

        .fake-toast.closed {
          display: none;
        }

        .fake-toast paper-button {
          color: var(--paper-yellow-a100);
          margin-left: auto;
          margin-right: 0;
        }

        .fake-toast iron-icon {
          --iron-icon-height: 20px;
          --iron-icon-width: 20px;
        }
      </style>  
<!--       
      <paper-toast id="toast" always-on-top vertical-align="top" opened duration="-1" 
        text="Listed here are all theyour started SmartGuides documents. You can edit them or start a fresh by clicking the '+' button." 
        on-iron-announce="_fitToast">
      </paper-toast>
       -->
      <paper-item id="toast" class="fake-toast">
        <span>Listed here are all theyour started SmartGuides documents. You can edit them or start a fresh by clicking the <iron-icon icon="icons:add-circle"></iron-icon> button.</span>
        <paper-button on-click="_dismissToast">dismiss</paper-button>
      </paper-item>
      
      <paper-listbox>
        <paper-item class="header">
          List placeholder
        </paper-item>
        <paper-item>
          Item example placeholder
        </paper-item>
        <paper-item>
          Item example placeholder
        </paper-item>
      </paper-listbox>
      <paper-fab icon="add"></paper-fab>
    
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

  _dismissToast (e) {
    this.$.toast.classList.add('closed')
  }
}

customElements.define('smartguides-view', SmartguidesView);