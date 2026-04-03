# 🏮 Huyền Cơ Bát Tự — BaZi Analysis Platform

> A comprehensive Four Pillars of Destiny (BaZi / 八字) analysis platform with AI-powered consultation, built with React 19 & Node.js.

*[🇻🇳 Phiên bản Tiếng Việt](README.md)*

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)]()
[![React](https://img.shields.io/badge/react-19.2-61dafb.svg)]()

---

## 📖 Table of Contents

- [Introduction](#-introduction)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [BaZi Engine](#-bazi-engine)
- [Security](#-security)

---

## 🌟 Introduction

**Huyền Cơ Bát Tự** is a full-featured Chinese metaphysics platform for Four Pillars of Destiny (BaZi / 八字) analysis. It combines traditional calculation algorithms with artificial intelligence (AI) to deliver in-depth life readings. The system supports both Solar and Lunar calendars, Heavenly Stems & Earthly Branches conversion, and Five Elements analysis following Eastern astrology principles.

---

## ✨ Key Features

### 1. 📊 BaZi Chart
- **Full Four Pillars chart**: Year, Month, Day, Hour with Heavenly Stems (天干) & Earthly Branches (地支)
- **Five Elements Radar chart** — visual breakdown of Metal, Wood, Water, Fire, Earth
- **Detailed chart info**: Hidden Stems (藏干), Ten Gods (十神), Nayin (納音), Empty Void (空亡)
- **Lunar & Solar calendar support** — accurate conversion via `lunar-javascript` library
- **Export**: Export chart as image (PNG) or PDF

### 2. 📈 Luck Cycles (大運 & 流年)
- **Major Luck Cycles (大運)**: Calculate and display lifetime 10-year luck periods
- **Annual Luck (流年)**: Detailed year-by-year fortune analysis
- **Minor & Monthly Luck**: Monthly and minor cycle analysis
- **Interactive timeline**: Visual timeline showing fortune across life stages

### 3. 🔮 In-Depth Interpretation

#### Matrix Analysis
- **Stem & Branch relationships**: Combinations, Clashes, Punishments, Harms, Destructions between pillars
- **Ten Gods analysis**: Direct Officer, 7 Killings, Direct Seal, Indirect Seal, Rob Wealth, Friend, Eating God, Hurting Officer, Direct Wealth, Indirect Wealth
- **Structure recognition**: Identify the dominant chart structure (格局)
- **Five Elements scoring**: Detailed element balance calculation

#### Classic Texts
- **Classical citations** from Zi Ping Zhen Quan (子平真詮), Di Tian Sui (滴天髓)
- **Ancient text interpretation** applied to individual charts
- **Disease & Remedy theory** (病藥論): Diagnose chart ailments and cures
- **Sympathetic Element theory** (同情論): Like-attracts-like analysis
- **Golden Irreplaceable** (金不換): Rare quality assessment

### 4. 🤖 AI Consultant
- **Smart AI Q&A**: Ask free-form questions about your chart — get deep AI-powered analysis
- **Typewriter effect**: Character-by-character AI response display for engaging UX
- **Suggested questions**: Pre-built question templates by topic (career, love, health, wealth...)
- **Question management**: Admin can add/edit/delete suggested questions by category
- **Consultation history**: Full Q&A history stored per customer
- **OpenRouter API integration**: Uses advanced AI models (DeepSeek, GPT, etc.)

### 5. 💑 Compatibility Matching
- **Two-person chart comparison**: Analyze compatibility between two BaZi charts
- **Compatibility score**: Score based on Five Elements, Nayin, Stems & Branches
- **Relationship analysis**: Detailed breakdown of strengths/weaknesses in the relationship
- **Flexible input**: Enter the second person's info directly on the interface

### 6. 📅 Date Selection

#### Personalized Date Analysis
- **Chart-based date analysis**: Evaluate good/bad dates based on personal chart
- **Activity categorization**: Suggest suitable dates for different event types

#### Auspicious Date Picker
- **Interactive calendar**: Visual calendar interface for picking auspicious dates
- **Custom criteria**: Filter dates by purpose (grand opening, wedding, construction...)

### 7. 🎴 I Ching Hexagram (Que)
- **I Ching divination**: Cast hexagrams randomly or based on a question
- **All 64 hexagrams**: Complete data for all 64 I Ching hexagrams with interpretations
- **Detailed hexagram reading**: Changing lines, nuclear hexagram, transformed hexagram analysis

### 8. 📝 Articles & Knowledge Base
- **Article system**: Manage and display articles about Chinese metaphysics
- **SEO-friendly slugs**: Optimized article URLs
- **Markdown rendering**: Write articles in Markdown with `react-markdown`

### 9. 👤 User Authentication
- **Register / Login**: JWT (JSON Web Token) authentication system
- **Role-based access**: Distinguish between regular Users and Admins
- **User profile**: Personal info management and profile viewing

### 10. 🛠️ Admin Panel
- **Admin dashboard**: Comprehensive admin interface (55K+ lines of code)
- **Question management**: Add, edit, delete suggested questions by category
- **Article management**: Full CRUD for knowledge articles
- **User management**: View and manage accounts
- **Access logs**: Track visits, IPs, response times
- **System statistics**: Activity and performance overview

### 11. 📱 Responsive Design
- **Mobile Shell**: Optimized mobile interface with dedicated navigation
- **Desktop Shell**: Professional layout for large screens
- **Auto-detection**: Automatically switches between Mobile/Desktop based on screen size

### 12. 📤 Data Export
- **Image export (PNG)**: High-quality chart screenshot with `html2canvas`
- **PDF export**: Professional PDF generation with `jsPDF`

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────┐
│                   CLIENT                        │
│         React 19 + Vite (Port 3005)             │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ BaziChart│  │ LuckCycle│  │  AI Consult   │  │
│  │  Module  │  │  Module  │  │    Module     │  │
│  └────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│       │              │               │          │
│       └──────────────┼───────────────┘          │
│                      │                          │
│              ┌───────┴───────┐                  │
│              │  API Client   │                  │
│              └───────┬───────┘                  │
└──────────────────────┼──────────────────────────┘
                       │  Vite Proxy (/api → :8888)
┌──────────────────────┼──────────────────────────┐
│                SERVER│                          │
│        Express.js (Port 8888)                   │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  BaZi    │  │  Auth    │  │  OpenRouter   │  │
│  │  Engine  │  │  (JWT)   │  │  AI Service   │  │
│  └────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│       │              │               │          │
│       └──────────────┼───────────────┘          │
│                      │                          │
│              ┌───────┴───────┐                  │
│              │   SQLite DB   │                  │
│              │  (sqlite3)    │                  │
│              └───────────────┘                  │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Description |
|---|---|---|
| React | 19.2 | UI framework |
| Vite | 7.2 | Build tool & dev server |
| React Router DOM | 7.1 | Client-side routing |
| react-markdown | 10.1 | Render Markdown content |
| react-helmet-async | 2.0 | SEO meta tags |
| html2canvas | 1.4 | Chart screenshot capture |
| jsPDF | 3.0 | PDF export |
| canvas-confetti | 1.9 | Confetti effects |

### Backend
| Technology | Version | Description |
|---|---|---|
| Express.js | 4.18 | Web framework |
| SQLite (sqlite3) | 5.1 | Embedded database |
| lunar-javascript | 1.6 | Lunar calendar calculations |
| jsonwebtoken | 9.0 | JWT authentication |
| helmet | 7.1 | HTTP security headers |
| express-rate-limit | 8.2 | Request rate limiting |
| compression | 1.8 | Gzip compression |
| lru-cache | 5.1 | In-memory caching |

### DevOps
| Technology | Description |
|---|---|
| npm Workspaces | Monorepo management |
| concurrently | Run frontend & backend simultaneously |
| nodemon | Auto-reload backend during dev |
| ESLint | Code linting |
| Jest | Unit testing |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### 1. Clone & Install

```bash
git clone <repository-url>
cd tinix-bazi

# Install all dependencies (root + workspaces)
npm install
```

### 2. Configure Backend

```bash
# Copy the example config file
cp backendjs/.env.example backendjs/.env
```

Open `backendjs/.env` and fill in your API key:

```env
PORT=8888
NODE_ENV=development

# OpenRouter AI Configuration
# Get your key at: https://openrouter.ai/keys
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=deepseek/deepseek-chat
```

> **Note:** Non-AI features (chart generation, luck cycles, analysis, date selection...) work perfectly without an API key. Only the AI Consultant and AI Matching features require an API key.

### 3. Run Development

```bash
# Run both Frontend + Backend concurrently
npm run dev

# Or run separately
npm run dev:frontend   # React app at http://localhost:3005
npm run dev:backend    # API server at http://localhost:8888
```

### 4. Build for Production

```bash
npm run build   # Build frontend → frontend/dist/
npm start       # Run backend in production
```

---

## 📁 Project Structure

```
tinix-bazi/
├── package.json              # Root monorepo config (npm workspaces)
│
├── frontend/                 # 🎨 React 19 + Vite
│   ├── index.html
│   ├── vite.config.js        # Dev server port 3005, proxy /api → 8888
│   └── src/
│       ├── App.jsx           # Root component, routing
│       ├── main.jsx          # Entry point
│       ├── index.css         # Global styles (design system)
│       │
│       ├── features/         # 📦 Feature modules
│       │   ├── Homepage/     # Birth info input form
│       │   ├── BaziChart/    # Chart, radar, details
│       │   ├── LuckCycles/   # Major & annual luck
│       │   ├── Interpretation/ # Matrix analysis, classic texts
│       │   ├── Consultant/   # AI consultation
│       │   ├── Matching/     # Compatibility matching
│       │   ├── DateSelection/ # Auspicious date selection
│       │   ├── Que/          # I Ching hexagram
│       │   ├── Articles/     # Knowledge articles
│       │   ├── Admin/        # Admin panel
│       │   └── ConsultationHistory/ # Consultation history
│       │
│       ├── components/       # 🧩 Shared components
│       │   ├── MobileShell.jsx
│       │   ├── DesktopShell.jsx
│       │   ├── AuthModal.jsx
│       │   ├── ComprehensiveInterpretation.jsx
│       │   └── common/       # SEO, Toast, etc.
│       │
│       ├── hooks/            # Custom React hooks
│       │   ├── useBaziApi.js
│       │   └── useWindowSize.js
│       │
│       ├── context/          # React Context
│       │   └── AuthContext.jsx
│       │
│       ├── services/         # API & Export services
│       │   ├── apiClient.js
│       │   ├── imageExport.js
│       │   └── pdfExport.js
│       │
│       └── theme/            # Theme configuration
│
├── backendjs/                # ⚙️ Express.js API
│   ├── server.js             # Entry point, middleware, routes
│   ├── .env.example          # Environment template
│   ├── data/                 # SQLite database files
│   │
│   └── src/
│       ├── bazi/             # 🧮 BaZi Calculation Engine
│       │   ├── calculator.js # Core calculation logic
│       │   ├── core.js       # Engine initialization
│       │   ├── ganzhi.js     # Heavenly Stems & Earthly Branches
│       │   ├── ganzhi_data.js # Stems & Branches data (153KB)
│       │   ├── shensha.js    # Symbolic Stars (44KB)
│       │   ├── dayun.js      # Major Luck Cycle calculation
│       │   ├── liunian.js    # Annual Luck calculation
│       │   ├── geju.js       # Chart Structure analysis
│       │   ├── output.js     # Output formatting
│       │   ├── scoring_data.js # Scoring algorithms
│       │   │
│       │   ├── phan_tich/    # 📐 Analysis modules
│       │   │   ├── quan_he.js          # Stem & Branch relationships
│       │   │   ├── ngu_hanh.js         # Five Elements analysis
│       │   │   ├── luan_tinh.js        # Personality analysis
│       │   │   ├── luan_dong.js        # Dynamic analysis
│       │   │   ├── dong_tinh_luan.js   # Sympathetic Element theory
│       │   │   ├── dich_thien_tuy.js   # Di Tian Sui (滴天髓)
│       │   │   ├── tu_binh_chan_thuyen.js # Zi Ping Zhen Quan (子平真詮)
│       │   │   ├── benh_duoc.js        # Disease & Remedy
│       │   │   ├── kim_bat_hoan.js     # Golden Irreplaceable
│       │   │   ├── hinh_hai_pha.js     # Punishment, Harm, Destruction
│       │   │   ├── vong_trang_sinh.js  # Cycle of Twelve Stages
│       │   │   └── nap_am_chuyen_sau.js # Advanced Nayin analysis
│       │   │
│       │   ├── luan_giai/    # 📜 Interpretation engine
│       │   ├── shishen/      # Ten Gods data
│       │   ├── hop_hon/      # Marriage matching
│       │   ├── que_data/     # I Ching 64 hexagrams data
│       │   ├── questions/    # Suggested questions data
│       │   └── thoi_gian_luan/ # Time-based analysis
│       │
│       ├── routes/           # 🛣️ API Routes
│       │   ├── bazi.routes.js       # BaZi analysis endpoints
│       │   ├── consultant.routes.js # AI consultant endpoints
│       │   ├── auth.routes.js       # Authentication endpoints
│       │   ├── admin.routes.js      # Admin endpoints
│       │   ├── articles.routes.js   # Articles CRUD
│       │   └── que.routes.js        # Hexagram endpoints
│       │
│       ├── services/         # 💼 Business Services
│       │   ├── bazi.service.js       # BaZi calculation orchestration
│       │   ├── openrouter.service.js # OpenRouter AI integration
│       │   ├── database.service.js   # SQLite operations (52KB)
│       │   ├── cache.service.js      # LRU caching
│       │   └── que.service.js        # Hexagram service
│       │
│       ├── middleware/       # 🔒 Express middleware
│       └── utils/            # 🔧 Utility functions
```

---

## 📡 API Endpoints

### BaZi Analysis
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/analyze` | Full BaZi analysis |
| `GET` | `/api/chart` | Basic chart info |
| `GET` | `/api/elements` | Five Elements analysis |
| `GET` | `/api/stars` | Symbolic Stars analysis |
| `GET` | `/api/luck-cycles` | Major Luck Cycle analysis |
| `GET` | `/api/year-analysis` | Annual Luck analysis |
| `GET` | `/api/auspicious-dates` | Auspicious dates lookup |

#### Parameters
| Param | Type | Required | Description |
|---|---|---|---|
| `year` | number | ✅ | Birth year |
| `month` | number | ✅ | Birth month |
| `day` | number | ✅ | Birth day |
| `hour` | number | ❌ | Birth hour (default: 12) |
| `minute` | number | ❌ | Birth minute (default: 0) |
| `gender` | string | ❌ | "Nam" (Male) or "Nữ" (Female), default: "Nam" |
| `calendar` | string | ❌ | "solar" or "lunar" (default: "solar") |

### AI Consultant
| Method | Path | Description |
|---|---|---|
| `POST` | `/api/consultant/ask` | Ask AI consultant |
| `GET` | `/api/consultant/stats` | Consultation statistics |
| `GET` | `/api/consultant/customers` | Customer list |
| `GET` | `/api/consultant/history/:id` | Customer consultation history |

### Authentication
| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register account |
| `POST` | `/api/auth/login` | Login |

### Articles & Admin
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/articles` | List articles |
| `GET/POST/PUT/DELETE` | `/api/admin/*` | System administration |
| `GET/POST` | `/api/que/*` | Hexagram divination & reading |

---

## 🧮 BaZi Engine

The BaZi calculation engine is built entirely in JavaScript:

### Core Calculations
- **Heavenly Stems & Earthly Branches (干支)**: Calculate Stems & Branches for Year, Month, Day, Hour
- **Hidden Stems (藏干)**: Determine hidden Stems within each Earthly Branch
- **Ten Gods (十神)**: Calculate the 10 Gods relationships between Day Master and all Stems
- **Nayin (納音)**: Look up Nayin Five Elements for each Stem-Branch pair

### Advanced Analysis
- **Symbolic Stars (神煞)**: Calculate 40+ star types (Noble Star, Peach Blossom, Traveling Horse, Robbery Star...)
- **Chart Structure (格局)**: Identify special chart structures
- **Five Elements Scoring**: Score each element — Metal, Wood, Water, Fire, Earth
- **Twelve Growth Stages**: Determine stages — Birth, Bathing, Crown, Prosperity, etc.

### Stem & Branch Relationships
- **Heavenly Stems**: Combinations, Clashes
- **Earthly Branches**: Triple Combinations, Six Harmonies, Six Clashes, Punishments, Harms, Destructions, Half-Combinations

### Classical Text Interpretation
- **Zi Ping Zhen Quan (子平真詮)** — citations & application
- **Di Tian Sui (滴天髓)** — classical text analysis
- **Disease & Remedy Theory (病藥論)** — chart diagnosis
- **Sympathetic Element Theory (同情論)** — like-element analysis
- **Golden Irreplaceable (金不換)** — rare quality assessment

---

## 🔒 Security

- **Helmet.js**: HTTP security headers
- **Rate Limiting**: 3-tier request limiting
  - General: 500 req / 15 min
  - Auth: 50 req / 15 min
  - AI: 15 req / 1 min
- **JWT Authentication**: Token-based auth with `jsonwebtoken`
- **CORS**: Cross-Origin Resource Sharing configuration
- **Gzip Compression**: Automatic response compression
- **Access Logging**: Request logging to SQLite (IP, method, path, response time)
- **Graceful Shutdown**: Safe database connection closure on shutdown

---

## 🌐 Frontend Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Birth info input form |
| `/laso` | Chart | BaZi chart display |
| `/vanhan` | Luck Cycles | Major & Annual Luck |
| `/phantich` | Analysis | Matrix analysis |
| `/dientich` | Classics | Classic text interpretation |
| `/tuvan` | Consultant | AI Consultant |
| `/duyenso` | Matching | Two-person compatibility |
| `/xemngay` | Date View | Personalized date analysis |
| `/chonngay` | Date Pick | Auspicious date picker |
| `/xinque` | Hexagram | I Ching divination |
| `/lich-su` | History | Consultation history |
| `/bai-viet/:slug` | Article | Article page |
| `/admin` | Admin | Admin panel |

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

<p align="center">
  <b>🏮 Huyền Cơ Bát Tự</b> — Modern Chinese Metaphysics Platform<br/>
  <i>huyencobattu.com</i>
</p>
