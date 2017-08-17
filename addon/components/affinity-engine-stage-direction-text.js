import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-text';
import { classNames, registrant } from 'affinity-engine';
import { DirectableComponentMixin, StyleableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  computed,
  get,
  set
} = Ember;

const { reads } = computed;

export default Component.extend(DirectableComponentMixin, StyleableComponentMixin, {
  layout,

  classNames: ['ae-stage-direction-text-container'],
  hook: 'affinity_engine_stage_direction_text',

  translator: registrant('affinity-engine/translator'),

  keyboardActivated: reads('isFocused'),

  configuration: reads('direction.configuration'),
  animationLibrary: reads('configuration.animationLibrary'),
  cbs: reads('configuration.cbs'),
  cps: reads('configuration.cps'),
  keyboardPriority: reads('configuration.keyboardPriority'),
  keys: reads('configuration.keys.accept'),
  instant: reads('configuration.instant'),
  static: reads('configuration.static'),
  name: reads('configuration.name'),
  scrollable: reads('configuration.scrollable'),
  transitionIn: reads('configuration.transitionIn'),
  transitionOut: reads('configuration.transitionOut'),
  transitions: reads('configuration.transitions'),
  text: reads('configuration.text'),
  tweenEffect: reads('configuration.tweenEffect'),
  tweenRate: reads('configuration.tweenRate'),

  customClassNames: classNames('configuration.classNames'),
  namePosition: classNames('configuration.namePosition'),

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
      if (get(this, 'static')) { return; }

      set(this, 'willTransitionOut', true);
    },

    didTransitionOut() {
      this.resolveAndDestroy();
    }
  }
});
