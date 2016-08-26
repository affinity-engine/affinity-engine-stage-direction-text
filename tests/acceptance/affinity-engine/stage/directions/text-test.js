import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../../../tests/helpers/module-for-acceptance';
import { $hook } from 'ember-hook';

moduleForAcceptance('Acceptance | affinity-engine/stage/directions/text', {
  beforeEach() {
    Ember.$.Velocity.mock = true;
  },

  afterEach() {
    Ember.$.Velocity.mock = false;
  }
});

test('Affinity Engine | stage | Directions | Text', function(assert) {
  assert.expect(8);

  visit('/test-scenarios/affinity-engine/stage/directions/text').then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), '123', 'text is correct');
    assert.equal($hook('affinity_engine_stage_direction_text').length, 1, 'one text present');
    assert.equal($hook('ember_animation_box').css('opacity'), 1, 'box transitioned in');

    return click('.lxl-container');
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text_name').text().trim(), 'foo', 'name is correct');
    assert.ok($hook('affinity_engine_stage_direction_text_name').hasClass('center'), 'name class is correct');
    assert.equal($hook('affinity_engine_stage_direction_text').length, 1, 'previous text closed');

    return click('.lxl-container');
  }).then(() => {
    assert.ok($hook('affinity_engine_stage_direction_text_name_inner_container').hasClass('foo'), 'class is correct');
    assert.equal($hook('affinity_engine_stage_direction_text').length, 1, 'all previous texts closed');
  });
});
