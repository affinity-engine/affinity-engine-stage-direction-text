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
    const twineCb = (...params) => {
      const element = params.pop();
      const text = (element.innerText || element.textContent).trim();
      const value = params.length > 1 ? params : params[0];
      this.set('choice', {
        text,
        value
      });
      this.set('willTransitionOut', true);
    };

    this.configure(assign({
      callbacks: Ember.Object.create({
        twine: twineCb
      }),
      text,
      transitions: Ember.A()
    }, options));
  }),

  cb: cmd(function(name, cb) {
    set(this, `callbacks.${name}`, cb);
  }),

  close: cmd(function() {
    this.set('willTransitionOut', true);
  }),

  transition: cmd({ async: true, render: true }, function(options = {}) {
    this.getConfiguration('transitions').pushObject(options);
  })
});
