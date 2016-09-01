import { Scene } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  name: 'Text Direction Test',

  start: task(function * (script) {
    yield script.text('123');
    yield script.text('456').name('foo').namePosition('center');
    yield script.text('456').classNames(['foo', 'bar']);
  })
});
