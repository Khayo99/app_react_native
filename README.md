## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 20.19.4 ou superior recomendada)
- **npm**
- **Expo CLI** (`npm install -g expo-cli`)

Para executar em dispositivos:

- **Expo Go** (disponível na App Store / Google Play)
- **Android Studio** (para emulador Android)
- **Xcode** (para emulador iOS - apenas macOS)

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [React Native] - Framework mobile
- [Expo] - Plataforma de desenvolvimento
- [Expo Router] - Roteamento baseado em arquivos
- [TypeScript] - Tipagem estática
- [NativeWind] - TailwindCSS para React Native
- [Axios] - Cliente HTTP
- [Expo Constants] - Gerenciamento de constantes e variáveis de ambiente

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd app_react_native
```

2. Instale as dependências:

```bash
npm install
```

ou com yarn:

```bash
yarn install
```

> **Nota**: Se encontrar conflitos de dependências, use:
>
> ```bash
> npm install --legacy-peer-deps
> ```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (você pode copiar do `.env.example`):

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure a URL da API:

```env
# API Configuration
API_URL=http://localhost:3000/api
```

**⚠️ IMPORTANTE**:

- Se estiver rodando a API localmente e testando no dispositivo físico, substitua `localhost` pelo IP da sua máquina na rede local
- Exemplo: `API_URL=http://192.168.1.100:3000/api`
- Para encontrar seu IP:
  - **Windows**: `ipconfig` (procure por IPv4)
  - **Mac/Linux**: `ifconfig` ou `ip addr`

### 2. API Backend

Este app requer uma API backend rodando. Certifique-se de que a API está configurada e rodando antes de iniciar o app.

A API deve fornecer os seguintes endpoints:

- `GET /api/feature-flags` - Lista feature flags
- `GET /api/configurations` - Lista configurações
- `GET /api/configurations/key/:key` - Busca configuração por chave
- `POST /api/configurations` - Cria nova configuração
- `PUT /api/configurations/:id` - Atualiza configuração

## 🎯 Como Executar

### Iniciar o servidor de desenvolvimento:

```bash
npm start
```

Isso abrirá o Expo Developer Tools no navegador.

### Executar no dispositivo físico:

1. Instale o app **Expo Go** no seu smartphone (disponível na App Store ou Google Play)
2. Escaneie o QR Code exibido no terminal ou navegador
3. O app será carregado automaticamente

### Executar no emulador Android:

```bash
npm run android
```

> Certifique-se de que o Android Studio está instalado e um emulador está configurado.

### Executar no simulador iOS (apenas macOS):

```bash
npm run ios
```

> Certifique-se de que o Xcode está instalado.

### Executar na Web:

```bash
npm run web
```

## 🔌 API Integration

### Feature Flags

O app busca feature flags da API para controlar funcionalidades:

- **`enable_signature`**: Quando `true`, exibe o campo de assinatura na tela de configurações

### Configurações

O app gerencia as seguintes configurações:

- **`notifications`**: Ativar/desativar notificações (boolean)
- **`dark_mode`**: Ativar/desativar modo escuro (boolean)
- **`signature`**: Assinatura do perfil (string) - apenas se `enable_signature` estiver ativo

Todas as configurações são salvas automaticamente na API ao clicar em "Salvar".

## ✨ Features

### Tela de Configurações

- ✅ Toggle para ativar/desativar notificações
- ✅ Toggle para ativar/desativar modo escuro
- ✅ Campo de assinatura (exibido condicionalmente via feature flag)
- ✅ Validação: assinatura obrigatória quando feature flag está ativa
- ✅ Feedback visual durante carregamento e salvamento
- ✅ Alertas de sucesso/erro
- ✅ Persistência de dados na API

### Problema: "Network Error" ao fazer requisições

**Solução**: Verifique se:

1. A API está rodando
2. A URL no arquivo `.env` está correta
3. Se estiver usando dispositivo físico, use o IP local ao invés de `localhost`

### Problema: Alterações no .env não refletem

**Solução**: Reinicie o servidor Expo:

1. Pare o servidor (Ctrl+C)
2. Execute `npm start` novamente
3. Limpe o cache se necessário: `npm start -- --clear`

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no emulador/dispositivo Android
- `npm run ios` - Executa no simulador iOS (macOS)
- `npm run web` - Executa no navegador
- `npm run prebuild` - Gera os diretórios nativos
