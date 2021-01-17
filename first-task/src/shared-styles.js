/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      @-webkit-keyframes fadeIn {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
      @-moz-keyframes fadeIn {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
      @-o-keyframes fadeIn {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes fadeIn {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }

      .fade-in {
        -webkit-animation: fadeIn 0.3s ease-in; /* Safari 4+ */
        -moz-animation:    fadeIn 0.3s ease-in; /* Fx 5+ */
        -o-animation:      fadeIn 0.3s ease-in; /* Opera 12+ */
        animation:         fadeIn 0.3s ease-in; /* IE 10+, Fx 29+ */
      }

      paper-card {
        --paper-card-background-color: transparent;
        width: 100%;
        border-radius: 10px;
      }

      .circle {
        display: inline-block;
        width: 40px;
        height: 40px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        font-size: 30px;
        line-height: 40px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
