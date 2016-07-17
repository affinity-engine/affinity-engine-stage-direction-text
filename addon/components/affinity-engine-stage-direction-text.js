import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-text';
import { configurable, classNamesConfigurable, deepConfigurable } from 'affinity-engine';
import { DirectableComponentMixin, StyleableComponentMixin, TransitionableComponentMixin } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  Component,
  computed,
  get,
  isPresent,
  run
} = Ember;

const { inject: { service } } = Ember;
const { alias } = computed;

const configurationTiers = [
  'directable.attrs',
  'character.attrs.text',
  'character.attrs',
  'character.attrs.fixture.text',
  'character.attrs.fixture',
  'config.attrs.director.text',
  'config.attrs.director',
  'config.attrs.globals'
];

export default Component.extend(DirectableComponentMixin, StyleableComponentMixin, TransitionableComponentMixin, {
  layout,

  classNames: ['ae-text-container'],
  hook: 'affinity_engine_stage_direction_text',

  config: multiton('affinity-engine/config', 'engineId'),
  translator: service('affinity-engine/translator'),

  character: alias('directable.attrs.character'),
  keyboardActivated: alias('isFocused'),

  customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),
  cps: configurable(configurationTiers, 'cps'),
  keyboardPriority: configurable(configurationTiers, 'keyboardPriority'),
  keys: configurable(configurationTiers, 'keys.accept'),
  instant: configurable(configurationTiers, 'instant'),
  name: configurable(configurationTiers, 'name'),
  namePosition: configurable(configurationTiers, 'namePosition'),
  scrollable: configurable(configurationTiers, 'scrollable'),
  transitionIn: deepConfigurable(configurationTiers, 'transitionIn', 'transition'),
  transitionOut: deepConfigurable(configurationTiers, 'transitionOut'),
  text: configurable(configurationTiers, 'text'),
  tweenEffect: configurable(configurationTiers, 'tweenEffect'),
  tweenRate: configurable(configurationTiers, 'tweenRate'),
  tweenLibrary: alias('config.attrs.affinity-engine.animator.name'),

  didInsertElement(...args) {
    this._super(...args);

    this._handlePriorSceneRecord();
    this._transitionInText();
  },

  _handlePriorSceneRecord() {
    if (isPresent(get(this, 'priorSceneRecord'))) {
      this.resolveAndDestroy();
    }
  },

  _transitionInText() {
    this.executeTransitionIn();
  },

  nameTranslation: computed('name', {
    get() {
      return get(this, 'translator').translate(get(this, 'name'));
    }
  }).readOnly(),

  textTranslation: computed('text', {
    get() {
      return get(this, 'translator').translate(get(this, 'text'));
    }
  }).readOnly(),

  actions: {
    completeText() {
      if (get(this, 'willResolveExternally')) { return; }

      this.executeTransitionOut().then(() => {
        run(() => {
          this.resolveAndDestroy();
        });
      });
    }
  }
});
