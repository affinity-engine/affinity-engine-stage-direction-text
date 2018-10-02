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
  assert.expect(17);

  visit('/test-scenarios/affinity-engine/stage/directions/text').then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), 'persistent', 'text is correct');
    assert.equal($hook('affinity_engine_stage_direction_text').length, 1, 'one text present');
    assert.equal($hook('ember_animation_box').css('opacity'), 1, 'box transitioned in');
  });

  click('.lxl-container');

  andThen(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').length, 1, 'persistent text remains present');
  });

  step();

  click('.lxl-container:last a:first');

  andThen(() => {
    assert.equal($hook('affinity_engine_stage_direction_text_content').last().text().trim(), 'fooclick here', 'text results are correct');
  });

  click('.lxl-container:last');

  step();

  andThen(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').first().css('opacity'), 0.5, 'box transitioned using `transition`');
    assert.equal($hook('affinity_engine_stage_direction_text_content').last().text().trim(), '123', 'text is correct');
    assert.equal($hook('affinity_engine_stage_direction_text').length, 2, 'second text present');
  });

  click('.lxl-container:last');

  andThen(() => {
    assert.equal($hook('affinity_engine_stage_direction_text_content').last().text().trim(), '456', 'text is correctly changed');
    assert.equal($hook('affinity_engine_stage_direction_text_caption').last().text().trim(), 'foo', 'caption is correct');
    assert.ok($hook('affinity_engine_stage_direction_text_caption').last().hasClass('center'), 'caption class is correct');
    assert.equal($hook('affinity_engine_stage_direction_text').length, 2, 'previous text closed');
  });

  click('.lxl-container:last');

  andThen(() => {
    assert.equal($hook('affinity_engine_stage_direction_text_content').last().text().trim(), '789', 'text is correctly changed again');
    assert.ok($hook('affinity_engine_stage_direction_text_caption_inner_container').last().hasClass('foo'), 'class is correct');
    assert.equal($hook('affinity_engine_stage_direction_text').length, 2, 'all previous texts closed, except persistent');
  });

  click('.lxl-container:last');

  andThen(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').length, 1, 'all text except persistent closed');
  });

  step();

  andThen(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').length, 0, 'persistent closed');
  });
});
