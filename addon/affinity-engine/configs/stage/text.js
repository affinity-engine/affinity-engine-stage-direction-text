export default {
  priority: 3,
  default: {
    component: {
      stage: {
        direction: {
          text: {
            attrs: {
              layer: 'stage.prompt.text',
              mustClickSelf: false
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
  }
};
