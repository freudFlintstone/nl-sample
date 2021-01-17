import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-progress/paper-progress.js'
import '../shared-styles.js'

/**
 * `list-item` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ListItem extends PolymerElement {
  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: false
      },
      summary: {
        type: Object,
        value: () => {
          return {
            people: '',
            title: '',
            description: '' 
          }
        }
      },
      fullContent: {
        type: Array,
        value: () => { return [] }
      },
      expand: {
        type: Boolean,
        value : false
      }
    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host(:focus), :host(:active) {
          outline: none;
        }
        
        /* Preview styles */

        paper-icon-item {
          background-color: white;
        }

        paper-progress {
          box-sizing: border-box;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          visibility: hidden;
        }

        paper-progress[indeterminate] {
          visibility: visible;
        }

        .avatar {
          background-color: var(--paper-green-600);
        }

        .from {
          width: 20%; 
        } 

        .subject {
          font-weight: bold;
          margin-right: 24px;
        }

        .message {
          max-width: 60%;
          margin-right: auto;
        }

        .content, .time {
          font-size: 0.8em;
          color: var(--google-grey-500);
          margin: auto
        }

        .time {
          margin-right: 10px;
        }

        /* Full content styles */

        paper-card {
          margin: 20px;
          left: -40px;
          padding: 10px;
          width: calc(100% + 40px);
          background-color: white;
        }
      </style>

      <template is="dom-if" if="[[!expand]]">
        <paper-icon-item class="summary fade-in" on-click="loadContent">
          <div class="circle avatar" slot="item-icon"></div>
          <div class="from">[[summary.people]]</div>
          <div class="message"><span class="subject">[[summary.title]]</span> <span class="content">[[summary.description]]</span></div>
          <div class="time">[[summary.time]]</div>
          <paper-progress indeterminate$=[[loading]]></paper-progress>
        </paper-icon-item>
      </template>

      <template is="dom-if" if="[[expand]]">
        <paper-card class="full-content fade-in">
          <paper-listbox >
            <paper-item class="header">
              <paper-item-body>
                <h2>Thread Title</h2>
              </paper-item-body>
              <paper-icon-button icon="more-vert"></paper-icon-button>
            </paper-item>
            <template is="dom-repeat" items="{{fullContent}}" as="message">
              <paper-icon-item>
                <div class="circle avatar" slot="item-icon"></div>
                <paper-item-body two-line?=[[twoLine]]>
                  <div>Full content</div>
                  <div secondary>This is a snippet of the full...</div>
                </paper-item-body>
              </paper-icon-item>
            </template>
          </paper-listbox>
        </paper-card>
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

  loadContent () {
    this.loading = true;
    this.dispatchEvent(new CustomEvent('request-full-content', { bubbles: true }))
  }

  setContent (data) {
    console.log(data)
    this.setProperties({fullContent: data, expand: true, loading: false })
  }

  close() {
    this.expand = false
  }
}

customElements.define('list-item', ListItem);