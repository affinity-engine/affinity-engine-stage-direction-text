import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import registerETTestHelpers from './affinity-engine/stage/register-test-helpers';
import keyboardRegisterTestHelpers from './ember-keyboard/register-test-helpers';

export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    registerETTestHelpers();
    keyboardRegisterTestHelpers();
    application.injectTestHelpers();
  });

  return application;
}
