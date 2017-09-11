export default {
  priority: 3,
  component: {
    stage: {
      direction: {
        text: {
          attrs: {
            layer: 'stage.prompt.text'
          }
        }
      },
      layer: {
        stage: {
          prompt: {
            attrs: {
              zIndex: 10
            }
          }
        }
      }
    }
  }
};
