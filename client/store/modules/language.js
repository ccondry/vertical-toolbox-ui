const state = {
  languages: [
    { value: 'ar-SA', name: 'Arabic (Saudi Arabia)' },
    { value: 'ar-AE', name: 'Arabic (U.A.E.)' },
    { value: 'zh-CN', name: 'Chinese Simplified (China)' },
    { value: 'zh-TW', name: 'Chinese Traditional (Taiwan)' },
    { value: 'da-DK', name: 'Danish (Denmark)' },
    { value: 'nl-NL', name: 'Dutch (Netherlands)' },
    { value: 'en-UK', name: 'English (UK)' },
    { value: 'en-US', name: 'English (US)' },
    { value: 'fr-CA', name: 'French (Canada)' },
    { value: 'fr-FR', name: 'French (France)' },
    { value: 'de-DE', name: 'German (Germany)' },
    { value: 'el-GR', name: 'Greek (Greece)' },
    { value: 'hi-IN', name: 'Hindi (India)' },
    { value: 'it-IT', name: 'Italian (Italy)' },
    { value: 'ja-JP', name: 'Japanese (Japan)' },
    { value: 'ko-KR', name: 'Korean (Korea)' },
    { value: 'nb-NO', name: 'Nowegian (Norway)' },
    { value: 'pl-Pl', name: 'Polish (Poland)' },
    { value: 'pt-BR', name: 'Portuguese (Brazil)' },
    { value: 'ru-RU', name: 'Russian (Russian Federation)' },
    { value: 'es-MX', name: 'Spanish (Mexico)' },
    { value: 'es-ES', name: 'Spanish (Spain)' },
    { value: 'sv-SE', name: 'Swedish (Sweden)' },
    { value: 'tr-TR', name: 'Turkish (Turkey)' }
  ]
}

const getters = {
  languages: state => state.languages
}

module.exports = {getters, state}