export const generateExamCode = () => {
  // Tạo 6 chữ số ngẫu nhiên
  const randomNumbers = Math.floor(100000 + Math.random() * 900000);

  // Ghép chuỗi với từ khoá "EXAM-"
  const examCode = `EXAM-${randomNumbers}`;

  return examCode;
};
