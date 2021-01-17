import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class FirstTaskApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        .container {
          max-width: 1000px;
          margin: auto;
        }
      </style>
      <h2>Implementing an animated expanding list-item </h2>
      <div class="container">
        <list-page></list-page>
      </div>
    `;
  }
  
}

window.customElements.define('first-task-app', FirstTaskApp);
