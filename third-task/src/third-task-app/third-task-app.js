import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-toast/paper-toast.js';
import '../my-icons.js'
import '../elements/pull-to-action-container.js'

/**
 * @customElement
 * @polymer
 */
class ThirdTaskApp extends PolymerElement {
  static get properties() {
    return {
      items: {
        type: Array,
        value: () => { return [] }
      },
      exampleData: {
        type: Array,
        value: () => {
          return [
            {id:"1",name:"John",detail:"",last_activity_on:"date",photo_url:"",favorite:true},
            {id:"2",name:"Mary",detail:"",last_activity_on:"date",photo_url:"",favorite:true},
            {id:"3",name:"Peter",detail:"",last_activity_on:"date",photo_url:"",favorite:false},
          ]
        }
      },
      sampleError: {
        type: Object,
        value: () => { 
          return { status:'xxx', id:"", type:"", message:"Server Error. Try again" }
        }
      }
      
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --app-primary-color: #7eadbe;
          --app-primary-color-light: #a8e8fd;
          --app-primary-color-dark: #6899ae;
          --app-alternate-color: #4e8068;
          --app-secondary-color: black;
          --paper-font-subhead: {
            font-size: 14px;
          }
        }

        app-header {
          color: white;
          background-color: var(--app-primary-color) ;
          @apply --shadow-elevation-4dp;
        }

        .container {
          max-width: 1000px;
          box-sizing: border-box;
          width: 100vw;
          height: 100%;
          margin: auto;
          padding: 20px;
        }
        
        .container paper-card {
          box-sizing: border-box;
          width: 100%;
          min-height: 100px;
          margin: 10px auto;
          padding: 10px;
          border-radius: 10px;
        }
      </style>
      <app-header-layout fullbleed>
        <app-header fixed condenses slot="header">
          <app-toolbar>
            <paper-icon-button icon="my-icons:menu" drawer-toggle="" ></paper-icon-button>
            <div main-title> Pull down to load more example</div>
          </app-toolbar>
        </app-header>
        <pull-to-action-container id="container" class="container" on-action-requested="_loadMore">
          <template is="dom-if" if="{{!items.length}}">
            <paper-card>
              <h4>No items. Pull the get more data.</h4>
            </paper-card>
          </template> 
          <template is="dom-repeat" items="[[items]]">
            <paper-card heading="[[item.name]]">
              <template is="dom-if" if="{{item.favorite}}">
                <paper-icon-button icon="my-icons:favorite" ></paper-icon-button>
              </template>
            </paper-card>
          </template>
        </pull-to-action-container>
      </app-header-layout>
      
      <paper-toast id="errorToast"></paper-toast>
      
    `;
  }

  // Simplified error handling
  handleError (error) {
    this.$.errorToast.show(error.message)
  }

  async _loadMore (e) {
    console.log('request more data')
    const body = JSON.stringify({ limit: 5, starting_after: this.currentLastItem, ending_before:null, })
    try {
      // The request would be set up like this 
      // const response = await fetch('server-url', { body, method: 'GET', headers: { 'Content-Type': 'application/json' } }) 
  
      // Because this is a mockup, we are going to use a fixed response, simulating errors 20% of the time
      const response = { ok: Math.random() > 0.2, data: [...this.exampleData] }
      
      // Simulating a 2s delay, to be able to show the spinner animation, and using `response.data` instead of `await response.json()`
      setTimeout(() => {
        this.$.container.loadingDone();
        if (response.ok) {
          this.currentLastItem = response.data.unshift().id
          this.push('items', ...response.data)
          console.log(this.items)
        } else {
          this.handleError(this.sampleError)
        }
      }, 2000);
      
    } catch (error) {
      console.log(error)
      this.handleError(this.sampleError)
    }
  }
}

window.customElements.define('third-task-app', ThirdTaskApp);
