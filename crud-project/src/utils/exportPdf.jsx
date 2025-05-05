import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPdf = (data, title, columns) => {
    const doc = new jsPDF();

    // Fondo general 
    doc.setFillColor(17, 24, 39); 
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

    // Título 
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255); 
    doc.text(`Listado de ${title}`, 105, 20, null, null, "center");

    // Subtítulo con fecha 
    doc.setFontSize(11);
    doc.setTextColor(200, 200, 200);
    const today = new Date();
    doc.text(`Generado el: ${today.toLocaleDateString()}`, 14, 30);

    const tableColumn = columns;
    const tableRows = [];

    data?.forEach((item) => {
        const itemData = [
            item.name,
            item.age,
            item.color,
            item.power,
        ];
        tableRows.push(itemData);
    });

    // Le agrego estilo oscuro
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: {
            fontSize: 12,
            cellPadding: 4,
            textColor: [255, 255, 255],  
            fillColor: [17, 24, 39],     
            lineColor: [51, 65, 85],     
            lineWidth: 0.2,
        },
        headStyles: {
            fillColor: [18, 23, 38],     // Encabezado
            textColor: [255, 255, 255],
            fontSize: 13,
            halign: "center",
            valign: "middle",
        },
        alternateRowStyles: {
            fillColor: [31, 41, 55],     // item x item
        },
        tableLineColor: [75, 85, 99],     // item x item
        tableLineWidth: 0.1,
        margin: { top: 40 },
        didDrawPage: (data) => {
            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(10);
            doc.setTextColor(180, 180, 180); 
            doc.text(
                `Página ${doc.internal.getCurrentPageInfo().pageNumber} de ${pageCount}`,
                doc.internal.pageSize.getWidth() - 20,
                doc.internal.pageSize.getHeight() - 10,
                null,
                null,
                "right"
            );
        },
    });

    // Guardo el PDF
    doc.save(`${title}.pdf`);
};
