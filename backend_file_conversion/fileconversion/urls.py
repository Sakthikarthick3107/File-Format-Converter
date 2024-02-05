from django.urls import path
from .views import ConvertDocxToPdf , ConvertPdfToDocx , ConvertPngToJpg , ConvertJpgToPng , ConvertXslxToCsv

urlpatterns = [
    path('docx-to-pdf/' , ConvertDocxToPdf.as_view() , name="docx-to-pdf"),
    path('pdf-to-docx/' , ConvertPdfToDocx.as_view() , name='pdf-to-docx'),
    path('png-to-jpg/' , ConvertPngToJpg.as_view() , name='png-to-jpg'),
    path('jpg-to-png/' , ConvertJpgToPng.as_view() , name='jpg-to-png'),
    path('xlsx-to-csv/' , ConvertXslxToCsv.as_view() , name='xlsx-to-csv')
]
