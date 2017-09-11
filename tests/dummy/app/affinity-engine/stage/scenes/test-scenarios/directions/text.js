import { Scene, step } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  caption: 'Text Direction Test',

  start: task(function * (script) {
    const persistentText = script.text('persistent', { persistent: true});

    yield step();

    persistentText.transition({ effect: { opacity: 0.5 }, duration: 0 });

    yield script.text('123');
    yield script.text('456', { caption: 'foo', captionPosition: 'center' });
    yield script.text('789', { classNames: ['foo', 'bar'] });

    yield step();

    persistentText.close();
  })
});
