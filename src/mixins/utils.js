module.exports = {
  methods: {
    cardIconClass (issueType) {
      switch (issueType) {
        case 'story':
          return 'mdi-sword'
        case 'task':
          return 'mdi-shield-outline'
        case 'bug':
          return 'mdi-biohazard'
      }
    }
  }
}
