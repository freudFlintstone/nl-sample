import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-spinner/paper-spinner-lite.js'
import '../my-icons.js'

/**
 * `pull-to-action-container` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class PullToAction extends PolymerElement {
  static get properties() {
    return {
      pullToLoadDistance: {
        type: Number, 
        value: 150
      },
      loading: {
        type: Boolean,
        value: false
      }
    }
  }

  static get template() {
    return html`
      <style>
        #spinner {
          display: block;
          position: fixed;
          top: 0;
          left: calc(50vw - 20px);
          height: 40px;
          width: 40px;
          border-radius: 20px;
          color: black;
          background-color: white;
          will-change: transform;
          transform: translateY(0);
          @apply --shadow-elevation-4dp;
        }

        paper-spinner-lite {
          --paper-spinner-color: transparent;
          --paper-spinner-stroke-width: 4px;
          position: absolute;
          margin: auto;
          top: 6px;
          left: 6px;
        }

        paper-spinner-lite[active] {
          --paper-spinner-color: var(--app-primary-color);
        }

        iron-icon {
          position: absolute;
          margin: auto;
          top: 8px;
          left: 8px;
        }

        iron-icon[active] {
          display: none;
        }
      </style>

      <slot></slot>
      <div id="spinner">
        <paper-spinner-lite active="[[loading]]"></paper-spinner-lite>
        <iron-icon id="" icon="my-icons:refresh" hidden$="[[loading]]"></iron-icon>
      </div>
    `;
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
    this.addEventListener('touchstart', this._handleDragStart.bind(this), { passive: true})
    this.addEventListener('touchmove', this._handleDragMove.bind(this), { passive: true})
    this.addEventListener('touchend', this._handleDragEnd.bind(this), { passive: true})
  }

  _handleDragStart (e) {
    if (this.loading) return
    this.yStart = e.touches[0].pageY
  }

  _handleDragMove (e) {
    if (this.loading) return
    const y = e.touches[0].pageY
    requestAnimationFrame(() => {
      this.$.spinner.style.transform = `translateY(${y - this.yStart}px)`
    })
    if (this.scrollTop === 0 && y - this.yStart > this.pullToLoadDistance) {
      this.dispatchEvent(new CustomEvent('action-requested', { bubbles: true }))
      this.loading = true;
      return
    }
  }

  _handleDragEnd (e) {
    this.yStart = null
    if (!this.loading) this.loadingDone()
  }

  loadingDone () {
    requestAnimationFrame(() => {
      this.$.spinner.style.transition = 'transform 0.3s ease-in-out';
      this.$.spinner.style.transform = `translateY(0) scale(0)`
      setTimeout(() => {
        this.$.spinner.style.transform = '';
        this.$.spinner.style.transition = ''
      }, 300)
      this.loading = false;
    })
  }
}

customElements.define('pull-to-action-container', PullToAction);