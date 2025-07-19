# 🔨 Scripts de Build e Publicação

Este arquivo contém comandos úteis para build e publicação do app "Você tem 1 real?".

## 📱 Comandos de Desenvolvimento

### Iniciar o projeto:
```bash
npm start
```

### Executar no Android:
```bash
npm run android
```

### Executar no iOS (apenas macOS):
```bash
npm run ios
```

### Executar na web:
```bash
npm run web
```

## 🏗️ Comandos de Build

### Instalar EAS CLI:
```bash
npm install -g @expo/eas-cli
```

### Login no Expo:
```bash
eas login
```

### Configurar projeto:
```bash
eas build:configure
```

### Build para desenvolvimento:
```bash
eas build --platform android --profile development
```

### Build para preview (APK):
```bash
eas build --platform android --profile preview
```

### Build para produção (AAB):
```bash
eas build --platform android --profile production
```

## 📦 Comandos de Publicação

### Submeter para Play Store:
```bash
eas submit --platform android
```

### Build e submeter em um comando:
```bash
eas build --platform android --profile production --auto-submit
```

## 🧪 Comandos de Teste

### Testar localmente:
```bash
expo start --tunnel
```

### Testar em dispositivo físico:
1. Instale o Expo Go no seu Android
2. Escaneie o QR code
3. Teste todas as funcionalidades

### Testar build de preview:
1. Execute: `eas build --platform android --profile preview`
2. Baixe o APK
3. Instale no dispositivo
4. Teste completamente

## 🔧 Comandos de Manutenção

### Limpar cache:
```bash
npm start --reset-cache
```

### Atualizar dependências:
```bash
npm update
```

### Verificar vulnerabilidades:
```bash
npm audit
```

### Corrigir vulnerabilidades:
```bash
npm audit fix
```

## 📊 Comandos de Analytics

### Instalar Firebase CLI:
```bash
npm install -g firebase-tools
```

### Login no Firebase:
```bash
firebase login
```

### Deploy das regras do Firebase:
```bash
firebase deploy --only firestore:rules
```

## 🚀 Workflow Completo de Publicação

### 1. Preparação:
```bash
# Atualizar versão no app.json
# Testar localmente
npm start
```

### 2. Build:
```bash
# Build para produção
eas build --platform android --profile production
```

### 3. Teste:
```bash
# Baixar e testar o AAB
# Verificar todas as funcionalidades
```

### 4. Publicação:
```bash
# Submeter para Play Store
eas submit --platform android
```

### 5. Monitoramento:
```bash
# Verificar status no Play Console
# Monitorar reviews e downloads
```

## 📝 Checklist de Publicação

### Antes do Build:
- [ ] Versão atualizada no `app.json`
- [ ] Ícones atualizados
- [ ] Testes realizados
- [ ] Dependências atualizadas
- [ ] Cache limpo

### Antes da Submissão:
- [ ] Build testado em dispositivo
- [ ] Screenshots preparadas
- [ ] Descrição atualizada
- [ ] Preço configurado
- [ ] Categoria definida

### Após a Publicação:
- [ ] Status verificado no Play Console
- [ ] Analytics configurado
- [ ] Marketing iniciado
- [ ] Reviews monitorados

## 🐛 Solução de Problemas

### Build falha:
```bash
# Limpar cache
npm start --reset-cache

# Reinstalar dependências
rm -rf node_modules
npm install

# Tentar build novamente
eas build --platform android --profile production
```

### App não abre:
```bash
# Verificar logs
expo start --tunnel

# Testar em dispositivo diferente
# Verificar versão do Android
```

### Erro de submissão:
```bash
# Verificar credenciais
eas login

# Verificar configuração
eas build:configure

# Tentar submissão manual no Play Console
```

## 💡 Dicas Importantes

1. **Sempre teste** antes de publicar
2. **Mantenha backups** do código
3. **Documente mudanças** importantes
4. **Monitore métricas** após publicação
5. **Responda reviews** rapidamente

## 📞 Comandos de Suporte

### Verificar status do build:
```bash
eas build:list
```

### Ver logs do build:
```bash
eas build:view
```

### Cancelar build:
```bash
eas build:cancel
```

---

**Use estes comandos para facilitar o desenvolvimento e publicação! 🚀** 