import type { Decorator, Preview } from '@storybook/react-vite';
import { IonApp, setupIonicReact } from '@ionic/react';
import { I18nextProvider } from 'react-i18next';
import { sb } from 'storybook/test';
import i18n from '../src/translations/i18n';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

import '../src/theme/variables.css';
import '../src/theme/global.css';

setupIonicReact();

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      media: '',
      onchange: null,
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return false;
      },
    };
  };

sb.mock(import('../src/services/task.services.tsx'), { spy: true });

void i18n.changeLanguage('fr');

const withProviders: Decorator = (Story, context) => {
  const locale = (context.globals.locale as string | undefined) ?? 'fr';
  void i18n.changeLanguage(locale);

  return (
    <I18nextProvider i18n={i18n}>
      <IonApp>
        <Story />
      </IonApp>
    </I18nextProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Locale i18n',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'fr', title: 'Français' },
          { value: 'en', title: 'English' },
        ],
      },
    },
  },
  initialGlobals: {
    locale: 'fr',
  },
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Fail Storybook/Vitest CI runs when axe finds WCAG violations.
      test: 'error',
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      },
    },
  },
};

export default preview;
