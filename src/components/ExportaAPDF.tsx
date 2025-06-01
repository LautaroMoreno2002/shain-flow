import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const exportChartToPDF = async () => {
  const chartElement = document.getElementById('chart-bar-container');
  if (!chartElement) {
    console.error('No se encontró el elemento del gráfico.');
    return;
  }

  try {
    const imgData = await toPng(chartElement);
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [chartElement.offsetWidth, chartElement.offsetHeight],
    });
    pdf.addImage(imgData, 'PNG', 10, 10, 780, 300);
    pdf.save('grafico.pdf');
  } catch (error) {
    console.error('Error al exportar el gráfico a PDF:', error);
  }
};