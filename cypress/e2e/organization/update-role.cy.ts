import organizationPageObject from '../../support/organization.po';

describe(`Update User Role`, () => {
  const email = `test-role-update@makerkit.dev`;

  function signIn() {
    const organization = organizationPageObject.useDefaultOrganization();

    cy.signIn(`/dashboard/${organization}/settings/organization/members`);
  }

  describe(`Given the current user updates a member's role`, () => {
    describe('When the request is successful', () => {
      it('the UI will be updated accordingly', () => {
        signIn();

        organizationPageObject.$getMemberByEmail(email).within(() => {
          organizationPageObject.$getRoleBadge().should(`contain`, `Admin`);
        });
      });
    });
  });
});
