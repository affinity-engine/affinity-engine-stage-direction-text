import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-text';
import { AnimatableMixin, classNames, registrant } from 'affinity-engine';
import { DirectableComponentMixin, StyleableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  computed,
  get,
  set
} = Ember;

const { reads } = computed;

export default Component.extend(AnimatableMixin, DirectableComponentMixin, StyleableComponentMixin, {
  layout,

  classNames: ['ae-stage-direction-text-container', 'ae-hidden'],
  hook: 'affinity_engine_stage_direction_text',
  mediaElementSelector: '.ae-stage',

  translator: registrant('affinity-engine/translator'),

  keyboardActivated: reads('isFocused'),

  linkedDirections: reads('direction.linkedDirections'),
  configuration: reads('direction.configuration.attrs'),
  animator: reads('configuration.animator'),
  callbacks: reads('configuration.callbacks'),
  caption: reads('configuration.caption'),
  duration: reads('configuration.lxlAnimation.duration'),
  effect: reads('configuration.lxlAnimation.effect'),
  instant: reads('configuration.instant'),
  keyboardPriority: reads('configuration.keyboardPriority'),
  keys: reads('configuration.keys.accept'),
  persistent: reads('configuration.persistent'),
  rate: reads('configuration.lxlAnimation.rate'),
  scrollable: reads('configuration.scrollable'),
  transitionIn: reads('configuration.transitionIn'),
  transitionOut: reads('configuration.transitionOut'),
  transitions: reads('configuration.transitions'),
  text: reads('configuration.text'),

  customClassNames: classNames('configuration.classNames'),
  captionPosition: classNames('configuration.captionPosition'),

  captionTranslation: computed('caption', {
    get() {
      const caption = get(this, 'caption.key') || get(this, 'caption');
      const options = get(this, 'caption.options');

      return get(this, 'translator').translate(caption, options) || caption;
    }
  }).readOnly(),

  textTranslation: computed('text', {
    get() {
      const text = get(this, 'text.key') || get(this, 'text');
      const options = get(this, 'text.options');

      return get(this, 'translator').translate(text, options) || text;
    }
  }).readOnly(),

  didTransitionOut() {
    this.resolveAndDestroy();
  },

  actions: {
    completeText() {
      if (get(this, 'persistent')) { return; }

      set(this, 'willTransitionOut', true);
    }
  }
});
