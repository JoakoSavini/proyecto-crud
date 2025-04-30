import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPdf = (data, title, columns) => {
    const doc = new jsPDF();

    // Título
    doc.setFont("courier", "bold");
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const text = `Listado de ${title}`;
    const textWidth = doc.getTextWidth(text);
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, 20);

    // Armar filas de tabla
    const tableRows = data?.map(item => [
        item.name,
        item.age,
        item.color,
        item.power,
    ]);

    // Agregar tabla
    autoTable(doc, {
        head: [columns],
        body: tableRows,
        startY: 30,
        styles: {
            font: "helvetica",
            fontSize: 11,
            cellPadding: 4,
        },
        headStyles: {
            fillColor: [60, 141, 188],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245],
        },
        margin: { top: 20 },
    });

    // Footer con fecha
    const date = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text(`Exportado el dia ${date}`, 14, doc.internal.pageSize.height - 10);

    // Guardar PDF
    doc.save(`${title}.pdf`);
};
