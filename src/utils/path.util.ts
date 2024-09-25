const pathUrl = {
  questions: '/questions',
  addQuestion: '/questions/create-question',
  subjects: '/subjects',
  exams: '/exams',
  addExam: '/add-exam',
  examDetail: '/exams/:examId',

  // auth
  login: '/login',
  logout: '/logout',
} as const;

export default pathUrl;
