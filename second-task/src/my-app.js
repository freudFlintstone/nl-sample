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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/social-icons.js';
import './elements/user-profile.js'
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #7eadbe;
          --app-primary-color-light: #a8e8fd;
          --app-primary-color-dark: #6899ae;
          --app-alternate-color: #4e8068;
          --app-secondary-color: black;
          
          display: block;

          --paper-font-subhead: {
            font-size: 14px;
          }
        }

        app-header-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: var(--app-primary-color);
          background-color: white;
          box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
                      0px 4px 5px 0px rgba(0, 0, 0, 0.14),
                      0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        app-drawer {
          color: white;
          --app-drawer-content-container: {
            top: 64px;
            background-color: var(--app-primary-color);
          };
        }

        app-drawer app-toolbar {
          background-color: var(--app-primary-color-dark);
          height: 132px;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list hr {
          opacity: 0.5;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          line-height: 40px;
        }

        .drawer-list a iron-icon {
          vertical-align: text-bottom;
          margin-right: 10px;
        }

        .drawer-list a.iron-selected {
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <iron-media-query query="min-width: 1024px" query-matches="{{large}}"></iron-media-query>

      <app-header-layout fullbleed narrow$="[[narrow]]" >
        <app-header slot="header" fixed effects="waterfall">
          <app-toolbar>
            <paper-icon-button icon="icons:menu" drawer-toggle="" toggles active={{openDrawer}}></paper-icon-button>
            <div main-title="">My App</div>
          </app-toolbar>
        </app-header>
        <app-drawer-layout narrow="{{narrow}}" fullbleed>
          <!-- Drawer content -->
          <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]" opened=[[_openDrawer(openDrawer,large)]]>
            <app-toolbar>
              <user-profile user-name="[[user]]"></user-profile>
            </app-toolbar>
            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
              <a> <iron-icon icon="social:people" href="[[rootPath]]view1"></iron-icon>Clients</a>
              <a> <iron-icon icon="icons:lock"></iron-icon>Vault</a>
              <hr>
              <a> <iron-icon icon="icons:gavel"></iron-icon>Attorney Network</a>
            </iron-selector>
          </app-drawer>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <my-view1 name="view1"></my-view1>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-drawer-layout>
      </app-header-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  ready() {
    super.ready()
    this.user = 'Hank'
  }

  _openDrawer (openDrawer, large) {
    return openDrawer || large
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'view1';
    } else if (['view1', 'view2', 'view3'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'view1':
        import('./my-view1.js');
        break;
      case 'view2':
        import('./my-view2.js');
        break;
      case 'view3':
        import('./my-view3.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
