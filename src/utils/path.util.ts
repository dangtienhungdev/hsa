const pathUrl = {
  questions: '/questions',
  questionDetail: '/questions/:subjectId',
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
