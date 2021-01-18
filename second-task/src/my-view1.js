/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item/paper-icon-item.js'
import '@polymer/paper-input/paper-input.js'
import '@polymer/polymer/lib/elements/array-selector.js';
import './elements/client-list-item.js'
import './elements/client-details.js'
import './shared-styles.js';

class MyView1 extends PolymerElement {
  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
      clients: {
        type: Array,
        value: () => {
          return [
            { name: 'Boris Handerson', info: '3 months'}
          ]
        }
      }
    };
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

        app-drawer {
          left: unset;
          --app-drawer-content-container: {
            top: 64px;
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
                        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
          };
        }

        app-drawer app-toolbar {
          height: 132px; 
        }

        .client-header {
          height: 96px;
        }

        app-toolbar paper-input {
          margin: 10px;
          --paper-input-container: {
            border-radius: 5px;
            padding: 10px 16px;
            background-color: var(--paper-grey-100);
          };
          --paper-input-container-underline: { display: none; height: 0;};
          --paper-input-container-underline-focus: { display: none; };
          --paper-input-container-input: {
            background-color: var(--paper-grey-100);
          };
          --paper-input-container-label: {
            display: none;
          },
          --paper-input-container-shared-input-style: {
            width: 100%;
          }
        }

        app-toolbar paper-item.action {
          padding: 0;
          position: absolute
        }

      </style>
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>
            <paper-input no-label-float top-item class="filled" placeholder="Search">
              <iron-icon icon="search" slot="prefix"></iron-icon>
            </paper-input>
            <paper-icon-item bottom-item class="action"> 
              <iron-icon icon="social:person-add" slot="item-icon"></iron-icon>
              Add New Client
            </paper-icon-item>
          </app-toolbar> 
          <iron-selector selected="0" class="drawer-list" role="navigation" on-selected-item-changed="_viewClient">
            <template id="clientsList" is="dom-repeat" items="{{clients}}" as="client">
              <client-list-item client="[[client]]"></client-list-item>
            </template>            
          </iron-selector>
        </app-drawer>
          <client-details client="[[selectedClient]]"></client-details>
        </app-drawer-layout>
    `;
  }

  _viewClient (e) {
    const item = this.$.clientsList.itemForElement(e.detail.value)
    this.selectedClient = item
  }
}

window.customElements.define('my-view1', MyView1);
