import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit';
import { Thumbnail } from '../src/components/Thumbnail';
import '../themes/spectrum.css';

interface ArgTypes {
  src: string;
  selected: boolean;
  badge: string;
  badgeHelpText?: string;
  theme?: string;
}

export default {
  title: 'Components/Thumbnail',
  component: 'cai-thumbnail',
  argTypes: {
    src: {
      defaultValue: 'https://place-puppy.com/450x300',
      control: {
        type: 'text',
      },
    },
    selected: {
      control: {
        type: 'boolean',
      },
    },
    badge: {
      options: Object.keys(Thumbnail.badgeMap),
      defaultValue: 'none',
      control: {
        type: 'select',
      },
    },
    badgeHelpText: {
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
  src,
  selected,
  badge,
  badgeHelpText,
  theme,
}: ArgTypes) => {
  return html`
    <cai-thumbnail
      src=${src}
      badge=${badge}
      badge-help-text=${badgeHelpText}
      ?selected=${selected}
      class=${theme}
    ></cai-thumbnail>
  `;
};

export const Default = Base.bind({});
Default.args = {};

const Styled = Base.bind({});
Styled.args = {
  theme: 'theme-spectrum',
};

export const Selected = Base.bind({});
Selected.args = {
  selected: true,
};

export const BrokenImage: Story<ArgTypes> = ({ theme }: ArgTypes) => {
  return html`
    <cai-thumbnail src="" badge="alert" class=${theme}></cai-thumbnail>
  `;
};

export const InfoBadgeWithTooltip = Styled.bind({});
InfoBadgeWithTooltip.args = {
  badge: 'info',
  badgeHelpText: 'This image has attribution and history data.',
};

export const StyledInfoBadgeWithTooltip = Styled.bind({});
StyledInfoBadgeWithTooltip.args = {
  badge: 'info',
  badgeHelpText: 'This image has attribution and history data.',
  theme: 'theme-spectrum',
};

export const MissingBadge = Styled.bind({});
MissingBadge.args = {
  badge: 'missing',
};

export const AlertBadge = Styled.bind({});
AlertBadge.args = {
  badge: 'alert',
};
