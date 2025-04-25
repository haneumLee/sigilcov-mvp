###########################################
1. Tailwind CSS 관련 PostCSS 오류

오류 메시지  
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.  
The PostCSS plugin has moved to a separate package.

원인  
Tailwind CSS v4부터는 PostCSS 플러그인이 분리되어 별도 설정이 필요함.

해결 방법  
1. `postcss.config.js` 파일 삭제  
2. `vite.config.ts`를 다음과 같이 수정

ts
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
###########################################

2. Tailwind CSS IntelliSense 노란줄

문제 상황  
`@tailwind base`, `components`, `utilities`에 노란줄이 생김

원인  
VSCode에서 CSS 확장자 내 Tailwind 문법을 제대로 인식하지 못함

해결 방법  
1. VSCode 확장 프로그램 `Tailwind CSS IntelliSense` 설치  
2. `settings.json` 에 언어 인식 추가

json
"tailwindCSS.includeLanguages": {
  "plaintext": "html",
  "javascript": "javascript",
  "typescript": "typescript",
  "typescriptreact": "typescriptreact"
}
###########################################

3. `npm run dev` 시 "Missing script: 'dev'" 오류

오류 메시지  
npm error Missing script: "dev"

원인  
`package.json` 내 `"scripts"` 항목에 `"dev"` 명령어가 없음

해결 방법  
`package.json` 수정

json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
###########################################

4. Git 초기 Push 시 업스트림 설정 오류

오류 메시지  
fatal: The current branch main has no upstream branch.  
To push the current branch and set the remote as upstream, use

원인  
현재 로컬 브랜치(main)와 원격 레포지토리(origin)의 연결이 안 되어 있음

해결 방법  
아래 명령어로 업스트림 설정과 push를 동시에 수행  

터미널  
`git push -u origin main`
###########################################

5. Git에 폴더만 만들었을 때 커밋이 안 되는 문제

문제 상황  
`src/`, `docs/` 등의 폴더만 만들었을 경우 `git status`에서 아무 변경 사항이 없음

원인  
Git은 빈 디렉토리는 추적하지 않음

해결 방법  
각 폴더 안에 `.gitkeep` 파일 생성 (내용 없음)

터미널  
`touch src/.gitkeep`  
`touch docs/.gitkeep`
###########################################
