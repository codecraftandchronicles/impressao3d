# Medieval Crafts Forge — Single Page Application

Este projeto é uma aplicação web moderna e minimalista para a **Medieval Crafts Forge**, focada na apresentação de serviços e produtos em impressão 3D. O código está disponível para reutilização e adaptação, podendo servir como base para outros projetos de portfólio, catálogo ou loja online.

## 📋 Características

- **Design Minimalista**: Inspirado em Tesla, com theme dark elegante
- **Responsive**: Compatível com mobile, tablet e desktop
- **SPA (Single Page Application)**: Navegação fluida sem reloads
- **Sem Build Tools**: Vanilla JavaScript, HTML5, CSS3
- **Multicanal de Contacto**: WhatsApp, Email, Instagram
- **Gerenciamento de Dados**: JSONs para Produtos e Testemunhos

## 🌍 Código aberto e reutilização

Este repositório é público e o código pode ser usado, adaptado e reutilizado para outros projetos. Se quiserem aproveitar a estrutura como base para o seu próprio site, fica à vontade — basta manter a referência ao projeto original quando possível.

## 🎯 Estrutura do Projeto

```
medieval-crafts-forge/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos minimalistas (Rajdhani + Inter)
├── js/
│   └── app.js              # Lógica da aplicação
├── data/
│   ├── products.json       # Catálogo de produtos
│   └── testimonials.json   # Testemunhos de clientes
├── img/
│   └── logo.png            # Logo Medieval Crafts Forge
└── README.md               # Este ficheiro
```

## 🚀 Como Usar

### 1. **Localmente (Desenvolvimento)**

Usa a extensão **Live Server** no VS Code:

```bash
# Abre o ficheiro index.html
# Clica em "Go Live" (rodapé do VS Code)
```

Ou com Python:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Depois, abre `http://localhost:8000` no navegador.

### 2. **GitHub Pages**

Coloca o projeto num repositório GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Medieval Crafts Forge SPA"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/medieval-crafts-forge.git
git push -u origin main
```

Ativa GitHub Pages nas configurações do repositório (Settings → Pages → Deploy from branch: `main`).

## 📝 Adicionar Produtos

Edita `data/products.json`:

```json
{
  "produtos": [
    {
      "id": "produto-001",
      "nome": "Nome do Produto",
      "descricao": "Descrição breve",
      "precoRef": 25,
      "moeda": "€",
      "imagem": "URL da imagem (Unsplash, etc.)"
    }
  ]
}
```

A aplicação carrega automaticamente.

## 👥 Adicionar Testemunhos

Edita `data/testimonials.json`:

```json
{
  "testemunhos": [
    {
      "id": "test-001",
      "descricao": "Texto do testemunho...",
      "nome": "Nome da Pessoa",
      "empresa": "Empresa (opcional)",
      "tipo": "empresa" // ou "pessoal"
    }
  ]
}
```

Os avatares são gerados automaticamente com base nas iniciais (Dicebear API).

## 🎨 Personalizar Cores

No ficheiro `css/style.css`, ajusta as variáveis de raiz:

```css
:root {
    --primary-bg: #0a0e27;        /* Fundo escuro */
    --secondary-bg: #1a1f3a;      /* Cards/Seções */
    --accent: #ffc107;            /* Destaque dourado */
    --text-primary: #ffffff;      /* Texto principal */
    --text-secondary: rgba(255, 255, 255, 0.35);  /* Texto secundário */
    --border-color: #3f4052;      /* Bordas */
}
```

## 📱 Canais de Contacto

A aplicação está configurada para:

- **WhatsApp**: `+351 910 663 727`
- **Email**: `preciousabstraction@gmail.com`
- **Instagram**: `@medievalcraftsforge`

Edita em `js/app.js` na secção `appState.contactChannels` para alterar.

## 🔧 Tecnologias

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Ícones**: Font Awesome 6
- **Tipografia**: Google Fonts (Rajdhani, Inter)
- **Framework CSS**: Bootstrap 5.3 (para tooltips, apenas)
- **Imagens**: Unsplash (links URL)
- **Avatares**: Dicebear API

## 📦 Deploy

### GitHub Pages (Recomendado)

1. Push para repositório GitHub
2. Ativa Pages (Settings → Pages)
3. Acesso em `https://seu-usuario.github.io/medieval-crafts-forge`

### Netlify

1. Conecta repositório GitHub
2. Build command: (deixa em branco)
3. Publish directory: `/` (raiz)

### Vercel

1. Conecta repositório GitHub
2. Deploy automático

## 📧 Suporte

Contacta via WhatsApp, Email ou Instagram (ver secção Contacto acima).

## 📄 Licença

Este projeto pode ser reutilizado e adaptado para fins pessoais ou comerciais, com referência ao projeto original.

---

**Criado com ❤️ e impressão 3D de precisão** ⚒️🔨
