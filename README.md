# 🐍 Você tem 1 real?

Um jogo Snake simples e divertido para Android, desenvolvido com React Native e Expo.

## 📱 Sobre o App

"Você tem 1 real?" é um jogo Snake clássico com interface moderna e intuitiva. O objetivo é controlar uma cobra para coletar maçãs e crescer, evitando colidir com o próprio corpo.

### Características:
- 🎮 Jogo Snake clássico e viciante
- 📊 Sistema de pontuação e recordes
- 🎨 Interface moderna e responsiva
- 📱 Controles touch intuitivos
- 💾 Salvamento automático de recordes
- 🔄 Modo de jogo infinito

## 🚀 Como Executar

### Pré-requisitos:
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para desenvolvimento Android)

### Instalação:

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd voce-tem-1-real
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Use o Expo Go no seu dispositivo Android ou execute no emulador:
```bash
npm run android
```

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **AsyncStorage** - Armazenamento local
- **Expo Ads** - Monetização (configurado)

## 📦 Estrutura do Projeto

```
voce-tem-1-real/
├── App.tsx              # Componente principal do jogo
├── app.json             # Configurações do Expo
├── package.json         # Dependências do projeto
├── assets/              # Imagens e ícones
└── README.md           # Este arquivo
```

## 🎮 Como Jogar

1. Toque em "Iniciar Jogo"
2. Use os botões de direção para controlar a cobra
3. Colete as maçãs (pontos vermelhos) para crescer e ganhar pontos
4. Evite colidir com o próprio corpo
5. Tente bater seu recorde!

## 💰 Monetização

O app está configurado para ser vendido por R$ 0,99 na Google Play Store. Para configurar a monetização:

### Google Play Console:
1. Crie uma conta de desenvolvedor (taxa única de $25)
2. Configure o app como pago
3. Defina o preço como R$ 0,99
4. Configure a conta bancária para receber os pagamentos

### Firebase (Opcional):
Para analytics e crash reporting:
1. Crie um projeto no Firebase
2. Configure o google-services.json
3. Ative o Analytics e Crashlytics

## 📱 Publicação na Play Store

### 1. Preparação:
```bash
# Build para produção
expo build:android -t apk
# ou
expo build:android -t app-bundle
```

### 2. Google Play Console:
1. Acesse [Google Play Console](https://play.google.com/console)
2. Crie um novo app
3. Preencha todas as informações:
   - Nome: "Você tem 1 real?"
   - Descrição curta: "Jogo Snake clássico e divertido"
   - Descrição completa: "Controle uma cobra e colete maçãs para crescer. Evite colidir com seu próprio corpo e tente bater seu recorde!"
   - Categoria: Jogos > Casual
   - Classificação: Livre para todas as idades
   - Preço: R$ 0,99

### 3. Assets Necessários:
- Ícone do app (512x512px)
- Screenshots do jogo (pelo menos 2)
- Imagem de destaque (1024x500px)
- Vídeo promocional (opcional)

### 4. Configurações de Pagamento:
- Configure a conta bancária
- Defina o país de venda (Brasil)
- Configure os impostos necessários

## 🔧 Configurações Adicionais

### Ícones e Splash Screen:
Substitua os arquivos em `assets/`:
- `icon.png` (1024x1024px)
- `adaptive-icon.png` (1024x1024px)
- `splash-icon.png` (1242x2436px)

### Configurações do App:
Edite `app.json` para personalizar:
- Nome do app
- Versão
- Permissões
- Configurações de build

## 📈 Estratégias de Marketing

### Para aumentar as vendas:
1. **SEO da Play Store**: Use palavras-chave relevantes na descrição
2. **Screenshots atrativas**: Mostre o jogo em ação
3. **Vídeo promocional**: Demonstre a jogabilidade
4. **Redes sociais**: Compartilhe o lançamento
5. **Influenciadores**: Envie cópias para review
6. **Preço promocional**: Considere lançar com desconto inicial

## 🐛 Solução de Problemas

### Erros comuns:
1. **Metro bundler não inicia**: `npm start --reset-cache`
2. **Erro de build**: Verifique se todas as dependências estão instaladas
3. **App não abre no dispositivo**: Verifique se o Expo Go está atualizado

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Consulte a documentação do Expo
- Verifique os logs do Metro bundler

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.

---

**Boa sorte com seu app! 🚀💰** 