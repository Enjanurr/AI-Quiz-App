from .summary import SummaryView
from .getQuiz import QuizListView
from .auth import CreateUserView,EmailUserView
from .checkQuiz import CheckAnswersView
#from .cohere import generate_quiz_from_notes 
__all__ = ['SummaryView','QuizListView','CreateUserView','EmailUserView','CheckAnswersView']