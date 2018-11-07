export default {
  app: {
    apiBase: {
      'production': '/api/v1',
      'development': 'http://localhost:3032/api/v1'
      // 'development': 'https://toolbox.cdxdemo.net/api/v5'
    },
    endpoints: {
      login: 'http://localhost:3032/api/v1/auth/login',
      logout: 'http://localhost:3033/api/v1/user/logout',
      verticals: 'http://localhost:3033/api/v1/cumulus/verticals'
    }
  },
  ece: {
    defaultChatEntryPointId: '1005'
  },
  bot: {
    defaultToken: 'a88ffa6256174c198e62e882d68af6fa'
  },
  lab: {
    vpnAddress: 'vpn1.cdxdemo.net',
    shortDomain: 'CDXDEMO',
    upnDomain: 'cdxdemo.net',
    taskMrd: 'SocialMiner',
    voiceMrd: 'Cisco_Voice',
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
