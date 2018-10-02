import Ember from 'ember';
import { Direction, cmd } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  assign,
  computed,
  set
} = Ember;

export default Direction.extend({
  componentPath: 'affinity-engine-stage-direction-text',

  config: multiton('affinity-engine/config', 'engineId'),
  esBus: multiton('message-bus', 'engineId', 'stageId'),
  fixtureStore: multiton('affinity-engine/fixture-store', 'engineId'),

  cbs: computed(() => { return {} }),

  _configurationTiers: [
    'component.stage.direction.text',
    'text',
    'component.stage.direction.prompt',
    'prompt',
    'component.stage.direction.all',
    'component.stage.all',
    'all'
  ],

  _setup: cmd({ async: true, render: true }, function(text, options = {}) {
    const twine = (...params) => {
      const element = params.pop();
      const text = (element.innerText || element.textContent).trim();
      const value = params.length > 1 ? params : params[0];
      this.set('choice', {
        text,
        value
      });
      this.set('willTransitionOut', true);
    };

    const twineCb = (...params) => {
      const cbName = params.shift();
      const element = params.pop();
      const text = (element.innerText || element.textContent).trim();
      const value = params.length > 1 ? params : params[0];
      this.get(`configuration.attrs.callbacks.${cbName}`)({
        text,
        value
      });
    }

    const callbacks = Ember.Object.create(assign({
      twine,
      'twine-cb': twineCb
    }, options.callbacks || {}));

    delete options.callbacks;

    this.configure(assign({
      callbacks,
      text,
      transitions: Ember.A()
    }, options));
  }),

  cb: cmd(function(name, cb) {
    set(this, `configuration.attrs.callbacks.${name}`, cb);
  }),

  close: cmd(function() {
    this.set('willTransitionOut', true);
  }),

  transition: cmd({ async: true, render: true }, function(options = {}) {
    this.getConfiguration('transitions').pushObject(options);
  })
});
