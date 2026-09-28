import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import i18n from './translations/i18n';

vi.mock('./services/notification.services', () => ({
  createOrUpdateMainNotification: vi.fn(),
}));

async function renderApp(path = '/') {
  await i18n.changeLanguage('fr');
  window.history.pushState({}, '', path);
  return render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  );
}

describe('App routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('redirects / to /home and shows the home sections', async () => {
    await renderApp('/');

    expect(await screen.findByText("Aujourd'hui")).toBeInTheDocument();
    expect(screen.getByText('Demain')).toBeInTheDocument();
    expect(screen.getByText('Un jour')).toBeInTheDocument();
    await waitFor(() => expect(window.location.pathname).toBe('/home'));
  });

  it('renders the home route directly', async () => {
    await renderApp('/home');

    expect(window.location.pathname).toBe('/home');
    expect(await screen.findByText("Aujourd'hui")).toBeInTheDocument();
  });

  it('navigates between home and settings tabs', async () => {
    const user = userEvent.setup();
    await renderApp('/home');

    const tabBar = await screen.findByRole('tablist');
    await user.click(within(tabBar).getByText('Réglages'));

    await waitFor(() => expect(window.location.pathname).toBe('/settings'));
    expect(await screen.findByText('Notifications')).toBeInTheDocument();

    await user.click(within(tabBar).getByText('Accueil'));

    await waitFor(() => expect(window.location.pathname).toBe('/home'));
    expect(await screen.findByText("Aujourd'hui")).toBeInTheDocument();
  });
});
