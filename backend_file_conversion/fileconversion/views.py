from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from django.http import HttpResponse , FileResponse
from docx import Document
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from pdf2docx import Converter
import tempfile
import os
from PIL import Image
import pandas as pd

# Create your views here.
class ConvertDocxToPdf(APIView):
    def post(self,request,format=None):
        document = request.FILES.get('document')

        if not document:
            return Response({'error':'No document provided'} , status=status.HTTP_400_BAD_REQUEST)

        
        doc = Document(document)
        
        
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter 
        
      
        margin = 50  
        available_width = width - 2 * margin
        y_position = height - margin
        line_height = 12
        
        p.setFont("Helvetica", 10)  

        for para in doc.paragraphs:
            
            words = para.text.split()
            line = ""
            for word in words:
                if p.stringWidth(line + word, "Helvetica", 10) < available_width:
                    line += word + " "
                else:

                    p.drawString(margin, y_position, line)
                    line = word + " "
                    y_position -= line_height

                    if y_position < margin:
                        p.showPage()
                        y_position = height - margin
                        p.setFont("Helvetica", 10)  
            

            p.drawString(margin, y_position, line)
            y_position -= line_height

        p.showPage()
        p.save()
        buffer.seek(0)
        response = HttpResponse(buffer , content_type='application/pdf')
        
        response['Content-Disposition'] = f'attachment; filename="converted.ext"'
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
                response['Content-Disposition'] = 'attachment; filename="converted.ext"'

                return response
        finally:
            os.unlink(temp_pdf.name)
            os.unlink(temp_docx.name)
            
class ConvertPngToJpg(APIView):
    def post(self,request):
        png_file = request.FILES.get('document')
        if not png_file:
            return Response({'error' : 'No image provided'} , status=status.HTTP_400_BAD_REQUEST)
        
        image = Image.open(png_file)
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")
        
        img_io = io.BytesIO()
        image.save(img_io, format='JPEG', quality=70)
        img_io.seek(0)
        return HttpResponse(content=img_io.getvalue(), content_type='image/jpeg')

class ConvertJpgToPng(APIView):
    def post(self,request):
        jpg_file = request.FILES.get('document')
        if not jpg_file:
            return Response({'error' : 'No jpg files are provided'} , status=status.HTTP_400_BAD_REQUEST)
        image = Image.open(jpg_file)
        
        if image.mode != 'RGBA':
            image = image.convert('RGBA')
        img_io = io.BytesIO()
        image.save(img_io , format='PNG')
        img_io.seek(0)
        response = HttpResponse(content=img_io.getvalue(), content_type='image/png')
        return response
    
class ConvertXslxToCsv(APIView):
    def post(self,request):
        xlsx_file = request.FILES.get('document')
        df = pd.read_excel(xlsx_file , engine='openpyxl')
        buffer = io.BytesIO()
        df.to_csv(buffer,index=False)
        
        buffer.seek(0)
        response = FileResponse(buffer , as_attachment=True , content_type='text/csv')
        
        response['Content-Disposition'] = 'attachment;filename="converted.ext"'
        return response