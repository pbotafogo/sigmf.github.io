// ========================================
// ESTADO DA APLICAÇÃO
// ========================================
let currentUser = null;
let currentStep = 1;
let solicitacoes = [];
let currentSolicitacaoId = null;
let uploadedFiles = [];

// ========================================
// DADOS SIMULADOS DO SIAPE
// ========================================
const usuariosSimulados = {
    'servidor': {
        siape: '1234567',
        nome: 'Maria Silva Santos',
        email: 'maria.santos@exemplo.gov.br',
        telefone: '(61) 98765-4321',
        cargo: 'Analista Administrativo',
        unidade: 'Ministério da Gestão - Brasília/DF',
        role: 'servidor'
    },
    'chefia': {
        siape: '7654321',
        nome: 'João Pedro Oliveira',
        email: 'joao.oliveira@exemplo.gov.br',
        cargo: 'Coordenador de Gestão',
        unidade: 'Ministério da Gestão - Brasília/DF',
        role: 'chefia'
    },
    'gp': {
        siape: '9876543',
        nome: 'Ana Paula Costa',
        email: 'ana.costa@exemplo.gov.br',
        cargo: 'Gerente de Gestão de Pessoas',
        unidade: 'Ministério da Gestão - Brasília/DF',
        role: 'gp'
    }
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Carregar solicitações do localStorage
    loadSolicitacoes();
    
    // Event Listeners
    setupEventListeners();
    
    // Mostrar tela de login
    showScreen('login-screen');
}

function setupEventListeners() {
    // Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Formulário de remoção
    const remocaoForm = document.getElementById('remocao-form');
    if (remocaoForm) {
        remocaoForm.addEventListener('submit', handleSubmitRemocao);
    }

    // Upload de arquivos
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        fileInput.addEventListener('change', handleFileSelect);
    }

    // Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterSolicitacoes(this.dataset.filter);
        });
    });

    // Manifestação
    const manifestacaoForm = document.getElementById('manifestacao-form');
    if (manifestacaoForm) {
        manifestacaoForm.addEventListener('submit', (e) => e.preventDefault());
    }
}

// ========================================
// AUTENTICAÇÃO E NAVEGAÇÃO
// ========================================
function handleLogin(e) {
    e.preventDefault();
    
    const siapeInput = document.getElementById('siape').value;
    const senhaInput = document.getElementById('senha').value;
    const role = document.querySelector('input[name="role"]:checked').value;
    
    // Validar credenciais
    // Aceita qualquer combinação de SIAPE e senha, ou as credenciais específicas
    const credenciaisValidas = 
        (siapeInput === '1234567' && senhaInput === '1234567') || 
        (siapeInput && senhaInput); // Aceita qualquer SIAPE/senha preenchidos
    
    if (!credenciaisValidas) {
        alert('Por favor, preencha SIAPE e senha.\n\nDica: Use SIAPE: 1234567 e Senha: 1234567');
        return;
    }
    
    currentUser = usuariosSimulados[role];
    
    if (!currentUser) {
        alert('Usuário não encontrado');
        return;
    }

    // Redirecionar para o painel apropriado
    switch(role) {
        case 'servidor':
            showScreen('servidor-screen');
            loadServidorPanel();
            break;
        case 'chefia':
            showScreen('chefia-screen');
            loadChefiaPanel();
            break;
        case 'gp':
            showScreen('gp-screen');
            loadGPPanel();
            break;
    }
}

function logout() {
    currentUser = null;
    currentStep = 1;
    uploadedFiles = [];
    document.getElementById('login-form').reset();
    showScreen('login-screen');
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ========================================
// PAINEL DO SERVIDOR
// ========================================
function loadServidorPanel() {
    document.getElementById('user-name').textContent = currentUser.nome;
    
    const lista = document.getElementById('servidor-solicitacoes');
    const minhasSolicitacoes = solicitacoes.filter(s => s.siape === currentUser.siape);
    
    if (minhasSolicitacoes.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <p>Você ainda não possui solicitações de remoção.</p>
                <p>Clique em "Nova Solicitação" para começar.</p>
            </div>
        `;
    } else {
        lista.innerHTML = minhasSolicitacoes.map(sol => createSolicitacaoCard(sol, 'servidor')).join('');
    }
}

function showFormulario() {
    showScreen('formulario-screen');
    document.getElementById('user-name-form').textContent = currentUser.nome;
    
    // Preencher dados do usuário
    document.getElementById('nome').value = currentUser.nome;
    document.getElementById('siape-form').value = currentUser.siape;
    document.getElementById('email').value = currentUser.email;
    document.getElementById('telefone').value = currentUser.telefone;
    document.getElementById('cargo').value = currentUser.cargo;
    document.getElementById('unidade-atual').value = currentUser.unidade;
    
    // Resetar formulário
    currentStep = 1;
    uploadedFiles = [];
    updateWizardSteps();
}

function cancelarFormulario() {
    if (confirm('Deseja realmente cancelar? Todos os dados serão perdidos.')) {
        showScreen('servidor-screen');
        loadServidorPanel();
    }
}

// ========================================
// FORMULÁRIO MULTI-STEP
// ========================================
function nextStep() {
    if (!validateStep(currentStep)) {
        return;
    }
    
    if (currentStep < 4) {
        currentStep++;
        updateWizardSteps();
        
        if (currentStep === 4) {
            updateConfirmation();
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateWizardSteps();
    }
}

function updateWizardSteps() {
    // Atualizar indicadores de passo
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (stepNum < currentStep) {
            step.classList.add('completed');
        }
    });
    
    // Mostrar passo atual
    document.querySelectorAll('.form-step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });
    
    // Controlar botões
    const btnPrevious = document.getElementById('btn-previous');
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');
    
    btnPrevious.style.display = currentStep === 1 ? 'none' : 'block';
    btnNext.style.display = currentStep === 4 ? 'none' : 'block';
    btnSubmit.style.display = currentStep === 4 ? 'block' : 'none';
}

function validateStep(step) {
    switch(step) {
        case 1:
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            
            if (!email || !telefone) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return false;
            }
            return true;
            
        case 2:
            const tipo = document.getElementById('tipo-remocao').value;
            const destino = document.getElementById('unidade-destino').value;
            const justificativa = document.getElementById('justificativa').value;
            
            if (!tipo || !destino || !justificativa) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return false;
            }
            
            if (justificativa.length < 100) {
                alert('A justificativa deve ter no mínimo 100 caracteres.');
                return false;
            }
            return true;
            
        case 3:
            return true; // Documentos são opcionais
            
        default:
            return true;
    }
}

function updateConfirmation() {
    document.getElementById('confirm-nome').textContent = document.getElementById('nome').value;
    document.getElementById('confirm-siape').textContent = document.getElementById('siape-form').value;
    
    const tipoSelect = document.getElementById('tipo-remocao');
    document.getElementById('confirm-tipo').textContent = tipoSelect.options[tipoSelect.selectedIndex].text;
    
    document.getElementById('confirm-unidade-atual').textContent = document.getElementById('unidade-atual').value;
    document.getElementById('confirm-unidade-destino').textContent = document.getElementById('unidade-destino').value;
    document.getElementById('confirm-justificativa').textContent = document.getElementById('justificativa').value;
    
    if (uploadedFiles.length > 0) {
        document.getElementById('confirm-documentos').textContent = uploadedFiles.map(f => f.name).join(', ');
    } else {
        document.getElementById('confirm-documentos').textContent = 'Nenhum documento anexado';
    }
}

function handleSubmitRemocao(e) {
    e.preventDefault();
    
    const confirmaDados = document.getElementById('confirma-dados').checked;
    if (!confirmaDados) {
        alert('Você precisa confirmar que as informações são verdadeiras.');
        return;
    }
    
    // Criar nova solicitação
    const novaSolicitacao = {
        id: Date.now(),
        protocolo: `REM${Date.now().toString().slice(-8)}`,
        nome: document.getElementById('nome').value,
        siape: document.getElementById('siape-form').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        cargo: document.getElementById('cargo').value,
        unidadeAtual: document.getElementById('unidade-atual').value,
        tipo: document.getElementById('tipo-remocao').value,
        tipoTexto: document.getElementById('tipo-remocao').options[document.getElementById('tipo-remocao').selectedIndex].text,
        unidadeDestino: document.getElementById('unidade-destino').value,
        justificativa: document.getElementById('justificativa').value,
        documentos: uploadedFiles.map(f => f.name),
        status: 'pendente',
        dataSolicitacao: new Date().toISOString(),
        timeline: [
            {
                etapa: 'Solicitação Criada',
                data: new Date().toISOString(),
                descricao: 'Solicitação de remoção criada pelo servidor',
                usuario: currentUser.nome,
                status: 'completed'
            }
        ]
    };
    
    solicitacoes.push(novaSolicitacao);
    saveSolicitacoes();
    
    alert(`Solicitação enviada com sucesso!\nProtocolo: ${novaSolicitacao.protocolo}`);
    
    showScreen('servidor-screen');
    loadServidorPanel();
    document.getElementById('remocao-form').reset();
}

// ========================================
// UPLOAD DE ARQUIVOS
// ========================================
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    addFiles(files);
}

function addFiles(files) {
    files.forEach(file => {
        // Validar tipo e tamanho
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (!validTypes.includes(file.type)) {
            alert(`Arquivo ${file.name} tem formato inválido. Use PDF ou DOC/DOCX.`);
            return;
        }
        
        if (file.size > maxSize) {
            alert(`Arquivo ${file.name} excede o tamanho máximo de 5MB.`);
            return;
        }
        
        uploadedFiles.push(file);
    });
    
    renderFilesList();
}

function removeFile(index) {
    uploadedFiles.splice(index, 1);
    renderFilesList();
}

function renderFilesList() {
    const filesList = document.getElementById('files-list');
    
    if (uploadedFiles.length === 0) {
        filesList.innerHTML = '';
        return;
    }
    
    filesList.innerHTML = uploadedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-info">
                <span class="file-icon">📄</span>
                <span>${file.name} (${formatFileSize(file.size)})</span>
            </div>
            <button type="button" class="remove-file" onclick="removeFile(${index})" title="Remover arquivo">
                ✕
            </button>
        </div>
    `).join('');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ========================================
// PAINEL DA CHEFIA
// ========================================
function loadChefiaPanel() {
    document.getElementById('user-name-chefia').textContent = currentUser.nome;
    renderChefiaSolicitacoes();
}

function renderChefiaSolicitacoes() {
    const lista = document.getElementById('chefia-solicitacoes');
    
    // Filtrar solicitações que precisam de análise da chefia
    const solicitacoesChefia = solicitacoes.filter(s => 
        ['pendente', 'em-analise'].includes(s.status) || s.parecerChefia
    );
    
    if (solicitacoesChefia.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <p>Não há solicitações pendentes de análise.</p>
            </div>
        `;
    } else {
        lista.innerHTML = solicitacoesChefia.map(sol => createSolicitacaoCard(sol, 'chefia')).join('');
    }
}

function filterSolicitacoes(filter) {
    // Implementação do filtro seria adicionada aqui
    renderChefiaSolicitacoes();
}

// ========================================
// PAINEL DA GESTÃO DE PESSOAS
// ========================================
function loadGPPanel() {
    document.getElementById('user-name-gp').textContent = currentUser.nome;
    updateGPStats();
    renderGPSolicitacoes();
}

function updateGPStats() {
    document.getElementById('stat-total').textContent = solicitacoes.length;
    document.getElementById('stat-pendentes').textContent = solicitacoes.filter(s => s.status === 'em-analise').length;
    document.getElementById('stat-aprovadas').textContent = solicitacoes.filter(s => s.status === 'aprovado').length;
    document.getElementById('stat-rejeitadas').textContent = solicitacoes.filter(s => s.status === 'rejeitado').length;
}

function renderGPSolicitacoes() {
    const lista = document.getElementById('gp-solicitacoes');
    
    if (solicitacoes.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <p>Não há solicitações de remoção no sistema.</p>
            </div>
        `;
    } else {
        lista.innerHTML = solicitacoes.map(sol => createSolicitacaoCard(sol, 'gp')).join('');
    }
}

// ========================================
// CARDS DE SOLICITAÇÃO
// ========================================
function createSolicitacaoCard(sol, userRole) {
    const dataFormatada = formatDate(sol.dataSolicitacao);
    
    let actions = '';
    
    if (userRole === 'servidor') {
        actions = `
            <button class="btn btn-primary" onclick="viewTimeline('${sol.id}')">
                Ver Timeline
            </button>
        `;
    } else if (userRole === 'chefia') {
        if (!sol.parecerChefia) {
            actions = `
                <button class="btn btn-primary" onclick="viewDetalhes('${sol.id}')">
                    Ver Detalhes
                </button>
                <button class="btn btn-success" onclick="openManifestacao('${sol.id}', 'chefia')">
                    Manifestar
                </button>
            `;
        } else {
            actions = `
                <button class="btn btn-primary" onclick="viewDetalhes('${sol.id}')">
                    Ver Detalhes
                </button>
                <button class="btn btn-secondary" onclick="viewTimeline('${sol.id}')">
                    Ver Timeline
                </button>
            `;
        }
    } else if (userRole === 'gp') {
        actions = `
            <button class="btn btn-primary" onclick="viewDetalhes('${sol.id}')">
                Ver Detalhes
            </button>
            <button class="btn btn-secondary" onclick="viewTimeline('${sol.id}')">
                Ver Timeline
            </button>
        `;
        
        if (sol.parecerChefia && !sol.parecerGP) {
            actions += `
                <button class="btn btn-success" onclick="openManifestacao('${sol.id}', 'gp')">
                    Emitir Decisão
                </button>
            `;
        }
    }
    
    return `
        <div class="solicitacao-card">
            <div class="solicitacao-header">
                <div class="solicitacao-info">
                    <h3>Protocolo: ${sol.protocolo}</h3>
                    <div class="solicitacao-meta">
                        <span>📅 ${dataFormatada}</span>
                        <span>👤 ${sol.nome}</span>
                        <span>🏢 SIAPE: ${sol.siape}</span>
                    </div>
                </div>
                <span class="status-badge ${sol.status}">${getStatusText(sol.status)}</span>
            </div>
            <div class="solicitacao-body">
                <div class="info-row">
                    <span class="info-label">Tipo de Remoção:</span>
                    <span class="info-value">${sol.tipoTexto}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Unidade Atual:</span>
                    <span class="info-value">${sol.unidadeAtual}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Unidade Destino:</span>
                    <span class="info-value">${sol.unidadeDestino}</span>
                </div>
            </div>
            <div class="solicitacao-actions">
                ${actions}
            </div>
        </div>
    `;
}

function getStatusText(status) {
    const statusMap = {
        'pendente': 'Pendente',
        'em-analise': 'Em Análise',
        'aprovado': 'Aprovado',
        'rejeitado': 'Indeferido',
        'concluido': 'Concluído'
    };
    return statusMap[status] || status;
}

// ========================================
// MODAIS
// ========================================
function viewDetalhes(solicitacaoId) {
    const sol = solicitacoes.find(s => s.id == solicitacaoId);
    if (!sol) return;
    
    const modal = document.getElementById('modal-detalhes');
    const modalBody = document.getElementById('modal-body-content');
    
    modalBody.innerHTML = `
        <div class="summary-card">
            <h4>Informações do Servidor</h4>
            <div class="summary-item">
                <strong>Nome:</strong>
                <span>${sol.nome}</span>
            </div>
            <div class="summary-item">
                <strong>SIAPE:</strong>
                <span>${sol.siape}</span>
            </div>
            <div class="summary-item">
                <strong>Cargo:</strong>
                <span>${sol.cargo}</span>
            </div>
            <div class="summary-item">
                <strong>E-mail:</strong>
                <span>${sol.email}</span>
            </div>
            <div class="summary-item">
                <strong>Telefone:</strong>
                <span>${sol.telefone}</span>
            </div>
        </div>
        
        <div class="summary-card">
            <h4>Detalhes da Remoção</h4>
            <div class="summary-item">
                <strong>Tipo:</strong>
                <span>${sol.tipoTexto}</span>
            </div>
            <div class="summary-item">
                <strong>Unidade Atual:</strong>
                <span>${sol.unidadeAtual}</span>
            </div>
            <div class="summary-item">
                <strong>Unidade Destino:</strong>
                <span>${sol.unidadeDestino}</span>
            </div>
            <div class="summary-item">
                <strong>Justificativa:</strong>
                <span>${sol.justificativa}</span>
            </div>
            <div class="summary-item">
                <strong>Documentos:</strong>
                <span>${sol.documentos.length > 0 ? sol.documentos.join(', ') : 'Nenhum documento anexado'}</span>
            </div>
        </div>
        
        ${sol.parecerChefia ? `
            <div class="summary-card">
                <h4>Parecer da Chefia</h4>
                <div class="summary-item">
                    <strong>Status:</strong>
                    <span class="status-badge ${sol.parecerChefia.decisao}">${sol.parecerChefia.decisao === 'aprovado' ? 'Aprovado' : 'Rejeitado'}</span>
                </div>
                <div class="summary-item">
                    <strong>Parecer:</strong>
                    <span>${sol.parecerChefia.parecer}</span>
                </div>
                <div class="summary-item">
                    <strong>Data:</strong>
                    <span>${formatDate(sol.parecerChefia.data)}</span>
                </div>
            </div>
        ` : ''}
        
        ${sol.parecerGP ? `
            <div class="summary-card">
                <h4>Decisão da Gestão de Pessoas</h4>
                <div class="summary-item">
                    <strong>Status:</strong>
                    <span class="status-badge ${sol.parecerGP.decisao}">${sol.parecerGP.decisao === 'aprovado' ? 'Deferido' : 'Indeferido'}</span>
                </div>
                <div class="summary-item">
                    <strong>Parecer:</strong>
                    <span>${sol.parecerGP.parecer}</span>
                </div>
                <div class="summary-item">
                    <strong>Data:</strong>
                    <span>${formatDate(sol.parecerGP.data)}</span>
                </div>
            </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal-detalhes').classList.remove('active');
}

function openManifestacao(solicitacaoId, tipo) {
    currentSolicitacaoId = solicitacaoId;
    const modal = document.getElementById('modal-manifestacao');
    const title = document.getElementById('manifestacao-title');
    
    title.textContent = tipo === 'chefia' ? 'Parecer da Chefia' : 'Decisão Final - Gestão de Pessoas';
    
    document.getElementById('parecer').value = '';
    modal.classList.add('active');
}

function closeManifestacaoModal() {
    document.getElementById('modal-manifestacao').classList.remove('active');
    currentSolicitacaoId = null;
}

function submitManifestacao(decisao) {
    const parecer = document.getElementById('parecer').value.trim();
    
    if (!parecer) {
        alert('Por favor, digite um parecer.');
        return;
    }
    
    const sol = solicitacoes.find(s => s.id == currentSolicitacaoId);
    if (!sol) return;
    
    const manifestacao = {
        decisao: decisao,
        parecer: parecer,
        data: new Date().toISOString(),
        usuario: currentUser.nome
    };
    
    if (currentUser.role === 'chefia') {
        sol.parecerChefia = manifestacao;
        sol.status = decisao === 'aprovado' ? 'em-analise' : 'rejeitado';
        
        sol.timeline.push({
            etapa: decisao === 'aprovado' ? 'Aprovado pela Chefia' : 'Rejeitado pela Chefia',
            data: manifestacao.data,
            descricao: parecer,
            usuario: currentUser.nome,
            status: decisao === 'aprovado' ? 'completed' : 'rejected'
        });
        
        if (decisao === 'aprovado') {
            // Criar instrução automática para GP
            sol.timeline.push({
                etapa: 'Encaminhado para Gestão de Pessoas',
                data: new Date().toISOString(),
                descricao: 'Processo encaminhado automaticamente para análise e decisão final pela Gestão de Pessoas',
                usuario: 'Sistema',
                status: 'completed'
            });
        }
        
    } else if (currentUser.role === 'gp') {
        sol.parecerGP = manifestacao;
        sol.status = decisao === 'aprovado' ? 'aprovado' : 'rejeitado';
        
        sol.timeline.push({
            etapa: decisao === 'aprovado' ? 'Processo Deferido' : 'Processo Indeferido',
            data: manifestacao.data,
            descricao: parecer,
            usuario: currentUser.nome,
            status: decisao === 'aprovado' ? 'completed' : 'rejected'
        });
        
        if (decisao === 'aprovado') {
            sol.timeline.push({
                etapa: 'Processo Concluído',
                data: new Date().toISOString(),
                descricao: 'Remoção aprovada. Aguardando publicação da portaria.',
                usuario: 'Sistema',
                status: 'completed'
            });
        }
    }
    
    saveSolicitacoes();
    closeManifestacaoModal();
    
    alert(`Manifestação registrada com sucesso!`);
    
    // Recarregar painel atual
    if (currentUser.role === 'chefia') {
        loadChefiaPanel();
    } else if (currentUser.role === 'gp') {
        loadGPPanel();
    }
}

// ========================================
// TIMELINE
// ========================================
function viewTimeline(solicitacaoId) {
    const sol = solicitacoes.find(s => s.id == solicitacaoId);
    if (!sol) return;
    
    const modal = document.getElementById('modal-timeline');
    const timelineContent = document.getElementById('timeline-content');
    const protocolo = document.getElementById('timeline-protocolo');
    
    protocolo.textContent = sol.protocolo;
    
    timelineContent.innerHTML = sol.timeline.map(item => `
        <div class="timeline-item">
            <div class="timeline-marker ${item.status}"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <div class="timeline-title">${item.etapa}</div>
                    <div class="timeline-date">${formatDate(item.data)}</div>
                </div>
                <div class="timeline-description">${item.descricao}</div>
                <div class="timeline-user">Por: ${item.usuario}</div>
            </div>
        </div>
    `).join('');
    
    modal.classList.add('active');
}

function closeTimelineModal() {
    document.getElementById('modal-timeline').classList.remove('active');
}

// ========================================
// PERSISTÊNCIA
// ========================================
function saveSolicitacoes() {
    localStorage.setItem('sigmf_solicitacoes', JSON.stringify(solicitacoes));
}

function loadSolicitacoes() {
    const saved = localStorage.getItem('sigmf_solicitacoes');
    if (saved) {
        solicitacoes = JSON.parse(saved);
    }
}

// ========================================
// UTILITÁRIOS
// ========================================
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Fechar modais ao clicar fora
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
