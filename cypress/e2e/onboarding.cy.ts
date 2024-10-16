import authPo from '../support/auth.po';
import organizationPo from '../support/organization.po';
import configuration from '~/configuration';

describe(`Onboarding Flow`, () => {
  it('should complete onboarding', () => {
    cy.visit('/auth/sign-up');

    const email = `onboarding-${Date.now()}@example.com`;
    const invitedEmail = `invited-${Date.now()}@example.com`;
    const password = 'password';

    authPo.interceptSignUp(() => {
      authPo.signUpWithEmailAndPassword(email, password);
    });

    cy.visitSignUpEmailFromInBucket(email);
    cy.url().should('include', configuration.paths.onboarding);

    // this shouldn't be needed, but it is in Github Actions for some reason
    cy.signIn('/onboarding', {
      email,
      password,
    });

    cy.cyGet(`organization-name-input`).type(`Acme`);
    cy.get(`button[type="submit"]`).click();

    organizationPo.$getInvitationEmailInput().clear().type(invitedEmail);

    cy.intercept({
      method: 'POST',
      pathname: '/onboarding/complete',
    }).as('completeOnboarding');

    cy.get(`button[type="submit"]`).click();
    cy.wait('@completeOnboarding');

    cy.wait(500);
    cy.cyGet('complete-onboarding-link').click();

    cy.location('pathname').should(
      'not.include',
      configuration.paths.onboarding,
    );

    cy.contains('Organization').click().wait(100);
    cy.contains('Members').click();

    organizationPo.$getInvitedMemberByEmail(invitedEmail).within(() => {
      organizationPo.$getRoleBadge().should('have.text', `Admin`);
    });
  });
});
