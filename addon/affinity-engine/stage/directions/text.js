import Ember from 'ember';
import { Direction, cmd } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  assign,
  computed,
  get,
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
    'component.stage.direction.every',
    'component.stage.every',
    'children'
  ],

  _setup: cmd({ async: true, render: true }, function(text, options = {}) {
    this.configure(assign({
      callbacks: Ember.Object.create(),
      text,
      transitions: Ember.A()
    }, options));
  }),

  cb: cmd(function(name, cb) {
    set(this, `callbacks.${name}`, cb);
  }),

  close: cmd(function() {
    get(this, 'esBus').publish('shouldRemoveDirection', this);
  }),

  transition: cmd({ async: true, render: true }, function(options = {}) {
    this.getConfiguration('transitions').pushObject(options);
  })
});
