from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import HttpResponse
from docx import Document
import io
from reportlab.pdfgen import canvas
# from reportlab.lib.pagesizes import letter

# Create your views here.
class ConvertDocToPdf(APIView):
    def post(self,request,format=None):
        document = request.FILES.get('document')
        doc_name = document.name
        
        if not document:
            return Response({'error':'No document provided'} , status=status.HTTP_400_BAD_REQUEST)
        
        doc = Document(document)
        
        
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer)
        
        page_height = 800
        y_position = page_height
        line_height = 12
        
        for para in doc.paragraphs:
            if y_position < line_height * 3:
                p.showPage()
                y_position = page_height
                
            p.drawString(40 , y_position ,para.text)
            y_position -= line_height
            
        p.showPage()
        p.save()
       
        buffer.seek(0)
        response = HttpResponse(buffer , content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="converted.pdf"'
        return response        