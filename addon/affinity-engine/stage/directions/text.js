import Ember from 'ember';
import { configurable, classNamesConfigurable, deepConfigurable } from 'affinity-engine';
import { Direction } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  computed,
  merge,
  get,
  getProperties,
  set
} = Ember;

const configurationTiers = [
  '_attrs',
  'character.attrs.text',
  'character.attrs',
  'character.attrs.fixture.text',
  'character.attrs.fixture',
  'config.attrs.component.stage.direction.text',
  'config.attrs.component.stage',
  'config.attrs'
];

export default Direction.extend({
  componentPath: 'affinity-engine-stage-direction-text',
  layer: 'engine.prompt.text',

  attrs: computed(() => new Object({
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
    tweenEffect: configurable(configurationTiers, 'lxlTransition.effect'),
    tweenRate: configurable(configurationTiers, 'lxlTransition.rate')
  })),

  config: multiton('affinity-engine/config', 'engineId'),
  fixtureStore: multiton('affinity-engine/fixture-store', 'engineId'),

  _setup(text, character) {
    this._entryPoint();

    set(this, 'attrs.text', text);
    set(this, 'character', character);

    return this;
  },

  _reset() {
    const _attrs = get(this, '_attrs');

    return this._super(getProperties(_attrs, 'text', 'character'));
  },

  classNames(classNames) {
    this._entryPoint();

    set(this, '_attrs.classNames', classNames);

    return this;
  },

  instant(instant = true) {
    this._entryPoint();

    set(this, '_attrs.instant', instant);

    return this;
  },

  keyboardPriority(keyboardPriority) {
    this._entryPoint();

    set(this, '_attrs.keyboardPriority', keyboardPriority);

    return this;
  },

  keys(keys) {
    this._entryPoint();

    set(this, '_attrs.keys', { accept: keys });

    return this;
  },

  name(name) {
    this._entryPoint();

    set(this, '_attrs.name', name);

    return this;
  },

  namePosition(namePosition) {
    this._entryPoint();

    set(this, '_attrs.namePosition', namePosition);

    return this;
  },

  scrollable(scrollable = true) {
    this._entryPoint();

    set(this, '_attrs.scrollable', scrollable);

    return this;
  },

  textTransition(textTransition) {
    this._entryPoint();

    set(this, '_attrs.textTransition', textTransition);

    return this;
  },

  textSpeed(textSpeed) {
    this._entryPoint();

    set(this, '_attrs.textSpeed', textSpeed);

    return this;
  },

  transition(...args) {
    this._entryPoint();

    this.transitionIn(...args);

    return this;
  },

  transitionIn(effect, duration, options = {}) {
    this._entryPoint();

    set(this, '_attrs.transitionIn', merge({ duration, effect }, options));

    return this;
  },

  transitionOut(effect, duration, options = {}) {
    this._entryPoint();

    set(this, '_attrs.transitionOut', merge({ duration, effect }, options));

    return this;
  }
});
