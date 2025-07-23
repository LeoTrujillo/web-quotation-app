import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getServiceById, formatPrice } from './pricing';

interface PDFData {
  serviceId: string;
  selectedOptions: string[];
  totalPrice: number;
  currency: 'usd' | 'mxn';
  customerInfo?: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  };
}

export class PDFGenerator {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
  }

  async generateQuotationPDF(data: PDFData): Promise<void> {
    const service = getServiceById(data.serviceId);
    if (!service) return;

    const selectedOptionsData = data.selectedOptions
      .map(optionId => service.options.find(opt => opt.id === optionId))
      .filter(Boolean);

    // Configuración de página
    const pageWidth = this.doc.internal.pageSize.getWidth();
    const pageHeight = this.doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Título principal
    this.doc.setFontSize(24);
    this.doc.setTextColor(30, 58, 138); // Blue-800
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('COTIZACIÓN DE SERVICIOS', pageWidth / 2, 30, { align: 'center' });

    // Línea decorativa
    this.doc.setDrawColor(59, 130, 246); // Blue-500
    this.doc.setLineWidth(0.5);
    this.doc.line(margin, 40, pageWidth - margin, 40);

    // Información de la empresa
    this.doc.setFontSize(12);
    this.doc.setTextColor(75, 85, 99); // Gray-600
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Tu Empresa de Desarrollo Web', margin, 55);
    this.doc.text('Email: contacto@tuempresa.com', margin, 62);
    this.doc.text('Tel: +52 55 1234 5678', margin, 69);

    // Fecha
    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.doc.text(`Fecha: ${currentDate}`, pageWidth - margin - 40, 55);

    // Información del cliente
    let yPosition = 100;
    if (data.customerInfo) {
      this.doc.setFontSize(14);
      this.doc.setTextColor(30, 58, 138);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('INFORMACIÓN DEL CLIENTE', margin, 90);

      this.doc.setFontSize(11);
      this.doc.setTextColor(75, 85, 99);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`Nombre: ${data.customerInfo.name}`, margin, 100);
      this.doc.text(`Email: ${data.customerInfo.email}`, margin, 107);
      if (data.customerInfo.phone) {
        this.doc.text(`Teléfono: ${data.customerInfo.phone}`, margin, 114);
      }

      // Mensaje del cliente si está disponible
      if (data.customerInfo.message) {
        yPosition = 130;
        this.doc.setFontSize(12);
        this.doc.setTextColor(30, 58, 138);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('MENSAJE DEL CLIENTE', margin, yPosition);

        yPosition += 8;
        this.doc.setFontSize(10);
        this.doc.setTextColor(71, 85, 105);
        this.doc.setFont('helvetica', 'normal');
        
        // Dividir el mensaje en líneas si es muy largo
        const maxWidth = contentWidth - 10;
        const messageLines = this.doc.splitTextToSize(data.customerInfo.message, maxWidth);
        messageLines.forEach((line: string) => {
          this.doc.text(line, margin + 5, yPosition);
          yPosition += 5;
        });

        yPosition += 10;
      } else {
        yPosition = 130;
      }
    } else {
      yPosition = 100;
    }
    
    // Servicio seleccionado
    this.doc.setFontSize(14);
    this.doc.setTextColor(30, 58, 138);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('SERVICIO SELECCIONADO', margin, yPosition);

    yPosition += 10;

    // Detalles del servicio
    this.doc.setFontSize(12);
    this.doc.setTextColor(30, 41, 59); // Slate-800
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(service.name, margin, yPosition);

    yPosition += 7;

    this.doc.setFontSize(10);
    this.doc.setTextColor(71, 85, 105); // Slate-600
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(service.description, margin, yPosition);

    yPosition += 10;

    // Precio base
    this.doc.setFontSize(11);
    this.doc.setTextColor(30, 41, 59);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Precio Base:', margin, yPosition);
    this.doc.text(formatPrice(service.basePrice[data.currency], data.currency), pageWidth - margin - 30, yPosition, { align: 'right' });

    yPosition += 8;

    // Opciones seleccionadas
    if (selectedOptionsData.length > 0) {
      this.doc.setFontSize(12);
      this.doc.setTextColor(30, 58, 138);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('OPCIONES ADICIONALES', margin, yPosition);

      yPosition += 8;

      this.doc.setFontSize(10);
      this.doc.setTextColor(71, 85, 105);
      this.doc.setFont('helvetica', 'normal');

      selectedOptionsData.forEach((option) => {
        if (option) {
          this.doc.text(`• ${option.name}`, margin + 5, yPosition);
          this.doc.text(`+${formatPrice(option.price[data.currency], data.currency)}`, pageWidth - margin - 30, yPosition, { align: 'right' });
          yPosition += 6;
        }
      });

      yPosition += 5;
    }

    // Línea separadora
    this.doc.setDrawColor(203, 213, 225); // Slate-300
    this.doc.setLineWidth(0.2);
    this.doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 8;

    // Total
    this.doc.setFontSize(14);
    this.doc.setTextColor(30, 58, 138);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('TOTAL:', margin, yPosition);
    this.doc.text(formatPrice(data.totalPrice, data.currency), pageWidth - margin - 30, yPosition, { align: 'right' });

    yPosition += 15;

    // Notas importantes
    this.doc.setFontSize(10);
    this.doc.setTextColor(100, 116, 139); // Slate-500
    this.doc.setFont('helvetica', 'italic');
    this.doc.text('Notas importantes:', margin, yPosition);
    
    yPosition += 6;
    this.doc.setFontSize(9);
    this.doc.text('• Esta cotización es válida por 30 días', margin + 5, yPosition);
    yPosition += 4;
    this.doc.text('• Los precios están sujetos a cambios sin previo aviso', margin + 5, yPosition);
    yPosition += 4;
    this.doc.text('• El tiempo de entrega se confirmará al iniciar el proyecto', margin + 5, yPosition);
    yPosition += 4;
    this.doc.text('• Se requiere un adelanto del 50% para comenzar el trabajo', margin + 5, yPosition);

    // Pie de página
    const footerY = pageHeight - 20;
    this.doc.setFontSize(8);
    this.doc.setTextColor(148, 163, 184); // Slate-400
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Gracias por considerar nuestros servicios', pageWidth / 2, footerY, { align: 'center' });
    this.doc.text('Para cualquier consulta, no dude en contactarnos', pageWidth / 2, footerY + 5, { align: 'center' });
  }

  async generateFromHTML(element: HTMLElement, filename: string = 'cotizacion.pdf'): Promise<void> {
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        this.doc.addPage();
        this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      this.doc.save(filename);
    } catch (error) {
      console.error('Error generating PDF from HTML:', error);
      throw error;
    }
  }

  save(filename: string = 'cotizacion.pdf'): void {
    this.doc.save(filename);
  }
}

// Función helper para generar PDF de cotización
export async function generateQuotationPDF(data: PDFData): Promise<void> {
  const pdfGenerator = new PDFGenerator();
  await pdfGenerator.generateQuotationPDF(data);
  pdfGenerator.save(`cotizacion-${data.serviceId}-${Date.now()}.pdf`);
}

// Función helper para generar PDF desde HTML
export async function generatePDFFromHTML(element: HTMLElement, filename?: string): Promise<void> {
  const pdfGenerator = new PDFGenerator();
  await pdfGenerator.generateFromHTML(element, filename);
} 