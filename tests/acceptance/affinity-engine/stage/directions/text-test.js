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
  assert.expect(4);

  visit('/test-scenarios/affinity-engine/stage/directions/text').then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), '123', 'text is correct');

    return click('.lxl-container');
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text_name').text().trim(), 'foo', 'name is correct');
    assert.ok($hook('affinity_engine_stage_direction_text_name').hasClass('center'), 'name class is correct');

    return click('.lxl-container');
  }).then(() => {
    assert.ok($hook('affinity_engine_stage_direction_text_name_inner_container').hasClass('foo'), 'class is correct');
  });
});
