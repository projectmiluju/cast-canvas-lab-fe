# CastCanvas Lab — Site → FE 브랜드 정렬 가이드

> 이 문서는 `cast-canvas-lab-site`에서 확정된 브랜드 기준을 FE 앱에 이식하는 기준 문서다.
> 원본 기준: `cast-canvas-lab-site/STATUS.md` "FE 이식 요소" 섹션 (SITE 이슈 #4, ORCH 에픽 #8)
> Stitch 프로젝트: `projects/13423040029133228893` (CastCanvas Lab — App UI)

---

## 확정된 브랜드 토큰

| 요소           | 값                     | FE 토큰                                         |
| -------------- | ---------------------- | ----------------------------------------------- |
| Primary color  | `#4f46e5` (Indigo 600) | `--color-interactive-primary`                   |
| Headline font  | Plus Jakarta Sans      | `--font-display`                                |
| Body font      | Inter                  | `--font-sans`                                   |
| Border radius  | 8px                    | `--radius-md`                                   |
| App background | `#f7f8fc` (neutral-50) | `--color-bg-app`                                |
| Card surface   | `#ffffff` + 1px border | `--color-bg-surface` + `--color-border-default` |
| Button primary | Indigo fill, semibold  | `--color-interactive-primary`                   |
| Icon style     | Thin stroke, 18–24px   | inline SVG                                      |

---

## 적용 원칙

### 앱 vs. site 밀도 차이

- site는 마케팅 랜딩 → 여백 넓고 장식적
- FE 앱은 캔버스 중심 → 정보 밀도 높고 절제된 브랜드 요소
- 같은 브랜드 컬러/폰트를 쓰되, 레이아웃·애니메이션은 site를 그대로 복제하지 않는다

### 폰트 사용 기준

- `--font-display` (Plus Jakarta Sans): 페이지 타이틀, 브랜드명, 카드 제목 등 헤드라인
- `--font-sans` (Inter): 본문, 라벨, 버튼, 인풋 등 모든 UI 텍스트

### 브랜드 로고마크

- Indigo `--radius-sm` 정사각형 + Layers 아이콘 (filled, white)
- 인증 페이지: 카드 외부 상단 중앙 배치
- 툴바: 좌측 28px 마크만 표시 (텍스트 없음)

### 인터랙티브 요소 기준

- 버튼: `--radius-md`, Indigo fill, semibold, `active:scale(0.98)`
- 인풋: `--radius-md`, 1px border, focus ring `rgba(99,102,241,0.12)`
- 카드: `--radius-md`, 1px border, `--shadow-sm`

---

## 화면별 적용 현황

| 화면              | 상태  | 비고                                                                    |
| ----------------- | ----- | ----------------------------------------------------------------------- |
| 로그인 페이지     | `[x]` | 브랜드 로고마크, Plus Jakarta Sans 타이틀, 아이콘 인풋, visibility 토글 |
| 회원가입 페이지   | `[x]` | 로그인과 동일 패턴, 서브타이틀 추가                                     |
| 캔버스 Toolbar    | `[x]` | full-width top bar, 브랜드마크, 아이콘 버튼                             |
| 캔버스 노드       | `[~]` | 기존 토큰 기반 — 추가 조정 불필요                                       |
| Inspector 패널    | `[~]` | 기존 토큰 기반 — 추가 조정 불필요                                       |
| 워크스페이스 목록 | `[ ]` | FE 이슈 #21 구현 시 이 가이드 기준 적용                                 |

---

## Stitch 참조

- 프로젝트: `projects/13423040029133228893`
- 디자인 시스템: `assets/17329504999202418113`
- 생성된 화면:
  - 로그인: `screens/919e4fc3c78743c1b0f96acc8f40d353`
  - 회원가입: `screens/0cde661a6b434e018c04c28c9d81a157`
- 캔버스 화면: 타임아웃으로 미생성 — 추후 재시도 또는 코드 직접 구현

---

## 다음 화면 작업 시 참고 프롬프트 패턴

```
CastCanvas Lab [화면명]. [레이아웃 설명].
Brand: Indigo #4f46e5, Plus Jakarta Sans bold headlines, Inter body, 8px radius, #f7f8fc background, white cards with 1px border.
Clean app UI, high information density, no decorative elements.
```
