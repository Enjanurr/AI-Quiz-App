from .extractVid import SummaryVideoView
from .quiznumber import QuizNumberView
from .auth import CreateUserView,EmailUserView,SignOut
from .checkQuiz import CheckAnswersView
from .displayAllResult import AllResultView
from .reviewAnswers import ReviewQuizView
from .displayAllQuizNumber import AllQuizNumberView
from .extractPDF import SummaryPDFView
from .update import UpdateView
from .profile import ProfileView
__all__ = ['ProfileView','SignOut','UpdateView','SummaryPDFView','AllQuizNumberView','ReviewQuizView','AllResultView','SummaryVideoView','QuizNumberView','CreateUserView','EmailUserView','CheckAnswersView']