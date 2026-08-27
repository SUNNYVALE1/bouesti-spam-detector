// projectKnowledge.ts
// Knowledge base for the AI Chat Widget — exported as PROJECT_SYSTEM_PROMPT
// Knowledge base for the AI Chat Widget
// All supervisor references updated to full name: Ariyo Opeyemi Jumoke

export const PROJECT_KNOWLEDGE = {
  title: 'Intelligent Spam Email Detection System',
  institution: 'Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI)',
  department: 'Department of Computing and Information Science',
  degree: 'Bachelor of Science (B.Sc) in Computer Science',
  supervisor: 'Ariyo Opeyemi Jumoke',
  webDeveloper: 'SUNNYTECH ALL-IN-ONE SOLUTION',

  authors: [
    { name: 'Esan Oluwaferanmi Elizabeth', matric: '5029' },
    { name: 'Daramola Micheal Olaniyi', matric: '5022' },
    { name: 'Ajimo Samson Oluwasanmi', matric: '4955' },
  ],

  project: {
    objective: 'Accurate classification of emails as Spam or Legitimate (Ham) using supervised machine learning.',
    algorithm: 'Logistic Regression',
    accuracy: '99.00%',
    dataset: 'Enron Spam Dataset',
    datasetSize: '33,716 emails',
    features: '10,000 TF-IDF numerical vectors',
    preprocessingSteps: [
      'Lowercase conversion',
      'Punctuation and special character removal',
      'Stopword removal (NLTK)',
      'Lemmatization (WordNetLemmatizer)',
      'TF-IDF vectorization (max 10,000 features)',
    ],
  },

  models: [
    { name: 'Logistic Regression', accuracy: '99.00%', f1: '0.9896', selected: true },
    { name: 'Support Vector Machine (SVM)', accuracy: '98.95%', f1: '0.9891', selected: false },
    { name: 'Random Forest', accuracy: '98.44%', f1: '0.9840', selected: false },
    { name: 'Multinomial Naive Bayes', accuracy: '98.39%', f1: '0.9833', selected: false },
  ],

  faq: [
    {
      q: 'What is this project?',
      a: 'This is an Intelligent Spam Email Detection System built as a B.Sc Final Year Project at the Department of Computing and Information Science, BOUESTI (Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti). It uses machine learning to classify emails as spam or legitimate.',
    },
    {
      q: 'Who built this?',
      a: 'Three computer science students built it: Esan Oluwaferanmi Elizabeth (Matric: 5029), Daramola Micheal Olaniyi (Matric: 5022), and Ajimo Samson Oluwasanmi (Matric: 4955). Their supervisor is Ariyo Opeyemi Jumoke. The website was developed by SUNNYTECH ALL-IN-ONE SOLUTION.',
    },
    {
      q: 'Who is the supervisor?',
      a: 'Ariyo Opeyemi Jumoke is the academic project supervisor and advisor for this B.Sc final year project at the Department of Computing and Information Science, BOUESTI.',
    },
    {
      q: 'What algorithm was used?',
      a: 'Logistic Regression was selected as the final model after comparing four algorithms. It achieved 99.00% accuracy and an F1-Score of 0.9896 on the Enron Spam Dataset.',
    },
    {
      q: 'What dataset was used?',
      a: 'The Enron Spam Dataset containing 33,716 labeled emails (spam and ham). It is one of the most widely used datasets for email classification research.',
    },
    {
      q: 'How does the detection work?',
      a: 'Emails are cleaned (lowercased, stopwords removed, lemmatized), then converted to 10,000 TF-IDF numerical features. The Logistic Regression model then predicts whether the email is spam or legitimate.',
    },
    {
      q: 'What school is this from?',
      a: 'Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI), Ekiti State, Nigeria. Department of Computing and Information Science.',
    },
    {
      q: 'Can I test it?',
      a: 'Yes! Go to the Classifier page and paste any email text. The model will classify it as spam or legitimate in real-time. You can also upload a CSV file for batch classification.',
    },
  ],
};

export const PROJECT_SYSTEM_PROMPT = `You are an AI assistant for the BOUESTI Intelligent Spam Email Detection System.

Project: ${PROJECT_KNOWLEDGE.title}
Institution: ${PROJECT_KNOWLEDGE.institution}
Department: ${PROJECT_KNOWLEDGE.department}
Supervisor: ${PROJECT_KNOWLEDGE.supervisor}
Authors: ${PROJECT_KNOWLEDGE.authors.map(a => a.name + ' (Matric: ' + a.matric + ')').join(', ')}
Web Developer: ${PROJECT_KNOWLEDGE.webDeveloper}

Algorithm: ${PROJECT_KNOWLEDGE.project.algorithm} with ${PROJECT_KNOWLEDGE.project.accuracy} accuracy.
Dataset: ${PROJECT_KNOWLEDGE.project.dataset} (${PROJECT_KNOWLEDGE.project.datasetSize}).

Answer questions about this spam detection project concisely and helpfully. If asked about the supervisor, always use the full name: Ariyo Opeyemi Jumoke.`;

