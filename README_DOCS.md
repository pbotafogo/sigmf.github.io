# SIGMF - Sistema de Gestão de Movimentação Funcional
## Módulo de Remoção a Pedido - Protótipo

### 📋 Visão Geral

Protótipo funcional do módulo de Remoção a Pedido do SIGMF, demonstrando a jornada completa do servidor e o fluxo automatizado de análise e aprovação.

### 🎯 Funcionalidades

#### ✅ Implementadas
- **Autenticação Multi-perfil**: Login simulado para Servidor, Chefia e Gestão de Pessoas
- **Formulário Multi-step**: Processo guiado em 4 etapas
  1. Dados Pessoais (preenchidos via simulação SIAPE)
  2. Motivo da Remoção
  3. Upload de Documentos
  4. Confirmação
- **Painel do Servidor**: Visualização de solicitações e timeline
- **Painel da Chefia**: Análise e emissão de parecer
- **Painel da GP**: Decisão final e estatísticas
- **Timeline Interativa**: Acompanhamento de todas as etapas do processo
- **Fluxo Automatizado**: Encaminhamento automático entre etapas
- **Persistência Local**: Dados salvos no localStorage do navegador

### 🚀 Como Executar

1. **Abra o arquivo `index.html` no navegador** (Chrome, Firefox, Edge)
   - Dê um duplo clique no arquivo
   - Ou arraste o arquivo para o navegador

2. **Não é necessário servidor web** - o protótipo funciona localmente

### 🎬 Demonstração do Fluxo (3 minutos)

#### Passo 1: Login como Servidor (30s)
1. Acesse a tela de login
2. Deixe os campos em branco (são apenas ilustrativos)
3. Selecione o perfil **"Servidor"**
4. Clique em **"Entrar"**

#### Passo 2: Criar Solicitação (1min)
1. Clique em **"Nova Solicitação"**
2. **Etapa 1** - Dados já preenchidos automaticamente
   - E-mail e telefone podem ser editados
   - Clique em **"Próximo"**
3. **Etapa 2** - Motivo da Remoção
   - Selecione um tipo (ex: "Interesse Pessoal")
   - Selecione destino (ex: "São Paulo - SP")
   - Digite justificativa (mínimo 100 caracteres)
   - Clique em **"Próximo"**
4. **Etapa 3** - Documentos (opcional)
   - Pode pular ou simular upload
   - Clique em **"Próximo"**
5. **Etapa 4** - Confirmação
   - Marque o checkbox de confirmação
   - Clique em **"Enviar Solicitação"**
6. Anote o **número do protocolo** gerado

#### Passo 3: Login como Chefia (30s)
1. Clique em **"Sair"**
2. Na tela de login, selecione **"Chefia"**
3. Clique em **"Entrar"**
4. Visualize a solicitação criada
5. Clique em **"Manifestar"**
6. Digite um parecer (ex: "Aprovado. Servidor possui bom desempenho.")
7. Clique em **"Aprovar"**

#### Passo 4: Login como Gestão de Pessoas (1min)
1. Clique em **"Sair"**
2. Na tela de login, selecione **"Gestão de Pessoas"**
3. Clique em **"Entrar"**
4. Veja as **estatísticas** atualizadas
5. Localize a solicitação
6. Clique em **"Emitir Decisão"**
7. Digite parecer final (ex: "Deferido conforme parecer da chefia.")
8. Clique em **"Aprovar"**
9. Clique em **"Ver Timeline"** para visualizar todo o fluxo

### 👥 Credenciais de Teste

**Para Login:**
- **SIAPE**: `1234567`
- **Senha**: `1234567`
- Funciona para todos os perfis

**Perfis Disponíveis:**

**Servidor**
- Perfil: Servidor
- Nome simulado: Maria Silva Santos
- SIAPE: 1234567

**Chefia**
- Perfil: Chefia
- Nome simulado: João Pedro Oliveira
- SIAPE: 7654321

**Gestão de Pessoas**
- Perfil: Gestão de Pessoas
- Nome simulado: Ana Paula Costa
- SIAPE: 9876543

### 🎨 Design System

#### Paleta de Cores
- **Azul Institucional**: #1351B4 (botões primários, cabeçalhos)
- **Azul Escuro**: #0C326F (hover states)
- **Azul Claro**: #E6F0FF (backgrounds de destaque)
- **Branco**: #FFFFFF (cards, modais)
- **Cinza Claro**: #F8F9FA (background geral)
- **Verde Sucesso**: #168821 (aprovações)
- **Vermelho Erro**: #E52207 (rejeições)

#### Componentes
- Formulários com validação
- Cards com shadow e hover effects
- Modais responsivos
- Timeline vertical com marcadores
- Badges de status
- Botões com estados visuais

### 📱 Responsividade

O protótipo é **totalmente responsivo** e funciona em:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (até 767px)

### ♿ Acessibilidade

- Navegação por teclado
- Labels associados aos inputs
- Estados de foco visíveis
- Estrutura semântica HTML5
- Contraste de cores adequado (WCAG AA)

### 📂 Estrutura de Arquivos

```
Transformacao Digital/
├── index.html          # Estrutura HTML de todas as telas
├── style.css           # Estilos CSS responsivos
├── app.js              # Lógica JavaScript completa
├── data.json           # Dados simulados do SIAPE
├── README.md           # Este arquivo
└── base inicial/       # Assets visuais (logos, layouts)
    ├── Group 7.svg     # Logo Gov.br
    └── [outros arquivos de referência visual]
```

### 🔄 Fluxo do Processo

```
┌─────────────────┐
│   Solicitação   │ → Servidor preenche formulário
└────────┬────────┘
         ↓
┌─────────────────┐
│  Chefia Analisa │ → Aprova ou rejeita com parecer
└────────┬────────┘
         ↓
┌─────────────────┐
│   GP Analisa    │ → Decisão final (deferimento/indeferimento)
└────────┬────────┘
         ↓
┌─────────────────┐
│    Concluído    │ → Timeline completa disponível
└─────────────────┘
```

### 💾 Persistência de Dados

Os dados são salvos automaticamente no **localStorage** do navegador:
- Solicitações criadas persistem entre recarregamentos
- Pareceres e decisões são mantidos
- Timeline completa é preservada

**Nota**: Para limpar os dados e recomeçar, abra o Console do navegador (F12) e execute:
```javascript
localStorage.clear()
location.reload()
```

### 🎯 Pontos de Demonstração na Mentoria

1. **Interface Intuitiva**: Design limpo seguindo padrões gov.br
2. **Fluxo Guiado**: Wizard com indicação visual de progresso
3. **Simulação SIAPE**: Dados preenchidos automaticamente
4. **Validações**: Formulário com validações em tempo real
5. **Automação**: Encaminhamento automático entre etapas
6. **Timeline Visual**: Acompanhamento completo do processo
7. **Multi-perfil**: Diferentes visões para cada tipo de usuário
8. **Responsividade**: Funciona em qualquer dispositivo

### 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, Animações
- **JavaScript (Vanilla)**: Sem frameworks, código puro
- **LocalStorage API**: Persistência de dados
- **JSON**: Estrutura de dados simulados

### 📊 Estatísticas do Código

- **Linhas de HTML**: ~400
- **Linhas de CSS**: ~900
- **Linhas de JavaScript**: ~700
- **Total**: ~2000 linhas de código

### 🎓 Próximos Passos (Evolução Futura)

- [ ] Integração real com SIAPE
- [ ] Integração com SEI para tramitação
- [ ] Notificações por e-mail
- [ ] Geração de relatórios PDF
- [ ] Assinatura digital
- [ ] Painel de métricas e indicadores
- [ ] Exportação de dados
- [ ] Histórico de versões do processo

### 📞 Suporte

Para dúvidas sobre o protótipo durante a mentoria, consulte este README ou explore o código-fonte comentado.

---

**Desenvolvido para demonstração na Mentoria 1 - Transformação Digital**
**Data**: Novembro 2025
**Versão**: 1.0
