# math-teacher-yemen

MVP for Yemeni math teacher assistant with a ready Arabic interface.

Features included in this first build:
- Arabic RTL dashboard
- Exam builder and print preview
- AI prompt panel
- Question bank
- Lesson plans
- Classroom management overview
- Math keyboard for symbols and formulas
- Mobile-friendly layout
- PWA / Capacitor-ready setup

## Run locally

npm install
npm run dev

## Production build

npm run build

## Mobile wrapper setup

npx cap init "MathTeacherYemen" "com.mathteacheryemen.app"
npx cap add android
npx cap sync android
