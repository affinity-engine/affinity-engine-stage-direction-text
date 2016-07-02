import { Scene } from 'affinity-engine-stage';

export default Scene.extend({
  name: 'Text Direction Test',

  start: async function(script) {
    await script.text('123');
    await script.text('456').name('foo').namePosition('center');
    await script.text('456').classNames(['foo', 'bar']);
  }
});
