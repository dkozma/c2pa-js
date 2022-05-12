/**
 * Copyright 2021 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultStyles } from '../styles';
import { exportParts, importParts } from '../directives/ExportParts';
import { Popover, Placement } from './Popover';
import '../../assets/svg/monochrome/help.svg';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'cai-tooltip': any;
    }
  }
}

@customElement('cai-tooltip')
export class Tooltip extends LitElement {
  static readonly popoverPrefix = 'tooltip';

  static readonly cssParts = {
    ...importParts(Popover.cssParts, Tooltip.popoverPrefix),
  };

  @property({ type: String })
  placement: Placement = 'auto';

  static get styles() {
    return [
      defaultStyles,
      css`
        :host {
          display: inline-block;
        }
        #trigger {
          --cai-icon-width: var(--cai-popover-icon-width, 16px);
          --cai-icon-height: var(--cai-popover-icon-height, 16px);
          --cai-icon-fill: var(--cai-popover-icon-fill, #a8a8a8);
          cursor: pointer;
        }
        #content {
          max-width: 180px;
        }
        #popover::part(tooltip-popover-box) {
          border-radius: var(--cai-border-radius);
          background-color: #fff;
          min-width: 185px;
          max-width: 250px;
          filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.4));
        }
        #popover::part(tooltip-popover-content) {
          font-size: 14px;
          padding: 10px;
        }
      `,
    ];
  }

  render() {
    return html`
      <cai-popover
        id="popover"
        placement=${this.placement}
        ?interactive=${false}
        part-prefix=${Tooltip.popoverPrefix}
        exportparts=${exportParts(Popover.cssParts, Tooltip.popoverPrefix)}
      >
        <div id="trigger" slot="trigger">
          <slot name="trigger">
            <cai-icon-help></cai-icon-help>
          </slot>
        </div>
        <div id="content" slot="content">
          <slot name="content"></slot>
        </div>
      </cai-popover>
    `;
  }
}
