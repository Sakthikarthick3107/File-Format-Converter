from django.urls import path
from .views import ConvertDocToPdf

urlpatterns = [
    path('doc-to-pdf/' , ConvertDocToPdf.as_view() , name="Doc-to-pdf")
]
