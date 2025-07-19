# 🔥 Configuração do Firebase

Este guia mostra como configurar o Firebase para analytics e crash reporting no seu app "Você tem 1 real?".

## 📋 Pré-requisitos

1. Conta Google
2. Projeto criado no Firebase Console
3. Aplicativo Android configurado

## 🚀 Passo a Passo

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar projeto"
3. Digite o nome: "Você tem 1 real"
4. Ative o Google Analytics (recomendado)
5. Clique em "Criar projeto"

### 2. Adicionar App Android

1. No console do Firebase, clique no ícone Android
2. Digite o package name: `com.voce1real.app`
3. Digite o apelido do app: "Você tem 1 real?"
4. Clique em "Registrar app"

### 3. Baixar google-services.json

1. Baixe o arquivo `google-services.json`
2. Coloque-o na pasta `android/app/` do seu projeto
3. **IMPORTANTE**: Nunca commite este arquivo no Git

### 4. Configurar Dependências

Adicione as dependências do Firebase ao `package.json`:

```bash
npm install @react-native-firebase/app @react-native-firebase/analytics @react-native-firebase/crashlytics
```

### 5. Configurar Analytics

No seu `App.tsx`, adicione:

```typescript
import analytics from '@react-native-firebase/analytics';

// No início do componente App
useEffect(() => {
  // Log do início do app
  analytics().logAppOpen();
}, []);

// Log de eventos do jogo
const logGameEvent = (eventName: string, parameters?: object) => {
  analytics().logEvent(eventName, parameters);
};

// Exemplo de uso:
const startGame = () => {
  logGameEvent('game_started');
  setGameStarted(true);
  setGameOver(false);
};

const handleGameOver = () => {
  logGameEvent('game_over', {
    score: score,
    snake_length: snake.length
  });
  // ... resto do código
};
```

### 6. Configurar Crashlytics

```typescript
import crashlytics from '@react-native-firebase/crashlytics';

// Log de erros não capturados
crashlytics().log('App iniciado com sucesso');

// Log de erros customizados
try {
  // código que pode dar erro
} catch (error) {
  crashlytics().recordError(error);
}
```

## 📊 Eventos Recomendados para Tracking

### Eventos de Jogo:
- `game_started` - Jogo iniciado
- `game_over` - Jogo finalizado (com score)
- `food_collected` - Comida coletada
- `high_score_achieved` - Novo recorde
- `game_restarted` - Jogo reiniciado

### Eventos de Engajamento:
- `app_opened` - App aberto
- `session_started` - Sessão iniciada
- `button_pressed` - Botão pressionado

## 🔧 Configuração no app.json

Adicione as configurações do Firebase ao `app.json`:

```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./android/app/google-services.json"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/analytics",
      "@react-native-firebase/crashlytics"
    ]
  }
}
```

## 📈 Dashboard do Firebase

Após a configuração, você poderá ver no Firebase Console:

### Analytics:
- Usuários ativos
- Eventos personalizados
- Retenção de usuários
- Comportamento no app

### Crashlytics:
- Relatórios de crashes
- Stack traces
- Dispositivos afetados
- Versões do app

## 🛡️ Segurança

### Arquivos sensíveis:
- `google-services.json` - Adicione ao `.gitignore`
- Chaves de API - Nunca exponha no código

### .gitignore:
```
# Firebase
android/app/google-services.json
ios/GoogleService-Info.plist
```

## 💡 Dicas

1. **Teste localmente**: Use o Firebase Emulator Suite
2. **Monitore em produção**: Configure alertas para crashes
3. **Otimize performance**: Use lazy loading para analytics
4. **Respeite a LGPD**: Informe sobre coleta de dados

## 🔗 Links Úteis

- [Firebase Console](https://console.firebase.google.com/)
- [Documentação Firebase](https://firebase.google.com/docs)
- [React Native Firebase](https://rnfirebase.io/)
- [Google Analytics](https://analytics.google.com/)

---

**Com o Firebase configurado, você terá insights valiosos sobre o uso do seu app! 📊** 