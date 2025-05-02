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

홈 화면 (코인 목록)
    검색창 + 드롭다운 (전체/보유/관심)
    코인별 카드 (심볼, 이름, 보유수량 표시)
    클릭 시 상세페이지 이동

코인 상세 화면
    기본 정보 (총 보유, 거래대기, 출금가능)
    입금/출금 버튼
    입금: 솔라나일 경우는 바로 주소 표시
    출금: 수량, 수수료, 받는 주소 입력
    트랜잭션 내역 리스트 (전체/입금/출금 필터)

입금 플로우
    SOL: 지갑 주소 & QR 코드 바로 표시
    다른 토큰: 필요 시 네트워크 선택 → 주소 발급 후 표시

출금 플로우
    출금 가능한 잔고 표시
    출금수량/주소 입력, QR 스캔 붙이기 버튼
    송금 실행 → 검증 후 트랜잭션 발생


홈 UI 개선 및 SOL 클릭 시 상세페이지 이동까지 라우팅 완성

1단계: 홈화면 틀 만들기
	Home.tsx 파일에 다음 기본 틀을 구성
	전체 배경
	상단에 로고 + 타이틀
	검색창 + 드롭다운 자리만 잡아두기
	리스트 영역만 빈 상태로 placeholder

2단계: CoinListItem.tsx 컴포넌트 생성
	props: 코인명, 심볼, 잔고 등 전달
	스타일만 일단 구현
	클릭 시 console.log로 코인 정보 출력

3단계: Dropdown.tsx 컴포넌트 생성
	props: 현재 선택값, 옵션 배열, onSelect 함수
	UI만 우선 구성

상세페이지에서 SOL은 입금주소 바로 노출 & 출금 로직 시작

1.	라우터 설정:
    상세보기 페이지를 위한 새로운 Route를 만든다.
    예) /coin/:symbol 같은 경로로 접근

2.	코인 상세 페이지 파일 만들기:
    CoinDetail.tsx 같은 페이지 컴포넌트를 만든다.

3.	CoinList에서 클릭 이벤트 연결:
    useNavigate()를 사용해서 클릭 시 해당 코인 심볼을 쿼리로 넘기기.

SPL 토큰용 입금 로직 준비 (단, 주소는 SOL과 동일)
출금 기능 연결 (지갑에서 직접 트랜잭션 발생 테스트)
트랜잭션 내역 더미로 먼저 표시 후 실제 트랜잭션 데이터 연동


Home
1.	지갑 전환 기능
	지갑 버튼 클릭 시: 모달창 오픈
	모달창:
	현재 보유 중인 지갑 목록 표시
	지갑 선택 시: 인증 모달(간편비밀번호 or 니모닉 입력)
	인증 성공 시: 지갑 전환 후 새로고침(또는 상태 업데이트)
	필요한 작업:
	indexedDB에서 전체 지갑 불러오기
	현재 지갑과 다른 지갑 리스트 구분해서 표시
	지갑 인증 컴포넌트 설계
2.	코인 목록 API 연동
	코인 정보(이름, 심볼, 이미지 등)를 가져오는 오픈 API 연결
	예: CoinGecko API 사용
	가져온 데이터로 코인 목록 구성
	보유 코인 정보는 indexedDB에 연결되어야 하고, 그 외 정보(이미지, 이름 등)는 API에서 채워서 보여주기
3.	필터 기능 개선
	기존의 필터 버튼을 실제 동작하도록 구현
	“보유” 선택 시: balance > 0 코인만 표시
	“관심”은 우선 데이터 구조만 만들어 놓고 나중에 체크 가능하도록 마킹하는 식으로 준비

CoinDetail
1.	테스트넷 에어드랍 버튼
	Solana Devnet에서는 solana airdrop 명령어를 통해 가능
	Anchor나 solana/web3.js에서 airdrop 기능을 바로 연결
	버튼 클릭 → airdrop API 호출 → 완료 시 balance 업데이트
2.	잔액 연동
	지갑 주소로 실제 네트워크에 연결해서 balance 조회
	solana/web3.js의 getBalance 등을 활용
	출금 가능 금액도 이 값을 기준으로 표시
3.	거래 내역 상세페이지
	클릭 시 txId 또는 signature 기반으로 상세조회
	페이지 경로 예: /coin/:symbol/tx/:txId
	Solana Explorer API 등으로 트랜잭션 세부 정보 가져오기

Deposit
1.	QR 코드 생성
	qrcode.react 또는 react-qr-code 같은 라이브러리 사용
	지갑 주소 데이터를 QR로 렌더링
2.	클립보드 복사 알림
	navigator.clipboard.writeText()로 복사
	복사 성공 시: “클립보드에 복사되었습니다” 알림 띄우고 1.5초 후 자동 사라지게

Withdraw
1.	출금 정보 연동
	출금 가능 금액: 현재 잔액 연동
	수수료: 네트워크에서 고정/변동 수수료 받아서 표시
	실시간 업데이트
2.	붙여넣기 & QR 버튼
	붙여넣기: navigator.clipboard.readText() 활용
	QR 버튼: 카메라 권한 → QR 스캔 라이브러리(ex: react-qr-reader) 사용해서 주소 인식