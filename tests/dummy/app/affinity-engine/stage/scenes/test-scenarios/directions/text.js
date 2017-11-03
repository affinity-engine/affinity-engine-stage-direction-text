import { Scene, step } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  caption: 'Text Direction Test',

  start: task(function * (script) {
    const persistentText = script.text('persistent', { persistent: true, mustClickSelf: true });

    yield step();

    persistentText.transition({ effect: { opacity: 0.5 }, duration: 0 });

    yield script.text('123', { mustClickSelf: true });
    yield script.text('456', { caption: 'foo', captionPosition: 'center', mustClickSelf: true });
    yield script.text('789', { classNames: ['foo', 'bar'], mustClickSelf: true });

    yield step();

    persistentText.close();
  })
});
