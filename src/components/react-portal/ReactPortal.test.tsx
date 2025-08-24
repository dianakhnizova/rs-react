import { render, screen } from '@testing-library/react';
import ReactPortal from './ReactPortal';
import { WRAPPER_ROOT_PORTAL_ID } from '@/sources/constants';

describe('ReactPortal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders children into existing wrapper element', () => {
    const existing = document.createElement('div');
    existing.id = WRAPPER_ROOT_PORTAL_ID;
    document.body.appendChild(existing);

    render(
      <ReactPortal>
        <span>Portal Content</span>
      </ReactPortal>
    );

    expect(screen.getByText('Portal Content')).toBeInTheDocument();
    expect(existing).toContainElement(screen.getByText('Portal Content'));
  });

  it('creates wrapper element if it does not exist', () => {
    expect(document.getElementById(WRAPPER_ROOT_PORTAL_ID)).toBeNull();

    render(
      <ReactPortal>
        <span>New Portal</span>
      </ReactPortal>
    );

    const wrapper = document.getElementById(WRAPPER_ROOT_PORTAL_ID);
    expect(wrapper).not.toBeNull();
    expect(wrapper).toContainElement(screen.getByText('New Portal'));
  });

  it('renders null before wrapper element is set', () => {
    const { container } = render(
      <ReactPortal>
        <span>Delayed Content</span>
      </ReactPortal>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('supports custom wrapperId', () => {
    const customId = 'custom-portal';
    render(
      <ReactPortal wrapperId={customId}>
        <span>Custom Portal Content</span>
      </ReactPortal>
    );

    const wrapper = document.getElementById(customId);
    expect(wrapper).not.toBeNull();
    expect(wrapper).toContainElement(screen.getByText('Custom Portal Content'));
  });
});
