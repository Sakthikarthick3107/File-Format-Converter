from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import HttpResponse
from docx import Document
import io
from reportlab.pdfgen import canvas
# from reportlab.lib.pagesizes import letter
from pdf2docx import Converter
import tempfile
import os

# Create your views here.
class ConvertDocxToPdf(APIView):
    def post(self,request,format=None):
        document = request.FILES.get('document')
        doc_name = document.name
        # print(doc_name)
        if not document:
            return Response({'error':'No document provided'} , status=status.HTTP_400_BAD_REQUEST)
        # elif not doc_name.lower().endswith('.doc'):
        #     return Response({'error' : 'This file is not a .docx document'})
        
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
        base_name = doc_name.rsplit('.docx',1)[0]
        op_name = f"{base_name}.pdf"
        response['Content-Disposition'] = f'attachment; filename="{op_name}"'
        return response   
    
class ConvertPdfToDocx(APIView):
    def post(self,request):
        pdf_file = request.FILES.get('document')
        if not pdf_file:
            return Response({'error' : 'No document provided'} , status=status.HTTP_400_BAD_REQUEST)
        
        temp_pdf = tempfile.NamedTemporaryFile(suffix='.pdf' , delete=False)
        temp_docx = tempfile.NamedTemporaryFile(suffix='.docx' , delete=False)
        
        try:
            for chunk in pdf_file.chunks():
                temp_pdf.write(chunk)
            temp_pdf.close()
            
            cv = Converter(temp_pdf.name)
            cv.convert(temp_docx.name)
            cv.close()
            
            temp_docx.close()
            with open(temp_docx.name , 'rb') as docx_file:
                docx_content = docx_file.read()
                
                response = HttpResponse(docx_content, content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
                response['Content-Disposition'] = 'attachment; filename="converted.docx"'

                return response
        finally:
            os.unlink(temp_pdf.name)
            os.unlink(temp_docx.name)