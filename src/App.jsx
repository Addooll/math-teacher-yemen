import { useMemo, useRef, useState } from 'react';

const navItems = [
  'لوحة التحكم',
  'الاختبارات',
  'بنك الأسئلة',
  'أوراق العمل',
  'خطط التدريس',
  'الطلاب',
  'رفع ملف اختبار',
  'إعدادات المدرسة',
  'الذكاء الاصطناعي',
];

const stats = [
  { label: 'الاختبارات', value: '48', tone: 'blue' },
  { label: 'أوراق العمل', value: '126', tone: 'green' },
  { label: 'الطلاب', value: '284', tone: 'purple' },
  { label: 'الدروس', value: '19', tone: 'orange' },
];

const examTypes = ['اختيار من متعدد', 'صح/خطأ', 'إكمال فراغ', 'مقابلة', 'حسابية', 'هندسية'];

const questionBank = [
  { id: 1, title: 'الجبر: المعادلات من الدرجة الأولى', grade: 'المرحلة الأساسية', type: 'حسابية', difficulty: 'متوسط' },
  { id: 2, title: 'المتتاليات الحسابية', grade: 'الثاني المتوسط', type: 'اختيار من متعدد', difficulty: 'سهل' },
  { id: 3, title: 'مساحة المثلث', grade: 'المرحلة الثانوية', type: 'هندسية', difficulty: 'صعب' },
  { id: 4, title: 'المتوسط الحسابي', grade: 'الثالث المتوسط', type: 'مقابلة', difficulty: 'متوسط' },
];

const lessons = [
  { title: 'دروس الكسور', duration: '45 دقيقة', stage: 'المرحلة الأساسية' },
  { title: 'المتغيرات والمعادلات', duration: '60 دقيقة', stage: 'المرحلة المتوسطة' },
  { title: 'المثلثات', duration: '50 دقيقة', stage: 'المرحلة الثانوية' },
];

const strategies = ['التعلم التعاوني', 'العصف الذهني', 'حل المشكلات', 'التعلم القائم على الاستقصاء', 'التدريس المتمايز'];

const students = [
  { name: 'عبدالله علي', level: 'مستوى جيد', support: 'تدريب مكثف في الجبر' },
  { name: 'سارة محمد', level: 'مستوى ممتاز', support: 'تحديات في الهندسة' },
  { name: 'أحمد سالم', level: 'يتطلب دعم', support: 'مراجعة الكسور' },
];

const mathSymbols = ['+', '-', '×', '÷', '=', 'π', '√', '∛', '²', '³', '≤', '≥', '∠', '△', '(', ')', 'x', 'y', 'a', 'b', 'c'];

const aiPrompts = [
  'أنشئ اختبارًا قصيرًا في الجبر للمرحلة المتوسطة: 5 أسئلة، مستوى متوسط.',
  'اكتب ورقة عمل عن الكسور مع إجابات مختصرة.',
  'صمم خطة علاجية لطلاب يواجهون صعوبة في المعادلات.',
  'قم بإنشاء أسئلة هندسية من المستوى المتوسط مع حلول مختصرة.',
];

function StatCard({ label, value, tone }) {
  return (
    <div className={`stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function DashboardView() {
  const [selectedType, setSelectedType] = useState(examTypes[0]);
  const [questionText, setQuestionText] = useState('حل المعادلة: 3x + 5 = 20');
  const [selectedPrompt, setSelectedPrompt] = useState(aiPrompts[0]);

  const previewText = useMemo(() => {
    return `السؤال: ${questionText}\nالنوع: ${selectedType}\nالمرحلة: الصف الثاني المتوسط\nالمستوى: متوسط`;
  }, [questionText, selectedType]);

  const insertSymbol = (symbol) => {
    setQuestionText((current) => `${current} ${symbol}`);
  };

  return (
    <>
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
            {mathSymbols.map((symbol) => (
              <button key={symbol} className="symbol-btn" onClick={() => insertSymbol(symbol)}>
                {symbol}
              </button>
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
            {lessons.map((plan) => (
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
              <span key={strategy} className="chip">
                {strategy}
              </span>
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
    </>
  );
}

function UploadExamView() {
  const fileInputRef = useRef(null);
  const [uploadedText, setUploadedText] = useState(`مقدمة الاختبار\n-------------------\nالاسم: طالب/ـة\nالصف: الثاني المتوسط\nالوحدة: الجبر\n\n1) حل المعادلة 2x + 5 = 17\n2) أوجد مساحة المثلث إذا كان القاعدة 8 والارتفاع 6\n3) أكتب النمط التالي: 3، 6، 9، ...`);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowed = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];

    if (file && allowed.includes(file.type)) {
      if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = () => setUploadedText(String(reader.result || ''));
        reader.readAsText(file, 'UTF-8');
      } else {
        setUploadedText(`تم رفع الملف: ${file.name}\n\nيمكن تعديل النص والهوامش في شاشة المعاينة والطباعة.\n`);
      }
    } else {
      setUploadedText(`تم تحديد ملف غير مدعوم: ${file.name}\nيرجى رفع ملف نصي أو PDF أو صورة أو Word.`);
    }
  };

  return (
    <div className="panel full-panel">
      <div className="panel-header">
        <h3>رفع ملف اختبار جاهز</h3>
        <span className="badge">OCR / تعديل</span>
      </div>

      <div className="upload-shell">
        <div className="upload-box">
          <div className="dropzone" onClick={() => fileInputRef.current?.click()}>
            <input ref={fileInputRef} type="file" accept=".txt,.pdf,.doc,.docx,.png,.jpg,.jpeg" hidden onChange={handleFileUpload} />
            <div className="drop-icon">📄</div>
            <p>اسحب الملف هنا أو اضغط للرفع</p>
            <button className="primary-btn small-btn" type="button">اختيار ملف</button>
          </div>

          <div className="upload-actions">
            <button className="primary-btn small-btn">استخراج النص</button>
            <button className="secondary-btn small-btn">تعديل العنوان</button>
            <button className="ghost-btn small-btn">طباعة</button>
          </div>
        </div>

        <div className="doc-editor">
          <div className="field-row">
            <label>عنوان الاختبار</label>
            <input defaultValue="اختبار قراءة وتطبيق - الوحدة الأولى" />
          </div>
          <div className="field-row">
            <label>اسم المدرسة</label>
            <input defaultValue="مدرسة التقوى النموذجية" />
          </div>
          <div className="field-row">
            <label>مقدمة الاختبار</label>
            <textarea rows={9} value={uploadedText} onChange={(e) => setUploadedText(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SchoolSettingsView() {
  return (
    <div className="panel full-panel">
      <div className="panel-header">
        <h3>إعدادات المدرسة</h3>
        <span className="badge">قابل للتعديل</span>
      </div>

      <div className="settings-grid">
        <div className="field-row">
          <label>اسم المدرسة</label>
          <input defaultValue="مدرسة النور للتعليم" />
        </div>
        <div className="field-row">
          <label>اسم المعلم</label>
          <input defaultValue="أ. عبدالله سالم" />
        </div>
        <div className="field-row">
          <label>المرحلة</label>
          <input defaultValue="المرحلة الأساسية والثانوية" />
        </div>
        <div className="field-row">
          <label>الصف</label>
          <input defaultValue="الثاني المتوسط" />
        </div>

        <div className="field-row wide-span">
          <label>الترويسة</label>
          <textarea rows={4} defaultValue="بسم الله الرحمن الرحيم
مدرسة النور للتعليم
اختبارات الرياضيات - الفصل الدراسي الأول" />
        </div>

        <div className="field-row wide-span">
          <label>الدباجة</label>
          <textarea rows={4} defaultValue="يرجى قراءة التعليمات بعناية، والإجابة في المساحة المخصصة، مع الالتزام بالوقت المحدد." />
        </div>

        <div className="field-row wide-span">
          <label>التذييل</label>
          <textarea rows={3} defaultValue="التوقيع: ____________________  التاريخ: ___________" />
        </div>
      </div>

      <div className="toolbar-row margin-top">
        <button className="primary-btn">حفظ التغييرات</button>
        <button className="ghost-btn">معاينة</button>
        <button className="secondary-btn">طباعة</button>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return <DashboardView />;
      case 1:
        return <DashboardView />;
      case 2:
        return <DashboardView />;
      case 6:
        return <UploadExamView />;
      case 7:
        return <SchoolSettingsView />;
      case 8:
        return <DashboardView />;
      default:
        return <DashboardView />;
    }
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
          {navItems.map((item, index) => (
            <button key={item} className={`nav-item ${index === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(index)}>
              {item}
            </button>
          ))}
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
            <button className="primary-btn" onClick={() => window.print()}>
              طباعة
            </button>
          </div>
        </header>

        {renderTab()}
      </main>
    </div>
  );
}

export default App;
