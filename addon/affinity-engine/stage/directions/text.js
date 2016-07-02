import Ember from 'ember';
import { Direction } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  merge,
  get,
  getProperties,
  set
} = Ember;

export default Direction.extend({
  componentPath: 'affinity-engine-stage-direction-text',
  layer: 'engine.prompt.text',

  fixtureStore: multiton('affinity-engine/fixture-store', 'engineId'),

  _setup(text, character) {
    this._entryPoint();

    set(this, 'attrs.text', text);
    set(this, 'attrs.character', character);

    return this;
  },

  _reset() {
    const attrs = get(this, 'attrs');

    return this._super(getProperties(attrs, 'text', 'character'));
  },

  classNames(classNames) {
    this._entryPoint();

    set(this, 'attrs.classNames', classNames);

    return this;
  },

  instant(instant = true) {
    this._entryPoint();

    set(this, 'attrs.instant', instant);

    return this;
  },

  keyboardPriority(keyboardPriority) {
    this._entryPoint();

    set(this, 'attrs.keyboardPriority', keyboardPriority);

    return this;
  },

  keys(keys) {
    this._entryPoint();

    set(this, 'attrs.keys', { accept: keys });

    return this;
  },

  name(name) {
    this._entryPoint();

    set(this, 'attrs.name', name);

    return this;
  },

  namePosition(namePosition) {
    this._entryPoint();

    set(this, 'attrs.namePosition', namePosition);

    return this;
  },

  scrollable(scrollable = true) {
    this._entryPoint();

    set(this, 'attrs.scrollable', scrollable);

    return this;
  },

  textTransition(textTransition) {
    this._entryPoint();

    set(this, 'attrs.textTransition', textTransition);

    return this;
  },

  textSpeed(textSpeed) {
    this._entryPoint();

    set(this, 'attrs.textSpeed', textSpeed);

    return this;
  },

  transition(...args) {
    this._entryPoint();

    this.transitionIn(...args);

    return this;
  },

  transitionIn(effect, duration, options = {}) {
    this._entryPoint();

    set(this, 'attrs.transitionIn', merge({ duration, effect }, options));

    return this;
  },

  transitionOut(effect, duration, options = {}) {
    this._entryPoint();

    set(this, 'attrs.transitionOut', merge({ duration, effect }, options));

    return this;
  }
});
