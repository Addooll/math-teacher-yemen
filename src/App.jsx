import { useMemo, useRef, useState } from 'react';

const navItems = [
  'لوحة التحكم',
  'الاختبارات',
  'أوراق العمل',
  'خطط التدريس',
  'الطلاب',
  'رفع ملف اختبار',
  'التخطيط الفصلي',
  'الأنشطة الصفية',
  'الذكاء الاصطناعي',
  'إعدادات المدرسة',
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
  { name: 'ليلى أحمد', level: 'جيد جدًا', support: 'مراجعة الأعداد والعلاقات' },
];

const mathSymbols = ['+', '-', '×', '÷', '=', 'π', '√', '∛', '²', '³', '≤', '≥', '∠', '△', '(', ')', 'x', 'y', 'a', 'b', 'c'];

const aiPrompts = [
  'أنشئ اختبارًا قصيرًا في الجبر للمرحلة المتوسطة: 5 أسئلة، مستوى متوسط.',
  'اكتب ورقة عمل عن الكسور مع إجابات مختصرة.',
  'صمم خطة علاجية لطلاب يواجهون صعوبة في المعادلات.',
  'قم بإنشاء أسئلة هندسية من المستوى المتوسط مع حلول مختصرة.',
  'جهز خطة فصلية لموضوع المعادلات والتناسب.',
  'اكتب استراتيجية تدريس فعالة للتعلم التعاوني في الرياضيات.',
];

const worksheetCards = [
  { title: 'ورقة عمل 1: الكسور', type: 'أساسية', items: 12 },
  { title: 'ورقة عمل 2: المعادلات', type: 'متوسطة', items: 10 },
  { title: 'ورقة عمل 3: المساحات', type: 'ثانوية', items: 8 },
];

const semesterPlan = [
  { week: 'الأسبوع 1', unit: 'الأعداد والعلاقات', task: 'تمهيد + مراجعة', status: 'مكتمل' },
  { week: 'الأسبوع 2', unit: 'الجبر', task: 'حل المعادلات', status: 'جاري' },
  { week: 'الأسبوع 3', unit: 'الهندسة', task: 'المثلثات', status: 'مخطط' },
  { week: 'الأسبوع 4', unit: 'الإحصاء', task: 'الوسيط والمعدل', status: 'مستقبلي' },
];

const activities = [
  { title: 'نشاط: أوجد العلاقة', duration: '20 دقيقة', category: 'مجموعة' },
  { title: 'نشاط: مسابقات الأرقام', duration: '15 دقيقة', category: 'تفاعلي' },
  { title: 'نشاط: أوصل الشكل', duration: '25 دقيقة', category: 'هندسة' },
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

function WorksheetView() {
  return (
    <div className="panel full-panel">
      <div className="panel-header">
        <h3>أوراق العمل</h3>
        <button className="primary-btn small-btn">إضافة ورقة</button>
      </div>

      <div className="card-grid">
        {worksheetCards.map((card) => (
          <div key={card.title} className="mini-card">
            <span className="tag">{card.type}</span>
            <h4>{card.title}</h4>
            <p>{card.items} أسئلة</p>
            <button className="ghost-btn small-btn">فتح</button>
          </div>
        ))}
      </div>

      <div className="list-stack margin-top">
        <div className="list-item">
          <div>
            <strong>ورقة مراجعة نهائية</strong>
            <p>المرحلة الأساسية • 14 سؤال</p>
          </div>
          <button className="secondary-btn small-btn">تعديل</button>
        </div>
        <div className="list-item">
          <div>
            <strong>ورقة تدريب منزلي</strong>
            <p>المرحلة المتوسطة • 9 أسئلة</p>
          </div>
          <button className="secondary-btn small-btn">تعديل</button>
        </div>
      </div>
    </div>
  );
}

function LessonPlansView() {
  return (
    <div className="panel full-panel">
      <div className="panel-header">
        <h3>خطط التدريس</h3>
        <button className="primary-btn small-btn">إنشاء خطة</button>
      </div>

      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <div key={lesson.title} className="lesson-card">
            <h4>{lesson.title}</h4>
            <p>{lesson.stage}</p>
            <span>{lesson.duration}</span>
            <button className="ghost-btn small-btn">تفاصيل</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SemesterPlanView() {
  return (
    <div className="panel full-panel">
      <div className="panel-header">
        <h3>التخطيط الفصلـي</h3>
        <button className="primary-btn small-btn">إضافة أسبوع</button>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>الأسبوع</th>
              <th>الوحدة</th>
              <th>المهمة</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {semesterPlan.map((row) => (
              <tr key={row.week}>
                <td>{row.week}</td>
                <td>{row.unit}</td>
                <td>{row.task}</td>
                <td><span className="status-pill">{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActivitiesView() {
  return (
    <div className="panel full-panel">
      <div className="panel-header">
        <h3>الأنشطة الصفية</h3>
        <button className="primary-btn small-btn">إضافة نشاط</button>
      </div>

      <div className="activities-grid">
        {activities.map((activity) => (
          <div key={activity.title} className="activity-card">
            <span className="tag">{activity.category}</span>
            <h4>{activity.title}</h4>
            <p>{activity.duration}</p>
            <button className="ghost-btn small-btn">تفعيل</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentsView() {
  return (
    <div className="panel full-panel">
      <div className="panel-header">
        <h3>إدارة الصف</h3>
        <button className="primary-btn small-btn">إضافة طالب</button>
      </div>

      <div className="student-grid">
        {students.map((student) => (
          <div key={student.name} className="student-card">
            <div className="student-avatar">{student.name.slice(0, 1)}</div>
            <div>
              <h4>{student.name}</h4>
              <p>{student.level}</p>
              <span>{student.support}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="panel mini-panel">
        <div className="panel-header">
          <h3>الخطط العلاجية</h3>
        </div>
        <ul className="bullet-list">
          <li>يومياً: مراجعة 10 دقائق في الكسور</li>
          <li>أسبوعياً: اختبار قصير في الجبر</li>
          <li>إجراءات دعم: أنشطة تفاعلية + حصص فردية</li>
        </ul>
      </div>
    </div>
  );
}

function AIView() {
  const [selectedPrompt, setSelectedPrompt] = useState(aiPrompts[0]);

  return (
    <div className="panel full-panel">
      <div className="panel-header">
        <h3>الذكاء الاصطناعي للمساعدة التعليمية</h3>
        <span className="badge">نموذج مجاني</span>
      </div>

      <div className="ai-builder">
        <div className="field-row">
          <label>نوع الطلب</label>
          <select value={selectedPrompt} onChange={(e) => setSelectedPrompt(e.target.value)}>
            {aiPrompts.map((prompt) => (
              <option key={prompt} value={prompt}>{prompt}</option>
            ))}
          </select>
        </div>

        <div className="field-row">
          <label>محتوى الأمر</label>
          <textarea rows={6} value={selectedPrompt} onChange={(e) => setSelectedPrompt(e.target.value)} />
        </div>

        <div className="toolbar-row">
          <button className="primary-btn">توليد</button>
          <button className="secondary-btn">إعادة التوليد</button>
          <button className="ghost-btn">نسخ</button>
        </div>
      </div>

      <div className="ai-output">
        <h4>نتيجة التوليد</h4>
        <p>1) حل المعادلة 3x + 2 = 11 → x = 3</p>
        <p>2) إذا كانت قاعدة المثلث 10 وارتفاعه 6، فإن مساحته = 30</p>
        <p>3) اشرح خطوة بخطوة طريقة إيجاد ناتج الأعداد المختلطة.</p>
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
          <textarea rows={4} defaultValue={`بسم الله الرحمن الرحيم\nمدرسة النور للتعليم\nاختبارات الرياضيات - الفصل الدراسي الأول`} />
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
        return <WorksheetView />;
      case 3:
        return <LessonPlansView />;
      case 4:
        return <StudentsView />;
      case 5:
        return <UploadExamView />;
      case 6:
        return <SemesterPlanView />;
      case 7:
        return <ActivitiesView />;
      case 8:
        return <AIView />;
      case 9:
        return <SchoolSettingsView />;
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
