import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-text';
import { registrant } from 'affinity-engine';
import { DirectableComponentMixin, StyleableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  computed,
  get,
  set
} = Ember;

const { alias } = computed;

export default Component.extend(DirectableComponentMixin, StyleableComponentMixin, {
  layout,

  classNames: ['ae-stage-direction-text-container'],
  hook: 'affinity_engine_stage_direction_text',

  translator: registrant('affinity-engine/translator'),

  character: alias('directable.attrs.character'),
  keyboardActivated: alias('isFocused'),

  animationLibrary: alias('directable.animationLibrary'),
  customClassNames: alias('directable.customClassNames'),
  cps: alias('directable.cps'),
  keyboardPriority: alias('directable.keyboardPriority'),
  keys: alias('directable.keys'),
  instant: alias('directable.instant'),
  isStatic: alias('directable.isStatic'),
  links: alias('directable.links'),
  name: alias('directable.name'),
  namePosition: alias('directable.namePosition'),
  scrollable: alias('directable.scrollable'),
  transitionIn: alias('directable.transitionIn'),
  transitionOut: alias('directable.transitionOut'),
  text: alias('directable.text'),
  tweenEffect: alias('directable.tweenEffect'),
  tweenRate: alias('directable.tweenRate'),

  nameTranslation: computed('name', {
    get() {
      const name = get(this, 'name.key') || get(this, 'name');
      const options = get(this, 'name.options');

      return get(this, 'translator').translate(name, options) || name;
    }
  }).readOnly(),

  textTranslation: computed('text', {
    get() {
      const text = get(this, 'text.key') || get(this, 'text');
      const options = get(this, 'text.options');

      return get(this, 'translator').translate(text, options) || text;
    }
  }).readOnly(),

  actions: {
    completeText() {
      if (get(this, 'isStatic')) { return; }

      set(this, 'willTransitionOut', true);
    },

    didTransitionOut() {
      this.resolveAndDestroy();
    }
  }
});
