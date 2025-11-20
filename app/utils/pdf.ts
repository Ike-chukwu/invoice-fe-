import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (
  elementId: string,
  fileName = "invoice.pdf"
) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Clone the element to avoid messing with visible DOM
  const clone = element.cloneNode(true) as HTMLElement;

  clone.style.position = "absolute";
  clone.style.top = "-9999px";
  clone.style.left = "-9999px";
  clone.style.height = "auto";
  clone.style.overflow = "visible";
  clone.style.width = `${element.scrollWidth}px`; // preserve full width

  document.body.appendChild(clone);

  // Generate canvas
  const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");

  // Remove clone
  document.body.removeChild(clone);

  // Create PDF
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Additional pages
  while (heightLeft > 0) {
    position = heightLeft - imgHeight; // shift image upward
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  // Save PDF
  pdf.save(fileName);
};
