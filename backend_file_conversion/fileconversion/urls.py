from django.urls import path
from .views import ConvertDocxToPdf , ConvertPdfToDocx

urlpatterns = [
    path('docx-to-pdf/' , ConvertDocxToPdf.as_view() , name="docx-to-pdf"),
    path('pdf-to-docx/' , ConvertPdfToDocx.as_view() , name='pdf-to-docx')
]
