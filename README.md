<h1 align="center">🐼&nbsp;&nbsp;Petros&nbsp;·&nbsp;Portfolio</h1>

<p align="center">
  Portfólio pessoal do <b>João Pedro Carvalho dos Santos</b> — full-stack developer.<br />
  <em>Menos hype, mais deploy.</em>
</p>

<p align="center">
  <a href="https://fatec-sjc-dsm-portfolio.github.io/ra1461392411016/"><b>🌐 fatec-sjc-dsm-portfolio.github.io/ra1461392411016</b></a>
</p>

<p align="center">
  <a href="https://fatec-sjc-dsm-portfolio.github.io/ra1461392411016/"><img alt="Live" src="https://img.shields.io/badge/live-GitHub%20Pages-5b8c3e?logo=github&logoColor=white" /></a>
  <a href="https://github.com/JohnPetros"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-JohnPetros-181717?logo=github&logoColor=white" /></a>
  <a href="https://www.linkedin.com/in/joão-pedro-carvalho-dos-santos-42a0ab222/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Petros-0a66c2?logo=linkedin&logoColor=white" /></a>
  <a href="mailto:joaopcarvalho.cds@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-joaopcarvalho.cds%40gmail.com-e04a4a?logo=gmail&logoColor=white" /></a>
</p>

---

## 🖥️ Sobre

Site pessoal construído do zero pra apresentar **carreira**, **trajetória acadêmica na FATEC**, **projetos** (integradores e profissionais) e **canais de contato**.

Alguns detalhes que valem o clique:

- **Multi-idioma** — pt-BR, en e es via `i18next`, com fallback tolerante a variantes de locale.
- **5 esquemas de cor** — Bambuzal, Sakura, Glaciar, Crepúsculo e Pelagem, com transição animada entre temas via CSS `@property`.
- **Splash intro** — overlay de entrada com o panda-coding, balões de fala rotativos e CTA pulsante. Sessão marcada em `sessionStorage`; visitas subsequentes recebem uma versão silenciosa e curta.
- **Freeze/unfreeze de animações** — enquanto o splash cobre a tela, as entradas do Hero ficam pausadas via `animation-play-state: paused` e destravam juntas com o fade-out do overlay.
- **Now-playing / Discord status** — integração com Lanyard exibindo o que estou codando/ouvindo/jogando em tempo real.
- **Formulário de contato** — validação Zod + React Hook Form; ao enviar, abre o app de e-mail do visitante com a mensagem preenchida (`mailto:`), já que o GitHub Pages não tem servidor.
- **Easter egg no console** — banner de boas-vindas em ASCII no dev e estilizado com `%c` no build de produção.

## 🧱 Stack

| Camada | Tech |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 + file-based routing) |
| Linguagem | TypeScript 6 |
| Estilo | Tailwind CSS v4 + tokens em `@property` |
| Primitivos | Radix UI |
| i18n | i18next + react-i18next |
| Formulários | React Hook Form + Zod |
| Hospedagem | GitHub Pages (site estático pré-renderizado) |
| Testes | Vitest + Testing Library + jsdom |
| Lint / Format | Biome |
| Bundler | Vite 8 |

## 📁 Estrutura

```
src/
├── components/
│   ├── primitives/       # Brand, Button, Tag, Eyebrow, StatusPill, etc.
│   ├── common/           # Tooltip, RichText…
│   └── sections/         # Hero, Trajectory, Stack, Services, Projects,
│                         # About, Contact, ClosingBanner, Footer, SplashIntro
├── data/                 # bio, channels, cv, projects, services,
│                         # stack, trajectory (com testes co-localizados)
├── hooks/                # useBrtClock, useLanyard, useScrollProgress,
│                         # useScrollSpy, useCarousel
├── i18n/
│   └── resources/        # pt.ts (fonte da verdade), en.ts, es.ts
├── lib/                  # utils compartilhados + consoleGreeting
├── routes/               # __root.tsx + index.tsx (TanStack file-routing)
├── server/               # handlers de e-mail + envs
├── styles/tokens/        # animations.css, cores, timing, densidade
└── theme/                # ThemeProvider, SettingsPopover, tokens de tema
```

## ⚙️ Rodando local

Pré-requisitos: **Node 22+** e **pnpm**.

```bash
git clone https://github.com/JohnPetros/portfolio.git
cd portfolio
pnpm install
cp .env.example .env      # opcional: VITE_DISCORD_ID
pnpm dev                  # http://localhost:3000
```

Scripts principais:

```bash
pnpm dev             # dev server (Vite)
pnpm build           # build estático em dist/client
pnpm preview         # serve o bundle produtivo localmente
pnpm test            # testes com Vitest
pnpm typecheck       # tsc --noEmit
pnpm lint            # biome lint
pnpm check           # biome check + auto-fix
```

## 🧪 Testes

Cobertura focada em:

- Dados (`data/*.test.ts`) — invariantes das listas de projetos, stack, canais, trajetória, bio, serviços e CVs.
- Hooks (`useLanyard`, etc.) — mocks de API + estados de erro.
- Contato (`lib/contact.test.ts`) — validação do formulário e montagem do `mailto:`.

```bash
pnpm test
```

## 🚢 Deploy

Alvo: **GitHub Pages**, via GitHub Actions (`.github/workflows/deploy.yml`). Todo push na `main` roda typecheck, testes e o build estático, e publica `dist/client` em https://fatec-sjc-dsm-portfolio.github.io/ra1461392411016/.

O site é pré-renderizado no build — não roda nada em servidor. Como o GitHub Pages serve o projeto em `/<repo>/`, o workflow define `BASE_PATH` e os caminhos de `/public` passam por `assetUrl()` (`src/lib/assetUrl.ts`).

Consulte [`DEPLOY.md`](DEPLOY.md) para a configuração inicial do repositório.

## 🎨 Design tokens

Cores, tipografia, animações e densidade vivem em `src/styles/tokens/`. Cores usam `@property` pra permitir transição suave entre esquemas quando o usuário troca de tema em runtime — sem flash e sem repintar tudo.

## 📝 Licença

MIT. Consulte [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 💜 e ☕ por <a href="https://github.com/JohnPetros">John Petros</a>&nbsp;·&nbsp;🐼
</p>
