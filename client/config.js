const endpointUrl = process.env.NODE_ENV === 'production' ? '/api/v1/endpoints' : 'http://localhost:3033/api/v1/cumulus/endpoints'

export default {
  app: {
    endpoints: {
      endpoints: endpointUrl
    }
  },
  ece: {
    defaultChatEntryPointId: '1005'
  },
  bot: {
    defaultToken: 'a88ffa6256174c198e62e882d68af6fa'
  },
  lab: {
    caName: 'cdxdemo-CA1-CA',
    caCertUrl: 'http://static.cdxdemo.net/compete-ca.crt'
  },
  sms: {
    // production: '+12142736887'
    production: '+19728539759'
  },
  sm: {
    agentRequestFeedId: '100003',
    taskFeedId: '100000',
    taskScript: 'Dynamic_Task'
  },
  cvp: {
    locales: ['en-us', 'es-mx', 'pt-br']
  },
  whatsapp: {
    betaCode: 'cerulean-lyrdbird',
    dnis: '+1 (415) 523-8886'
  }
}
