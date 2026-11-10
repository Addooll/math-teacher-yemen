import { useMemo, useState } from 'react';

const stats = [
  { label: 'الاختبارات', value: '48', tone: 'blue' },
  { label: 'أوراق العمل', value: '126', tone: 'green' },
  { label: 'الطلاب', value: '284', tone: 'purple' },
  { label: 'الدروس', value: '19', tone: 'orange' },
];

const examTypes = ['اختيار من متعدد', 'صح/خطأ', 'إكمال فراغ', 'مقابلة', 'حسابية', 'هندسية'];

const questionBank = [
  { id: 1, title: 'الجبر: المعادلات من الدرجة الأولى', grade: 'المرحلة الأساسية', type: 'حسابية', difficulty: 'متوسط', tags: ['معادلة', 'متغير'] },
  { id: 2, title: 'المتتاليات الحسابية', grade: 'الثاني المتوسط', type: 'اختيار من متعدد', difficulty: 'سهل', tags: ['متتالية', 'نمط'] },
  { id: 3, title: 'مساحة المثلث', grade: 'المرحلة الثانوية', type: 'هندسية', difficulty: 'صعب', tags: ['هندسة', 'مساحة'] },
  { id: 4, title: 'المتوسط الحسابي', grade: 'الثالث المتوسط', type: 'مقابلة', difficulty: 'متوسط', tags: ['إحصاء', 'بيانات'] },
];

const lessonPlans = [
  { title: 'دروس الكسور', duration: '45 دقيقة', stage: 'المرحلة الأساسية' },
  { title: 'المتغيرات والمعادلات', duration: '60 دقيقة', stage: 'المرحلة المتوسطة' },
  { title: 'المثلثات', duration: '50 دقيقة', stage: 'المرحلة الثانوية' },
];

const strategies = [
  'التعلم التعاوني',
  'العصف الذهني',
  'حل المشكلات',
  'التعلم القائم على الاستقصاء',
  'التدريس المتمايز',
];

const students = [
  { name: 'عبدالله علي', level: 'مستوى جيد', support: 'تدريب مكثف في الجبر' },
  { name: 'سارة محمد', level: 'مستوى ممتاز', support: 'تحديات في الهندسة' },
  { name: 'أحمد سالم', level: 'يتطلب دعم', support: 'مراجعة الكسور' },
];

const mathButtons = ['+', '-', '×', '÷', '=', 'π', '√', '∛', '²', '³', '≤', '≥', '∠', '△', '(', ')', 'x', 'y', 'a', 'b', 'c'];

const aiPrompts = [
  'أنشئ اختبارًا قصيرًا في الجبر للمرحلة المتوسطة، 5 أسئلة، مستوى متوسط.',
  'اكتب ورقة عمل عن الكسور مع إجابات مختصرة.',
  'صمم خطة علاجية لطلاب يواجهون صعوبة في المعادلات.',
];

function StatCard({ label, value, tone }) {
  return (
    <div className={`stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function App() {
  const [selectedType, setSelectedType] = useState(examTypes[0]);
  const [questionText, setQuestionText] = useState('حل المعادلة: 3x + 5 = 20');
  const [selectedPrompt, setSelectedPrompt] = useState(aiPrompts[0]);

  const previewText = useMemo(() => {
    return `السؤال: ${questionText}\nالنوع: ${selectedType}\nالمرحلة: الصف الثاني المتوسط\nالمستوى: متوسط`;
  }, [questionText, selectedType]);

  const insertSymbol = (symbol) => {
    setQuestionText((current) => `${current} ${symbol}`);
  };

  const printExam = () => {
    window.print();
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-box">
          <div className="brand-mark">M</div>
          <div>
            <h2>مساعد المعلم</h2>
            <small>المنهج اليمني</small>
          </div>
        </div>

        <nav className="nav">
          <button className="nav-item active">لوحة التحكم</button>
          <button className="nav-item">الاختبارات</button>
          <button className="nav-item">بنك الأسئلة</button>
          <button className="nav-item">أوراق العمل</button>
          <button className="nav-item">الخطط</button>
          <button className="nav-item">الطلاب</button>
          <button className="nav-item">الذكاء الاصطناعي</button>
          <button className="nav-item">الإعدادات</button>
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">المرحلة الأساسية والثانوية</p>
            <h1>مساعد معلم الرياضيات المنهج اليمني</h1>
          </div>
          <div className="topbar-actions">
            <button className="ghost-btn">استعراض</button>
            <button className="primary-btn" onClick={printExam}>طباعة</button>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} tone={stat.tone} />
          ))}
        </section>

        <section className="content-grid">
          <div className="panel wide-panel">
            <div className="panel-header">
              <h3>منشئ الاختبار</h3>
              <span className="badge">جاهز</span>
            </div>

            <div className="exam-builder">
              <div className="field-row">
                <label>عنوان الاختبار</label>
                <input defaultValue="اختبار الوحدة الأولى: الجبر" />
              </div>

              <div className="field-row">
                <label>نوع السؤال</label>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                  {examTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="field-row">
                <label>نص السؤال</label>
                <textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)} rows={4} />
              </div>

              <div className="option-row">
                <label>الخيار الأول</label>
                <input defaultValue="5" />
              </div>
              <div className="option-row">
                <label>الخيار الثاني</label>
                <input defaultValue="10" />
              </div>
              <div className="option-row">
                <label>الخيار الثالث</label>
                <input defaultValue="15" />
              </div>
              <div className="option-row">
                <label>الخيار الرابع</label>
                <input defaultValue="20" />
              </div>

              <div className="toolbar-row">
                <button className="secondary-btn">حفظ</button>
                <button className="secondary-btn">إضافة سؤال</button>
                <button className="primary-btn">معاينة</button>
              </div>
            </div>
          </div>

          <div className="panel preview-panel">
            <div className="panel-header">
              <h3>معاينة الاختبار</h3>
            </div>
            <div className="print-box">
              <div className="exam-header">
                <h4>مدرسة الرياضيات النموذجية</h4>
                <p>اختبار الوحدة الأولى - الصف الثاني المتوسط</p>
              </div>
              <div className="preview-body">
                <p>{previewText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-grid lower-grid">
          <div className="panel">
            <div className="panel-header">
              <h3>لوحة المفاتيح الرياضية</h3>
            </div>
            <div className="math-keyboard">
              {mathButtons.map((symbol) => (
                <button key={symbol} className="symbol-btn" onClick={() => insertSymbol(symbol)}>{symbol}</button>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>الذكاء الاصطناعي</h3>
            </div>
            <div className="ai-box">
              <select value={selectedPrompt} onChange={(e) => setSelectedPrompt(e.target.value)}>
                {aiPrompts.map((prompt) => (
                  <option key={prompt} value={prompt}>{prompt}</option>
                ))}
              </select>
              <textarea rows={4} value={selectedPrompt} onChange={(e) => setSelectedPrompt(e.target.value)} />
              <div className="toolbar-row">
                <button className="primary-btn">توليد</button>
                <button className="ghost-btn">إعادة التوليد</button>
              </div>
            </div>
          </div>
        </section>

        <section className="content-grid lower-grid">
          <div className="panel">
            <div className="panel-header">
              <h3>بنك الأسئلة</h3>
            </div>
            <div className="list-stack">
              {questionBank.map((item) => (
                <div key={item.id} className="list-item">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.grade} • {item.type} • {item.difficulty}</p>
                  </div>
                  <button className="ghost-btn small">استخدام</button>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>خطط التدريس</h3>
            </div>
            <div className="list-stack">
              {lessonPlans.map((plan) => (
                <div key={plan.title} className="list-item">
                  <div>
                    <strong>{plan.title}</strong>
                    <p>{plan.stage} • {plan.duration}</p>
                  </div>
                  <button className="ghost-btn small">فتح</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-grid lower-grid">
          <div className="panel">
            <div className="panel-header">
              <h3>استراتيجيات التدريس</h3>
            </div>
            <div className="chip-grid">
              {strategies.map((strategy) => (
                <span key={strategy} className="chip">{strategy}</span>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>إدارة الصف</h3>
            </div>
            <div className="list-stack compact-list">
              {students.map((student) => (
                <div key={student.name} className="student-row">
                  <div>
                    <strong>{student.name}</strong>
                    <p>{student.level}</p>
                  </div>
                  <span>{student.support}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
