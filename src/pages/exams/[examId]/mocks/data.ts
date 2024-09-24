export const mockDataQuestions = [
  {
    id: 16,
    exam_id: '6',
    subject_id: '3',
    name: 'Magna voluptate aliquip officia aliqua veniam aliqua labore nulla velit voluptate.',
    type: 'single',
    is_group: false,
    parent_id: null,
    exam: {
      id: 6,
      name: 'Exam 12',
      code: 'exam-12',
    },
    subject: {
      id: 3,
      name: 'Vật lý',
      code: 'PHYS',
    },
    answers: [
      {
        id: 987123,
        content: 'A. Magna voluptate aliquip officia aliqua.',
        correct: true,
      },
      {
        id: 765678,
        content: 'B. Magna voluptate aliquip officia aliqua.',
        correct: false,
      },
      {
        id: 23452222,
        content: 'C. Magna voluptate aliquip officia aliqua.',
        correct: false,
      },
      {
        id: 9087543,
        content: 'D. Magna voluptate aliquip officia aliqua.',
        correct: false,
      },
    ],
  },
  {
    id: 17,
    exam_id: '7',
    subject_id: '4',
    name: 'Quis labore aliqua laboris magna eiusmod sint nostrud veniam pariatur.',
    type: 'input',
    is_group: false,
    parent_id: null,
    exam: {
      id: 7,
      name: 'Exam 13',
      code: 'exam-13',
    },
    subject: {
      id: 4,
      name: 'Hóa học',
      code: 'CHEM',
    },
    answers: [
      {
        id: 567789,
        content: 'A. Quis labore aliqua laboris magna.',
      },
    ],
  },
  {
    id: 18,
    exam_id: '8',
    subject_id: '5',
    name: 'Ex labore proident cillum incididunt cillum est.',
    type: 'group',
    is_group: true,
    parent_id: null,
    exam: {
      id: 8,
      name: 'Exam 14',
      code: 'exam-14',
    },
    subject: {
      id: 5,
      name: 'Toán học',
      code: 'MATH',
    },
    children: [
      {
        id: 18273645,
        name: 'Câu hỏi phụ 1',
        type: 'single',
        answers: [
          {
            id: 76543,
            content: 'A. Ex labore proident cillum incididunt.',
            correct: false,
          },
          {
            id: 5465745,
            content: 'B. Ex labore proident cillum incididunt.',
            correct: false,
          },
          {
            id: 76543,
            content: 'A. Ex labore proident cillum incididunt.',
            correct: false,
          },
          {
            id: 5465745,
            content: 'B. Ex labore proident cillum incididunt.',
            correct: true,
          },
        ],
      },
      {
        id: 18273645,
        name: 'Câu hỏi phụ 2',
        type: 'input',
        answers: [
          {
            id: 62963339,
            content: 'A. Ex labore proident cillum incididunt.',
          },
        ],
      },
    ],
  },
];
