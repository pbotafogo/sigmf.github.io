# 📋 SIGMF - Sistema de Gestão de Movimentação Funcional

> Protótipo funcional do módulo de **Remoção a Pedido** - Demonstração de transformação digital aplicada à gestão de pessoas no serviço público.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🎯 Sobre o Projeto

O **SIGMF** é um protótipo de sistema web que demonstra como modernizar e automatizar processos de gestão de pessoas no setor público. Este módulo específico trata das **solicitações de remoção**, apresentando:

- ✅ **Formulário multi-step intuitivo** com validações
- ✅ **Fluxo automatizado** de aprovação (Servidor → Chefia → GP)
- ✅ **Timeline rastreável** de todas as etapas
- ✅ **Painéis personalizados** para cada perfil de usuário
- ✅ **Interface responsiva** e acessível (WCAG 2.1 AA)
- ✅ **Integração simulada** com SIAPE

---

## 🚀 Demonstração

### 🌐 [Acesse a Demo Online](#) _(em breve)_

Ou teste localmente:

1. Clone o repositório
2. Abra `index.html` no navegador
3. Use as credenciais: **SIAPE: 1234567** / **Senha: 1234567**

---

## 📸 Screenshots

### Tela de Login
Interface limpa seguindo o padrão Gov.br com autenticação multi-perfil.

### Formulário Multi-step
Wizard intuitivo em 4 etapas: Dados Pessoais → Motivo → Documentos → Confirmação.

### Painel Administrativo
Dashboard com estatísticas e gestão completa dos processos.

### Timeline do Processo
Rastreabilidade total com histórico de todas as ações.

---

## ✨ Funcionalidades

### 👤 Para Servidores
- Criar solicitações de remoção
- Acompanhar status em tempo real
- Anexar documentos comprobatórios
- Visualizar histórico completo

### 👔 Para Chefias
- Analisar solicitações da equipe
- Emitir pareceres (aprovar/rejeitar)
- Visualizar detalhes completos
- Filtrar por status

### 🏢 Para Gestão de Pessoas
- Dashboard com métricas gerenciais
- Decisão final sobre processos
- Visão consolidada de todos os processos
- Estatísticas em tempo real

---

## 🛠️ Tecnologias

Este projeto foi desenvolvido com tecnologias nativas, **sem frameworks ou bibliotecas externas**:

- **HTML5** - Estrutura semântica
- **CSS3** - Design System responsivo
- **JavaScript (Vanilla)** - Lógica funcional
- **LocalStorage API** - Persistência de dados

### Por que sem frameworks?

- ⚡ **Performance**: Carregamento instantâneo
- 🎯 **Simplicidade**: Código direto e compreensível
- 📦 **Leveza**: < 100KB total
- 🔧 **Manutenibilidade**: Fácil de entender e modificar

---

## 📦 Instalação

### Opção 1: Download Direto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sigmf.git

# Entre na pasta
cd sigmf

# Abra o index.html no navegador
# Não é necessário servidor web!
```

### Opção 2: Servidor Local (Opcional)

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# Acesse: http://localhost:8000
```

---

## 🎮 Como Usar

### 1️⃣ Login

```
SIAPE: 1234567
Senha: 1234567
```

Escolha um perfil:
- **Servidor** - Para criar solicitações
- **Chefia** - Para analisar e aprovar
- **Gestão de Pessoas** - Para decisão final

### 2️⃣ Criar Solicitação (como Servidor)

1. Clique em "Nova Solicitação"
2. Preencha o formulário em 4 etapas:
   - **Dados Pessoais**: Pré-preenchidos via SIAPE
   - **Motivo**: Tipo de remoção e justificativa
   - **Documentos**: Anexar arquivos (opcional)
   - **Confirmação**: Revisar e enviar
3. Receba o protocolo gerado

### 3️⃣ Análise (como Chefia)

1. Visualize solicitações pendentes
2. Clique em "Manifestar"
3. Digite seu parecer
4. Aprove ou rejeite

### 4️⃣ Decisão Final (como GP)

1. Veja o dashboard com estatísticas
2. Analise processos com parecer da chefia
3. Emita decisão final
4. Visualize a timeline completa

---

## 📊 Estrutura do Projeto

```
sigmf/
├── index.html          # Estrutura HTML (todas as telas)
├── style.css           # Estilos CSS responsivos
├── app.js              # Lógica JavaScript
├── data.json           # Dados simulados (SIAPE)
├── README.md           # Este arquivo
└── .gitignore          # Arquivos ignorados
```

---

## 🎨 Design System

### Paleta de Cores (Gov.br)

```css
--azul-institucional: #1351B4  /* Primária */
--azul-escuro: #0C326F         /* Hover */
--azul-claro: #E6F0FF          /* Background destaque */
--verde-sucesso: #168821       /* Aprovações */
--vermelho-erro: #E52207       /* Rejeições */
```

### Responsividade

- 📱 **Mobile**: até 767px
- 📱 **Tablet**: 768px - 1199px
- 💻 **Desktop**: 1200px+

### Acessibilidade

- ✅ Navegação por teclado
- ✅ Contraste adequado (WCAG AA)
- ✅ Labels descritivos
- ✅ Estados de foco visíveis
- ✅ Estrutura semântica

---

## 🔄 Fluxo do Processo

```
┌─────────────────┐
│  Servidor       │ → Cria solicitação
│  Solicita       │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Chefia         │ → Analisa e emite parecer
│  Aprova/Rejeita │
└────────┬────────┘
         ↓
┌─────────────────┐
│  GP             │ → Decisão final
│  Defere/Indefere│
└────────┬────────┘
         ↓
┌─────────────────┐
│  Concluído      │ → Timeline completa
└─────────────────┘
```

**Automação**: O sistema encaminha automaticamente entre as etapas.

---

## 📈 Impacto Esperado

### Antes (Processo Manual)
- ❌ Formulários em papel
- ❌ Trâmite físico entre setores
- ❌ Prazo: 45-60 dias
- ❌ Sem rastreabilidade

### Depois (Com SIGMF)
- ✅ Formulário digital
- ✅ Tramitação automática
- ✅ Prazo: 15-20 dias (**67% redução**)
- ✅ Rastreabilidade completa

---

## 🚧 Roadmap

### Fase 1: Protótipo ✅ (Concluído)
- [x] Interface funcional
- [x] Fluxo completo
- [x] Simulação SIAPE
- [x] Documentação

### Fase 2: MVP (Planejado)
- [ ] Integração SIAPE real
- [ ] Integração SEI
- [ ] Banco de dados
- [ ] Autenticação gov.br
- [ ] Notificações email

### Fase 3: Produção (Futuro)
- [ ] Assinatura digital
- [ ] Relatórios avançados
- [ ] Dashboard gerencial
- [ ] API RESTful
- [ ] App mobile

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

### Diretrizes

- Mantenha o código simples e legível
- Siga o padrão de nomenclatura existente
- Teste em diferentes navegadores
- Documente mudanças significativas

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Desenvolvido como demonstração para Mentoria - Transformação Digital**

- 📧 Email: [seu-email@exemplo.com](mailto:seu-email@exemplo.com)
- 💼 LinkedIn: [Seu Nome](https://linkedin.com/in/seu-perfil)
- 🐙 GitHub: [@seu-usuario](https://github.com/seu-usuario)

---

## 🙏 Agradecimentos

- Ministério da Gestão e da Inovação (MGI)
- Design System Gov.br
- Comunidade de desenvolvedores

---

## 📚 Documentação Adicional

Para mais informações sobre implementação, consulte:

- [Especificações Técnicas](docs/ESPECIFICACOES-TECNICAS.md) _(disponível no repositório completo)_
- [Guia de Estilo](docs/GUIA-VISUAL.md) _(disponível no repositório completo)_
- [FAQ](docs/FAQ.md) _(disponível no repositório completo)_

---

## 🔗 Links Úteis

- [Gov.br Design System](https://www.gov.br/ds/)
- [SIAPE - Sistema de Gestão](https://www.siape.gov.br/)
- [SEI - Sistema Eletrônico de Informações](https://www.gov.br/economia/pt-br/sei)

---

## 📞 Suporte

Encontrou um bug? Tem uma sugestão? 

- 🐛 [Reportar Bug](https://github.com/seu-usuario/sigmf/issues)
- 💡 [Sugerir Feature](https://github.com/seu-usuario/sigmf/issues)
- 💬 [Discussões](https://github.com/seu-usuario/sigmf/discussions)

---

## ⭐ Se você gostou

Se este projeto foi útil para você, considere dar uma ⭐ no repositório!

---

<div align="center">

**SIGMF** - Modernizando a Gestão Pública 🚀

Feito com ❤️ para o serviço público brasileiro

[⬆ Voltar ao topo](#-sigmf---sistema-de-gestão-de-movimentação-funcional)

</div>
