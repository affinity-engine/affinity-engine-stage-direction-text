import { Scene, step } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  name: 'Text Direction Test',

  start: task(function * (script) {
    const staticText = script.text('static', { static: true});

    yield step();

    staticText.transition({ effect: { opacity: 0.5 }, duration: 0 });

    yield script.text('123');
    yield script.text('456', { name: 'foo', namePosition: 'center' });
    yield script.text('789', { classNames: ['foo', 'bar'] });

    yield step();

    staticText.close();
  })
});
