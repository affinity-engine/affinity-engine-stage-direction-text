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
  layer: 'engine.prompt.text',

  config: multiton('affinity-engine/config', 'engineId'),
  esBus: multiton('message-bus', 'engineId', 'stageId'),
  fixtureStore: multiton('affinity-engine/fixture-store', 'engineId'),

  cbs: computed(() => { return {} }),

  _configurationTiers: [
    'global',
    'component.stage',
    'prompt',
    'text',
    'component.stage.direction.text'
  ],

  _setup: cmd({ async: true, render: true }, function(text, options = {}) {
    this.configure(assign({
      text,
      transitions: Ember.A()
    }, options));
  }),

  cb: cmd(function(name, cb) {
    set(this, `cbs.${name}`, cb);
  }),

  close: cmd(function() {
    get(this, 'esBus').publish('shouldRemoveDirection', this);
  }),

  transition: cmd({ async: true, render: true }, function(options = {}) {
    this.getConfiguration('transitions').pushObject(options);
  })
});
