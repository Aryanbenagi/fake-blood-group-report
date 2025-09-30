import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ReportData } from '../types/ReportData';

export const generatePDF = async (data: ReportData) => {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points

    // Get fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();
    const margin = 50;
    let currentY = height - margin;

    // Colors
    const primaryRed = rgb(0.8, 0.2, 0.2); // Red color
    const darkGray = rgb(0.2, 0.2, 0.2);
    const lightGray = rgb(0.5, 0.5, 0.5);
    const black = rgb(0, 0, 0);

    // Header background
    page.drawRectangle({
      x: 0,
      y: height - 120,
      width: width,
      height: 120,
      color: rgb(0.8, 0.2, 0.2), // Red color
    });

    // Contact info at top
    page.drawText('Near Aasra Bridge, Shop No 3, Ashok Nagar, Vijapur Road Near Sushil Kumar Shinde Building, Solapur-413004', {
      x: margin,
      y: height - 30,
      size: 8,
      font: font,
      color: black,
    });

    page.drawText('E-mail: contact@vaishnavipathology.com | www.vaishnavipathology.com', {
      x: width - 300,
      y: height - 30,
      size: 8,
      font: font,
      color: black,
    });

    // Lab name
    page.drawText('Vaishnavi Pathology Laboratory', {
      x: margin,
      y: height - 70,
      size: 18,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    page.drawText('CONSULTING, DEVELOPMENT, SUPPORT', {
      x: margin,
      y: height - 90,
      size: 10,
      font: font,
      color: rgb(1, 1, 1),
    });

    // Phone numbers
    page.drawText('Phone: 022-21022438 / 21021849 / 65883968', {
      x: width - 250,
      y: height - 110,
      size: 8,
      font: font,
      color: rgb(1, 1, 1),
    });

    currentY = height - 150;

    // Report Title
    page.drawText('PATHOLOGY REPORT', {
      x: width / 2 - 80,
      y: currentY,
      size: 18,
      font: boldFont,
      color: darkGray,
    });

    currentY -= 50;

    // Patient Information Section
    page.drawText('PATIENT DETAILS', {
      x: margin,
      y: currentY,
      size: 14,
      font: boldFont,
      color: rgb(0.047, 0.525, 0.533),
    });

    currentY -= 25;

    const patientInfo = [
      ['LAB NO.:', '5'],
      ['PATIENT NAME:', data.patientName],
      ['REF. BY DR.:', data.doctorName],
      ['SAMPLE COLL. AT:', 'VAISHNAVI LAB'],
      ['DATE:', new Date(data.testDate).toLocaleDateString('en-GB')],
      ['SEX:', data.sex],
      ['AGE:', `${data.age} Years`],
    ];

    patientInfo.forEach(([label, value]) => {
      page.drawText(label, {
        x: margin,
        y: currentY,
        size: 10,
        font: boldFont,
        color: darkGray,
      });

      page.drawText(value, {
        x: margin + 100,
        y: currentY,
        size: 10,
        font: font,
        color: black,
      });

      currentY -= 18;
    });

    currentY -= 20;

    // Test Results Section
    page.drawText('LABORATORY RESULTS', {
      x: margin,
      y: currentY,
      size: 14,
      font: boldFont,
      color: rgb(0.047, 0.525, 0.533),
    });

    currentY -= 30;

    // Table headers
    const tableHeaders = ['Parameter', 'Result', 'Units', 'Reference Range', 'Flag'];
    const columnWidths = [140, 80, 60, 120, 80];
    const columnX = [margin, margin + 140, margin + 220, margin + 280, margin + 400];

    // Draw table header background
    page.drawRectangle({
      x: margin - 5,
      y: currentY - 15,
      width: 480,
      height: 20,
      color: rgb(0.95, 0.95, 0.95),
    });

    tableHeaders.forEach((header, index) => {
      page.drawText(header, {
        x: columnX[index],
        y: currentY - 5,
        size: 9,
        font: boldFont,
        color: darkGray,
      });
    });

    currentY -= 25;

    // Draw table rows
    data.testResults.forEach((test, rowIndex) => {
      const resultValue = parseFloat(test.result);
      const rangeMatch = test.referenceRange.match(/(\d+\.?\d*)-(\d+\.?\d*)/);
      let status = 'Normal';

      if (rangeMatch && !isNaN(resultValue)) {
        const [, minStr, maxStr] = rangeMatch;
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        
        if (resultValue < min) {
          status = 'Low';
        } else if (resultValue > max) {
          status = 'High';
        }
      }

      // Alternate row background
      if (rowIndex % 2 === 0) {
        page.drawRectangle({
          x: margin - 5,
          y: currentY - 12,
          width: 480,
          height: 16,
          color: rgb(0.98, 0.98, 0.98),
        });
      }

      const rowData = [test.testName, test.result, test.unit, test.referenceRange, status];
      
      rowData.forEach((data, colIndex) => {
        const textColor = colIndex === 4 ? 
          (status === 'High' ? rgb(0.8, 0.2, 0.2) : 
           status === 'Low' ? rgb(0.2, 0.4, 0.8) : 
           rgb(0.2, 0.6, 0.2)) : black;

        page.drawText(data, {
          x: columnX[colIndex],
          y: currentY - 5,
          size: 9,
          font: font,
          color: textColor,
        });
      });

      currentY -= 18;
    });

    // Notes section
    if (data.notes) {
      currentY -= 30;
      page.drawText('CLINICAL NOTES', {
        x: margin,
        y: currentY,
        size: 14,
        font: boldFont,
        color: rgb(0.047, 0.525, 0.533),
      });

      currentY -= 25;
      
      // Split notes into multiple lines if needed
      const notesLines = data.notes.match(/.{1,80}/g) || [data.notes];
      notesLines.forEach(line => {
        page.drawText(line.trim(), {
          x: margin,
          y: currentY,
          size: 10,
          font: font,
          color: darkGray,
        });
        currentY -= 15;
      });
    }

    // Signature section
    if (data.signature) {
      currentY -= 30;
      page.drawText('CONSULTANT PATHOLOGIST', {
        x: margin,
        y: currentY,
        size: 12,
        font: boldFont,
        color: darkGray,
      });

      // Try to embed signature image
      try {
        const signatureImageBytes = await fetch(data.signature).then(res => res.arrayBuffer());
        const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
        const signatureDims = signatureImage.scale(0.5);

        page.drawImage(signatureImage, {
          x: width - 200,
          y: currentY - 80,
          width: signatureDims.width,
          height: signatureDims.height,
        });
      } catch (error) {
        console.warn('Could not embed signature image:', error);
      }

      page.drawText(data.doctorName, {
        x: margin,
        y: currentY - 40,
        size: 12,
        font: boldFont,
        color: black,
      });

      page.drawText('MD (Pathology), Reg. No: MCI-12345', {
        x: margin,
        y: currentY - 55,
        size: 10,
        font: font,
        color: lightGray,
      });

      currentY -= 100; // Add more space after signature section
    }

    // Footer
    page.drawText('This is a computer generated report. Results are based on sample provided.', {
      x: margin,
      y: 60,
      size: 8,
      font: font,
      color: lightGray,
    });

    page.drawText('24/7 Helpline: +91-9876543210 | Email: reports@vaishnavipathology.com', {
      x: margin,
      y: 45,
      size: 8,
      font: font,
      color: lightGray,
    });

    // End of report line
    page.drawText('------------ end of report ---------------', {
      x: width / 2 - 100,
      y: 25,
      size: 10,
      font: font,
      color: lightGray,
    });

    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pathology_Report_${data.reportId}_${data.patientName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};