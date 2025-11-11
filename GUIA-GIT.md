# 🚀 GUIA DE ENVIO PARA GITHUB

## Passo a Passo para Publicar o Projeto

### 1️⃣ Preparação Local

```bash
# Abra o terminal na pasta do projeto
cd "C:\Users\pbota\Desktop\Transformacao Digital"

# Inicialize o repositório Git
git init

# Adicione todos os arquivos (o .gitignore vai filtrar automaticamente)
git add .

# Faça o primeiro commit
git commit -m "Initial commit: Protótipo SIGMF - Módulo de Remoção a Pedido"
```

---

### 2️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. **Nome do repositório**: `sigmf-remocao-pedido` (ou outro de sua escolha)
3. **Descrição**: `Sistema de Gestão de Movimentação Funcional - Protótipo do módulo de Remoção a Pedido`
4. **Visibilidade**: 
   - ✅ Public (para demonstração)
   - ⬜ Private (se preferir manter privado)
5. **NÃO marque**: 
   - ⬜ Add README (já temos)
   - ⬜ Add .gitignore (já temos)
   - ⬜ Choose a license
6. Clique em **"Create repository"**

---

### 3️⃣ Conectar e Enviar

```bash
# Adicione o repositório remoto (substitua SEU-USUARIO pelo seu nome de usuário do GitHub)
git remote add origin https://github.com/SEU-USUARIO/sigmf-remocao-pedido.git

# Renomeie a branch principal para 'main' (padrão atual do GitHub)
git branch -M main

# Envie o código para o GitHub
git push -u origin main
```

---

### 4️⃣ Após o Push

**Opcional**: Substitua o README.md por README_GITHUB.md:

```bash
# Renomeie o README atual para manter como backup
git mv README.md README_DOCS.md

# Renomeie o README_GITHUB.md para ser o principal
git mv README_GITHUB.md README.md

# Commit e push das mudanças
git add .
git commit -m "docs: Atualiza README para visualização no GitHub"
git push
```

---

## 📋 Checklist Antes de Publicar

- [ ] Removidas todas as referências a logos proprietários
- [ ] .gitignore configurado corretamente
- [ ] README.md preparado para GitHub
- [ ] Credenciais de teste documentadas
- [ ] Código testado e funcional
- [ ] Sem informações sensíveis no código

---

## 🎨 Configurações Adicionais do Repositório (Opcional)

### Adicionar Topics (Tags)

No GitHub, vá em "About" e adicione:
- `html5`
- `css3`
- `javascript`
- `gov-br`
- `gestao-publica`
- `prototipo`
- `frontend`
- `vanilla-js`

### Configurar GitHub Pages (Demo Online)

1. Vá em **Settings** > **Pages**
2. Em **Source**, selecione: `main` branch
3. Clique em **Save**
4. Seu protótipo estará online em: `https://SEU-USUARIO.github.io/sigmf-remocao-pedido/`

### Adicionar Descrição e Website

1. No topo do repositório, clique no ⚙️ ao lado de "About"
2. **Description**: `Protótipo funcional de sistema de gestão de remoção de servidores públicos`
3. **Website**: Cole a URL do GitHub Pages (após configurar)
4. **Topics**: Adicione as tags mencionadas acima

---

## 🔄 Comandos Git Úteis

### Verificar status
```bash
git status
```

### Ver o que será commitado
```bash
git diff
```

### Adicionar arquivo específico
```bash
git add nome-do-arquivo.js
```

### Fazer commit
```bash
git commit -m "Descrição da mudança"
```

### Enviar mudanças
```bash
git push
```

### Atualizar do repositório remoto
```bash
git pull
```

### Ver histórico
```bash
git log --oneline
```

---

## 🌿 Branches Sugeridas (Futuro)

```bash
# Criar branch para desenvolvimento
git checkout -b develop

# Criar branch para uma feature
git checkout -b feature/nova-funcionalidade

# Voltar para a branch main
git checkout main
```

---

## 📝 Padrão de Commits Recomendado

Use commits descritivos com prefixos:

```bash
git commit -m "feat: Adiciona validação de CPF"
git commit -m "fix: Corrige bug no formulário"
git commit -m "docs: Atualiza documentação"
git commit -m "style: Ajusta cores do tema"
git commit -m "refactor: Melhora estrutura do código"
git commit -m "test: Adiciona testes unitários"
git commit -m "chore: Atualiza dependências"
```

---

## 🚨 Troubleshooting

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/sigmf-remocao-pedido.git
```

### Erro: "failed to push"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Erro de autenticação
- Use um **Personal Access Token** ao invés de senha
- Configure SSH keys (mais seguro)

---

## 🔐 Configurar Token de Acesso (Recomendado)

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Marque: `repo`, `workflow`
4. Copie o token gerado
5. Use o token como senha ao fazer push

---

## 📚 Recursos Adicionais

- [GitHub Docs](https://docs.github.com/)
- [Git Cheat Sheet](https://training.github.com/downloads/github-git-cheat-sheet.pdf)
- [Markdown Guide](https://www.markdownguide.org/)

---

## ✅ Depois de Publicar

Compartilhe seu projeto:

```
Acesse: https://github.com/SEU-USUARIO/sigmf-remocao-pedido

Ou via GitHub Pages: https://SEU-USUARIO.github.io/sigmf-remocao-pedido/
```

---

**Boa sorte com a publicação! 🚀**
