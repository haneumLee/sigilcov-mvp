###########################################
Sigilcov MVP 개발 계획

목표  
Solana Devnet 기반 단일 체인 지갑 MVP 개발  
지갑 생성, 복구, 잔액 표시, 주소 확인 등 기본 기능을 자체 구현

파일명 추천  
- dev-plan.md
- sigilcov-mvp-plan.md

1단계: 기본 UI 구성  
- [ ] 지갑 생성 / 복구 선택 화면
- [ ] 지갑 유무 여부(localStorage)로 화면 분기
- [ ] 지갑 생성됨 → 지갑 대시보드 진입

2단계: 지갑 생성 기능  
- [ ] solana-web3.js를 이용한 키페어 생성
- [ ] 시드 문구(mnemonic) 생성
- [ ] 시드를 암호화하여 로컬에 저장
- [ ] 지갑 상태 유지 로직 구현

3단계: 지갑 복구 기능  
- [ ] 시드 문구 입력 폼
- [ ] 입력된 시드로 키페어 복원
- [ ] 복원 성공 시 지갑 대시보드 진입

4단계: 지갑 정보 표시  
- [ ] 지갑 주소(공개키) 표시
- [ ] 주소 복사 버튼
- [ ] QR코드 생성 버튼 (선택)

5단계: SOL 잔액 조회  
- [ ] Devnet 기준 잔액 조회 API 연동
- [ ] 지갑 생성 직후 airdrop 테스트 (1 SOL)

향후 확장 기능 (Later로 분류)  
- [ ] SPL 토큰 조회 및 필터링
- [ ] 송금 기능 (SOL, SPL)
- [ ] 트랜잭션 내역 조회 및 상세
- [ ] 토큰 가격 연동
- [ ] 지갑 내 메모 기능, 다크모드 UI 등

###########################################

1. 베이스 셋업
프로젝트 초기 커밋 (지금 상태)
기본 폴더 구조 정리 (components, pages, utils 등)

2. 온보딩 화면 작업
로그인 / 지갑 생성 / 지갑 추가 버튼 연결
버튼 클릭 시 이동하는 라우팅 구현

3. 지갑 생성 플로우
니모닉 생성
시드문구 표시 + 경고 문구
"저장했어요" 체크박스 + 다음 단계 버튼

4. 지갑 저장
니모닉 → 키페어 생성
로컬 스토리지에 패스워드 기반 암호화 저장

5. 로그인 플로우
패스워드 입력 → 복호화 → 지갑 로드
성공 시 홈화면 이동

6. 홈화면(토큰 목록) 작업
기본 레이아웃 만들기
SOL 잔액 조회 (RPC 연결)

7. 입출금 플로우
입금 : 주소 생성 및 표시
출금 : 출금 화면 + 검증 흐름

8. 트랜잭션 기록 보기
입금 / 출금 기록 표시 (간단히)

9. 최종 점검 및 예외처리
지갑 존재 유무 체크
비밀번호 실패 시 경고
네트워크 에러 처리

개발 폴더 구조

sigilcov-mvp/
├── index.html    # Vite 기본 템플릿
├── public/
│   └──         
├── src/
│   ├── assets/                # 이미지, 폰트 등 정적 파일
│   ├── components/            # 재사용 가능한 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ...추가
│   ├── hooks/                 # 커스텀 훅 모음
│   │   └── useWallet.ts
│   ├── pages/                 # 화면 단위 페이지
│   │   ├── Onboarding.tsx
│   │   ├── CreateWallet.tsx
│   │   ├── RecoverWallet.tsx
│   │   ├── Home.tsx
│   │   ├── TokenDetail.tsx
│   │   └── SendToken.tsx
│   ├── services/              # Solana RPC 연동, 지갑 관련 서비스 로직
│   │   ├── walletService.ts
│   │   ├── transactionService.ts
│   │   └── tokenService.ts
│   ├── utils/                 # 유틸리티 함수 모음
│   │   ├── cryptoUtils.ts      # 암호화 관련
│   │   ├── mnemonicUtils.ts    # 니모닉 관련
│   │   └── storageUtils.ts     # localStorage 관련
│   ├── App.tsx                # 전체 라우터 구조
│   └── main.tsx               # Vite 진입 파일
├── docs/                      # 문서 폴더
│   ├── dev-tasks.md            # 개발 할 일 목록
│   ├── dev-rules.md            # 커밋/브랜치 규칙
│   ├── wireframe-summary.md    # 와이어프레임 요약
│   ├── transfer-flow.md        # 송금 검증 흐름
│   ├── env-setup-troubleshooting.md # 환경 설정 문제 모음
│   └── 보안강화대책.md         # 보안 관련 정리
├── .env.example                # 환경변수 예시파일
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.js                # 코드 스타일 체크 (선택)
├── .prettierrc                 # 코드 포맷팅 설정
└── README.md


로그인
└── 버튼 클릭시 IndexedDB에서 저장된 지갑 데이터 검색
    ├── 지갑이 하나 이상 있다 → 지갑 목록 보여주는 팝업 띄우기
    └── 지갑이 없다 → 지갑 생성 안내 팝업 띄우기

<로그인 관련 작업>
IndexedDB 유틸 파일 만들기
    저장 (saveWallet)
    불러오기 (getWallets)
    삭제 (deleteWallet) 등

Onboarding.tsx 수정하기
    로그인 버튼 누를 때 IndexedDB 조회 → 결과에 따라 다른 행동

팝업 컴포넌트 만들기
    지갑 선택 팝업
    지갑 없음 안내 팝업

지갑 생성
└── 지갑 생성 페이지로 이동

<지갑 생성 관련 작업>
지갑 생성 버튼 기능 구현
	니모닉(시드문구) 생성
	시드문구를 사용자에게 보여주기
	저장 (암호화+IndexedDB 저장)

<지갑 추가 관련 작업>
지갑 추가 버튼 기능 구현
	외부에서 가져온 니모닉으로 복구
	복구 후 로컬 저장

