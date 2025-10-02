# CastCanvas Lab Frontend

CastCanvas Lab은 PDF 문서, 이미지, 노트를 하나의 무한 캔버스 위에서 연결해 리서치 흐름을 정리하는 공간형 워크스페이스입니다.

> Notion보다 더 공간적으로, Figma보다 더 문서 친화적으로.

## 프로젝트 개요

CastCanvas Lab은 아래 4개 레포지토리로 구성됩니다.

| 레포                     | 역할                    |
| ------------------------ | ----------------------- |
| `cast-canvas-lab-fe`     | 워크스페이스 프론트엔드 |
| `cast-canvas-lab-be`     | 메인 백엔드 API 서버    |
| `cast-canvas-lab-collab` | 실시간 협업 서버        |
| `cast-canvas-lab-site`   | 퍼블릭 랜딩 사이트      |

시스템 경계와 레포 간 책임은 [ARCHITECTURE.md](./ARCHITECTURE.md)를 기준으로 유지합니다.

## 이 레포의 역할

`cast-canvas-lab-fe`는 사용자가 실제로 작업하는 워크스페이스 애플리케이션입니다. 이 저장소는 캔버스 상호작용, 문서/이미지 배치, 검색, 인스펙터 UI, 그리고 백엔드 및 협업 서버 연동을 담당하는 프론트엔드 경계를 정의합니다.

이 레포가 담당하는 범위:

- 워크스페이스 화면과 캔버스 UI
- 문서/PDF 렌더링과 이미지 배치
- 노드/엣지 상호작용
- 검색과 사이드 패널 인터페이스
- API 및 협업 서버와의 클라이언트 연동

이 레포가 담당하지 않는 범위:

- 메인 비즈니스 API 자체
- 실시간 협업 서버 transport 계층
- 퍼블릭 마케팅 페이지

## 기술 스택

| 항목               | 내용                    |
| ------------------ | ----------------------- |
| Framework          | React 19                |
| Build              | Vite                    |
| Language           | TypeScript 5.9.x        |
| State              | Zustand, TanStack Query |
| Canvas Graph       | `@xyflow/react` v12     |
| Document Rendering | `react-pdf`             |
| Styling            | SCSS Modules            |
| Test               | Vitest, Testing Library |
| Quality            | ESLint, Prettier        |

## 시작하기

요구 사항:

- Node.js
- pnpm

1. 의존성을 설치합니다.

```bash
pnpm install
```

2. 개발 서버를 실행합니다.

```bash
pnpm dev
```

현재 저장소는 초기 셋업 단계이며, 기능 구현이 진행되면 일부 화면은 API 서버와 협업 서버를 함께 실행해야 정상 동작합니다.

## 주요 명령어

| 명령어               | 설명                       |
| -------------------- | -------------------------- |
| `pnpm dev`           | 개발 서버 실행             |
| `pnpm build`         | 타입 검사 후 프로덕션 빌드 |
| `pnpm lint`          | ESLint 실행                |
| `pnpm typecheck`     | TypeScript 타입 검사       |
| `pnpm test`          | 테스트 실행                |
| `pnpm test:watch`    | 테스트 watch 모드          |
| `pnpm test:coverage` | 테스트 커버리지 실행       |
| `pnpm format`        | Prettier 포맷 적용         |

## 프로젝트 구조

```text
src/
├── app/              # 앱 부트스트랩, 전역 provider
├── assets/           # 정적 에셋
├── entities/         # 도메인 타입과 모델
├── features/
│   ├── canvas/       # 캔버스 인터랙션, 노드/엣지
│   ├── document/     # 문서 렌더링
│   ├── image/        # 레퍼런스 이미지
│   ├── inspector/    # 사이드 패널
│   └── search/       # 검색 UI
├── pages/            # 라우트 단위 화면
├── shared/           # 공통 유틸, UI, 상수
└── test/             # 테스트 설정 및 헬퍼
```

## 협업 규칙

- 커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/) 형식을 사용합니다.
- 코드 수정 후 `pnpm lint`, `pnpm typecheck`, `pnpm test`로 기본 품질을 확인합니다.
- 포맷은 Prettier 기준을 따르며 필요 시 `pnpm format`을 사용합니다.
- 사용자에게 보이는 기능 설명은 [ARCHITECTURE.md](./ARCHITECTURE.md)와 충돌하지 않게 유지합니다.
