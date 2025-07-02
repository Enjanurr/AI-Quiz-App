from .summary import SummaryView
from .quiznumber import QuizNumberView
from .auth import CreateUserView,EmailUserView
from .checkQuiz import CheckAnswersView
from .displayAllResult import AllResultView
from .reviewnumber import ReviewQuizView
from .displayAllQuiz import AllQuizNumber
#from .cohere import generate_quiz_from_notes 
__all__ = ['AllQuizNumber','ReviewQuizView','AllResultView','SummaryView','QuizNumberView','CreateUserView','EmailUserView','CheckAnswersView']