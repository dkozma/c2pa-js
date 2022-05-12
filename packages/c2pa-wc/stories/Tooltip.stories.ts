import { Story, Meta } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { Tooltip } from '../src/components/Tooltip';
import '../themes/spectrum.css';

interface ArgTypes {
  tooltipContent: string;
  triggerContent: string;
  theme?: string;
}

export default {
  title: 'Components/Tooltip',
  component: 'cai-tooltip',
  argTypes: {
    tooltipContent: {
      defaultValue: 'Tooltip content',
      control: {
        type: 'text',
      },
    },
    triggerContent: {
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    theme: {
      options: ['default', 'theme-spectrum'],
      defaultValue: 'default',
      control: {
        type: 'select',
      },
    },
  },
} as Meta;

const Base: Story<ArgTypes> = ({
  tooltipContent,
  triggerContent,
  theme,
}: ArgTypes) => {
  return html`
    <cai-tooltip class=${theme}>
      <div slot="content">${tooltipContent}</div>
      ${triggerContent
        ? html`<div slot="trigger">${triggerContent}</div>`
        : nothing}
    </cai-tooltip>
  `;
};

export const Default = Base.bind({});
Default.args = {};

export const Styled = Base.bind({});
Styled.args = {
  theme: 'theme-spectrum',
};

export const WithTextTrigger = Base.bind({});
WithTextTrigger.args = {
  triggerContent: 'Hover over this text',
};
