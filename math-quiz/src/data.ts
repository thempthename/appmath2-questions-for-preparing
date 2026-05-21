export type Language = "uz" | "en" | "ru";

export interface LocalizedQuestion {
  q: string;
  opts: string[];
  exp: string;
}

export interface Question {
  id: number;
  topic: string;
  diff: "easy" | "medium" | "hard";
  ans: number;
  uz: LocalizedQuestion;
  en: LocalizedQuestion;
  ru: LocalizedQuestion;
}

export const UI: Record<Language, any> = {
  uz: {
    title: "Amaliy matematika — imtihon tayyorgarligi",
    sub: "255+ savol | Uchta tilda",
    totalLbl: "Jami savol",
    topicsLbl: "Mavzu",
    answeredLbl: "Javoblangan",
    scoreLbl: "Ball",
    hint: 'Yuqoridagi parametrlarni tanlang va "Boshlash" tugmasini bosing',
    start: "Boshlash",
    prev: "← Oldingi",
    next: "Keyingi →",
    show: "Javobni ko'rsat",
    again: "Qayta urinish",
    settings: "Sozlamalar",
    of: "/",
    exp: "Tushuntirish: ",
    diff: { easy: "Oson", medium: "O'rta", hard: "Qiyin" },
    topics: {
      sequences: "Ketma-ketliklar",
      limits: "Limitlar",
      derivatives: "Hosilalar",
      integrals: "Integrallar",
      multivariable: "Ko'p o'zgaruvchili",
      extremum: "Ekstremum",
      lagrange: "Lagranj",
      diffeq: "Diff. tenglamalar",
      theory: "Nazariya",
    },
    msgs: [
      "Mashq qiling — bu ishonch bilan chiqasiz!",
      "Yaxshi! Zaif mavzularni takrorlang.",
      "Zo'r! Davom eting!",
      "Ajoyib! Imtihonga tayyor!",
      "Mukammal! Juma kuni muvaffaqiyat!",
    ],
  },
  en: {
    title: "Applied math — exam preparation",
    sub: "255+ questions | Three languages",
    totalLbl: "Total questions",
    topicsLbl: "Topics",
    answeredLbl: "Answered",
    scoreLbl: "Score",
    hint: "Select options above and press Start to begin",
    start: "Start",
    prev: "← Prev",
    next: "Next →",
    show: "Show answer",
    again: "Try again",
    settings: "Settings",
    of: "of",
    exp: "Explanation: ",
    diff: { easy: "Easy", medium: "Medium", hard: "Hard" },
    topics: {
      sequences: "Sequences",
      limits: "Limits",
      derivatives: "Derivatives",
      integrals: "Integrals",
      multivariable: "Multivariable",
      extremum: "Extremum",
      lagrange: "Lagrange",
      diffeq: "Diff. Equations",
      theory: "Theory",
    },
    msgs: [
      "Keep practicing — you got this!",
      "Good effort! Review weak topics.",
      "Nice work! Getting there!",
      "Great! Almost exam-ready!",
      "Excellent! You're ready for Friday!",
    ],
  },
  ru: {
    title: "Прикладная математика — подготовка к экзамену",
    sub: "255+ вопросов | На трёх языках",
    totalLbl: "Всего вопросов",
    topicsLbl: "Тем",
    answeredLbl: "Отвечено",
    scoreLbl: "Балл",
    hint: 'Выберите параметры выше и нажмите "Начать"',
    start: "Начать",
    prev: "← Назад",
    next: "Далее →",
    show: "Показать ответ",
    again: "Попробовать снова",
    settings: "Настройки",
    of: "из",
    exp: "Пояснение: ",
    diff: { easy: "Лёгкий", medium: "Средний", hard: "Сложный" },
    topics: {
      sequences: "Последовательности",
      limits: "Пределы",
      derivatives: "Производные",
      integrals: "Интегралы",
      multivariable: "Многомерные",
      extremum: "Экстремум",
      lagrange: "Лагранж",
      diffeq: "Дифф. уравнения",
      theory: "Теория",
    },
    msgs: [
      "Практикуйтесь — всё получится!",
      "Неплохо! Повторите слабые темы.",
      "Хорошо! Продолжайте!",
      "Отлично! Почти готовы!",
      "Превосходно! Готовы к пятнице!",
    ],
  },
};

// DIQQAT: Avvalgi HTML faylingizdagi ALL_Q massivini to'liq shu yerga ko'chiring
export const ALL_Q: Question[] = [
  {
    id: 1,
    topic: "sequences",
    diff: "easy",
    uz: {
      q: "Ketma-ketlik {aₙ} konvergent (yaqinlashuvchi) deyiladi, agar:",
      opts: [
        "Cheksiz ko'p a'zosi bo'lsa",
        "n→∞ da chekli limit L ga ega bo'lsa",
        "A'zolari o'sib borsa",
        "A'zolari yuqoridan chegaralangan bo'lsa",
      ],
      exp: "Konvergent ketma-ketlik: lim(n→∞)aₙ=L, bu yerda L — haqiqiy son.",
    },
    en: {
      q: "A sequence {aₙ} is convergent if:",
      opts: [
        "It has infinitely many terms",
        "It has a finite limit L as n→∞",
        "Its terms are increasing",
        "Its terms are bounded above",
      ],
      exp: "Convergent: lim(n→∞)aₙ=L, where L is a real number.",
    },
    ru: {
      q: "Последовательность {aₙ} называется сходящейся, если:",
      opts: [
        "Она имеет бесконечно много членов",
        "Она имеет конечный предел L при n→∞",
        "Её члены возрастают",
        "Её члены ограничены сверху",
      ],
      exp: "Сходящаяся последовательность: lim(n→∞)aₙ=L, где L — вещественное число.",
    },
    ans: 1,
  },
  // ... QOLGAN BARCHA SAVOLLARNI SHU YERGA QO'SHING
];
