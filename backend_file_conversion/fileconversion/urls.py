from django.urls import path
from .views import ConvertDocxToPdf , ConvertPdfToDocx , ConvertPngToJpg

urlpatterns = [
    path('docx-to-pdf/' , ConvertDocxToPdf.as_view() , name="docx-to-pdf"),
    path('pdf-to-docx/' , ConvertPdfToDocx.as_view() , name='pdf-to-docx'),
    path('png-to-jpg/' , ConvertPngToJpg.as_view() , name='png-to-jpg')
]
