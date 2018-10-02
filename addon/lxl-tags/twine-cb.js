import Ember from 'ember';
import { LXLTag } from 'ember-letter-by-letter';

const { RSVP: { resolve } } = Ember;

export default LXLTag.extend({
  tagName: 'a',

  /**
    Called when a tag is opening, such as ((#cb))

    @method open
    @param {Object} lxlContainer
    @param {Array} params

    @return {Promise}
  */

  open(...args) {
    return this.execute(...args);
  },

  /**
    Called when a tag is neither opening nor closing, such as ((cb))

    @method execute
    @param {Object} lxlContainer
    @param {Array} params

    @return {Promise}
  */

  execute() {
    return resolve();
  },

  /**
    Called when a tag is closing, such as ((/cb))

    @method close
    @param {Object} lxlContainer
    @param {Array} params

    @return {Promise}
  */

  close() {
    return resolve();
  }
});
