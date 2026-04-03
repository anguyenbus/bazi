# 🏮 Huyền Cơ Bát Tự — BaZi Analysis Platform

> Nền tảng phân tích Tứ Trụ (Bát Tự) chuyên sâu, tích hợp AI tư vấn, được xây dựng với React 19 & Node.js.

*[🇬🇧 English Version](README.en.md)*

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)]()
[![React](https://img.shields.io/badge/react-19.2-61dafb.svg)]()

---

## 📖 Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Tính Năng Chính](#-tính-năng-chính)
- [Kiến Trúc Hệ Thống](#-kiến-trúc-hệ-thống)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Cài Đặt & Chạy](#-cài-đặt--chạy)
- [Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
- [API Endpoints](#-api-endpoints)
- [Engine Bát Tự](#-engine-bát-tự)
- [Bảo Mật](#-bảo-mật)

---

## 🌟 Giới Thiệu

**Huyền Cơ Bát Tự** là nền tảng phân tích mệnh lý Tứ Trụ (Bát Tự / BaZi) toàn diện, kết hợp thuật toán tính toán truyền thống với trí tuệ nhân tạo (AI) để cung cấp luận giải chuyên sâu. Hệ thống hỗ trợ đầy đủ lịch Âm - Dương, chuyển đổi Can Chi, và phân tích Ngũ Hành theo mệnh lý học Đông phương.

---

## ✨ Tính Năng Chính

### 1. 📊 Lá Số Bát Tự (BaZi Chart)
- **Lập lá số Tứ Trụ** đầy đủ: Năm - Tháng - Ngày - Giờ với Thiên Can & Địa Chi
- **Biểu đồ Ngũ Hành Radar** trực quan — hiển thị tỷ lệ Kim, Mộc, Thủy, Hỏa, Thổ
- **Chi tiết lá số** bao gồm: Tàng Can, Thập Thần, Nạp Âm, Không Vong
- **Hỗ trợ lịch Âm & Dương** — tự động chuyển đổi chính xác qua thư viện `lunar-javascript`
- **Xuất file**: Xuất lá số dạng hình ảnh (PNG) hoặc PDF

### 2. 📈 Đại Vận & Lưu Niên (Luck Cycles)
- **Đại Vận (10-year cycles)**: Tính toán và hiển thị các chu kỳ đại vận suốt đời
- **Lưu Niên (Annual cycles)**: Phân tích vận hạn từng năm chi tiết
- **Tiểu Vận & Nguyệt Vận**: Phân tích vận hạn theo tháng, theo tiểu vận
- **Biểu đồ trực quan**: Timeline tương tác hiển thị vận mệnh qua các giai đoạn

### 3. 🔮 Luận Giải Chuyên Sâu (Interpretation)

#### Ma Trận Phân Tích (Matrix Analysis)
- **Quan hệ Can Chi**: Hợp, Xung, Hình, Hại, Phá giữa các trụ
- **Thập Thần phân tích**: Chính Quan, Thiên Quan, Chính Ấn, Thiên Ấn, Tỷ Kiên, Kiếp Tài, Thực Thần, Thương Quan, Chính Tài, Thiên Tài
- **Cách Cục nhận diện**: Xác định cách cục chủ đạo của lá số
- **Điểm số Ngũ Hành**: Tính điểm và cân bằng Ngũ Hành chi tiết

#### Điển Tích Cổ Văn (Classic Texts)
- **Trích dẫn kinh điển** từ Tử Bình Chân Thuyên, Trích Thiên Tùy
- **Luận giải cổ văn** áp dụng vào lá số cá nhân
- **Bệnh Dược luận**: Phân tích bệnh và thuốc trong lá số
- **Đồng Tình Luận**: Phân tích đồng khí tương cầu
- **Kim Bất Hoán**: Phân tích khí chất quý hiếm

### 4. 🤖 Tư Vấn AI (AI Consultant)
- **Hỏi đáp AI thông minh**: Đặt câu hỏi tự do về lá số, nhận phân tích sâu từ AI
- **Hiệu ứng Typewriter**: Hiển thị câu trả lời AI từng ký tự, tạo trải nghiệm tương tác
- **Câu hỏi gợi ý**: Hệ thống câu hỏi mẫu thông dụng theo chủ đề (sự nghiệp, tình cảm, sức khỏe, tài lộc...)
- **Quản lý câu hỏi**: Admin có thể thêm/sửa/xóa câu hỏi gợi ý theo danh mục
- **Lịch sử tư vấn**: Lưu trữ toàn bộ lịch sử hỏi đáp của từng khách hàng
- **Tích hợp OpenRouter API**: Sử dụng các mô hình AI tiên tiến (DeepSeek, GPT...)

### 5. 💑 Hợp Duyên (Matching)
- **So sánh lá số 2 người**: Phân tích tương hợp giữa hai lá số Bát Tự
- **Điểm hợp duyên**: Tính điểm tương hợp dựa trên Ngũ Hành, Nạp Âm, Can Chi
- **Luận giải mối quan hệ**: Phân tích chi tiết điểm mạnh/yếu của mối quan hệ
- **Hỗ trợ nhập liệu linh hoạt**: Nhập thông tin người thứ hai trực tiếp trên giao diện

### 6. 📅 Chọn Ngày Tốt (Date Selection)

#### Xem Ngày Cá Nhân (Personalized Date)
- **Phân tích ngày theo lá số**: Đánh giá ngày tốt/xấu dựa trên lá số cá nhân
- **Phân loại hoạt động**: Gợi ý ngày phù hợp cho từng loại sự kiện

#### Chọn Ngày Hoàng Đạo (Auspicious Date Picker)
- **Lịch chọn ngày tương tác**: Giao diện lịch trực quan để chọn ngày tốt
- **Tiêu chí tùy chỉnh**: Lọc ngày theo mục đích (khai trương, cưới hỏi, xây nhà...)

### 7. 🎴 Xin Quẻ (Hexagram / Que)
- **Xin quẻ Kinh Dịch**: Gieo quẻ ngẫu nhiên hoặc theo câu hỏi
- **64 quẻ đầy đủ**: Dữ liệu đầy đủ 64 quẻ Kinh Dịch với luận giải
- **Luận giải quẻ chi tiết**: Phân tích hào biến, quẻ hỗ, quẻ biến

### 8. 📝 Bài Viết & Kiến Thức (Articles)
- **Hệ thống bài viết**: Quản lý và hiển thị bài viết về mệnh lý học
- **Slug URL thân thiện**: Đường dẫn bài viết tối ưu SEO
- **Markdown rendering**: Hỗ trợ viết bài bằng Markdown với `react-markdown`

### 9. 👤 Quản Lý Người Dùng (Authentication)
- **Đăng ký / Đăng nhập**: Hệ thống xác thực JWT (JSON Web Token)
- **Phân quyền**: Phân biệt User thường và Admin
- **Hồ sơ cá nhân**: Quản lý thông tin cá nhân, xem hồ sơ

### 10. 🛠️ Trang Quản Trị (Admin Panel)
- **Dashboard quản trị**: Giao diện admin toàn diện (55K+ dòng code)
- **Quản lý câu hỏi gợi ý**: Thêm, sửa, xóa câu hỏi mẫu theo danh mục
- **Quản lý bài viết**: CRUD bài viết kiến thức
- **Quản lý người dùng**: Xem và quản lý tài khoản
- **Nhật ký truy cập (Access Logs)**: Theo dõi lượt truy cập, IP, response time
- **Thống kê hệ thống**: Tổng quan hoạt động và hiệu suất

### 11. 📱 Responsive Design
- **Mobile Shell**: Giao diện tối ưu cho di động với navigation riêng
- **Desktop Shell**: Layout chuyên nghiệp cho màn hình lớn
- **Tự động detect**: Tự động chuyển đổi giữa Mobile/Desktop dựa trên kích thước màn hình

### 12. 📤 Xuất Dữ Liệu (Export)
- **Xuất hình ảnh (PNG)**: Chụp lá số dạng hình ảnh chất lượng cao với `html2canvas`
- **Xuất PDF**: Tạo file PDF chuyên nghiệp với `jsPDF`

---

## 🏗️ Kiến Trúc Hệ Thống

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
│              │  (sql.js)     │                  │
│              └───────────────┘                  │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend
| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| React | 19.2 | UI framework |
| Vite | 7.2 | Build tool & dev server |
| React Router DOM | 7.1 | Client-side routing |
| react-markdown | 10.1 | Render Markdown content |
| react-helmet-async | 2.0 | SEO meta tags |
| html2canvas | 1.4 | Chụp ảnh lá số |
| jsPDF | 3.0 | Xuất PDF |
| canvas-confetti | 1.9 | Hiệu ứng confetti |

### Backend
| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| Express.js | 4.18 | Web framework |
| SQLite (sql.js) | 1.10 | Database embedded |
| lunar-javascript | 1.6 | Tính toán lịch Âm |
| jsonwebtoken | 9.0 | Xác thực JWT |
| helmet | 7.1 | HTTP security headers |
| express-rate-limit | 8.2 | Giới hạn request |
| compression | 1.8 | Gzip compression |
| lru-cache | 5.1 | In-memory caching |

### DevOps
| Công nghệ | Mô tả |
|---|---|
| npm Workspaces | Monorepo management |
| concurrently | Chạy đồng thời frontend & backend |
| nodemon | Auto-reload backend khi dev |
| ESLint | Code linting |
| Jest | Unit testing |

---

## 🚀 Cài Đặt & Chạy

### Yêu cầu
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### 1. Clone & Cài đặt

```bash
git clone <repository-url>
cd tinix-bazi

# Cài đặt tất cả dependencies (root + workspaces)
npm install
```

### 2. Cấu hình Backend

```bash
# Copy file cấu hình mẫu
cp backendjs/.env.example backendjs/.env
```

Mở `backendjs/.env` và điền API key:

```env
PORT=8888
NODE_ENV=development

# OpenRouter AI Configuration
# Lấy key tại: https://openrouter.ai/keys
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=deepseek/deepseek-chat
```

> **Note:** Các tính năng không cần AI (lá số, đại vận, phân tích, chọn ngày...) vẫn hoạt động bình thường mà không cần API key. Chỉ tính năng Tư vấn AI và Hợp Duyên AI cần API key.

### 3. Chạy Development

```bash
# Chạy cả Frontend + Backend đồng thời
npm run dev

# Hoặc chạy riêng lẻ
npm run dev:frontend   # React app tại http://localhost:3005
npm run dev:backend    # API server tại http://localhost:8888
```

### 4. Build Production

```bash
npm run build   # Build frontend → frontend/dist/
npm start       # Chạy backend production
```

---

## 📁 Cấu Trúc Thư Mục

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
│       │   ├── Homepage/     # Form nhập thông tin sinh
│       │   ├── BaziChart/    # Lá số, biểu đồ radar, chi tiết
│       │   ├── LuckCycles/   # Đại vận & Lưu niên
│       │   ├── Interpretation/ # Ma trận phân tích, Điển tích
│       │   ├── Consultant/   # Tư vấn AI
│       │   ├── Matching/     # Hợp duyên
│       │   ├── DateSelection/ # Chọn ngày tốt
│       │   ├── Que/          # Xin quẻ Kinh Dịch
│       │   ├── Articles/     # Bài viết
│       │   ├── Admin/        # Trang quản trị
│       │   └── ConsultationHistory/ # Lịch sử tư vấn
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
│   ├── .env                  # Environment variables
│   ├── data/                 # SQLite database files
│   │
│   └── src/
│       ├── bazi/             # 🧮 BaZi Calculation Engine
│       │   ├── calculator.js # Core calculation logic
│       │   ├── core.js       # Engine initialization
│       │   ├── ganzhi.js     # Can Chi (Heavenly Stems & Earthly Branches)
│       │   ├── ganzhi_data.js # Dữ liệu Can Chi (153KB)
│       │   ├── shensha.js    # Thần Sát (44KB)
│       │   ├── dayun.js      # Đại Vận calculation
│       │   ├── liunian.js    # Lưu Niên calculation
│       │   ├── geju.js       # Cách Cục analysis
│       │   ├── output.js     # Output formatting
│       │   ├── scoring_data.js # Scoring algorithms
│       │   │
│       │   ├── phan_tich/    # 📐 Phân tích modules
│       │   │   ├── quan_he.js          # Quan hệ Can Chi
│       │   │   ├── ngu_hanh.js         # Ngũ Hành analysis
│       │   │   ├── luan_tinh.js        # Luận tính cách
│       │   │   ├── luan_dong.js        # Luận động
│       │   │   ├── dong_tinh_luan.js   # Đồng Tình Luận
│       │   │   ├── dich_thien_tuy.js   # Trích Thiên Tùy
│       │   │   ├── tu_binh_chan_thuyen.js # Tử Bình Chân Thuyên
│       │   │   ├── benh_duoc.js        # Bệnh Dược
│       │   │   ├── kim_bat_hoan.js     # Kim Bất Hoán
│       │   │   ├── hinh_hai_pha.js     # Hình Hại Phá
│       │   │   ├── vong_trang_sinh.js  # Vòng Tràng Sinh
│       │   │   └── nap_am_chuyen_sau.js # Nạp Âm chuyên sâu
│       │   │
│       │   ├── luan_giai/    # 📜 Luận giải engine
│       │   ├── shishen/      # Thập Thần data
│       │   ├── hop_hon/      # Hợp Hôn (marriage matching)
│       │   ├── que_data/     # Kinh Dịch 64 quẻ data
│       │   ├── questions/    # Câu hỏi gợi ý data
│       │   └── thoi_gian_luan/ # Thời gian luận
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
| Method | Path | Mô tả |
|---|---|---|
| `GET` | `/api/analyze` | Phân tích Bát Tự đầy đủ |
| `GET` | `/api/chart` | Thông tin lá số cơ bản |
| `GET` | `/api/elements` | Phân tích Ngũ Hành |
| `GET` | `/api/stars` | Phân tích Thần Sát |
| `GET` | `/api/luck-cycles` | Phân tích Đại Vận |
| `GET` | `/api/year-analysis` | Phân tích Lưu Niên |
| `GET` | `/api/auspicious-dates` | Xem ngày tốt xấu |

#### Tham số
| Param | Type | Required | Mô tả |
|---|---|---|---|
| `year` | number | ✅ | Năm sinh |
| `month` | number | ✅ | Tháng sinh |
| `day` | number | ✅ | Ngày sinh |
| `hour` | number | ❌ | Giờ sinh (mặc định: 12) |
| `minute` | number | ❌ | Phút sinh (mặc định: 0) |
| `gender` | string | ❌ | "Nam" hoặc "Nữ" (mặc định: "Nam") |
| `calendar` | string | ❌ | "solar" hoặc "lunar" (mặc định: "solar") |

### AI Consultant
| Method | Path | Mô tả |
|---|---|---|
| `POST` | `/api/consultant/ask` | Hỏi AI tư vấn |
| `GET` | `/api/consultant/stats` | Thống kê tư vấn |
| `GET` | `/api/consultant/customers` | Danh sách khách hàng |
| `GET` | `/api/consultant/history/:id` | Lịch sử tư vấn |

### Authentication
| Method | Path | Mô tả |
|---|---|---|
| `POST` | `/api/auth/register` | Đăng ký tài khoản |
| `POST` | `/api/auth/login` | Đăng nhập |

### Articles & Admin
| Method | Path | Mô tả |
|---|---|---|
| `GET` | `/api/articles` | Danh sách bài viết |
| `GET/POST/PUT/DELETE` | `/api/admin/*` | Quản trị hệ thống |
| `GET/POST` | `/api/que/*` | Xin quẻ & luận giải |

---

## 🧮 Engine Bát Tự

Engine tính toán Bát Tự được xây dựng hoàn toàn bằng JavaScript, bao gồm:

### Tính toán cốt lõi
- **Can Chi (干支)**: Tính Thiên Can & Địa Chi cho Năm, Tháng, Ngày, Giờ
- **Tàng Can (藏干)**: Xác định Can ẩn trong mỗi Địa Chi
- **Thập Thần (十神)**: Tính mối quan hệ 10 thần giữa Nhật Chủ và các Can
- **Nạp Âm (納音)**: Tra cứu Nạp Âm Ngũ Hành cho mỗi cặp Can Chi

### Phân tích chuyên sâu
- **Thần Sát (神煞)**: Tính toán 40+ loại Thần Sát (Quý Nhân, Đào Hoa, Dịch Mã, Kiếp Sát...)
- **Cách Cục (格局)**: Nhận diện cách cục đặc biệt của lá số
- **Ngũ Hành Điểm Số**: Tính điểm các hành Kim, Mộc, Thủy, Hỏa, Thổ
- **Vòng Tràng Sinh**: Xác định trạng thái Tràng Sinh, Mộc Dục, Quan Đái...

### Quan hệ Can Chi
- **Thiên Can**: Hợp, Xung
- **Địa Chi**: Tam Hợp, Lục Hợp, Lục Xung, Hình, Hại, Phá, Bán Hợp

### Luận giải Kinh Điển
- **Tử Bình Chân Thuyên** — trích dẫn & áp dụng
- **Trích Thiên Tùy** — phân tích theo cổ thư
- **Bệnh Dược Luận** — chẩn đoán bệnh/thuốc của lá số
- **Đồng Tình Luận** — phân tích khí đồng loại
- **Kim Bất Hoán** — đánh giá khí chất quý

---

## 🔒 Bảo Mật

- **Helmet.js**: HTTP security headers
- **Rate Limiting**: 3 tầng giới hạn request
  - General: 500 req / 15 phút
  - Auth: 50 req / 15 phút
  - AI: 15 req / 1 phút
- **JWT Authentication**: Token-based auth với `jsonwebtoken`
- **CORS**: Cross-Origin Resource Sharing configuration
- **Gzip Compression**: Nén response tự động
- **Access Logging**: Ghi log truy cập vào SQLite (IP, method, path, response time)
- **Graceful Shutdown**: Đóng database connection an toàn khi shutdown

---

## 🌐 Routes Frontend

| Path | Trang | Mô tả |
|---|---|---|
| `/` | Trang chủ | Form nhập thông tin sinh |
| `/laso` | Lá Số | Hiển thị lá số Bát Tự |
| `/vanhan` | Vận Hạn | Đại Vận & Lưu Niên |
| `/phantich` | Phân Tích | Ma trận phân tích |
| `/dientich` | Điển Tích | Cổ văn luận giải |
| `/tuvan` | Tư Vấn | AI Consultant |
| `/duyenso` | Duyên Số | Hợp duyên 2 người |
| `/xemngay` | Xem Ngày | Xem ngày cá nhân |
| `/chonngay` | Chọn Ngày | Chọn ngày hoàng đạo |
| `/xinque` | Xin Quẻ | Gieo quẻ Kinh Dịch |
| `/lich-su` | Lịch Sử | Lịch sử tư vấn |
| `/bai-viet/:slug` | Bài Viết | Trang bài viết |
| `/admin` | Quản Trị | Admin panel |

---

## 📄 License

MIT License — Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

<p align="center">
  <b>🏮 Huyền Cơ Bát Tự</b> — Nền tảng mệnh lý học hiện đại<br/>
  <i>huyencobattu.com</i>
</p>
