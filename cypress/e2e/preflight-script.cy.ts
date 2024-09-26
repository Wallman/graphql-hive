import { Token } from '../../cypress.config';

before(() => {
  cy.task('deleteUser');
  cy.task<Token>('createUser').then(result => {
    cy.task('createOrganization', result.sAccessToken);
    cy.task('createProject', result.sAccessToken);
  });
});

beforeEach(() => {
  cy.task<Token>('login').then(result => {
    cy.setCookie('sRefreshToken', result.sRefreshToken);
  });
  cy.visit('/foo/my-new-project/development/laboratory');
});

describe('Preflight Script', () => {
  it('mini script editor should be read only', () => {
    cy.dataCy('preflight-script-editor-mini').within(() => {
      cy.get('textarea').type('hello', { force: true });
    });
    cy.dataCy('preflight-script-editor-mini').should(
      'have.text',
      'Cannot edit in read-only editor',
    );
  });
});

describe('Preflight Script Modal', () => {
  const script = 'console.log("Hello_world")';
  const env = '{"foo":123}';

  beforeEach(() => {
    cy.dataCy('preflight-script-modal-button').click();
    cy.dataCy('preflight-script-editor').within(() => {
      cy.get('textarea').type(script, { delay: 0, force: true });
    });
    cy.dataCy('env-editor').within(() => {
      cy.get('textarea').type(env, {
        parseSpecialCharSequences: false,
        force: true,
      });
    });
  });

  it('should save script and env variables in localStorage', () => {
    cy.dataCy('preflight-script-modal-submit').click();
    cy.dataCy('env-editor-mini').should('have.text', env);
    cy.dataCy('preflight-script-editor-mini').should('have.text', script);
    cy.reload();
    cy.dataCy('env-editor-mini').should('have.text', env);
    cy.dataCy('preflight-script-editor-mini').should('have.text', script);
  });

  it('should not save script and env variables when not submitting', () => {
    cy.dataCy('preflight-script-modal-cancel').click();
    cy.dataCy('env-editor-mini').should('have.text', '');
    cy.dataCy('preflight-script-editor-mini').should('have.text', '');
  });

  it('should run script', () => {
    cy.dataCy('run-preflight-script').click();
    cy.dataCy('console-output').should('have.text', 'Log: Hello_world');

    cy.dataCy('preflight-script-editor').within(() => {
      cy.get('textarea').type('{CMD}{A}{Backspace}', { force: true });
      cy.get('textarea').type(
        `console.info(1)
console.warn(true)
console.error('Fatal')
throw new TypeError('Test')`,
        { force: true },
      );
    });
    cy.dataCy('run-preflight-script').click();
    cy.dataCy('console-output').should(
      'have.text',
      [
        // First log previous log message
        'Log: Hello_world',
        // After the new logs
        'Info: 1',
        'Warn: true',
        'Error: Fatal',
        'TypeError: Test',
      ].join(''),
    );
  });

  it('should run script and update env variables', () => {
    cy.dataCy('preflight-script-editor').within(() => {
      cy.get('textarea').type('{CMD}{A}{Backspace}', { force: true });

      cy.intercept('test.com', { body: '"Fixture"' });
      cy.get('textarea').type(
        `const response = await fetch('test.com')
const data = await response.json()
console.log(response)
console.info(data)
lab.environment.set('my-test', data)`,
        { force: true },
      );
    });

    cy.dataCy('run-preflight-script').click();
    cy.dataCy('console-output').should(
      'have.text',
      ['Log: [object Response]', 'Info: Fixture'].join(''),
    );
    cy.dataCy('env-editor').should(
      'include.text',
      // replace space with &nbsp;
      '{  "foo": 123,  "my-test": "Fixture"}'.replaceAll(' ', '\xa0'),
    );
  });
});

describe('should replace headers with env', () => {
  it.only('should work', () => {
    cy.get('[data-name="headers"]').click();
    cy.get('.graphiql-editor-tool .graphiql-editor:last-child textarea').type(
      '{ "__test": "{{foo}} bar {{nonExist}}" }',
      {
        force: true,
        parseSpecialCharSequences: false,
      },
    );
    cy.dataCy('env-editor-mini').within(() => {
      cy.get('textarea').type('{"foo":"injected"}', {
        force: true,
        parseSpecialCharSequences: false,
      });
    });
    cy.intercept('/api/lab/foo/my-new-project/development', req => {
      expect(req.headers.__test).to.equal('injected bar {{nonExist}}');
    });
    cy.get('body').type('{ctrl}{enter}');
  });
});

// todo: test error while setting non primitive in env
