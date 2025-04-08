# CastCanvas Lab — Frontend

CastCanvas Lab은 공간 기반 리서치 워크스페이스입니다.
PDF 문서와 레퍼런스 이미지를 무한 캔버스 위에 자유롭게 배치하고, 노트와 연결선으로 아이디어를 연결할 수 있습니다.

> Notion보다 더 공간적으로, Figma보다 더 문서 친화적으로.

---

## 서비스 구성

CastCanvas Lab은 다음 레포지토리로 구성됩니다.

| 레포                     | 역할                                 |
| ------------------------ | ------------------------------------ |
| `cast-canvas-lab-fe`     | 워크스페이스 프론트엔드 앱 (이 레포) |
| `cast-canvas-lab-be`     | 메인 백엔드 API 서버                 |
| `cast-canvas-lab-collab` | 실시간 협업 서버 (Yjs/WebSocket)     |
| `cast-canvas-lab-site`   | 퍼블릭 랜딩 사이트                   |

시스템 전체 구조와 레포 간 책임 경계는 [ARCHITECTURE.md](./ARCHITECTURE.md)를 참고하세요.

---

## 기술 스택

- React 19
- TypeScript
- Vite
- Zustand
- TanStack Query
- React Flow (`@xyflow/react` v12)
- react-pdf
- SCSS Modules

---

## 로컬 개발 환경 설정

**요구 사항:** Node.js, pnpm

```bash
pnpm install
pnpm dev
```

---

## 주요 명령어

| 명령어            | 설명             |
| ----------------- | ---------------- |
| `pnpm dev`        | 개발 서버 실행   |
| `pnpm build`      | 프로덕션 빌드    |
| `pnpm lint`       | ESLint 실행      |
| `pnpm typecheck`  | 타입 검사        |
| `pnpm test`       | 테스트 실행      |
| `pnpm test:watch` | 테스트 감시 모드 |
| `pnpm format`     | 코드 포맷        |

---

## 프로젝트 구조

```
src/
├── app/          # 앱 부트스트랩, 프로바이더
├── pages/        # 라우트 페이지
├── features/
│   ├── canvas/   # 캔버스 인터랙션, 노드/엣지
│   ├── document/ # 문서 렌더링
│   ├── image/    # 레퍼런스 이미지
│   ├── search/   # 검색
│   └── inspector/# 사이드 패널
├── entities/     # 도메인 타입 정의
└── shared/       # 공통 유틸, UI, 상수
```

---

## 코드 기여 규칙

- 커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다
- 브랜치 네이밍 규칙은 커밋 전 자동으로 검사됩니다
- 코드 스타일은 ESLint + Prettier로 강제됩니다
- push 전 타입 검사, 테스트, 빌드가 자동으로 실행됩니다
