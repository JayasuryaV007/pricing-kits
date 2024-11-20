'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useContext, useEffect } from 'react';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'clsx';

import Button from '~/core/ui/Button';
import isBrowser from '~/core/generic/is-browser';
import { createCheckoutAction } from '~/lib/stripe/actions';
import UserSessionContext from '~/core/session/contexts/user-session';

const CheckoutRedirectButton: React.FCC<{
  hovered: boolean;
  disabled?: boolean;
  stripePriceId?: string;
  recommended?: boolean;
  userId: string;
  onCheckoutCreated?: (clientSecret: string) => void;
}> = ({ children, onCheckoutCreated, ...props }) => {
  const [state, formAction] = useFormState(createCheckoutAction, {
    clientSecret: '',
  });

  const { userSession } = useContext(UserSessionContext);

  useEffect(() => {
    if (state.clientSecret && onCheckoutCreated) {
      onCheckoutCreated(state.clientSecret);
    }
  }, [state.clientSecret, onCheckoutCreated]);

  return (
    <form data-cy={'checkout-form'} action={formAction}>
      <CheckoutFormData
        userId={props.userId}
        email={userSession?.data?.email || ''}
        priceId={props.stripePriceId}
      />

      <SubmitCheckoutButton
        hovered={props.hovered}
        disabled={props.disabled}
        recommended={props.recommended}
      >
        {children}
      </SubmitCheckoutButton>
    </form>
  );
};

export default CheckoutRedirectButton;

function SubmitCheckoutButton(
  props: React.PropsWithChildren<{
    hovered: boolean;
    recommended?: boolean;
    disabled?: boolean;
  }>,
) {
  const { pending } = useFormStatus();

  return (
    <Button
      block
      className={classNames({
        'text-primary-foreground bg-primary dark:bg-white dark:text-gray-900':
          props.recommended || props.hovered,
      })}
      variant={props.hovered ? 'custom' : 'outline'}
      disabled={props.disabled}
      loading={pending}
    >
      <span className={'flex items-center space-x-2'}>
        <span>{props.children}</span>

        <ChevronRightIcon className={'h-4'} />
      </span>
    </Button>
  );
}

function CheckoutFormData(
  props: React.PropsWithChildren<{
    userId: Maybe<string>;
    email: string;
    priceId: Maybe<string>;
  }>,
) {
  return (
    <>
      <input type="hidden" name={'userId'} defaultValue={props.userId} />
      <input type="hidden" name={'email'} defaultValue={props.email} />

      <input type="hidden" name={'returnUrl'} defaultValue={getReturnUrl()} />
      <input type="hidden" name={'priceId'} defaultValue={props.priceId} />
    </>
  );
}

function getReturnUrl() {
  return isBrowser()
    ? [window.location.origin, '/settings/subscriptions'].join('')
    : undefined;
}
